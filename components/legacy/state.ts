// Chapters and facets configuration

export type Chapter = 1 | 2 | 3 | 4

export type Facet = 
  | 'none'
  | 'history'      // Chapter 2 - left lobe
  | 'aiContext'    // Chapter 2 - top lobe
  | 'liabilities'  // Chapter 3 - right lobe
  | 'property'     // Chapter 3 - bottom lobe
  | 'mortgage'     // Chapter 4 - unified

export interface ChapterConfig {
  id: Chapter
  title: string
  subtitle: string
  facets: Facet[]
  lobePositions: { facet: Facet; x: number; y: number }[]
}

export const CHAPTERS: ChapterConfig[] = [
  {
    id: 1,
    title: 'One GoodLeap Experience',
    subtitle: 'Mortgage is the continuation of a relationship we already understand.',
    facets: ['none'],
    lobePositions: [],
  },
  {
    id: 2,
    title: 'Recognition',
    subtitle: 'We already know them.',
    facets: ['history', 'aiContext'],
    lobePositions: [
      { facet: 'history', x: -0.6, y: 0 },
      { facet: 'aiContext', x: 0.6, y: 0.4 },
    ],
  },
  {
    id: 3,
    title: 'Financial Reality',
    subtitle: 'The picture is already clear.',
    facets: ['liabilities', 'property'],
    lobePositions: [
      { facet: 'liabilities', x: 0.5, y: 0.2 },
      { facet: 'property', x: -0.3, y: -0.5 },
    ],
  },
  {
    id: 4,
    title: 'Continuation to Close',
    subtitle: 'One platform. One customer. One GoodLeap experience.',
    facets: ['mortgage'],
    lobePositions: [],
  },
]

export const CAPTIONS: Record<Facet, string[]> = {
  none: ['Drag to explore the customer.'],
  history: ["We've helped this customer before.", "Their story is already understood."],
  aiContext: ['Good conversations start before the call.', 'AI supports awareness, not scripts.'],
  liabilities: ['Nothing was re-entered.', 'Verification replaces setup.'],
  property: ['The picture is already clear.', 'Confidence, not guesswork.'],
  mortgage: ['Mortgage is not a new journey.', "It's the next state."],
}

// Demo data for canvas modules
export const DEMO_DATA = {
  customer: {
    name: 'Sarah Chen',
    relationship: '3 years with GoodLeap',
    location: 'Phoenix, AZ',
  },
  history: {
    loans: [
      { type: 'Solar', amount: '$24,500', date: 'Mar 2022', status: 'Completed' },
      { type: 'HVAC', amount: '$12,800', date: 'Nov 2023', status: 'Active' },
    ],
    trustScore: 'Excellent',
  },
  aiContext: {
    summary: 'Long-term customer, consistent payment history, home value appreciated.',
    weather: '72°F, Sunny',
    localNews: 'Arizona housing market shows steady growth in Q4',
    suggestedOpener: 'Great to connect again — how has the solar system been working out?',
  },
  liabilities: [
    { name: 'Auto Loan', balance: '$18,400', payment: '$425/mo', verified: true },
    { name: 'Credit Card', balance: '$2,100', payment: '$85/mo', verified: true },
  ],
  property: {
    address: '4521 Desert Rose Lane, Phoenix AZ',
    valueLow: '$465,000',
    valueHigh: '$505,000',
    valueMid: '$485,000',
    confidence: 'High',
    equity: '$142,000',
  },
  mortgage: {
    amount: '$320,000',
    rate: '6.25%',
    term: '30 years',
    payment: '$1,970/mo',
  },
  integrations: [
    { name: 'Encompass', status: 'synced' },
    { name: 'Figure', status: 'connected' },
    { name: 'AI Summary', status: 'ready' },
    { name: 'Genesys', status: 'linked' },
  ],
}

