'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { BarChart, DollarSign, Package, ShoppingCart, Users } from "lucide-react"

import CustomersContent from './customercontent'
import AnalyticsContent from './analyticscontent'
import OrdersContent from './ordercontent'
import ProductPage from './product'
import { useRouter } from 'next/navigation'


const LogoutBtn = () => {
  const router = useRouter()
  const logout = async () => {
    try {
      const res = await fetch('../../api/auth/login')
      //check for error

      // if response is okay
      if (res.ok) {
        router.replace('/login')
        return
      }
    } catch (error) {
      console.log(error)
    }
  }
  return <Button onClick={logout}>
    Logout
  </Button>
}

function DashboardContent() {
  return (
    <div className='flex flex-col gap-4'>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Total Sales</h2>
          <p className="text-3xl font-bold">$12,345</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Orders</h2>
          <p className="text-3xl font-bold">123</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Customers</h2>
          <p className="text-3xl font-bold">456</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Products</h2>
          <p className="text-3xl font-bold">3</p>
        </div>
      </div>

      <div className='flex-1 h-full  hidden md:block '>
        <div className='mt-auto h-[400px] flex items-center justify-center'>
          <span className='base-header'>Emfip Dashboard</span>
        </div>
      </div>
    </div>
  )
}

/**
 *
 * @returns adminpage
 */
export default function AdminPage() {
  const [activeSection, setActiveSection] = useState('dashboard')

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardContent />
      case 'products':
        return <ProductPage />
      case 'orders':
        return <OrdersContent />
      case 'customers':
        return <CustomersContent />
      case 'analytics':
        return <AnalyticsContent />
      default:
        return <DashboardContent />
    }
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 p-4 hidden md:flex md:flex-col md:justify-between">
        <section>
          <nav className="space-y-2">
            <Button
              variant={activeSection === 'dashboard' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveSection('dashboard')}
            >
              <BarChart className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={activeSection === 'products' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveSection('products')}
            >
              <Package className="mr-2 h-4 w-4" />
              Products
            </Button>
            <Button
              variant={activeSection === 'orders' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveSection('orders')}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Orders
            </Button>
            <Button
              variant={activeSection === 'customers' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveSection('customers')}
            >
              <Users className="mr-2 h-4 w-4" />
              Customers
            </Button>
            <Button
              variant={activeSection === 'analytics' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveSection('analytics')}
            >
              <BarChart className="mr-2 h-4 w-4" />
              Analytics
            </Button>
          </nav>
        </section>

        {/* Logout */}
        <LogoutBtn />
      </aside>

      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 flex justify-around">
        <Button variant="ghost" onClick={() => setActiveSection('dashboard')}>
          <BarChart className="h-6 w-6" />
        </Button>
        <Button variant="ghost" onClick={() => setActiveSection('products')}>
          <Package className="h-6 w-6" />
        </Button>
        <Button variant="ghost" onClick={() => setActiveSection('orders')}>
          <ShoppingCart className="h-6 w-6" />
        </Button>
        <Button variant="ghost" onClick={() => setActiveSection('customers')}>
          <Users className="h-6 w-6" />
        </Button>
        <Button variant="ghost" onClick={() => setActiveSection('analytics')}>
          <BarChart className="h-6 w-6" />
        </Button>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        {renderContent()}
      </main>
    </div>
  )
}
