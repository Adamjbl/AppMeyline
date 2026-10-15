import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { DEMO_JOB_REQUEST, RENOVATION_STEP_ORDER } from './mockData'
import type {
  AppState,
  ArtisanQuote,
  ArtisanRegistration,
  Doc,
  DossierDocId,
  ProjectType,
  Quote,
  QuoteLineItem,
  RenovationProject,
  Thread,
} from './types'

const STORAGE_KEY = 'buildflow_state_v1'

const EMPTY_STATE: AppState = {
  userName: 'Camille',
  quotes: [],
  projects: [],
  threads: [],
  documents: [],
  artisanRegistration: null,
  artisanDossier: {},
  artisanRequests: [],
  artisanQuotes: [],
}

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY_STATE
    return { ...EMPTY_STATE, ...JSON.parse(raw) } as AppState
  } catch {
    return EMPTY_STATE
  }
}

function uid(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}

interface StoreApi {
  state: AppState
  requestQuote: (artisanId: string, note: string) => string
  acceptQuote: (quoteId: string, amount: number) => void
  declineQuote: (quoteId: string) => void
  sendMessage: (artisanId: string, text: string, from?: 'user' | 'artisan') => void
  threadFor: (artisanId: string) => Thread | undefined
  createProject: (input: { type: ProjectType; name: string; city: string }) => string
  assignArtisanToStep: (projectId: string, stepId: string, artisanId: string, date: string) => void
  addDocument: (doc: Omit<Doc, 'id' | 'date'>) => void
  registerArtisan: (reg: Omit<ArtisanRegistration, 'submittedAt'>) => void
  toggleDossierDoc: (docId: DossierDocId) => void
  sendArtisanQuote: (
    requestId: string,
    input: { lineItems: QuoteLineItem[]; startDate: string; durationWeeks: number; depositPercent: number }
  ) => void
  declineArtisanRequest: (requestId: string) => void
  resetAll: () => void
}

const StoreContext = createContext<StoreApi | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => loadState())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const api = useMemo<StoreApi>(() => {
    function ensureThread(artisanId: string, draft: AppState): Thread {
      const existing = draft.threads.find((t) => t.artisanId === artisanId)
      if (existing) return existing
      const thread: Thread = { id: uid('thread'), artisanId, messages: [] }
      draft.threads.push(thread)
      return thread
    }

    return {
      state,

      requestQuote(artisanId, note) {
        const id = uid('quote')
        setState((prev) => {
          const next: AppState = structuredClone(prev)
          const quote: Quote = {
            id,
            artisanId,
            amount: null,
            status: 'pending',
            createdAt: new Date().toISOString(),
            note,
          }
          next.quotes.push(quote)
          const thread = ensureThread(artisanId, next)
          thread.messages.push({
            id: uid('msg'),
            from: 'user',
            text: note || 'Bonjour, je souhaiterais recevoir un devis pour mon projet.',
            at: new Date().toISOString(),
          })
          thread.messages.push({
            id: uid('msg'),
            from: 'artisan',
            text: 'Merci pour votre demande ! Je reviens vers vous avec un devis détaillé sous 48h.',
            at: new Date().toISOString(),
          })
          next.documents.push({
            id: uid('doc'),
            type: 'devis',
            name: `Devis en cours — ${artisanId}`,
            artisanId,
            date: new Date().toISOString(),
          })
          return next
        })
        return id
      },

      acceptQuote(quoteId, amount) {
        setState((prev) => {
          const next: AppState = structuredClone(prev)
          const quote = next.quotes.find((q) => q.id === quoteId)
          if (quote) {
            quote.status = 'accepted'
            quote.amount = amount
          }
          return next
        })
      },

      declineQuote(quoteId) {
        setState((prev) => {
          const next: AppState = structuredClone(prev)
          const quote = next.quotes.find((q) => q.id === quoteId)
          if (quote) quote.status = 'declined'
          return next
        })
      },

      sendMessage(artisanId, text, from = 'user') {
        setState((prev) => {
          const next: AppState = structuredClone(prev)
          const thread = ensureThread(artisanId, next)
          thread.messages.push({ id: uid('msg'), from, text, at: new Date().toISOString() })
          return next
        })
      },

      threadFor(artisanId) {
        return state.threads.find((t) => t.artisanId === artisanId)
      },

      createProject({ type, name, city }) {
        const id = uid('project')
        setState((prev) => {
          const next: AppState = structuredClone(prev)
          const project: RenovationProject = {
            id,
            type,
            name: name || 'Mon projet',
            city: city || '',
            createdAt: new Date().toISOString(),
            budgetTotal: null,
            steps: RENOVATION_STEP_ORDER.map((s, i) => ({
              id: uid('step'),
              tradeId: s.tradeId,
              name: s.name,
              status: i === 0 ? 'in_progress' : 'todo',
            })),
          }
          next.projects.push(project)
          return next
        })
        return id
      },

      assignArtisanToStep(projectId, stepId, artisanId, date) {
        setState((prev) => {
          const next: AppState = structuredClone(prev)
          const project = next.projects.find((p) => p.id === projectId)
          const step = project?.steps.find((s) => s.id === stepId)
          if (step) {
            step.artisanId = artisanId
            step.scheduledDate = date
            step.status = 'in_progress'
          }
          return next
        })
      },

      addDocument(doc) {
        setState((prev) => {
          const next: AppState = structuredClone(prev)
          next.documents.push({ ...doc, id: uid('doc'), date: new Date().toISOString() })
          return next
        })
      },

      registerArtisan(reg) {
        setState((prev) => ({
          ...prev,
          artisanRegistration: { ...reg, submittedAt: new Date().toISOString() },
          artisanRequests: prev.artisanRequests.length ? prev.artisanRequests : [DEMO_JOB_REQUEST],
        }))
      },

      toggleDossierDoc(docId) {
        setState((prev) => {
          const next: AppState = structuredClone(prev)
          next.artisanDossier[docId] = next.artisanDossier[docId] === 'uploaded' ? 'missing' : 'uploaded'
          return next
        })
      },

      sendArtisanQuote(requestId, input) {
        setState((prev) => {
          const next: AppState = structuredClone(prev)
          const request = next.artisanRequests.find((r) => r.id === requestId)
          if (request) request.status = 'quoted'
          const totalHT = input.lineItems.reduce((sum, l) => sum + l.amount, 0)
          const totalTTC = Math.round(totalHT * 1.1)
          const quote: ArtisanQuote = {
            requestId,
            lineItems: input.lineItems,
            startDate: input.startDate,
            durationWeeks: input.durationWeeks,
            depositPercent: input.depositPercent,
            totalTTC,
            sentAt: new Date().toISOString(),
          }
          next.artisanQuotes = next.artisanQuotes.filter((q) => q.requestId !== requestId)
          next.artisanQuotes.push(quote)
          return next
        })
      },

      declineArtisanRequest(requestId) {
        setState((prev) => {
          const next: AppState = structuredClone(prev)
          const request = next.artisanRequests.find((r) => r.id === requestId)
          if (request) request.status = 'declined'
          return next
        })
      },

      resetAll() {
        setState(EMPTY_STATE)
      },
    }
  }, [state])

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
