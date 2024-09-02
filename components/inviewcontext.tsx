'use client';

import React, { createContext, useContext, useState } from "react";

interface InViewContextType {
  isVideoVisible: boolean;
  setIsVideoVisible: React.Dispatch<React.SetStateAction<boolean>>;
  showCheckout: boolean;
  setShowCheckout: React.Dispatch<React.SetStateAction<boolean>>;
}

const initValue: InViewContextType = {
  isVideoVisible: false,
  setIsVideoVisible: () => { }, // This will be replaced by actual state setter
  //show checkout context
  showCheckout: false,
  setShowCheckout: () => { } //return void
};

const InViewContext = createContext<InViewContextType>(initValue);

export const InViewContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isVideoVisible, setIsVideoVisible] = useState(initValue.isVideoVisible);
  const [showCheckout, setShowCheckout] = useState(initValue.showCheckout);

  return (
    <InViewContext.Provider value={{ isVideoVisible, setIsVideoVisible, showCheckout, setShowCheckout }}>
      {children}
    </InViewContext.Provider>
  );
}

export const useInViewContext = () => useContext(InViewContext);
