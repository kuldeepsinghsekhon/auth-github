import Header from '@/components/Header'
import { AddressBook } from '@/components/employee/AddressBook'

export default function EmployeeAddressBookPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the employee data based on the ID
  const employee = {
    id: params.id,
    name: "John Doe",
   
    homePhone: "+1 234 567 8901"
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Employee Address Book: {employee.name}</h1>
        <AddressBook employee={employee} />
      </main>
    </div>
  )
}

