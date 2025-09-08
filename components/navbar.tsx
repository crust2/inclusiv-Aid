"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe } from "lucide-react"

interface NavbarProps {
  currentLanguage: string
  onLanguageChange: (language: string) => void
}

export default function Navbar({ currentLanguage, onLanguageChange }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">IA</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">InclusivAid</h1>
        </div>

        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-gray-500" />
          <Select value={currentLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिंदी</SelectItem>
              <SelectItem value="ta">தமிழ்</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </nav>
  )
}
