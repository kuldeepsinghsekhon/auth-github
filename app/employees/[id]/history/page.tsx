import Header from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function EmployeeHistoryPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the employee data and history based on the ID
  const employee = {
    id: params.id,
    name: "Alice Johnson",
    history: [
      { id: 1, position: "Marketing Intern", department: "Marketing", startDate: "2018-06-01", endDate: "2018-12-31" },
      { id: 2, position: "Marketing Associate", department: "Marketing", startDate: "2019-01-01", endDate: "2019-12-31" },
      { id: 3, position: "Marketing Manager", department: "Marketing", startDate: "2020-01-01", endDate: null },
    ]
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Employment History: {employee.name}</h1>
        <Card>
          <CardHeader>
            <CardTitle>Position History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employee.history.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.position}</TableCell>
                    <TableCell>{entry.department}</TableCell>
                    <TableCell>{entry.startDate}</TableCell>
                    <TableCell>{entry.endDate || 'Present'}</TableCell>
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

