import React from "react";
import "./style/alerts.props.css";
import AppButtons from "../button/AppButtons";
import alertDelete from "../../../assets/img/delete-alert.svg";
import alertOk from "../../../assets/img/ok-alert.svg";
import alertFailed from "../../../assets/img/failed-alert.svg";
import alertConfirmation from "../../../assets/img/confirmation-alert.svg";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { FaSquareXmark } from "react-icons/fa6";

interface AlertsProps {
  alert: { type: "success" | "delete" | "confirmation" | "error"; message: string } | null;
  onClose: () => void;
  onConfirm?: () => void;
  onDelete?: () => void;
}

const Alerts: React.FC<AlertsProps> = ({ alert, onClose, onConfirm, onDelete }) => {
  if (!alert) return null;

  const { type, message } = alert;

  return (
    <div className="alert-container">
      <div className="p-4 bg-white shadow-lg flex flex-col justify-center items-center border border-primary rounded md:w-1/4">
        <img src={type === "delete" ? alertDelete : type === "success" ? alertOk : type === "error" ? alertFailed : type === "confirmation" ? alertConfirmation : ""} alt="alert image" className="w-40 h-40" />
        <h5 className="mb-6">{type === "delete" ? "Apakah anda yakin ingin menghapus data?" : message}</h5>
        <div className="flex justify-center items-center gap-2 w-full">
          <AppButtons variant={type === "delete" ? "primary" : type === "success" ? "primary" : "danger"} label={type === "success" ? "Ok" : type === "error" ? "Ok" : "Batal"} onClick={onClose} fontSize="text-sm" icon={type === "success" ? <FaCheckCircle /> : <FaSquareXmark />} />
          {type === "confirmation" || type === "delete" ? (
            <AppButtons variant={type === "delete" ? "danger" : "primary"} label={type === "delete" ? "Hapus" : "Ok"} onClick={type === "confirmation" ? onConfirm : onDelete} fontSize="text-sm" icon={type === "delete" ? <FaTrash /> : <FaCheckCircle />} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Alerts;
