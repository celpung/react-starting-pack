import { useState, useEffect, useCallback } from 'react';

type AlertType = "success" | "error" | "delete" | "confirmation";

interface Alert {
  type: AlertType;
  message: string;
}

const useAlert = () => {
  const [alert, setAlert] = useState<Alert | null>(null);

  const showAlert = useCallback((type: AlertType, message: string) => {
    setAlert({ type, message });
  }, []);

  const closeAlert = useCallback(() => {
    setAlert(null);
  }, []);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return { alert, showAlert, closeAlert };
};

export default useAlert;
