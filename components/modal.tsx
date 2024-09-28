// components/Modal.tsx
import React from "react";
import { Button } from "@/components/ui/button";

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        {children}
        <div className="mt-6 flex justify-end">
          <Button onClick={onClose} className="bg-red-600 text-white hover:bg-red-700 transition duration-300">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
