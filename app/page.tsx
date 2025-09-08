"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import FinancialAidFinder from "@/components/financial-aid-finder"
import ReportingSystem from "@/components/reporting-system"
import AccessMap from "@/components/access-map"
import { DollarSign, FileText, Map, ArrowRight, Heart, Users, Shield } from "lucide-react"
import Image from "next/image"
import { translations } from "@/lib/translations"

type ActiveSection = "home" | "financial-aid" | "reporting" | "access-map"

export default function Home() {
  const [activeSection, setActiveSection] = useState<ActiveSection>("home")
  const [language, setLanguage] = useState("en")

  const t = translations[language as keyof typeof translations] || translations.en

  if (activeSection === "financial-aid") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar currentLanguage={language} onLanguageChange={setLanguage} />
        <div className="py-6">
          <Button variant="outline" onClick={() => setActiveSection("home")} className="ml-6 mb-4">
            {t.backToHome}
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
            {t.backToHome}
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
            {t.backToHome}
          </Button>
          <AccessMap />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar currentLanguage={language} onLanguageChange={setLanguage} />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20 text-center relative z-10">
          <div className="w-24 h-24 mx-auto mb-6 relative">
            <Image
              src="/images/inclusivaid-logo.png"
              alt="InclusivAid Logo"
              width={96}
              height={96}
              className="rounded-2xl object-contain bg-white/10 p-2 backdrop-blur-sm"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance text-white">{t.title}</h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 text-pretty max-w-3xl mx-auto">{t.subtitle}</p>

          <div className="flex flex-wrap justify-center gap-6 mt-12 text-blue-100">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              <span>{t.inclusive}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>{t.accessible}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>{t.empowering}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.ourServices}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.servicesDescription}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Financial Aid Finder */}
          <Card
            className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border-0 shadow-lg bg-gradient-to-br from-white to-indigo-50"
            onClick={() => setActiveSection("financial-aid")}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <DollarSign className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl mb-3 text-gray-900">{t.financialAid.title}</CardTitle>
              <CardDescription className="text-pretty text-gray-600 leading-relaxed">
                {t.financialAid.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                {t.getStarted}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </CardContent>
          </Card>

          {/* Reporting System */}
          <Card
            className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border-0 shadow-lg bg-gradient-to-br from-white to-red-50"
            onClick={() => setActiveSection("reporting")}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl mb-3 text-gray-900">{t.reporting.title}</CardTitle>
              <CardDescription className="text-pretty text-gray-600 leading-relaxed">
                {t.reporting.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                {t.getStarted}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </CardContent>
          </Card>

          {/* AccessMap */}
          <Card
            className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border-0 shadow-lg bg-gradient-to-br from-white to-green-50"
            onClick={() => setActiveSection("access-map")}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Map className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl mb-3 text-gray-900">{t.accessMap.title}</CardTitle>
              <CardDescription className="text-pretty text-gray-600 leading-relaxed">
                {t.accessMap.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                {t.getStarted}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="w-16 h-16 mx-auto mb-4 relative">
            <Image
              src="/images/inclusivaid-logo.png"
              alt="InclusivAid Logo"
              width={64}
              height={64}
              className="rounded-xl object-contain bg-white/10 p-2"
            />
          </div>
          <h3 className="text-2xl font-bold mb-2">{t.title}</h3>
          <p className="text-gray-400 mb-6">{t.footerText}</p>
          <div className="flex justify-center gap-8 text-sm text-gray-400">
            <span>{t.copyright}</span>
            <span>•</span>
            <span>{t.empoweringEducation}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
