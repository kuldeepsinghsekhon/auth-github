import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle } from 'lucide-react'

export function LeaveManagement({ employee }: { employee: any }) {
  const leaveHistory = employee?.leaveHistory || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Leave Eligibility</h3>
          <p>Annual Leave Balance: {employee?.annualLeaveBalance || 0} days</p>
          <p>Next Eligible Date: {employee?.nextLeaveEligibleDate || 'N/A'}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Leave History</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveHistory.map((leave: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{leave.startDate}</TableCell>
                  <TableCell>{leave.endDate}</TableCell>
                  <TableCell>{leave.days}</TableCell>
                  <TableCell>{leave.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Apply for Leave
        </Button>
      </CardContent>
    </Card>
  )
}

