'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail } from 'lucide-react'
import { formatToLocaleCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/hooks/use-toast'
import { useToast } from '@/components/_context/toast/toast-context'

interface Product {
  id: string;
  name: string;
  price: number;
}

// interface ShippingInfo {
//   address: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   country: string;
//   phone: string;
// }

interface Customer{
  email: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  full_name: string;

}
interface OrderItems{
  quantity: number;
  price_at_purchase: number;
  udpatedAt: Date;
  createdAt: Date;
  product_id: Product[]
}

interface Order {
  order_date: Date;
  total_amount: number;
  status: string;
  avatar: string;
  order_id: string;
  order_items: OrderItems[];
  //shippingInfo: ShippingInfo;
}

interface CustomerModalProps {
  order: any | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (orderId: string, newStatus: string) => void;
}
const ORDER_STATUSES = [
  'Pending',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
  'OutforDelivery'
]

export function OrderModal({ order, isOpen, onClose, onUpdateStatus }: CustomerModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('Pending');
  const toast = useToast()
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (order) {
      setSelectedStatus(order.status);
    }
  }, [order]);
  if (!isMounted) {
    return null;
  }
  const handleStatusChange = (newStatus: string) => {
    setSelectedStatus(newStatus);
  };
  const handleUpdateStatus = () => {
    if (order && selectedStatus !== order.status) {
      onUpdateStatus(order.$id, selectedStatus);
      toast?.open( `Order has been updated successfully`)
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        {order && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{order.customer_id.full_name}</DialogTitle>
              <DialogDescription>{order.customer_id.email}</DialogDescription>
            </DialogHeader>
            <div className="mt-4 flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={order.avatar} alt={order.customer_id.full_name} />
                <AvatarFallback>{order.customer_id.full_name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-gray-500">Customer ID</p>
                <p className="font-medium">{order.customer_id.$id}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {order.order_item.map((item:any) => (
                      <li key={item.$id} className="flex items-center justify-between">
                        <span>{item.product_id.name}</span>
                        <Badge variant="secondary">{formatToLocaleCurrency(Number(item.price_at_purchase))}</Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                      <p>
                        {order.customer_id.address}<br />
                        {order.customer_id.city}, {order.customer_id.state} {order.customer_id.zip_code}<br />
                        {order.customer_id.country}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-2 text-gray-500" />
                      <p>No phone number yet</p>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-2 text-gray-500" />
                      <p>{order.customer_id.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium text-gray-700">
                  Order Status
                </label>
                <Select  onValueChange={handleStatusChange} value={selectedStatus.toString()}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {ORDER_STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button onClick={handleUpdateStatus}>Update Status</Button>
              </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
