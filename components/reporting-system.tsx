"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Send, ChevronDown, CheckCircle } from "lucide-react"

interface ReportData {
  institutionName: string
  problemType: string
  details: string
  name: string
  email: string
  phone: string
}

export default function ReportingSystem() {
  const [reportData, setReportData] = useState<ReportData>({
    institutionName: "",
    problemType: "",
    details: "",
    name: "",
    email: "",
    phone: "",
  })
  const [showContactDetails, setShowContactDetails] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reportData.institutionName || !reportData.problemType || !reportData.details) {
      alert("Please fill in all required fields.")
      return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="text-center">
          <CardContent className="py-12">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-6">Your report has been submitted successfully.</p>
            <Button
              onClick={() => {
                setSubmitted(false)
                setReportData({
                  institutionName: "",
                  problemType: "",
                  details: "",
                  name: "",
                  email: "",
                  phone: "",
                })
              }}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Submit Another Report
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Reporting System</h2>
        <p className="text-gray-600">Report issues anonymously or with contact details</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submit a Report</CardTitle>
          <CardDescription>
            Help us improve by reporting issues you've encountered. Your identity is optional.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="institution">Institution Name *</Label>
              <Input
                id="institution"
                value={reportData.institutionName}
                onChange={(e) => setReportData({ ...reportData, institutionName: e.target.value })}
                placeholder="Enter institution name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="problem-type">Type of Problem *</Label>
              <Select
                value={reportData.problemType}
                onValueChange={(value) => setReportData({ ...reportData, problemType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select problem type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discrimination">Discrimination</SelectItem>
                  <SelectItem value="bullying">Bullying</SelectItem>
                  <SelectItem value="harassment">Harassment</SelectItem>
                  <SelectItem value="financial">Financial Issues</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">Report Details *</Label>
              <Textarea
                id="details"
                value={reportData.details}
                onChange={(e) => setReportData({ ...reportData, details: e.target.value })}
                placeholder="Please describe the issue in detail..."
                className="min-h-[120px]"
                required
              />
            </div>

            <Collapsible open={showContactDetails} onOpenChange={setShowContactDetails}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" type="button" className="w-full justify-between bg-transparent">
                  Provide Contact Details (Optional)
                  <ChevronDown className={`w-4 h-4 transition-transform ${showContactDetails ? "rotate-180" : ""}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={reportData.name}
                    onChange={(e) => setReportData({ ...reportData, name: e.target.value })}
                    placeholder="Your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={reportData.email}
                    onChange={(e) => setReportData({ ...reportData, email: e.target.value })}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={reportData.phone}
                    onChange={(e) => setReportData({ ...reportData, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
              <Send className="w-4 h-4 mr-2" />
              Submit Report
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
