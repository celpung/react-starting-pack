import { FaInfoCircle } from "react-icons/fa";
import AppButtons from "../../components/cores/button/AppButtons";
import Loading from "../../components/cores/loading/Loading";
import { useState } from "react";
import Alerts from "../../components/cores/alerts/Alerts";
import useAlert from "../../components/cores/alerts/AlertHook";
import AppForms, { FormFieldConfig } from "../../components/cores/inputs/AppForms";
import FunctionTable from "../../components/cores/table/FunctionTable";

// Define the type for the valid variants
type ButtonVariant = "primary" | "secondary" | "success" | "danger" | "info" | "warning" | "black" | "disable";

interface user {
  id: number;
  name: string;
  email: string;
  address: string;
}

export default function Palletes() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { alert, showAlert, closeAlert } = useAlert();
  const [showForm, setShowForm] = useState<boolean>(false);

  const bgPalletes = [
    {
      bgColor: "bg-primary",
      label: "Primary background",
    },
    {
      bgColor: "bg-secondary",
      label: "Secondary background",
    },
    {
      bgColor: "bg-info",
      label: "Info background",
    },
    {
      bgColor: "bg-success",
      label: "Success background",
    },
    {
      bgColor: "bg-warning",
      label: "Warning background",
    },
    {
      bgColor: "bg-danger",
      label: "Danger background",
    },
  ];

  // Define the btnPalletes array with proper variant types
  const btnPalletes: { variant: ButtonVariant; label: string }[] = [
    {
      variant: "primary",
      label: "Primary button",
    },
    {
      variant: "secondary",
      label: "Secondary button",
    },
    {
      variant: "info",
      label: "Info button",
    },
    {
      variant: "success",
      label: "Success button",
    },
    {
      variant: "warning",
      label: "Warning button",
    },
    {
      variant: "danger",
      label: "Danger button",
    },
  ];

  const palletesForm: FormFieldConfig[] = [
    { label: "Name", name: "name", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
    { label: "Password", name: "repassword", type: "password" },
    {
      label: "Option",
      name: "option",
      type: "select",
      options: [
        { value: "-", label: "-- Select Data --" },
        { value: "1", label: "OPTION 1" },
      ],
    },
    { label: "Address", name: "address", type: "textarea" },
  ];

  const userData: user[] = [
    {
      id: 1,
      name: "Mickey Summary",
      email: "mike@example.com",
      address: "123 Main St",
    },
    {
      id: 2,
      name: "John Doe",
      email: "john.doe@example.com",
      address: "456 Oak Ave",
    },
    {
      id: 3,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      address: "789 Pine St",
    },
    {
      id: 4,
      name: "Alice Johnson",
      email: "alice.j@example.com",
      address: "101 Maple Dr",
    },
    {
      id: 5,
      name: "Bob Brown",
      email: "bob.brown@example.com",
      address: "202 Elm St",
    },
    {
      id: 6,
      name: "Charlie Davis",
      email: "charlie.d@example.com",
      address: "303 Cedar Rd",
    },
    {
      id: 7,
      name: "Emily Wilson",
      email: "emily.w@example.com",
      address: "404 Birch Ln",
    },
    {
      id: 8,
      name: "Frank Thomas",
      email: "frank.t@example.com",
      address: "505 Walnut St",
    },
    {
      id: 9,
      name: "Grace Lee",
      email: "grace.lee@example.com",
      address: "606 Spruce Ct",
    },
    {
      id: 10,
      name: "Hannah White",
      email: "hannah.white@example.com",
      address: "707 Fir Dr",
    },
  ];

  const tableColumn = [
    { header: "No.", accessor: (row: user) => row.id, textAlign: "text-center" },
    { header: "Name", accessor: (row: user) => row.name, textAlign: "text-start" },
    { header: "Email", accessor: (row: user) => row.email, textAlign: "text-center" },
    { header: "Address", accessor: (row: user) => row.address, textAlign: "text-center" },
  ];

  const setLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div className="flex-1 flex justify-center p-4">
      <div className="container">
        {/* Background Palletes */}
        <div className="p-4 border rounded shadow-lg mb-4 bg-white">
          <div className="grid grid-cols-6 gap-4 h-32">
            {bgPalletes.map((bg, index) => (
              <div key={index} className={`${bg.bgColor} rounded p-2 text-center`}>
                {bg.label}
              </div>
            ))}
          </div>
        </div>

        {/* Headings Palletes */}
        <div className="p-4 border rounded shadow-lg flex gap-4 items-center mb-4 bg-white w-full">
          <h1>H1</h1>
          <h2>H2</h2>
          <h3>H3</h3>
          <h4>H4</h4>
          <h5>H5</h5>
        </div>

        {/* Button Palletes */}
        <div className="p-4 border rounded shadow-lg mb-4 bg-white">
          <div className="grid grid-cols-6 gap-4">
            {btnPalletes.map((btn, index) => (
              <>
                <AppButtons key={index} variant={btn.variant} label={btn.label} />
                <AppButtons key={index} variant={btn.variant} label={btn.label} icon={<FaInfoCircle />} />
              </>
            ))}
          </div>
        </div>

        <div className="p-4 border rounded shadow-lg mb-4 bg-white">
          <div className="grid grid-cols-5 gap-4">
            <AppButtons variant="primary" label="Show loading" onClick={setLoading} />
            <AppButtons variant="info" label="Show confirmation alert" onClick={() => showAlert("confirmation", "This is confirmation alert!")} />
            <AppButtons variant="success" label="Show success alert" onClick={() => showAlert("success", "This is success alert!")} />
            <AppButtons variant="danger" label="Show error alert" onClick={() => showAlert("error", "this is error alert!")} />
            <AppButtons variant="warning" label="Show delete alert" onClick={() => showAlert("delete", "This is delete alert!")} />
          </div>
          {isLoading && <Loading />}
          {alert && <Alerts alert={alert} onConfirm={() => {}} onClose={closeAlert} onDelete={() => {}} />}
        </div>

        <div className="p-4 border rounded shadow-lg mb-4 bg-white">
          <AppForms onClose={() => {}} onSubmit={() => setShowForm(true)} title="Sample register form" fields={palletesForm} submitLabel="SHOW FORM AS MODAL" />
          {showForm && <AppForms onClose={() => setShowForm(false)} onSubmit={() => {}} title="Sample register form" fields={palletesForm} submitLabel="SUBMIT" isModal />}
        </div>

        <div className="p-4 border rounded shadow-lg mb-4 bg-white">
          <FunctionTable column={tableColumn} data={userData} onEdit={() => {}} onDelete={() => {}} onExport={() => {}} onCreate={() => {}} />
        </div>
      </div>
    </div>
  );
}
