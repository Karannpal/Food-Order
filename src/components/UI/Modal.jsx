import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, open, onClose, className = " " }) => {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    } else {
      modal.close();
    }
  }, [open]);

  return createPortal(
    <dialog
      ref={dialog}
      className={`modal bg-[#e4ddd4] rounded-md border-none shadow-[0_2px_8px_rgba(0,0,0,0.6)] p-4 w-[80%] max-w-[40rem] animate-fade-slide-up mx-auto mt-[30vh]  ${className}`}
      onClose={onClose}
    >
      {children}
    </dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
