import type { Artisan, ArtisanJobRequest, DossierDocId, Trade } from './types'

export const TRADES: Trade[] = [
  { id: 'maconnerie', name: 'Maçonnerie' },
  { id: 'charpente', name: 'Charpente' },
  { id: 'plomberie', name: 'Plomberie' },
  { id: 'electricite', name: 'Électricité' },
  { id: 'platrerie', name: 'Plâtrerie' },
  { id: 'carrelage', name: 'Carrelage' },
  { id: 'peinture', name: 'Peinture' },
  { id: 'depannage', name: 'Dépannage urgent', urgent: true },
]

export const RENOVATION_STEP_ORDER: { tradeId: Trade['id']; name: string }[] = [
  { tradeId: 'maconnerie', name: 'Gros œuvre & maçonnerie' },
  { tradeId: 'charpente', name: 'Charpente & toiture' },
  { tradeId: 'plomberie', name: 'Plomberie' },
  { tradeId: 'electricite', name: 'Électricité' },
  { tradeId: 'platrerie', name: 'Plâtrerie & isolation' },
  { tradeId: 'carrelage', name: 'Carrelage & sols' },
  { tradeId: 'peinture', name: 'Peinture & finitions' },
]

export const ARTISANS: Artisan[] = [
  {
    id: 'luc-martin',
    name: 'Luc Martin',
    company: 'Martin Maçonnerie',
    tradeId: 'maconnerie',
    rating: 4.8,
    reviewCount: 32,
    distanceKm: 4,
    availableFrom: 'lun. 12 oct.',
    city: 'Annemasse',
    badges: ['Assuré', 'Décennale', 'SIRET vérifié'],
    bio: 'Artisan maçon depuis 14 ans, spécialisé en rénovation de bâti ancien et extensions.',
    checks: [
      'Identité et SIRET vérifiés',
      'Assurance responsabilité civile à jour',
      'Garantie décennale contrôlée (jusqu’en mars 2027)',
      'Entreprise déclarée, paiements traçables : jamais d’espèces',
    ],
    portfolio: [{ label: 'Mur en pierre' }, { label: 'Ouverture' }, { label: 'Façade' }],
    reviews: [
      { author: 'Sophie, Bonneville', rating: 5, verified: true, comment: 'Travail soigné et nous mur en pierre, chantier propre et délais tenus.' },
      { author: 'Marc, Thonon', rating: 5, verified: true, comment: 'Très bon conseil, devis clair, rien de caché.' },
    ],
  },
  {
    id: 'paul-roux',
    name: 'Paul Roux',
    company: 'Roux Bâtiment',
    tradeId: 'maconnerie',
    rating: 4.6,
    reviewCount: 35,
    distanceKm: 7,
    availableFrom: 'lun. 12 oct.',
    city: 'Annemasse',
    badges: ['Assuré', 'Décennale', 'SIRET vérifié'],
    bio: 'Entreprise familiale de maçonnerie générale, gros œuvre et rénovation complète.',
    checks: [
      'Identité et SIRET vérifiés',
      'Assurance responsabilité civile à jour',
      'Garantie décennale contrôlée (jusqu’en juin 2026)',
      'Entreprise déclarée, paiements traçables : jamais d’espèces',
    ],
    portfolio: [{ label: 'Extension' }, { label: 'Dalle béton' }, { label: 'Rénovation' }],
    reviews: [
      { author: 'Julie, Annemasse', rating: 4, verified: true, comment: 'Bon travail, un léger retard mais bien communiqué.' },
      { author: 'Hervé, Gaillard', rating: 5, verified: true, comment: 'Sérieux et ponctuel, je recommande.' },
    ],
  },
  {
    id: 'nadia-benali',
    name: 'Nadia Benali',
    company: 'Benali Construction',
    tradeId: 'maconnerie',
    rating: 4.9,
    reviewCount: 21,
    distanceKm: 11,
    availableFrom: 'lun. 19 oct.',
    city: 'Annemasse',
    badges: ['Assuré', 'Décennale', 'SIRET vérifié'],
    bio: 'Spécialiste en maçonnerie traditionnelle et restauration de bâti ancien.',
    checks: [
      'Identité et SIRET vérifiés',
      'Assurance responsabilité civile à jour',
      'Garantie décennale contrôlée (jusqu’en janvier 2028)',
      'Entreprise déclarée, paiements traçables : jamais d’espèces',
    ],
    portfolio: [{ label: 'Restauration' }, { label: 'Fondation' }, { label: 'Mur porteur' }],
    reviews: [{ author: 'Camille, Annemasse', rating: 5, verified: true, comment: 'Excellent travail, très professionnelle.' }],
  },
  {
    id: 'thomas-leroy',
    name: 'Thomas Leroy',
    company: 'Leroy Charpente',
    tradeId: 'charpente',
    rating: 4.7,
    reviewCount: 18,
    distanceKm: 6,
    availableFrom: 'mer. 14 oct.',
    city: 'Annemasse',
    badges: ['Assuré', 'Décennale', 'SIRET vérifié'],
    bio: 'Charpentier-couvreur, bois et toiture, du diagnostic à la pose.',
    checks: [
      'Identité et SIRET vérifiés',
      'Assurance responsabilité civile à jour',
      'Garantie décennale contrôlée (jusqu’en mai 2027)',
      'Entreprise déclarée, paiements traçables : jamais d’espèces',
    ],
    portfolio: [{ label: 'Charpente bois' }, { label: 'Toiture' }, { label: 'Isolation combles' }],
    reviews: [{ author: 'Antoine, Ville-la-Grand', rating: 5, verified: true, comment: 'Chantier impeccable, très satisfait.' }],
  },
  {
    id: 'sarah-dubois',
    name: 'Sarah Dubois',
    company: 'Dubois Plomberie',
    tradeId: 'plomberie',
    rating: 4.9,
    reviewCount: 41,
    distanceKm: 3,
    availableFrom: 'lun. 12 oct.',
    city: 'Annemasse',
    badges: ['Assuré', 'Décennale', 'SIRET vérifié'],
    bio: 'Plombier-chauffagiste, installation et dépannage, interventions rapides.',
    checks: [
      'Identité et SIRET vérifiés',
      'Assurance responsabilité civile à jour',
      'Garantie décennale contrôlée (jusqu’en septembre 2027)',
      'Entreprise déclarée, paiements traçables : jamais d’espèces',
    ],
    portfolio: [{ label: 'Salle de bain' }, { label: 'Chauffage' }, { label: 'Réseau eau' }],
    reviews: [{ author: 'Lea, Annemasse', rating: 5, verified: true, comment: 'Intervention rapide et efficace.' }],
  },
  {
    id: 'karim-haddad',
    name: 'Karim Haddad',
    company: 'Haddad Élec',
    tradeId: 'electricite',
    rating: 4.8,
    reviewCount: 27,
    distanceKm: 5,
    availableFrom: 'mar. 13 oct.',
    city: 'Annemasse',
    badges: ['Assuré', 'Décennale', 'SIRET vérifié'],
    bio: 'Électricien certifié Consuel, mise aux normes et installations neuves.',
    checks: [
      'Identité et SIRET vérifiés',
      'Assurance responsabilité civile à jour',
      'Garantie décennale contrôlée (jusqu’en avril 2028)',
      'Entreprise déclarée, paiements traçables : jamais d’espèces',
    ],
    portfolio: [{ label: 'Tableau électrique' }, { label: 'Domotique' }, { label: 'Mise aux normes' }],
    reviews: [{ author: 'Nicolas, Gaillard', rating: 5, verified: true, comment: 'Travail propre et aux normes.' }],
  },
]

export const DOSSIER_DOCS: {
  id: DossierDocId
  label: string
  sublabel?: string
  group: 'required' | 'reference' | 'optional'
}[] = [
  { id: 'kbis', label: 'Kbis / SIRET', sublabel: 'touchez pour ajouter', group: 'required' },
  { id: 'urssaf', label: 'Attestation URSSAF', sublabel: 'moins de 6 mois', group: 'required' },
  { id: 'decennale', label: 'Assurance décennale', group: 'required' },
  { id: 'rc_pro', label: 'Responsabilité civile pro', group: 'required' },
  { id: 'google', label: 'Lien de votre fiche Google', group: 'reference' },
  { id: 'reference_pdf', label: "Attestation d'un client (PDF)", group: 'reference' },
  { id: 'photos', label: 'Photos de 3 chantiers récents', group: 'reference' },
  { id: 'rge', label: 'Certification RGE (travaux énergétiques)', group: 'optional' },
]

export const DEMO_JOB_REQUEST: ArtisanJobRequest = {
  id: 'demande-ferme-vergers',
  clientName: 'Camille',
  projectName: 'Ferme des Vergers',
  tradeId: 'maconnerie',
  stepIndex: 1,
  stepsTotal: 7,
  message: 'Bonjour, je voudrais reprendre deux murs en pierre de la grange et ouvrir une porte de 90 cm.',
  city: 'Annemasse',
  distanceKm: 9,
  desiredStart: 'lun. 12 oct.',
  duration: '~3 semaines',
  building: 'grange en pierre, avant 1950',
  surface: 'environ 25 m²',
  access: 'libre, clés en boîte',
  documents: ['6 photos des murs et de la grange', 'Plans de la grange (PDF)', 'DPE · classe F'],
  nextStepNote:
    'Après vous : charpente (étape 2), dès le lun. 2 nov. BuildFlow cale la suite sur votre date de fin.',
  contactedCount: 1,
  totalContacted: 3,
  createdAgo: 'il y a 2 h',
  status: 'new',
}

export const DEMO_QUOTE_LINE_ITEMS = [
  { label: 'Reprise de 2 murs en pierre · 25 m²', amount: 5400 },
  { label: 'Ouverture porte 90 cm + linteau acier', amount: 2300 },
  { label: 'Matériaux · pierre, chaux, linteau', amount: 3000 },
  { label: 'Échafaudage + évacuation des gravats', amount: 600 },
]

export function artisansByTrade(tradeId: string): Artisan[] {
  return ARTISANS.filter((a) => a.tradeId === tradeId)
}

export function artisanById(id: string): Artisan | undefined {
  return ARTISANS.find((a) => a.id === id)
}

export function tradeById(id: string): Trade | undefined {
  return TRADES.find((t) => t.id === id)
}
