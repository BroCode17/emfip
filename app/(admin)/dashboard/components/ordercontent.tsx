import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { formatReadableDate, formatToLocaleCurrency } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { OrderModal } from "./ordermodal";
import { useRouter } from "next/navigation";
import LaundryLoading from "@/components/loading";

export default function OrdersContent() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getAllOrders();
  }, []);

  useEffect(() => {}, [isLoading]);

  const openModal = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const getAllOrders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("../../api/controllers/orders");
      const data = await res.json();
      if (data.success) {
        const newData = data.orderList.documents.reverse()
        setOrders(newData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    await fetch(
      `../../api/controllers/orders?orderId=${orderId}&currentStatus=${newStatus}`,
      {
        method: "PUT",
      }
    );
    // Call the getAllOrder to refetch the data
    getAllOrders();
  };

  const filteredOrders = orders.filter(
    (order: any) =>
      order.$id.includes(searchQuery) ||
      order.customer_id.full_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <LaundryLoading />;
  }

  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <div className="flex justify-between items-center mb-4 w-full ">
        <Input
          className="max-w-sm"
          placeholder="Search orders..."
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <Button>Export Orders</Button>
      </div>
      {!isLoading && (
      <div className="overflow-y-auto">
          <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders &&
              filteredOrders.map((order: any, index: number) => {
                const currentStatus =
                  order.status[order.status.length - 1].currentStatus;
                return (
                  <TableRow
                    key={order.$id}
                    className="cursor-pointer"
                    onClick={() => openModal(order)}
                  >
                    <TableCell>#{order.$id}</TableCell>
                    <TableCell>{order.customer_id.full_name}</TableCell>
                    <TableCell>
                      {formatReadableDate(order.$createdAt)}
                    </TableCell>
                    <TableCell>
                      {formatToLocaleCurrency(Number(order.total_amount || 0))}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant={`${
                          currentStatus === "Pending"
                            ? "destructive"
                            : "outline"
                        }`}
                        className={`${
                          currentStatus === "Shipped" || currentStatus === 'Delivered' &&
                          " bg-green-700 text-white"
                        }`}
                      >
                        {currentStatus}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
      )}
      <OrderModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={closeModal}
        onUpdateStatus={updateOrderStatus}
      />
    </div>
  );
}
