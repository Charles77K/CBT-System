import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";

interface LogoutModalTypes {
  title: string;
  onYes: () => void;
  onNo: () => void;
  onCancel: () => void;
  yesText: string;
  noText: string;
}

export default function LogoutModal({
  title,
  onYes,
  onNo,
  onCancel,
  yesText,
  noText,
}: LogoutModalTypes) {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (modal) {
      modal.setAttribute("open", "");
    }

    return () => {
      if (modal) {
        modal.removeAttribute("open");
      }
    };
  }, [modalRef]);

  return createPortal(
    <div className="bg-black bg-opacity-50 fixed inset-0 z-50 flex justify-center items-center">
      <dialog
        ref={modalRef}
        className="bg-white p-6 min-[400px]:p-12 rounded shadow-md relative z-60"
        onClose={onCancel}
      >
        <div>
          <h2 className="text-lg font-semibold mb-4">{title}</h2>
          <IoMdClose
            className="absolute top-4 right-4 text-2xl cursor-pointer"
            size={20}
            onClick={onCancel}
          />
          <section className="flex justify-end gap-5">
            <button
              onClick={onYes}
              className="bg-red-500 text-white rounded-sm px-5 py-2 text-xs md:text-sm"
            >
              {yesText}
            </button>
            <button
              onClick={onNo}
              className="bg-gray-300 rounded-sm px-5 py-2 text-xs md:text-sm"
            >
              {noText}
            </button>
          </section>
        </div>
      </dialog>
    </div>,
    document.getElementById("logout-modal")!
  );
}
