/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { ReactNode, useState } from "react";
// import AppInput from "./AppInput";
// import "./style/form.props.css";
// import AppButtons from "../button/AppButtons";

// export interface FormFieldConfig {
//   label: string;
//   name: string;
//   type: "number" | "search" | "text" | "email" | "password" | "select" | "date" | "pills" | "textarea" | "file";
//   options?: { value: any; label: string }[];
//   disabled?: boolean;
//   textareaHeight?: string | number;
// }

// interface AppFormProps {
//   fields: FormFieldConfig[];
//   onSubmit: (data: Record<string, any>) => void;
//   onClose?: () => void;
//   title: string;
//   initialData?: Record<string, any>;
//   isLogin?: boolean;
//   isModal?: boolean;
//   submitLabel: string | "";
//   submitIcon?: ReactNode;
//   errorMessage?: string;
// }

// const AppForm: React.FC<AppFormProps> = ({ fields, onSubmit, onClose, isLogin, title, isModal, initialData, submitLabel, submitIcon = "", errorMessage }) => {
//   const [formData, setFormData] = useState<Record<string, any>>(() => {
//     const data = { ...initialData };
//     fields.forEach((field) => {
//       if (field.type === "date" && data[field.name]) {
//         const dateValue = new Date(data[field.name]);
//         data[field.name] = isNaN(dateValue.getTime()) ? null : dateValue;
//       }
//     });
//     return data;
//   });

//   const handleInputChange = (name: string, value: any) => {
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (name: string, files: FileList | null) => {
//     if (files && files.length > 0) {
//       setFormData({
//         ...formData,
//         [name]: files[0],
//       });
//     }
//   };

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     // <form className={`${isModal ? "w-screen h-screen fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-50 bg-white bg-opacity-80" : ""}`} onSubmit={handleSubmit}>
//     <form className={`${isModal ? `w-screen h-screen fixed inset-0 flex justify-center items-center ${!isLogin ? "z-50 bg-white bg-opacity-80" : ""}` : ""}`} onSubmit={handleSubmit}>
//       <div
//         className={`${isModal ? "md:w-1/3 w-full border p-4 bg-white rounded-lg overflow-auto shadow-xl" : ""}`}
//         style={{
//           maxHeight: isModal ? "90%" : "auto",
//         }}
//       >
//         {isModal ? (
//           <>
//             {isLogin ? (
//               <h5 className="text-center text-xl mb-4">{title}</h5>
//             ) : (
//               <div className="w-full bg-primary rounded-t-md py-2 px-6 mb-8">
//                 <span className="text-sm">{title}</span>
//               </div>
//             )}
//           </>
//         ) : (
//           // <h1 className="text-xs text-center mb-4">{title}</h1>
//           <div className="w-full bg-primary rounded-t-md py-2 px-6 mb-8">
//             <span className="text-sm">{title}</span>
//           </div>
//         )}

//         {fields.map((field) => (
//           <div className="mb-2" key={field.name}>
//             {field.type === "file" ? (
//               <div>
//                 <label>{field.label}</label>
//                 <input type="file" disabled={field.disabled} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileChange(field.name, event.target.files)} className="mt-2" />
//               </div>
//             ) : (
//               <AppInput textareaHeight={field.textareaHeight} label={field.label} type={field.type} options={field.type === "select" || field.type === "pills" ? field.options || [] : undefined} value={formData[field.name] || ""} disabled={field.disabled} onChange={(event: any) => handleInputChange(field.name, event.target.value)} />
//             )}
//           </div>
//         ))}

//         {isLogin && errorMessage ? <span className="text-xs text-danger">{errorMessage}</span> : null}

//         {isLogin ? (
//           <div className="flex justify-end gap-4 mt-8">
//             <AppButtons type="submit" label={submitLabel} icon={submitIcon ? submitIcon : null} />
//           </div>
//         ) : (
//           <div className={`${isModal ? "justify-center" : "justify-end"} gap-4 mt-8`}>
//             <div className="w-full mb-8">
//               <AppButtons type="submit" label={submitLabel} icon={submitIcon ? submitIcon : null} />
//             </div>

//             {isModal && (
//               <div className="flex justify-center text-center">
//                 <span onClick={onClose} className="cursor-pointer font-light text-sm">
//                   Tutup
//                 </span>
//               </div>
//             )}

//             {/* {isModal && <AppButtons variant="outline" label="Tutup" onClick={onClose} icon={<FaSquareXmark />} />} */}
//           </div>
//         )}
//       </div>
//     </form>
//   );
// };

// export default AppForm;

import React, { ReactNode, useState } from "react";
import AppInput from "./AppInput";
import ReactQuill from "react-quill"; // Import ReactQuill
import "react-quill/dist/quill.snow.css"; // Import ReactQuill styles
import "./style/form.props.css";
import AppButtons from "../button/AppButtons";

export interface FormFieldConfig {
  label: string;
  name: string;
  type: "number" | "search" | "text" | "email" | "password" | "select" | "date" | "pills" | "textarea" | "file" | "textEditor"; // Add textEditor type
  options?: { value: any; label: string }[];
  disabled?: boolean;
  textareaHeight?: string | number;
}

interface AppFormProps {
  fields: FormFieldConfig[];
  onSubmit: (data: Record<string, any>) => void;
  onClose?: () => void;
  title: string;
  initialData?: Record<string, any>;
  isLogin?: boolean;
  isModal?: boolean;
  submitLabel: string | "";
  submitIcon?: ReactNode;
  errorMessage?: string;
}

const AppForm: React.FC<AppFormProps> = ({ fields, onSubmit, onClose, isLogin, title, isModal, initialData, submitLabel, submitIcon = "", errorMessage }) => {
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

  const handleFileChange = (name: string, files: FileList | null) => {
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  // Custom toolbar for ReactQuill
  const quillModules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['bold', 'italic', 'underline'],
      ['link'],
      ['image'],
      [{ 'color': [] }, { 'background': [] }],
      ['clean'], // A button to clear formatting
    ],
  };

  return (
    <form className={`${isModal ? `w-screen h-screen fixed inset-0 flex justify-center items-center ${!isLogin ? "z-50 bg-white bg-opacity-80" : ""}` : ""}`} onSubmit={handleSubmit}>
      <div
        className={`${isModal ? "md:w-1/3 w-full border p-4 bg-white rounded-lg overflow-auto shadow-xl" : ""}`}
        style={{
          maxHeight: isModal ? "90%" : "auto",
        }}
      >
        {isModal ? (
          <>
            {isLogin ? (
              <h5 className="text-center text-xl mb-4">{title}</h5>
            ) : (
              <div className="w-full bg-primary rounded-t-md py-2 px-6 mb-8">
                <span className="text-sm">{title}</span>
              </div>
            )}
          </>
        ) : (
          <div className="w-full bg-primary rounded-t-md py-2 px-6 mb-8">
            <span className="text-sm">{title}</span>
          </div>
        )}

        {fields.map((field) => (
          <div className="mb-2" key={field.name}>
            {field.type === "file" ? (
              <div>
                <label className="block text-gray-700 text-xs font-semibold mb-2">{field.label.toUpperCase()}</label>
                <input type="file" disabled={field.disabled} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileChange(field.name, event.target.files)} className="mt-2" />
              </div>
            ) : field.type === "textEditor" ? (
              <div>
                <label className="block text-gray-700 text-xs font-semibold mb-2">{field.label.toUpperCase()}</label>
                <ReactQuill
                  value={formData[field.name] || ""}
                  onChange={(value: string) => handleInputChange(field.name, value)}
                  modules={quillModules}
                  // style={{ height: field.textareaHeight || "200px", marginTop: "10px" }}
                />
              </div>
            ) : (
              <AppInput textareaHeight={field.textareaHeight} label={field.label} type={field.type} options={field.type === "select" || field.type === "pills" ? field.options || [] : undefined} value={formData[field.name] || ""} disabled={field.disabled} onChange={(event: any) => handleInputChange(field.name, event.target.value)} />
            )}
          </div>
        ))}

        {isLogin && errorMessage ? <span className="text-xs text-danger">{errorMessage}</span> : null}

        {isLogin ? (
          <div className="flex justify-end gap-4 mt-8">
            <AppButtons type="submit" label={submitLabel} icon={submitIcon ? submitIcon : null} />
          </div>
        ) : (
          <div className={`${isModal ? "justify-center" : "justify-end"} gap-4 mt-8`}>
            <div className="w-full mb-8">
              <AppButtons type="submit" label={submitLabel} icon={submitIcon ? submitIcon : null} />
            </div>

            {isModal && (
              <div className="flex justify-center text-center">
                <span onClick={onClose} className="cursor-pointer font-light text-sm">
                  Tutup
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </form>
  );
};

export default AppForm;
