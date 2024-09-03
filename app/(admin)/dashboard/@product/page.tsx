import { Button } from '@/components/ui/button'
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Table } from 'lucide-react'
import { Input } from '@/components/ui/input'
import React from 'react'

const ProductPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Input className="max-w-sm" placeholder="Search products..." />
        <Button>Add New Product</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Wool Dryer Balls (Set of 6)</TableCell>
            <TableCell>$19.99</TableCell>
            <TableCell>500</TableCell>
            <TableCell>
              <Button variant="ghost">Edit</Button>
              <Button variant="ghost" className="text-red-500">Delete</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Wool Dryer Balls (Set of 3)</TableCell>
            <TableCell>$12.99</TableCell>
            <TableCell>300</TableCell>
            <TableCell>
              <Button variant="ghost">Edit</Button>
              <Button variant="ghost" className="text-red-500">Delete</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Wool Dryer Balls (Set of 9)</TableCell>
            <TableCell>$24.99</TableCell>
            <TableCell>200</TableCell>
            <TableCell>
              <Button variant="ghost">Edit</Button>
              <Button variant="ghost" className="text-red-500">Delete</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default ProductPage
