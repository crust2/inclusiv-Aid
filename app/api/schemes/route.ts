import { type NextRequest, NextResponse } from "next/server"

interface SchemeRequest {
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
  eligibility: string
  amount: string
  deadline: string
}

// Enhanced scheme database with location-specific schemes
const schemeDatabase: Record<string, Scheme[]> = {
  "Tamil Nadu": [
    {
      name: "Tamil Nadu Dr. J. Jayalalithaa Complete Education Scheme",
      summary: "Free education for girl students from Class I to PhD in Tamil Nadu government institutions.",
      howToApply:
        "Apply through Tamil Nadu e-Sevai portal with required documents including income certificate and community certificate.",
      eligibility: "Girl students, Tamil Nadu domicile, family income below ₹2.5 lakhs",
      amount: "Full fee waiver + ₹1000/month",
      deadline: "July 31st annually",
    },
    {
      name: "Tamil Nadu Backward Classes Scholarship",
      summary: "Financial assistance for BC/MBC students pursuing higher education in Tamil Nadu.",
      howToApply: "Submit application through college with BC/MBC certificate and income proof.",
      eligibility: "BC/MBC students, family income below ₹2 lakhs",
      amount: "₹1200-₹2400 per year",
      deadline: "September 30th",
    },
    {
      name: "Chief Minister's Comprehensive Health Insurance Scheme",
      summary: "Medical insurance coverage for students and their families in Tamil Nadu.",
      howToApply: "Register at government hospitals or through online portal with Aadhaar and ration card.",
      eligibility: "Tamil Nadu residents, annual income below ₹72,000",
      amount: "₹5 lakh coverage per family",
      deadline: "Open throughout the year",
    },
  ],
  Karnataka: [
    {
      name: "Karnataka Vidyasiri Scholarship",
      summary: "Merit-cum-means scholarship for students from economically weaker sections in Karnataka.",
      howToApply: "Apply through Siri Kannada portal with academic records and income certificate.",
      eligibility: "Karnataka domicile, family income below ₹2.5 lakhs, minimum 60% marks",
      amount: "₹3000-₹5000 per year",
      deadline: "October 15th",
    },
    {
      name: "Post Matric Scholarship for SC/ST - Karnataka",
      summary: "Financial support for SC/ST students pursuing post-matriculation studies in Karnataka.",
      howToApply: "Submit application through Karnataka Backward Classes Welfare Department portal.",
      eligibility: "SC/ST students, Karnataka resident, family income below ₹2.5 lakhs",
      amount: "Tuition fees + ₹380-₹570/month maintenance",
      deadline: "November 30th",
    },
  ],
  Maharashtra: [
    {
      name: "Maharashtra State Scholarship",
      summary: "Merit-based scholarship for students from Maharashtra pursuing higher education.",
      howToApply: "Apply through Mahadbt portal with domicile certificate and academic transcripts.",
      eligibility: "Maharashtra domicile, minimum 60% marks, family income below ₹8 lakhs",
      amount: "₹5000-₹8000 per year",
      deadline: "December 31st",
    },
    {
      name: "Dr. Babasaheb Ambedkar Research and Training Institute Scholarship",
      summary: "Research scholarships for SC students pursuing PhD in Maharashtra universities.",
      howToApply: "Submit research proposal through university with SC certificate and income proof.",
      eligibility: "SC category, enrolled in PhD program, Maharashtra university",
      amount: "₹25,000 per month + contingency",
      deadline: "March 31st",
    },
  ],
  Kerala: [
    {
      name: "Kerala State Scholarship for Higher Education",
      summary: "Financial assistance for meritorious students from Kerala pursuing higher education.",
      howToApply: "Apply through Kerala State Higher Education Council portal with required documents.",
      eligibility: "Kerala domicile, minimum 80% in qualifying exam, family income below ₹4.5 lakhs",
      amount: "₹2000-₹12000 per year",
      deadline: "August 31st",
    },
    {
      name: "Minority Scholarship Scheme - Kerala",
      summary: "Educational support for minority community students in Kerala.",
      howToApply: "Submit application through Minority Development Department with community certificate.",
      eligibility: "Minority community, Kerala resident, family income below ₹2.5 lakhs",
      amount: "₹1000-₹5700 per year",
      deadline: "September 15th",
    },
  ],
}

// National schemes available across all states
const nationalSchemes: Scheme[] = [
  {
    name: "National Scholarship Portal - Central Sector Scheme",
    summary: "Merit-based scholarship for students from economically weaker sections across India.",
    howToApply: "Register on NSP portal, fill application form, upload documents, and submit before deadline.",
    eligibility: "Family income below ₹4.5 lakhs, minimum 80% in Class XII",
    amount: "₹10000-₹20000 per year",
    deadline: "October 31st annually",
  },
  {
    name: "Prime Minister's Scholarship Scheme",
    summary: "Scholarships for wards of Armed Forces personnel, Central Armed Police Forces, and Railway employees.",
    howToApply: "Apply through respective service portals with service certificate and academic records.",
    eligibility: "Dependent of serving/ex-servicemen, minimum 60% marks",
    amount: "₹2000-₹3000 per month",
    deadline: "July 15th",
  },
  {
    name: "INSPIRE Scholarship",
    summary: "Scholarship for students pursuing natural and basic sciences at undergraduate and postgraduate levels.",
    howToApply: "Apply through INSPIRE portal with science stream academic records.",
    eligibility: "Science stream students, top 1% in Class XII board exams",
    amount: "₹80000 per year + research exposure",
    deadline: "September 30th",
  },
  {
    name: "Begum Hazrat Mahal National Scholarship",
    summary: "Scholarship for minority girl students pursuing technical and professional courses.",
    howToApply: "Submit application through Maulana Azad Education Foundation portal.",
    eligibility: "Minority girl students, family income below ₹2 lakhs, technical/professional courses",
    amount: "₹5000-₹12000 per year",
    deadline: "December 31st",
  },
]

function getRelevantSchemes(formData: SchemeRequest): Scheme[] {
  const stateSchemes = schemeDatabase[formData.state] || []
  const relevantSchemes = [...nationalSchemes, ...stateSchemes]

  // Filter schemes based on form data
  return relevantSchemes.filter((scheme) => {
    // Filter by income level
    if (formData.income === "<1L" || formData.income === "1-5L") {
      return true // Most schemes are for lower income groups
    }
    if (formData.income === "5-10L") {
      return scheme.eligibility.includes("8 lakh") || scheme.eligibility.includes("4.5 lakh")
    }
    return false // Very few schemes for >10L income
  })
}

export async function POST(request: NextRequest) {
  try {
    const formData: SchemeRequest = await request.json()

    console.log("[v0] Received scheme request:", formData)

    // Get relevant schemes based on location and profile
    const schemes = getRelevantSchemes(formData)

    console.log("[v0] Found schemes:", schemes.length)

    return NextResponse.json({
      schemes,
      message: `Found ${schemes.length} schemes for ${formData.state}`,
    })
  } catch (error) {
    console.error("[v0] Error fetching schemes:", error)
    return NextResponse.json({ error: "Failed to fetch schemes" }, { status: 500 })
  }
}
