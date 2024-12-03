/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaArrowRight } from "react-icons/fa";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa6";

export interface Option {
  value: string;
  label: string;
}

interface BaseProps {
  label?: string;
  icon?: ReactNode;
  className?: string;
}

interface InputProps extends BaseProps, InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "number" | "email" | "password" | "search" | "date";
}

interface SelectProps extends BaseProps, SelectHTMLAttributes<HTMLSelectElement> {
  type: "select";
  options?: Option[];
}

interface PillProps extends BaseProps, SelectHTMLAttributes<HTMLSelectElement> {
  type: "pills";
  options?: Option[];
}

interface TextareaProps extends BaseProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  type: "textarea";
  textareaHeight?: string | number;
}

type AppInputProps =
  | InputProps
  | SelectProps
  | PillProps
  | (TextareaProps & {
      disabled?: boolean;
    });

const AppInput: React.FC<AppInputProps> = (props) => {
  const { label, icon, className = "", disabled = false, ...restProps } = props;
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [inputValue, setInputValue] = useState<string | number>(() => {
    if (typeof props.value === "string" || typeof props.value === "number") {
      return props.value;
    }
    return "";
  });

  useEffect(() => {
    if (typeof props.value === "string" || typeof props.value === "number") {
      setInputValue(props.value);
    } else {
      setInputValue("");
    }
  }, [props.value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (disabled) return; // Prevent changes if disabled

    const { value } = event.target;

    if (props.type === "pills" && event.target instanceof HTMLSelectElement) {
      const selectedValue = event.target.value;
      const selectedLabel = event.target.selectedOptions[0].label;
      const newOption = { value: selectedValue, label: selectedLabel };
      setSelectedOptions((prevOptions) => [...prevOptions, newOption]);

      // Call the onChange prop to notify the parent component of the change
      (restProps as any).onChange({
        target: {
          name: props.name,
          value: [...selectedOptions, newOption],
        },
      });
    } else if (props.type === "number") {
      const formattedValue = formatNumberWithDots(value);
      setInputValue(formattedValue);

      // Call the onChange prop to notify the parent component of the change
      (restProps as any).onChange({
        target: {
          name: props.name,
          value: formattedValue,
        },
      });
    } else {
      setInputValue(value);
      (restProps as any).onChange(event);
    }
  };

  const handleRemoveOption = (index: number) => {
    if (disabled) return; // Prevent option removal if disabled

    const updatedOptions = selectedOptions.filter((_, i) => i !== index);
    setSelectedOptions(updatedOptions);

    // Call the onChange prop to notify the parent component of the change
    (restProps as any).onChange({
      target: {
        name: props.name,
        value: updatedOptions,
      },
    });
  };

  const formatNumberWithDots = (value: string | number): string => {
    const num = typeof value === "string" ? parseFloat(value.replace(/\./g, "")) : value;
    if (isNaN(num)) return "";
    return num.toLocaleString("id-ID").replace(/,/g, ".");
  };

  return (
    <div className={className}>
      {label && <label className="block text-gray-700 text-xs font-semibold mb-2">{label.toUpperCase()}</label>}
      <div className="relative">
        {props.type === "select" ? (
          <select {...props} disabled={disabled} className={`border-primary appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10 ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}>
            {props.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : props.type === "pills" ? (
          <>
            <select {...props} disabled={disabled} className={`border-primary appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10 ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`} onChange={handleChange}>
              {props.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {selectedOptions.length > 0 && (
              <div className="flex gap-2 items-center flex-wrap mt-2 bg-primary text-white text-xs rounded p-2">
                {selectedOptions.map((option, index) => (
                  <span key={index} className="flex items-center cursor-pointer">
                    {(index + 1) % 2 === 0 ? <FaPlaneArrival className="mr-1" /> : <FaPlaneDeparture className="mr-1" />}
                    <span className="pill" onClick={() => handleRemoveOption(index)}>
                      {option.label}
                    </span>
                    {index < selectedOptions.length - 1 && <FaArrowRight className="ml-2" />}
                  </span>
                ))}
              </div>
            )}
          </>
        ) : props.type === "date" ? (
          <DatePicker
            selected={(props as any).value}
            onChange={(date) => (restProps as any).onChange({ target: { value: date } })}
            disabled={disabled}
            className={`border-primary appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10 ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
          />
        ) : props.type === "textarea" ? (
          <textarea
            {...props}
            value={inputValue}
            onChange={handleChange}
            disabled={disabled}
            className={`border-primary appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10 ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
            style={{ height: props.textareaHeight || "150px", }}
          />
        ) : (
          <input
            {...props}
            type={props.type === "number" ? "text" : props.type}
            value={props.type === "number" ? inputValue : restProps.value}
            onChange={handleChange}
            disabled={disabled}
            className={`border-primary appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10 ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
          />
        )}
        {icon && <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">{icon}</div>}
      </div>
    </div>
  );
};

export default AppInput;
