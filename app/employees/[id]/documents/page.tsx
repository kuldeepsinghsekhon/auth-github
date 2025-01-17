import Header from '@/components/Header'
import { DocumentManagement } from '@/components/employee/DocumentManagement'

export default function EmployeeDocumentsPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the employee data based on the ID
  const employee = {
    id: params.id,
    name: "John Doe",
    documents: {
      Contracts: true,
      Passport: true,
      Visa: true,
      EID: true,
      Certificates: false,
      Degrees: true,
      CV: true
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Employee Documents: {employee.name}</h1>
        <DocumentManagement employee={employee} />
      </main>
    </div>
  )
}

