'use client'
import React, { useState } from "react";
import { createContext } from "react";

type AdminStateTypes = {
  totalSales: number,
  newOrders: number,
  totalCustomers: number,
  totalProduct: number,
}

const initState = {
  totalSales: 0,
  newOrders: 0,
  totalCustomers: 0,
  totalProduct: 0,
}

const AdminContext = createContext(initState);

export default function AdminContextProvider({children}: {children: React.ReactNode}){
  const [adminState, setAdminState] = useState<AdminStateTypes>(initState);

  const handleStateChange = (key: string, value: any) => {
      setAdminState(prev => ({...prev, [key]: value}))
  }

  return <AdminContext.Provider value={adminState}>
    {children}
  </AdminContext.Provider>
}
