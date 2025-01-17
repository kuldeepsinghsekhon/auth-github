'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PlusCircle, MinusCircle } from 'lucide-react'
import { useState } from 'react'

export function EmployeePayroll() {
  const [allowances, setAllowances] = useState([{ name: '', amount: 0 }])
  const [deductions, setDeductions] = useState([{ name: '', amount: 0 }])

  const addAllowance = () => {
    setAllowances([...allowances, { name: '', amount: 0 }])
  }

  const removeAllowance = (index: number) => {
    const newAllowances = [...allowances]
    newAllowances.splice(index, 1)
    setAllowances(newAllowances)
  }

  const addDeduction = () => {
    setDeductions([...deductions, { name: '', amount: 0 }])
  }

  const removeDeduction = (index: number) => {
    const newDeductions = [...deductions]
    newDeductions.splice(index, 1)
    setDeductions(newDeductions)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employee Payroll</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="basicSalary">Basic Salary</Label>
          <Input id="basicSalary" type="number" required />
        </div>
        
        <div className="space-y-2">
          <Label>Allowances</Label>
          {allowances.map((allowance, index) => (
            <div key={index} className="space-y-2 p-4 border rounded-md">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Allowance {index + 1}</h3>
                <Button type="button" variant="ghost" onClick={() => removeAllowance(index)}>
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`allowanceName${index}`}>Name</Label>
                <Input id={`allowanceName${index}`} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`allowanceAmount${index}`}>Amount</Label>
                <Input id={`allowanceAmount${index}`} type="number" required />
              </div>
            </div>
          ))}
          <Button type="button" onClick={addAllowance} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Allowance
          </Button>
        </div>
        
        <div className="space-y-2">
          <Label>Deductions</Label>
          {deductions.map((deduction, index) => (
            <div key={index} className="space-y-2 p-4 border rounded-md">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Deduction {index + 1}</h3>
                <Button type="button" variant="ghost" onClick={() => removeDeduction(index)}>
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`deductionName${index}`}>Name</Label>
                <Input id={`deductionName${index}`} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`deductionAmount${index}`}>Amount</Label>
                <Input id={`deductionAmount${index}`} type="number" required />
              </div>
            </div>
          ))}
          <Button type="button" onClick={addDeduction} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Deduction
          </Button>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="overtimeRate">Overtime Rate (per hour)</Label>
          <Input id="overtimeRate" type="number" required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bankName">Bank Name</Label>
          <Input id="bankName" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="accountNumber">Account Number</Label>
          <Input id="accountNumber" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ibanNumber">IBAN Number</Label>
          <Input id="ibanNumber" required />
        </div>
      </CardContent>
    </Card>
  )
}

