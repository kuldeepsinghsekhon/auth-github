import Header from '@/components/header'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ArrowLeft, Edit } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// In a real application, you would fetch this data from an API or database
const employeeData = {
  id: 1,
  name: "Alice Johnson",
  email: "alice.johnson@example.com",
  phone: "+1 (555) 123-4567",
  department: "Marketing",
  position: "Marketing Manager",
  status: "Active",
  hireDate: "2020-03-15",
  manager: "John Doe",
  salary: "$85,000",
  address: "123 Main St, Anytown, USA 12345",
  emergencyContact: {
    name: "Bob Johnson",
    relationship: "Spouse",
    phone: "+1 (555) 987-6543"
  },
  skills: ["Digital Marketing", "SEO", "Content Strategy", "Team Leadership"],
  education: [
    {
      degree: "Bachelor of Science in Marketing",
      institution: "State University",
      year: "2015"
    },
    {
      degree: "Master of Business Administration",
      institution: "Business School",
      year: "2018"
    }
  ],
  certifications: ["Google Ads Certification", "HubSpot Inbound Marketing"],
  contractInfo: {
    type: "Full-time",
    startDate: "2020-03-15",
    endDate: null,
    noticePeriod: "1 month"
  },
  visaInfo: {
    type: "Work Visa",
    number: "WV123456789",
    issueDate: "2020-02-01",
    expiryDate: "2025-01-31",
    cecNumber: "CEC987654321"
  },
  medicalInsurance: {
    provider: "GlobalHealth Inc.",
    policyNumber: "GHI123456",
    coverageType: "Family",
    expiryDate: "2023-12-31"
  },
  leaveInfo: {
    annualLeaveBalance: 15,
    homeCountry: "United States",
    leaveTicketEligible: true,
    nextEligibleDate: "2023-09-01",
    annualLeaveHistory: [
      { startDate: "2022-07-01", endDate: "2022-07-10", days: 10 },
      { startDate: "2021-12-20", endDate: "2021-12-31", days: 12 }
    ]
  },
  familyMembers: [
    {
      name: "Carol Johnson",
      relationship: "Spouse",
      medicalInsurance: true,
      homeFlightAllowance: true,
      visa: true,
      eid: true
    },
    {
      name: "David Johnson",
      relationship: "Child",
      medicalInsurance: true,
      homeFlightAllowance: true,
      visa: true,
      eid: true
    }
  ]
}

export default function EmployeeDetailsPage({ params }: { params: { id: string } }) {
  const employee = employeeData; // In a real app, you'd fetch the employee data based on the ID

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Employee Details</h1>
          <div className="space-x-4">
            <Link href="/employees">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to List
              </Button>
            </Link>
            <Link href={`/employees/${params.id}/edit`}>
              <Button>
                <Edit className="mr-2 h-4 w-4" />
                Edit Employee
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList>
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="employment">Employment</TabsTrigger>
            <TabsTrigger value="contract">Contract</TabsTrigger>
            <TabsTrigger value="visa">Visa</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
          </TabsList>
          <TabsContent value="personal" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div><strong>Name:</strong> {employee.name}</div>
                  <div><strong>Email:</strong> {employee.email}</div>
                  <div><strong>Phone:</strong> {employee.phone}</div>
                  <div><strong>Address:</strong> {employee.address}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div><strong>Name:</strong> {employee.emergencyContact.name}</div>
                  <div><strong>Relationship:</strong> {employee.emergencyContact.relationship}</div>
                  <div><strong>Phone:</strong> {employee.emergencyContact.phone}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Family Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {employee.familyMembers.map((member, index) => (
                      <li key={index}>
                        {member.name} ({member.relationship}) - 
                        Medical Insurance: {member.medicalInsurance ? 'Yes' : 'No'}, 
                        Home Flight Allowance: {member.homeFlightAllowance ? 'Yes' : 'No'}, 
                        Visa: {member.visa ? 'Yes' : 'No'}, 
                        EID: {member.eid ? 'Yes' : 'No'}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="employment" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Employment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div><strong>Department:</strong> {employee.department}</div>
                  <div><strong>Position:</strong> {employee.position}</div>
                  <div>
                    <strong>Status:</strong>{' '}
                    <Badge>{employee.status}</Badge>
                  </div>
                  <div><strong>Hire Date:</strong> {employee.hireDate}</div>
                  <div><strong>Manager:</strong> {employee.manager}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Skills and Qualifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Skills:</h3>
                    <div className="flex flex-wrap gap-2">
                      {employee.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Education:</h3>
                    <ul className="list-disc pl-5">
                      {employee.education.map((edu, index) => (
                        <li key={index}>
                          {edu.degree} - {edu.institution}, {edu.year}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Certifications:</h3>
                    <ul className="list-disc pl-5">
                      {employee.certifications.map((cert, index) => (
                        <li key={index}>{cert}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="contract" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Contract Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div><strong>Contract Type:</strong> {employee.contractInfo.type}</div>
                <div><strong>Start Date:</strong> {employee.contractInfo.startDate}</div>
                <div><strong>End Date:</strong> {employee.contractInfo.endDate || 'Ongoing'}</div>
                <div><strong>Salary:</strong> {employee.salary}</div>
                <div><strong>Notice Period:</strong> {employee.contractInfo.noticePeriod}</div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="visa" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Visa Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div><strong>Visa Type:</strong> {employee.visaInfo.type}</div>
                <div><strong>Visa Number:</strong> {employee.visaInfo.number}</div>
                <div><strong>Issue Date:</strong> {employee.visaInfo.issueDate}</div>
                <div><strong>Expiry Date:</strong> {employee.visaInfo.expiryDate}</div>
                <div><strong>CEC Number:</strong> {employee.visaInfo.cecNumber}</div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="benefits" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Medical Insurance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div><strong>Provider:</strong> {employee.medicalInsurance.provider}</div>
                  <div><strong>Policy Number:</strong> {employee.medicalInsurance.policyNumber}</div>
                  <div><strong>Coverage Type:</strong> {employee.medicalInsurance.coverageType}</div>
                  <div><strong>Expiry Date:</strong> {employee.medicalInsurance.expiryDate}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Leave and Travel</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div><strong>Annual Leave Balance:</strong> {employee.leaveInfo.annualLeaveBalance} days</div>
                  <div><strong>Home Country:</strong> {employee.leaveInfo.homeCountry}</div>
                  <div><strong>Leave Ticket Eligibility:</strong> {employee.leaveInfo.leaveTicketEligible ? 'Yes' : 'No'}</div>
                  <div><strong>Next Eligible Date:</strong> {employee.leaveInfo.nextEligibleDate}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Annual Leave History</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {employee.leaveInfo.annualLeaveHistory.map((leave, index) => (
                      <li key={index}>
                        {leave.startDate} to {leave.endDate} ({leave.days} days)
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

