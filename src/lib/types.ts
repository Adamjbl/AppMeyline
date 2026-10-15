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
  companyName: string
  siret: string
  city: string
  zone: string
  submittedAt: string
}

export interface AppState {
  userName: string
  quotes: Quote[]
  projects: RenovationProject[]
  threads: Thread[]
  documents: Doc[]
  artisanRegistration: ArtisanRegistration | null
}
