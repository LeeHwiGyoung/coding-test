'use client';
import { getSeconds } from '@/api/endpoints/timer';
import { formatDateTime } from '@/utils/format';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'

interface CardProps {
    id : string;
    width : number;
    height : number;
    format : string;
    originalFileName : string;
    caseName : string;
    initStatus : "waiting" | "completed" | "failed" | "DONE";
    imageURL : string;
    createdAt : string;
    isDragging : boolean;
    onClickImage : (id:string, width:number , height : number , imageURL : string) => void;
    onClickButton : (id : string , seconds : number , status : "waiting" | "completed" | "failed" | "DONE") => void;
}

export default function Card({id ,width, height , format ,originalFileName, caseName, initStatus ,imageURL ,createdAt , onClickImage , isDragging , onClickButton } : CardProps) {
  const [seconds , setSeconds] = useState<number>(0);
  const [status, setStatus] = useState<"waiting" | "completed" | "failed" | "DONE">(initStatus);
  const timerRef = useRef<NodeJS.Timeout | null>(null); //
  const mouseDown = useRef(null);


  const onChangeStatus = (event : React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as "waiting" | "completed" | "failed" | "DONE"
    setStatus(value);
  }

  const onMouseDown = () => {
    mouseDown.current = true;
  }

  const onMouseUP = () => {
    mouseDown.current = false;
  }

  const onMouseLeave = () => {
    mouseDown.current = false;
  }


  useEffect(()=> {
    const getSecondsCard = async(id : string) => {
        try{
            const initSeconds = await getSeconds(id)
            setSeconds(initSeconds);
        }catch(error){
            console.error(error);
        }
    }

    getSecondsCard(id)
  }, [])
  
  return (
    <article
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUP}
      onMouseLeave={onMouseLeave} 
      className={`bg-white shadow-md rounded-md p-4 m-4 border border-gray-200 ${isDragging ? 'cursor-grabbing': 'cursor-grab'}`}>
        <Image className="rounded-md cursor-pointer"width={width} height={height} src={imageURL} alt='' onClick={()=> onClickImage(id, width , height, imageURL)} />
        <h3 className="text-lg font-bold">{originalFileName}</h3>
        <data>{width} X {height}, {format}</data>
        <div>
            <span>Case</span>
            <span>{caseName}</span>
        </div>
        <div>
            <span>Status</span>
            <select 
              id="status"
              name="status"
              value={status}
              onChange={onChangeStatus}
            >
                <option value="DONE">--status--</option>
                <option value="waiting">waiting</option>
                <option value="completed">complete</option>
                <option value="failed">failed</option>
            </select>
        </div>
        <div>
            <span>CreateAt</span>
            <time dateTime={createdAt}>{formatDateTime(createdAt)}</time>
        </div>
        <div>
            <span>Clicked</span>
            <span>{seconds}</span>
        </div>
      <button
         type='button' 
         onClick={() => onClickButton(id,seconds, status)}
         className='border-3 rounded-md w-full p-4 border-blue-500 cursor-pointer text-blue-500 font-bold hover:bg-blue-500 hover:text-white'>
           Save
        </button>
    </article>
  )
}
