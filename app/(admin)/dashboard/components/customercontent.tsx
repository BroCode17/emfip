import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";


export default function CustomersContent() {
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
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>jane@example.com</TableCell>
            <TableCell>2</TableCell>
            <TableCell>$37.98</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob Johnson</TableCell>
            <TableCell>bob@example.com</TableCell>
            <TableCell>1</TableCell>
            <TableCell>$19.99</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}
