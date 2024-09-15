"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ToastContext } from "./toast-context";
import "./toast.css";
import { IoCheckmarkSharp } from "react-icons/io5";


interface ToastProperties {
  message: string;
  close: () => void;
}

function useTimeout(callbackFunction: () => void) {
  const savedCallback = useRef(callbackFunction);

  useEffect(() => {
    savedCallback.current = callbackFunction;
  }, [callbackFunction]);

  useEffect(() => {
    const functionId = setTimeout(() => savedCallback.current(), 3000);

    return () => clearInterval(functionId);
  }, []);
}

export const Toast = ({ message, close }: ToastProperties) => {
  useTimeout(() => {
    close();
  });

  return (
    <div className="toast bg-zinc-800 rounded-tl-lg rounded-bl-lg">
      <p className="ml-3">{message}</p>
      <button className="close-btn mr-2" onClick={close}>
        <IoCheckmarkSharp color="green" />
      </button>
    </div>
  );
};

type ToastType = {
  message: string;
  id: number;
};

export const TProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);


  function openToast(message: string) {
    const newToast = {
      id: Date.now(),
      message: message,
    };
    setToasts((pervToast) => [...pervToast, newToast]);
  }

  function closeToast(id: number) {
    setToasts((prevToast) => prevToast.filter((toast) => toast.id !== id));
  }

  const contextValue = useMemo(
    () => ({
      open: openToast,
      close: closeToast,
    }),
    []
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <>
        <div className="toasts mt-16 rounded-xl">
          {toasts &&
            toasts.map((toast) => {
              return (
                <Toast
                  key={toast.id}
                  message={toast.message}
                  close={() => closeToast(toast.id)}
                />
              );
            })}
        </div>
      </>
    </ToastContext.Provider>
  );
};
