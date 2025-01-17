import Header from '@/components/Header'
import { AssetManagement } from '@/components/employee/AssetManagement'

export default function EmployeeAssetsPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the employee data based on the ID
  const employee = {
    id: params.id,
    name: "John Doe",
    assets: [
      {
        type: "Laptop",
        model: "MacBook Pro 2021",
        serialNumber: "MBP2021123456",
        assignedDate: "2022-01-15"
      },
      {
        type: "Mobile Phone",
        model: "iPhone 13",
        serialNumber: "IP13987654",
        assignedDate: "2022-01-15"
      },
      {
        type: "Monitor",
        model: "Dell U2720Q",
        serialNumber: "DU2720Q654321",
        assignedDate: "2022-01-15"
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Employee Asset Management: {employee.name}</h1>
        <AssetManagement employee={employee} />
      </main>
    </div>
  )
}

