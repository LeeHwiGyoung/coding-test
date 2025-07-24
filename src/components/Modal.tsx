import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  containerId?: string;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  containerId = "modal-root",
  className,
}: ModalProps) {
  if (!isOpen) return null;

  const container = document.getElementById(containerId);

  if (!container) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex justify-center items-center px-10"
      onClick={onClose}
    >
      <section
        className={`bg-white w-auto h-auto ${className} overflow-scroll`}
        onClick={(e) => e.stopPropagation()} 
      >
        {children}
      </section>
    </div>,
    container
  );
}
