"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import FinancialAidFinder from "@/components/financial-aid-finder"
import ReportingSystem from "@/components/reporting-system"
import AccessMap from "@/components/access-map"
import { DollarSign, FileText, Map, ArrowRight } from "lucide-react"

type ActiveSection = "home" | "financial-aid" | "reporting" | "access-map"

export default function Home() {
  const [activeSection, setActiveSection] = useState<ActiveSection>("home")
  const [language, setLanguage] = useState("en")

  const translations = {
    en: {
      title: "InclusivAid",
      subtitle: "Empowering Inclusive Education",
      financialAid: {
        title: "Financial Aid Finder",
        description: "Discover scholarships and financial assistance programs tailored to your needs",
      },
      reporting: {
        title: "Reporting System",
        description: "Report issues anonymously to help improve educational environments",
      },
      accessMap: {
        title: "AccessMap",
        description: "Find and share accessibility information about educational institutions",
      },
      getStarted: "Get Started",
    },
    hi: {
      title: "समावेशी सहायता",
      subtitle: "समावेशी शिक्षा को सशक्त बनाना",
      financialAid: {
        title: "वित्तीय सहायता खोजक",
        description: "आपकी आवश्यकताओं के अनुकूल छात्रवृत्ति और वित्तीय सहायता कार्यक्रम खोजें",
      },
      reporting: {
        title: "रिपोर्टिंग सिस्टम",
        description: "शैक्षणिक वातावरण में सुधार के लिए गुमनाम रूप से समस्याओं की रिपोर्ट करें",
      },
      accessMap: {
        title: "पहुंच मानचित्र",
        description: "शैक्षणिक संस्थानों के बारे में पहुंच की जानकारी खोजें और साझा करें",
      },
      getStarted: "शुरू करें",
    },
    ta: {
      title: "உள்ளடக்க உதவி",
      subtitle: "உள்ளடக்கிய கல்வியை வலுப்படுத்துதல்",
      financialAid: {
        title: "நிதி உதவி கண்டுபிடிப்பாளர்",
        description: "உங்கள் தேவைகளுக்கு ஏற்ற உதவித்தொகை மற்றும் நிதி உதவி திட்டங்களைக் கண்டறியுங்கள்",
      },
      reporting: {
        title: "அறிக்கை அமைப்பு",
        description: "கல்வி சூழலை மேம்படுத்த உதவ பிரச்சினைகளை அநாமதேயமாக அறிக்கை செய்யுங்கள்",
      },
      accessMap: {
        title: "அணுகல் வரைபடம",
        description: "கல்வி நிறுவனங்களைப் பற்றிய அணுகல் தகவலைக் கண்டறிந்து பகிருங்கள்",
      },
      getStarted: "தொடங்குங்கள்",
    },
  }

  const t = translations[language as keyof typeof translations]

  if (activeSection === "financial-aid") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar currentLanguage={language} onLanguageChange={setLanguage} />
        <div className="py-6">
          <Button variant="outline" onClick={() => setActiveSection("home")} className="ml-6 mb-4">
            ← Back to Home
          </Button>
          <FinancialAidFinder />
        </div>
      </div>
    )
  }

  if (activeSection === "reporting") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar currentLanguage={language} onLanguageChange={setLanguage} />
        <div className="py-6">
          <Button variant="outline" onClick={() => setActiveSection("home")} className="ml-6 mb-4">
            ← Back to Home
          </Button>
          <ReportingSystem />
        </div>
      </div>
    )
  }

  if (activeSection === "access-map") {
    return (
      <div className="min-h-screen">
        <Navbar currentLanguage={language} onLanguageChange={setLanguage} />
        <div className="h-[calc(100vh-64px)]">
          <Button
            variant="outline"
            onClick={() => setActiveSection("home")}
            className="absolute top-20 left-6 z-[1001] bg-white"
          >
            ← Back to Home
          </Button>
          <AccessMap />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentLanguage={language} onLanguageChange={setLanguage} />

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 text-balance">{t.title}</h1>
          <p className="text-xl text-gray-600 mb-8 text-pretty">{t.subtitle}</p>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Financial Aid Finder */}
          <Card className="card-hover cursor-pointer" onClick={() => setActiveSection("financial-aid")}>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-indigo-600" />
              </div>
              <CardTitle className="text-xl mb-2">{t.financialAid.title}</CardTitle>
              <CardDescription className="text-pretty">{t.financialAid.description}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                {t.getStarted}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Reporting System */}
          <Card className="card-hover cursor-pointer" onClick={() => setActiveSection("reporting")}>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-xl mb-2">{t.reporting.title}</CardTitle>
              <CardDescription className="text-pretty">{t.reporting.description}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                {t.getStarted}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* AccessMap */}
          <Card className="card-hover cursor-pointer" onClick={() => setActiveSection("access-map")}>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Map className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-xl mb-2">{t.accessMap.title}</CardTitle>
              <CardDescription className="text-pretty">{t.accessMap.description}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                {t.getStarted}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
