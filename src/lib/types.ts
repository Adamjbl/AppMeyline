export type TradeId =
  | 'maconnerie'
  | 'charpente'
  | 'plomberie'
  | 'electricite'
  | 'platrerie'
  | 'carrelage'
  | 'peinture'
  | 'depannage'

export interface Trade {
  id: TradeId
  name: string
  urgent?: boolean
}

export interface Review {
  author: string
  rating: number
  verified: boolean
  comment: string
}

export interface Artisan {
  id: string
  name: string
  company: string
  tradeId: TradeId
  rating: number
  reviewCount: number
  distanceKm: number
  availableFrom: string
  city: string
  badges: string[]
  bio: string
  checks: string[]
  portfolio: { label: string }[]
  reviews: Review[]
}

export type QuoteStatus = 'pending' | 'accepted' | 'declined'

export interface Quote {
  id: string
  artisanId: string
  projectId?: string
  amount: number | null
  status: QuoteStatus
  createdAt: string
  note: string
}

export type StepStatus = 'todo' | 'in_progress' | 'done'

export interface RenovationStep {
  id: string
  tradeId: TradeId
  name: string
  status: StepStatus
  artisanId?: string
  scheduledDate?: string
}

export type ProjectType = 'complete' | 'partial' | 'extension'

export interface RenovationProject {
  id: string
  type: ProjectType
  name: string
  city: string
  createdAt: string
  steps: RenovationStep[]
  budgetTotal: number | null
}

export type DocumentType = 'devis' | 'assurance' | 'facture' | 'photo'

export interface Doc {
  id: string
  type: DocumentType
  name: string
  artisanId?: string
  date: string
}

export interface Message {
  id: string
  from: 'user' | 'artisan'
  text: string
  at: string
}

export interface Thread {
  id: string
  artisanId: string
  messages: Message[]
}

export interface ArtisanRegistration {
  trades: TradeId[]
  contactName: string
  companyName: string
  siret: string
  city: string
  zone: string
  submittedAt: string
}

export const DOSSIER_DOC_IDS = [
  'kbis',
  'urssaf',
  'decennale',
  'rc_pro',
  'google',
  'reference_pdf',
  'photos',
  'rge',
] as const
export type DossierDocId = (typeof DOSSIER_DOC_IDS)[number]

export type DossierDocStatus = 'missing' | 'uploaded'

export interface ArtisanJobRequest {
  id: string
  clientName: string
  projectName: string
  tradeId: TradeId
  stepIndex: number
  stepsTotal: number
  message: string
  city: string
  distanceKm: number
  desiredStart: string
  duration: string
  building: string
  surface: string
  access: string
  documents: string[]
  nextStepNote: string
  contactedCount: number
  totalContacted: number
  createdAgo: string
  status: 'new' | 'quoted' | 'declined'
}

export interface QuoteLineItem {
  id: string
  label: string
  amount: number
}

export interface ArtisanQuote {
  requestId: string
  lineItems: QuoteLineItem[]
  startDate: string
  durationWeeks: number
  depositPercent: number
  totalTTC: number
  sentAt: string
}

export interface AppState {
  userName: string
  quotes: Quote[]
  projects: RenovationProject[]
  threads: Thread[]
  documents: Doc[]
  artisanRegistration: ArtisanRegistration | null
  artisanDossier: Partial<Record<DossierDocId, DossierDocStatus>>
  artisanRequests: ArtisanJobRequest[]
  artisanQuotes: ArtisanQuote[]
}
