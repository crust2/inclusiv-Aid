"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe } from "lucide-react"
import Image from "next/image"
import { languageNames } from "@/lib/translations"

interface NavbarProps {
  currentLanguage: string
  onLanguageChange: (language: string) => void
}

export default function Navbar({ currentLanguage, onLanguageChange }: NavbarProps) {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 relative">
            <Image
              src="/images/inclusivaid-logo.png"
              alt="InclusivAid Logo"
              width={40}
              height={40}
              className="rounded-lg object-contain"
            />
          </div>
          <h1 className="text-xl font-bold text-gray-900">InclusivAid</h1>
        </div>

        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-gray-500" />
          <Select value={currentLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-y-auto">
              {Object.entries(languageNames).map(([code, name]) => (
                <SelectItem key={code} value={code}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </nav>
  )
}
