import React, { ReactNode } from "react";
import { FaSquareXmark } from "react-icons/fa6";

export interface AppModalProps {
  title: string | ReactNode;
  children: ReactNode;
  onClose?: () => void;
}

const AppModal: React.FC<AppModalProps> = ({ children, onClose,title }) => {
  return (
    <div className="w-screen h-screen fixed inset-0 flex justify-center items-center z-50 bg-white bg-opacity-80">
      <div className="container p-4 bg-white shadow-xl">
        <div className="w-full flex justify-between items-center p-2">
          <span className="text-xs font-semibold">{title}</span>
          <FaSquareXmark width={12} onClick={onClose} className="cursor-pointer text-danger" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default AppModal;
