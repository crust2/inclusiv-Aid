import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
}

const requiredKeys = ["apiKey", "authDomain", "projectId", "appId"]
const missingKeys = requiredKeys.filter((key) => !firebaseConfig[key as keyof typeof firebaseConfig])

let app = null
let auth = null
let db = null

if (missingKeys.length > 0) {
  console.warn("[v0] Firebase configuration incomplete. Admin features will be disabled.")
  console.warn("[v0] Missing keys:", missingKeys)
  console.warn("[v0] Please add Firebase environment variables in Project Settings")
  console.log("[v0] Environment variables status:")
  console.log("[v0] NEXT_PUBLIC_FIREBASE_API_KEY:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "Set" : "Missing")
  console.log(
    "[v0] NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:",
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? "Set" : "Missing",
  )
  console.log("[v0] NEXT_PUBLIC_FIREBASE_PROJECT_ID:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? "Set" : "Missing")
  console.log(
    "[v0] NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:",
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? "Set" : "Missing",
  )
  console.log(
    "[v0] NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:",
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ? "Set" : "Missing",
  )
  console.log("[v0] NEXT_PUBLIC_FIREBASE_APP_ID:", process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? "Set" : "Missing")
} else {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
    auth = getAuth(app)
    db = getFirestore(app)
    console.log("[v0] Firebase initialized successfully")
    console.log("[v0] Firebase app name:", app.name)
    console.log("[v0] Firebase project ID:", firebaseConfig.projectId)
  } catch (error) {
    console.error("[v0] Firebase initialization error:", error)
  }
}

export { auth, db }
export default app
