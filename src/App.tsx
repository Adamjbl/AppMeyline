import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { StoreProvider } from './lib/store'
import ClientLayout from './components/ClientLayout'
import Landing from './pages/Landing'
import Home from './pages/client/Home'
import FindArtisan from './pages/client/FindArtisan'
import ArtisanList from './pages/client/ArtisanList'
import ArtisanProfile from './pages/client/ArtisanProfile'
import RenovationWizard from './pages/client/RenovationWizard'
import Timeline from './pages/client/Timeline'
import Budget from './pages/client/Budget'
import Documents from './pages/client/Documents'
import Messages from './pages/client/Messages'
import Conversation from './pages/client/Conversation'
import ArtisanSignup from './pages/artisan/ArtisanSignup'
import ArtisanWelcome from './pages/artisan/ArtisanWelcome'
import ArtisanDashboard from './pages/artisan/ArtisanDashboard'
import ArtisanRequestDetail from './pages/artisan/ArtisanRequestDetail'
import ArtisanQuoteBuilder from './pages/artisan/ArtisanQuoteBuilder'
import ArtisanQuoteSent from './pages/artisan/ArtisanQuoteSent'
import ArtisanDossier from './pages/artisan/ArtisanDossier'

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <div className="mx-auto flex h-dvh w-full max-w-md flex-col bg-slate-50 shadow-xl sm:my-4 sm:h-[calc(100dvh-2rem)] sm:rounded-[2.5rem] sm:border sm:border-slate-200">
          <div className="flex-1 overflow-hidden">
            <Routes>
              <Route path="/" element={<Landing />} />

              <Route path="/app" element={<ClientLayout />}>
                <Route index element={<Home />} />
                <Route path="find" element={<FindArtisan />} />
                <Route path="find/:tradeId" element={<ArtisanList />} />
                <Route path="artisans/:artisanId" element={<ArtisanProfile />} />
                <Route path="renovation/new" element={<RenovationWizard />} />
                <Route path="timeline" element={<Timeline />} />
                <Route path="budget" element={<Budget />} />
                <Route path="documents" element={<Documents />} />
                <Route path="messages" element={<Messages />} />
                <Route path="messages/:artisanId" element={<Conversation />} />
              </Route>

              <Route path="/artisan/rejoindre" element={<ArtisanSignup />} />
              <Route path="/artisan/bienvenue" element={<ArtisanWelcome />} />
              <Route path="/artisan/dashboard" element={<ArtisanDashboard />} />
              <Route path="/artisan/dossier" element={<ArtisanDossier />} />
              <Route path="/artisan/demandes/:requestId" element={<ArtisanRequestDetail />} />
              <Route path="/artisan/demandes/:requestId/devis" element={<ArtisanQuoteBuilder />} />
              <Route path="/artisan/demandes/:requestId/envoye" element={<ArtisanQuoteSent />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </StoreProvider>
  )
}
