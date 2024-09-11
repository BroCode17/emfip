import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import React, { useEffect, useMemo, useState } from 'react'
import { ProductModal } from './addneditproduct'

import { ActionBox } from './actions/productactions'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ErrorMap, Product, ProductActionType } from '@/lib'



const ProductPage = () => {
  const [isError, setIsError] = useState<string>("")
  const [allErrors, setAllErrors] = useState<Map<string, string>>(new Map())
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [products, setProducts] = useState([])
  const { toast } = useToast()
  const router = useRouter();

  useEffect(() => {
    handleGetAllProduct()
  }, [])

  useEffect(() => {
  }, [isError, allErrors])

  const handleGetAllProduct = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('../../api/controllers/products')
      const jsonResponse = await res.json()
      setProducts(jsonResponse.documents)

      console.log(jsonResponse)

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (product: Product, action?: string) => {
    const formData = new FormData();
    const imageId = product.imageId
    const productId = product.id

    Object.entries(product).forEach((entry) => {
      if (entry[0] !== 'imageId')
        formData.append(entry[0] as string, entry[1] as any)
    })
    // Reset all password
    setAllErrors(new Map())
    if (action) {
      try {
        const response = await fetch(`../../api/controllers/products?type=${action}&productId=${productId}&&imageId=${imageId}`, {
          method: action === 'delete' ? 'DELETE' : 'PUT',
          // Only include the body when the action is 'update'
          ...(action === 'update' && { body: formData }),
        })
        const data = await response.json()
        console.log(data)
        if (!data.success) {
          //  console.log(data.error)
          Object.entries(data.error).forEach((e: any) => {
            const key = e[0]
            const value = e[1][0]
            setAllErrors((prev: ErrorMap) => {
              const map = new Map(prev)
              map.set(key, value)
              return map
            })
          })
          router.refresh()
          return
        }
        console.log(data)
      } catch (error) {
      }
    } else {

      try {
        const respones = await fetch('../../api/controllers/products', {
          method: 'POST',
          body: formData
        });
        const res = await respones.json()
        if (!respones.ok) {
          setIsError(res.error)
          return
        }
        // console.log(res.error)
        //Toaste
        toast({
          title: "Successs",
          description: res.message,
          action: (
            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          ),
        })
        console.log(res)
      } catch (error) {
        console.log("This is error", error);
      } finally {
        setIsError("")
      }
    }
  }

  // Delete item with specific id
  const handeDelete = (id: string) => {
    // Delet of the big boys and craft
  }

  return (
    <div className='w-full'>
      <div className="flex justify-between items-center mb-4">
        <Input className="max-w-sm" placeholder="Search products..." />
        <ProductModal onSubmit={handleSubmit} isError={isError} allErrors={allErrors} />
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
            products.map((product: any) => (
              <TableRow key={product.name}>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <ActionBox product={product} handleSubmit={handleSubmit} allError={allErrors} />
                </TableCell>
              </TableRow>
            ))
          }

        </TableBody>
      </Table>
      {isLoading && <Loader2 className='animate-spin' />}
    </div>
  )
}

export default ProductPage


/***
 * [
    { id: '1', name: 'Wool Dryer Balls (Set of 6)', price: 19.99, stock: 500, description: 'Set of 6 premium wool dryer balls', image: '/placeholder.svg' },
    { id: '2', name: 'Wool Dryer Balls (Set of 3)', price: 12.99, stock: 300, description: 'Set of 3 premium wool dryer balls', image: '/placeholder.svg' },
    { id: '3', name: 'Wool Dryer Balls (Set of 9)', price: 24.99, stock: 200, description: 'Set of 9 premium wool dryer balls', image: '/placeholder.svg' },
  ]
 */
