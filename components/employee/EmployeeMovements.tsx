import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function EmployeeMovements({ employee }: { employee: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Employee Movements</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employee.movements.map((movement: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{movement.date}</TableCell>
                <TableCell>{movement.type}</TableCell>
                <TableCell>{movement.from}</TableCell>
                <TableCell>{movement.to}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

