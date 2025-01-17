import Header from '@/components/Header'
import { PayrollAccounts } from '@/components/employee/PayrollAccounts'

export default function EmployeePayrollPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the employee data based on the ID
  const employee = {
    id: params.id,
    name: "John Doe",
    bankName: "Dubai Islamic Bank",
    accountNumber: "1234567890",
    ibanNumber: "AE123456789012345678901",
    basicSalary: 10000,
    houseAllowance: 5000,
    transportAllowance: 1000,
    foodAllowance: 500,
    ticketAllowance: 2000,
    mobileDeduction: 100,
    salaryAdvanceDeduction: 0,
    loanDeduction: 500,
    personalShipmentDeduction: 0
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Employee Payroll: {employee.name}</h1>
        <PayrollAccounts employee={employee} />
      </main>
    </div>
  )
}

