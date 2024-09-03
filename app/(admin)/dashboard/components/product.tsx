import { Button } from '@/components/ui/button'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { ProductModal } from './addneditproduct'
import { EllipsisVertical } from 'lucide-react'
import { Product } from '@/lib'
import { ActionBox } from './actions/productactions'



const ProductPage = () => {
  const [products, setProducts] = useState([
    { id: '1', name: 'Wool Dryer Balls (Set of 6)', price: 19.99, stock: 500, description: 'Set of 6 premium wool dryer balls', image: '/placeholder.svg' },
    { id: '2', name: 'Wool Dryer Balls (Set of 3)', price: 12.99, stock: 300, description: 'Set of 3 premium wool dryer balls', image: '/placeholder.svg' },
    { id: '3', name: 'Wool Dryer Balls (Set of 9)', price: 24.99, stock: 200, description: 'Set of 9 premium wool dryer balls', image: '/placeholder.svg' },
  ])

  const handleSubmit = (formData: any | string) => {
    console.log(formData)
  }

  // Delete item with specific id
  const handeDelete = (id: string) => {
    console.log(id)
  }

  return (
    <div className='w-full'>
      <div className="flex justify-between items-center mb-4">
        <Input className="max-w-sm" placeholder="Search products..." />
        <ProductModal onSubmit={handleSubmit} />
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
          {
            products.map((product: Product) => (
              <TableRow key={product.name}>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <ActionBox product={product} handleSubmit={handleSubmit} />
                </TableCell>
              </TableRow>
            ))
          }

        </TableBody>
      </Table>
    </div>
  )
}

export default ProductPage
