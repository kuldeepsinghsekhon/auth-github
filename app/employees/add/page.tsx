"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonalInformation } from '@/components/employee/PersonalInformation'
import { ContractInformation } from '@/components/employee/ContractInformation'
import { VisaAndDocuments } from '@/components/employee/VisaAndDocuments'
import { FamilyAndEmergency } from '@/components/employee/FamilyAndEmergency'
import { EmployeePayroll } from '@/components/employee/EmployeePayroll'
import { AddressBook } from '@/components/employee/AddressBook'
import { QualificationsTraining } from '@/components/employee/QualificationsTraining'
import { LeaveManagement } from '@/components/employee/LeaveManagement'
import { BusinessTravel } from '@/components/employee/BusinessTravel'
import { AssetManagement } from '@/components/employee/AssetManagement'
import { PlusCircle } from 'lucide-react'

export default function AddEmployeePage() {
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted')
    router.push('/employees')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Add New Employee</h1>
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 mb-4">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="contract">Contract</TabsTrigger>
              <TabsTrigger value="visa">Visa & Documents</TabsTrigger>
              <TabsTrigger value="family">Family & Emergency</TabsTrigger>
              <TabsTrigger value="payroll">Payroll</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
              <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
              <TabsTrigger value="leave">Leave</TabsTrigger>
              <TabsTrigger value="travel">Travel</TabsTrigger>
              <TabsTrigger value="assets">Assets</TabsTrigger>
            </TabsList>
            <TabsContent value="personal">
              <PersonalInformation />
            </TabsContent>
            <TabsContent value="contract">
              <ContractInformation />
            </TabsContent>
            <TabsContent value="visa">
              <VisaAndDocuments />
            </TabsContent>
            <TabsContent value="family">
              <FamilyAndEmergency />
            </TabsContent>
            <TabsContent value="payroll">
              <EmployeePayroll />
            </TabsContent>
            <TabsContent value="address">
              <AddressBook />
            </TabsContent>
            <TabsContent value="qualifications">
              <QualificationsTraining />
            </TabsContent>
            <TabsContent value="leave">
              <LeaveManagement />
            </TabsContent>
            <TabsContent value="travel">
              <BusinessTravel />
            </TabsContent>
            <TabsContent value="assets">
              <AssetManagement />
            </TabsContent>
          </Tabs>
          <div className="mt-6">
            <Button type="submit" className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}

