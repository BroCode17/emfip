'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { Customer } from "@/lib";
import { Divide, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";


export default function CustomersContent() {
  const [customers, setCustomers] = useState<Customer[] | []>([])
  const [isError, setIsError] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  useEffect(() => {
    allCustomers();
  }, [])

  //Get all customers function
  const allCustomers = async () => {
    try {
      setIsLoading(true)
      const res = await fetch('../../api/controllers/customers')
      const data = await res.json()
      setCustomers(data.documents)
      console.log(data)

    } catch (error) {
      setIsError('Opps!...something happend whiles fetching data, try refreshing the browser')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Input className="max-w-sm" placeholder="Search customers..." />
        <Button>Export Customers</Button>
      </div>
      <Table>
        <TableHeader >
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Total Spent</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
            <TableCell>3</TableCell>
            <TableCell>$59.97</TableCell>
          </TableRow>
          {customers.map((customer: Customer) => (
            <TableRow key={customer.email}>
              <TableCell>{customer.full_name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>3</TableCell>
              <TableCell>$59.97</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isLoading && <Loader2 className="animate-spin" />}

    </>

  )
}
