import Header from '@/components/Header'
import { LeaveManagement } from '@/components/employee/LeaveManagement'

export default function EmployeeLeavePage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the employee data based on the ID
  const employee = {
    id: params.id,
    name: "John Doe",
    annualLeaveBalance: 15,
    nextLeaveEligibleDate: "2023-12-01",
    leaveHistory: [
      {
        startDate: "2023-07-01",
        endDate: "2023-07-10",
        days: 10,
        status: "Approved"
      },
      {
        startDate: "2023-04-15",
        endDate: "2023-04-20",
        days: 6,
        status: "Taken"
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Employee Leave Management: {employee.name}</h1>
        <LeaveManagement employee={employee} />
      </main>
    </div>
  )
}

