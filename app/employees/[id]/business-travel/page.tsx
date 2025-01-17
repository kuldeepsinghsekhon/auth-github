import Header from '@/components/Header'
import { BusinessTravel } from '@/components/employee/BusinessTravel'

export default function EmployeeBusinessTravelPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the employee data based on the ID
  const employee = {
    id: params.id,
    name: "John Doe",
    businessTravelRequests: [
      {
        requestDate: "2023-05-01",
        destination: "New York",
        startDate: "2023-06-15",
        endDate: "2023-06-20",
        status: "Approved"
      },
      {
        requestDate: "2023-07-10",
        destination: "London",
        startDate: "2023-08-01",
        endDate: "2023-08-05",
        status: "Pending"
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Employee Business Travel: {employee.name}</h1>
        <BusinessTravel employee={employee} />
      </main>
    </div>
  )
}

