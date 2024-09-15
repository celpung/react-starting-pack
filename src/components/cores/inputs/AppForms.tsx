/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, useState } from "react";
import AppInput from "./AppInput";
import "./style/form.props.css";
import { FaSquareXmark } from "react-icons/fa6";
import { FaSignInAlt } from "react-icons/fa";
import AppButtons from "../button/AppButtons";

export interface FormFieldConfig {
  label: string;
  name: string;
  type: "number" | "search" | "text" | "email" | "password" | "select" | "date" | "pills" | "textarea";
  options?: { value: any; label: string }[];
  disabled?: boolean;
}

interface AppFormProps {
  fields: FormFieldConfig[];
  onSubmit: (data: Record<string, any>) => void;
  onClose: () => void;
  title: string;
  initialData?: Record<string, any>;
  isLogin?: boolean;
  isModal?: boolean;
  submitLabel: string | "";
  submitIcon?: ReactNode;
}

const AppForm: React.FC<AppFormProps> = ({ fields, onSubmit, onClose, isLogin, title, isModal, initialData, submitLabel, submitIcon = "" }) => {
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const data = { ...initialData };
    fields.forEach((field) => {
      if (field.type === "date" && data[field.name]) {
        const dateValue = new Date(data[field.name]);
        data[field.name] = isNaN(dateValue.getTime()) ? null : dateValue;
      }
    });
    return data;
  });

  const handleInputChange = (name: string, value: any) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className={`${isModal ? "w-screen h-screen fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-50 bg-white bg-opacity-80" : ""}`} onSubmit={handleSubmit}>
      <div
        className={`${isModal ? "md:w-1/3 w-full border p-4 bg-white rounded-lg overflow-auto shadow-xl" : ""}`}
        style={{
          maxHeight: isModal ? "90%" : "auto",
        }}
      >
        <h1 className="text-xl text-center mb-4">{title}</h1>
        {fields.map((field) => (
          <div className="mb-2" key={field.name}>
            <AppInput label={field.label} type={field.type} options={field.type === "select" || field.type === "pills" ? field.options || [] : undefined} value={formData[field.name] || ""} disabled={field.disabled} onChange={(event: any) => handleInputChange(field.name, event.target.value)} />
          </div>
        ))}
        {isLogin ? (
          <div className="flex justify-end gap-4 mt-4">
            <AppButtons type="submit" label="Masuk" icon={<FaSignInAlt />} />
          </div>
        ) : (
          <div className={`flex ${isModal ? "justify-center" : "justify-end"} gap-4 mt-4`}>
            {isModal && <AppButtons variant="danger" label="Tutup" onClick={onClose} icon={<FaSquareXmark />} />}
            <AppButtons type="submit" label={submitLabel} icon={submitIcon ? submitIcon : null} />
          </div>
        )}
      </div>
    </form>
  );
};

export default AppForm;
