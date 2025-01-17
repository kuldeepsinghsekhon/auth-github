import Header from '@/components/Header'
import { EmployeeMovements } from '@/components/employee/EmployeeMovements'

export default function EmployeeMovementsPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the employee data based on the ID
  const employee = {
    id: params.id,
    name: "John Doe",
    movements: [
      {
        date: "2022-06-01",
        type: "Promotion",
        from: "Junior Developer",
        to: "Senior Developer"
      },
      {
        date: "2021-01-15",
        type: "Transfer",
        from: "IT Department",
        to: "Product Development"
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Employee Movements: {employee.name}</h1>
        <EmployeeMovements employee={employee} />
      </main>
    </div>
  )
}

