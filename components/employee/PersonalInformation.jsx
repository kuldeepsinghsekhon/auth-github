

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload } from 'lucide-react'

export function PersonalInformation({ employee }) {
  

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4">

          <div>
            <Input
              id="employeeImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <Label htmlFor="employeeImage" className="cursor-pointer">
              <Button type="button" variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </Button>
            </Label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="alternateId">Alternate ID</Label>
            <Input id="alternateId" defaultValue={employee?.alternateId || ''} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="salutation">Salutation</Label>
            <Select defaultValue={employee?.salutation || ''}>
              <SelectTrigger id="salutation">
                <SelectValue placeholder="Select salutation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mr">Mr</SelectItem>
                <SelectItem value="Mrs">Mrs</SelectItem>
                <SelectItem value="Ms">Ms</SelectItem>
                <SelectItem value="Dr">Dr</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input id="firstName" defaultValue={employee?.firstName || ''} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="middleName">Middle Name</Label>
            <Input id="middleName" defaultValue={employee?.middleName || ''} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input id="lastName" defaultValue={employee?.lastName || ''} required />
          </div>
          <div className="space-y-2">
            <Label>Gender *</Label>
            <RadioGroup defaultValue={employee?.gender || ''} required>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth *</Label>
            <Input id="dateOfBirth" type="date" defaultValue={employee?.dateOfBirth || ''} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maritalStatus">Marital Status *</Label>
            <Select defaultValue={employee?.maritalStatus || ''} required>
              <SelectTrigger id="maritalStatus">
                <SelectValue placeholder="Select marital status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married">Married</SelectItem>
                <SelectItem value="divorced">Divorced</SelectItem>
                <SelectItem value="widowed">Widowed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="religion">Religion</Label>
            <Input id="religion" defaultValue={employee?.religion || ''} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="spouse">Spouse</Label>
            <Input id="spouse" defaultValue={employee?.spouse || ''} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mothersName">Mother's Name</Label>
            <Input id="mothersName" defaultValue={employee?.mothersName || ''} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fathersName">Father's Name</Label>
            <Input id="fathersName" defaultValue={employee?.fathersName || ''} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select defaultValue={employee?.status || ''}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="onLeave">On Leave</SelectItem>
                <SelectItem value="terminated">Terminated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" defaultValue={employee?.email || ''} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input id="phone" type="tel" defaultValue={employee?.phone || ''} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea id="address" defaultValue={employee?.address || ''} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nationality">Nationality</Label>
          <Input id="nationality" defaultValue={employee?.nationality || ''} />
        </div>
      </CardContent>
    </Card>
  )
}

