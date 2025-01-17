import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle } from 'lucide-react'

export function BusinessTravel({ employee }: { employee: any }) {
  const businessTravelRequests = employee?.businessTravelRequests || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Travel Requests</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request Date</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {businessTravelRequests.map((request: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{request.requestDate}</TableCell>
                <TableCell>{request.destination}</TableCell>
                <TableCell>{request.startDate}</TableCell>
                <TableCell>{request.endDate}</TableCell>
                <TableCell>{request.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Business Travel Request
        </Button>
      </CardContent>
    </Card>
  )
}

