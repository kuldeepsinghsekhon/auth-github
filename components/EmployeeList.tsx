import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Eye, UserPlus } from 'lucide-react'

const employees = [
  { id: 1, name: "Alice Johnson", department: "Marketing", position: "Marketing Manager", status: "Active" },
  { id: 2, name: "Bob Smith", department: "Engineering", position: "Senior Developer", status: "On Leave" },
  { id: 3, name: "Charlie Brown", department: "Sales", position: "Sales Representative", status: "Active" },
  { id: 4, name: "Diana Ross", department: "HR", position: "HR Specialist", status: "Active" },
  { id: 5, name: "Edward Norton", department: "Finance", position: "Financial Analyst", status: "Inactive" },
]

export default function EmployeeList() {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.status}</TableCell>
              <TableCell>
                <Link href={`/employees/${employee.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link href="/employees/add">
        <Button className="mb-4">
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Employee
        </Button>
      </Link>
    </div>
  )
}

