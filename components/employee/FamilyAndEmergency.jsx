import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { PlusCircle, MinusCircle } from 'lucide-react'

export function FamilyAndEmergency({ employee }) {
  const [familyMembers, setFamilyMembers] = useState(employee?.familyMembers || [{ name: '', relationship: '', medicalInsurance: false, homeFlightAllowance: false, visa: false, eid: false }])

  const addFamilyMember = () => {
    setFamilyMembers([...familyMembers, { name: '', relationship: '', medicalInsurance: false, homeFlightAllowance: false, visa: false, eid: false }])
  }

  const removeFamilyMember = (index) => {
    const newFamilyMembers = [...familyMembers]
    newFamilyMembers.splice(index, 1)
    setFamilyMembers(newFamilyMembers)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Family and Emergency Contact</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
          <Input id="emergencyContactName" defaultValue={employee?.emergencyContactName || ''} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="emergencyContactRelationship">Emergency Contact Relationship</Label>
          <Input id="emergencyContactRelationship" defaultValue={employee?.emergencyContactRelationship || ''} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
          <Input id="emergencyContactPhone" type="tel" defaultValue={employee?.emergencyContactPhone || ''} required />
        </div>
        <div className="space-y-2">
          <Label>Family Members</Label>
          {familyMembers.map((member, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-md">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Family Member {index + 1}</h3>
                <Button type="button" variant="ghost" onClick={() => removeFamilyMember(index)}>
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`familyMemberName${index}`}>Name</Label>
                <Input id={`familyMemberName${index}`} defaultValue={member.name} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`familyMemberRelationship${index}`}>Relationship</Label>
                <Input id={`familyMemberRelationship${index}`} defaultValue={member.relationship} required />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id={`familyMemberMedicalInsurance${index}`} defaultChecked={member.medicalInsurance} />
                <Label htmlFor={`familyMemberMedicalInsurance${index}`}>Medical Insurance</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id={`familyMemberHomeFlightAllowance${index}`} defaultChecked={member.homeFlightAllowance} />
                <Label htmlFor={`familyMemberHomeFlightAllowance${index}`}>Home Flight Allowance</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id={`familyMemberVisa${index}`} defaultChecked={member.visa} />
                <Label htmlFor={`familyMemberVisa${index}`}>Visa</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id={`familyMemberEID${index}`} defaultChecked={member.eid} />
                <Label htmlFor={`familyMemberEID${index}`}>EID</Label>
              </div>
            </div>
          ))}
          <Button type="button" onClick={addFamilyMember} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Family Member
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

