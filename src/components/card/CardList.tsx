'use client';
import { getImageList } from '@/api/endpoints/imageList';
import React, { useEffect, useRef, useState } from 'react'
import Card from './Card';
import Modal from '../Modal';
import { useModal } from '@/hooks/useModal';
import Image from 'next/image';
import { postSeconds } from '@/api/endpoints/timer';
import { patchStatus } from '@/api/endpoints/status';

export default function CardList() {
  const [cardList, setCardList] = useState([]);
  const { isOpen, openModal, closeModal } = useModal();
  const [clickedCard, setClickedCard] = useState<{
    id: string,
    width: number,
    height: number,
    imageURL: string,
  } | null>(null);
  const [draggingCardId, setDraggingCardId] = useState<string | null>(null);
  
  useEffect(() => {
    const getCardList = async (caseId: string) => {
      try {
        const imageList = await getImageList(caseId);
        setCardList([...imageList]);
        console.log(imageList);
      } catch (error) {
        console.error(error);
      }
    };
    getCardList(process.env.NEXT_PUBLIC_CASE_ID);
  }, []);

  const handleOnClickImage = (id: string, width: number, height: number, imageURL: string) => {
    setClickedCard({ id, width, height, imageURL });
    openModal();
  };

  const handleDragStart = (id: string) => {
    setDraggingCardId(id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault(); // drop 허용
  };

  const handleDrop = (targetId: string) => {
    if (!draggingCardId || draggingCardId === targetId) return;

    const draggingIndex = cardList.findIndex(card => card._id === draggingCardId);
    const targetIndex = cardList.findIndex(card => card._id === targetId);

    if (draggingIndex === -1 || targetIndex === -1) return;

    const newList = [...cardList];
    const [draggedItem] = newList.splice(draggingIndex, 1);
    newList.splice(targetIndex, 0, draggedItem);
    setCardList(newList);
    setDraggingCardId(null);
  };


  const handleOnClickSave = async(imageId : string , seconds : number , status : "waiting" | "completed" | "failed" | "DONE") => {
    try {
      await postSeconds(imageId, seconds.toString());
      if(status !== "DONE") {
        await patchStatus(imageId , status);
      }
      
    } catch(error) {
      console.error('failedError', error);
    }
  }


  return (
    <>
      <ul className='flex flex-col items-center justify-center max-w-[48rem]'>
        {cardList.map((card) => (
          <li
            key={card._id}
            draggable
            onDragStart={() => handleDragStart(card._id)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(card._id)}
            className="w-full"
          >
            <Card
              onClickImage={handleOnClickImage}
              id={card._id}
              width={card.info.width}
              height={card.info.height}
              format={card.info.foramt}
              originalFileName={card.originalFilename}
              caseName={card.caseName}
              initStatus={card.status}
              imageURL={`${process.env.NEXT_PUBLIC_S3_URL}/${card.s3Path}`}
              createdAt={card.createdAt}
              isDragging={draggingCardId === card._id}
              onClickButton={handleOnClickSave}
            />
          </li>
        ))}
      </ul>
      <Modal isOpen={isOpen} onClose={closeModal}>
        {clickedCard && (
          <Image
            width={clickedCard.width}
            height={clickedCard.height}
            src={clickedCard.imageURL}
            alt=''
          />
        )}
      </Modal>
    </>
  );
}
