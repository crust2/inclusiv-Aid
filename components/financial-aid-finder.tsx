"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, ExternalLink, Volume2, Bell, CheckCircle } from "lucide-react"

interface FormData {
  income: string
  education: string
  institutionType: string
  state: string
  institutionName: string
}

interface Scheme {
  name: string
  summary: string
  howToApply: string
}

const mockSchemes: Scheme[] = [
  {
    name: "National Scholarship Portal - Merit Scholarship",
    summary: "Merit-based scholarship for students from economically weaker sections pursuing higher education.",
    howToApply:
      "Visit NSP portal, register with Aadhaar, fill application form, upload required documents, and submit before deadline.",
  },
  {
    name: "Post Matric Scholarship for SC/ST Students",
    summary: "Financial assistance for SC/ST students pursuing post-matriculation studies.",
    howToApply:
      "Apply through state scholarship portal, provide caste certificate, income certificate, and academic records.",
  },
]

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
]

export default function FinancialAidFinder() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    income: "",
    education: "",
    institutionType: "",
    state: "",
    institutionName: "",
  })
  const [showResults, setShowResults] = useState(false)
  const [showReminderModal, setShowReminderModal] = useState(false)

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSpeak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "en-IN"
    window.speechSynthesis.speak(utterance)
  }

  const handleSetReminder = () => {
    setShowReminderModal(true)
    setTimeout(() => setShowReminderModal(false), 2000)
  }

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => {
              setShowResults(false)
              setCurrentStep(1)
            }}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Form
          </Button>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Schemes</h2>
          <p className="text-gray-600">Based on your information, here are the schemes you may be eligible for:</p>
        </div>

        {mockSchemes.length > 0 ? (
          <div className="grid gap-6">
            {mockSchemes.map((scheme, index) => (
              <Card key={index} className="card-hover">
                <CardHeader>
                  <CardTitle className="text-lg">{scheme.name}</CardTitle>
                  <CardDescription>{scheme.summary}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">How to Apply:</h4>
                    <p className="text-sm text-gray-600">{scheme.howToApply}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Apply Now
                    </Button>
                    <Button
                      variant="outline"
                      className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
                      onClick={() => handleSpeak(`${scheme.name}. ${scheme.summary}. ${scheme.howToApply}`)}
                    >
                      <Volume2 className="w-4 h-4 mr-2" />
                      Listen
                    </Button>
                    <Button
                      variant="outline"
                      className="text-indigo-600 border-indigo-600 hover:bg-indigo-50 bg-transparent"
                      onClick={handleSetReminder}
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      Set Reminder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-600">No schemes found based on your criteria.</p>
            </CardContent>
          </Card>
        )}

        {showReminderModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <Card className="w-80">
              <CardContent className="text-center py-6">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <p className="font-semibold">Reminder Sent!</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Financial Aid Finder</h2>
        <p className="text-gray-600 mb-4">Find scholarships and financial aid opportunities</p>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Step {currentStep} of {totalSteps}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Family's Annual Income</h3>
              <Select value={formData.income} onValueChange={(value) => setFormData({ ...formData, income: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select income range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="<1L">Less than ₹1 Lakh</SelectItem>
                  <SelectItem value="1-5L">₹1 - ₹5 Lakhs</SelectItem>
                  <SelectItem value="5-10L">₹5 - ₹10 Lakhs</SelectItem>
                  <SelectItem value=">10L">More than ₹10 Lakhs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Education Level</h3>
              <RadioGroup
                value={formData.education}
                onValueChange={(value) => setFormData({ ...formData, education: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high-school" id="high-school" />
                  <Label htmlFor="high-school">High School</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="undergraduate" id="undergraduate" />
                  <Label htmlFor="undergraduate">Undergraduate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="postgraduate" id="postgraduate" />
                  <Label htmlFor="postgraduate">Postgraduate</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Institution Type</h3>
              <Select
                value={formData.institutionType}
                onValueChange={(value) => setFormData({ ...formData, institutionType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select institution type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="state">State</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">State of Residence</h3>
              <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Institution Name</h3>
              <Input
                value={formData.institutionName}
                onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                placeholder="Enter your institution name"
              />
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button onClick={handleNext} className="bg-indigo-600 hover:bg-indigo-700">
              {currentStep === totalSteps ? "Find Schemes" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
