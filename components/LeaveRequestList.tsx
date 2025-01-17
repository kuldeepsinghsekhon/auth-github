import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Eye } from 'lucide-react'
import Link from 'next/link'

const leaveRequests = [
  { id: 1, employee: "Alice Johnson", type: "Vacation", startDate: "2023-07-01", endDate: "2023-07-05", status: "Pending" },
  { id: 2, employee: "Bob Smith", type: "Sick Leave", startDate: "2023-06-28", endDate: "2023-06-30", status: "Approved" },
  { id: 3, employee: "Charlie Brown", type: "Personal", startDate: "2023-07-10", endDate: "2023-07-12", status: "Rejected" },
  { id: 4, employee: "Diana Ross", type: "Vacation", startDate: "2023-08-01", endDate: "2023-08-10", status: "Pending" },
]

export default function LeaveRequestList() {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Leave Type</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaveRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.employee}</TableCell>
              <TableCell>{request.type}</TableCell>
              <TableCell>{request.startDate}</TableCell>
              <TableCell>{request.endDate}</TableCell>
              <TableCell>
                <Badge
                  variant={request.status === 'Approved' ? 'success' : request.status === 'Rejected' ? 'destructive' : 'default'}
                >
                  {request.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Link href={`/leave-management/requests/${request.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  {request.status === 'Pending' && (
                    <>
                      <Button variant="outline" size="sm" className="text-green-600 hover:text-green-800">
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-800">
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

