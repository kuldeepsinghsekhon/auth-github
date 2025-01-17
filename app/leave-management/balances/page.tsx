import Header from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

const employees = [
  { id: 1, name: "Alice Johnson", vacation: 15, sick: 5, personal: 3 },
  { id: 2, name: "Bob Smith", vacation: 10, sick: 7, personal: 2 },
  { id: 3, name: "Charlie Brown", vacation: 20, sick: 3, personal: 5 },
  { id: 4, name: "Diana Ross", vacation: 8, sick: 4, personal: 1 },
]

export default function LeaveBalancesPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Leave Balances</h1>
        <Card>
          <CardHeader>
            <CardTitle>Employee Leave Balances</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Vacation Days</TableHead>
                  <TableHead>Sick Days</TableHead>
                  <TableHead>Personal Days</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Progress value={(employee.vacation / 20) * 100} className="w-[60%] mr-2" />
                        <span>{employee.vacation}/20</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Progress value={(employee.sick / 10) * 100} className="w-[60%] mr-2" />
                        <span>{employee.sick}/10</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Progress value={(employee.personal / 5) * 100} className="w-[60%] mr-2" />
                        <span>{employee.personal}/5</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

