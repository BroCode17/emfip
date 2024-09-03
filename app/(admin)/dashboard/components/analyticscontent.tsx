import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";


export default function AnalyticsContent() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Sales Overview</h2>
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
          Sales Chart Placeholder
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Top Selling Products</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Units Sold</TableHead>
              <TableHead>Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Wool Dryer Balls (Set of 6)</TableCell>
              <TableCell>500</TableCell>
              <TableCell>$9,995</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Wool Dryer Balls (Set of 3)</TableCell>
              <TableCell>300</TableCell>
              <TableCell>$3,897</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Wool Dryer Balls (Set of 9)</TableCell>
              <TableCell>200</TableCell>
              <TableCell>$4,998</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
