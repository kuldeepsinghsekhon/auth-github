import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function EndOfService({ employee }: { employee: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>End of Service</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Gratuity Calculation</h3>
          <p>Total Service Period: {employee.totalServicePeriod}</p>
          <p>Gratuity Amount: {employee.gratuityAmount}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Leave Encashment</h3>
          <p>Remaining Annual Leave: {employee.remainingAnnualLeave} days</p>
          <p>Encashment Amount: {employee.leaveEncashmentAmount}</p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Salary for Notice Period</TableCell>
              <TableCell>{employee.salaryForNoticePeriod}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Unpaid Leave Deduction</TableCell>
              <TableCell>{employee.unpaidLeaveDeduction}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Other Compensations</TableCell>
              <TableCell>{employee.otherCompensations}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Deductions</TableCell>
              <TableCell>{employee.deductions}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="space-y-2">
          <Button variant="outline">Generate Jafza EOS Form</Button>
          <Button variant="outline">Generate Bank Letter</Button>
          <Button variant="outline">Generate Employment Certificate</Button>
        </div>
      </CardContent>
    </Card>
  )
}

