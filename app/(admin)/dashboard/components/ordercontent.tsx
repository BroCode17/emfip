import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";


export default function OrdersContent() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Input className="max-w-sm" placeholder="Search orders..." />
        <Button>Export Orders</Button>
      </div>
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
          <TableRow>
            <TableCell>#1234</TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>2023-06-01</TableCell>
            <TableCell>$19.99</TableCell>
            <TableCell>Shipped</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>#1235</TableCell>
            <TableCell>Jane Smith</TableCell>
            <TableCell>2023-06-02</TableCell>
            <TableCell>$24.99</TableCell>
            <TableCell>Processing</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>#1236</TableCell>
            <TableCell>Bob Johnson</TableCell>
            <TableCell>2023-06-03</TableCell>
            <TableCell>$12.99</TableCell>
            <TableCell>Delivered</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
