import Header from '@/components/Header'
import { QualificationsTraining } from '@/components/employee/QualificationsTraining'

export default function EmployeeQualificationsPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the employee data based on the ID
  const employee = {
    id: params.id,
    name: "John Doe",
    trainings: [
      {
        name: "ISO 9001 Training",
        isoNumber: "ISO-9001-2023",
        enrollmentDate: "2023-01-15",
        feedback: "Excellent",
        evaluation: "Passed"
      },
      {
        name: "Leadership Skills",
        isoNumber: "LS-2023-001",
        enrollmentDate: "2023-03-01",
        feedback: "Very Good",
        evaluation: "Completed"
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Employee Qualifications & Training: {employee.name}</h1>
        <QualificationsTraining employee={employee} />
      </main>
    </div>
  )
}

