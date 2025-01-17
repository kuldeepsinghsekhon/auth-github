import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function PayrollAccounts({ employee }: { employee: any }) {
  const salaryComponents = employee?.salaryComponents || {}
  const deductions = employee?.deductions || {}

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payroll Bank Accounts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="bankName">Bank Name</Label>
          <Input id="bankName" defaultValue={employee?.bankName || ''} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="accountNumber">Account Number</Label>
          <Input id="accountNumber" defaultValue={employee?.accountNumber || ''} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ibanNumber">IBAN Number</Label>
          <Input id="ibanNumber" defaultValue={employee?.ibanNumber || ''} />
        </div>
        <div className="space-y-2">
          <Label>Contract Salary</Label>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Component</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(salaryComponents).map(([component, amount]) => (
                <TableRow key={component}>
                  <TableCell>{component}</TableCell>
                  <TableCell>{amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="space-y-2">
          <Label>Monthly Payroll Deductions</Label>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deduction</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(deductions).map(([deduction, amount]) => (
                <TableRow key={deduction}>
                  <TableCell>{deduction}</TableCell>
                  <TableCell>{amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

