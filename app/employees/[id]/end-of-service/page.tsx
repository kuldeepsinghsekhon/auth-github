import Header from '@/components/Header'
import { EndOfService } from '@/components/employee/EndOfService'

export default function EmployeeEndOfServicePage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the employee data based on the ID
  const employee = {
    id: params.id,
    name: "John Doe",
    totalServicePeriod: "5 years, 3 months",
    gratuityAmount: 50000,
    remainingAnnualLeave: 10,
    leaveEncashmentAmount: 5000,
    salaryForNoticePeriod: 15000,
    unpaidLeaveDeduction: 0,
    otherCompensations: 2000,
    deductions: 1000
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Employee End of Service: {employee.name}</h1>
        <EndOfService employee={employee} />
      </main>
    </div>
  )
}

