"use client"

import { useState, useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore"
import { signOut } from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import AdminAuth from "@/components/admin-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LogOut, FileText, Clock, CheckCircle, AlertTriangle } from "lucide-react"

interface Report {
  id: string
  institutionName: string
  problemType: string
  details: string
  name?: string
  email?: string
  phone?: string
  timestamp: any
  status: "pending" | "reviewed" | "resolved"
}

export default function AdminPage() {
  const [user, loading] = useAuthState(auth)
  const [reports, setReports] = useState<Report[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true)

      // Listen to reports collection
      const q = query(collection(db, "reports"), orderBy("timestamp", "desc"))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const reportsData: Report[] = []
        querySnapshot.forEach((doc) => {
          reportsData.push({ id: doc.id, ...doc.data() } as Report)
        })
        setReports(reportsData)
      })

      return () => unsubscribe()
    }
  }, [user])

  const handleStatusUpdate = async (reportId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "reports", reportId), {
        status: newStatus,
      })
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    setIsAuthenticated(false)
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!isAuthenticated) {
    return <AdminAuth onAuthSuccess={() => setIsAuthenticated(true)} />
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "reviewed":
        return <AlertTriangle className="w-4 h-4" />
      case "resolved":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "reviewed":
        return "bg-blue-100 text-blue-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage submitted reports</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {reports.filter((r) => r.status === "pending").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <AlertTriangle className="w-8 h-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Reviewed</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {reports.filter((r) => r.status === "reviewed").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Resolved</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {reports.filter((r) => r.status === "resolved").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{report.institutionName}</CardTitle>
                    <CardDescription>{report.timestamp?.toDate?.()?.toLocaleDateString() || "No date"}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(report.status)}>
                      {getStatusIcon(report.status)}
                      <span className="ml-1 capitalize">{report.status}</span>
                    </Badge>
                    <Select value={report.status} onValueChange={(value) => handleStatusUpdate(report.id, value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Problem Type</p>
                    <p className="text-gray-900 capitalize">{report.problemType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Details</p>
                    <p className="text-gray-900">{report.details}</p>
                  </div>
                  {(report.name || report.email || report.phone) && (
                    <div>
                      <p className="text-sm font-medium text-gray-600">Contact Information</p>
                      <div className="text-gray-900">
                        {report.name && <p>Name: {report.name}</p>}
                        {report.email && <p>Email: {report.email}</p>}
                        {report.phone && <p>Phone: {report.phone}</p>}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          {reports.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No reports submitted yet.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
