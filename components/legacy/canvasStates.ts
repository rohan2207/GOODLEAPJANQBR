export type CanvasState = 
  | 'idle'
  | 'cfHistory'
  | 'aiContextSummary'
  | 'liabilitiesAndProperty'
  | 'mortgageContinuation'
  | 'integrationsDock'
  | 'close'

export interface Beat {
  id: number
  state: CanvasState
  label: string
  captions: string[]
}

export const BEATS: Beat[] = [
  {
    id: 1,
    state: 'idle',
    label: 'We already know them.',
    captions: [
      'This is not a new customer.',
      "It's a continuation.",
    ],
  },
  {
    id: 2,
    state: 'cfHistory',
    label: 'History becomes context.',
    captions: [
      "We've helped this customer before.",
      'Their history is already understood.',
    ],
  },
  {
    id: 3,
    state: 'aiContextSummary',
    label: 'AI adds human context.',
    captions: [
      'Understanding builds trust.',
      'Good conversations start before the call.',
      'AI supports the loan officer, not the script.',
    ],
  },
  {
    id: 4,
    state: 'liabilitiesAndProperty',
    label: 'Financial reality is already assembled.',
    captions: [
      'Nothing was re-entered.',
      'Verification replaces manual setup.',
      'The picture is already clear.',
    ],
  },
  {
    id: 5,
    state: 'mortgageContinuation',
    label: 'Mortgage becomes the next state.',
    captions: [
      "Mortgage isn't separate here.",
      "It's the next step in the same relationship.",
    ],
  },
  {
    id: 6,
    state: 'integrationsDock',
    label: 'Everything docks into one platform.',
    captions: [
      'From intent to close, in one place.',
      'No work repeated.',
    ],
  },
  {
    id: 7,
    state: 'close',
    label: 'This is the GoodLeap experience.',
    captions: [
      'One platform.',
      'One customer.',
      'One GoodLeap experience.',
    ],
  },
]

// Demo data for the canvas
export const DEMO_CUSTOMER = {
  name: 'Sarah Chen',
  relationship: '3 years',
  loans: [
    { type: 'Solar', amount: '$24,500', date: 'Mar 2022', status: 'Paid' },
    { type: 'HVAC', amount: '$12,800', date: 'Nov 2023', status: 'Active' },
  ],
  trustScore: 'Excellent',
  location: 'Phoenix, AZ',
}

export const DEMO_CONTEXT = {
  weather: '72°F, Sunny',
  localNews: 'Arizona housing market shows steady growth',
  brief: [
    'Previous loans completed on time',
    'Strong payment history',
    'Home value appreciated 12% since last loan',
  ],
}

export const DEMO_FINANCIALS = {
  liabilities: [
    { name: 'Auto Loan', balance: '$18,400', payment: '$425/mo' },
    { name: 'Credit Card', balance: '$2,100', payment: '$85/mo' },
  ],
  property: {
    address: '4521 Desert Rose Lane',
    value: '$485,000',
    equity: '$142,000',
  },
}

export const DEMO_MORTGAGE = {
  amount: '$320,000',
  rate: '6.25%',
  term: '30 years',
  payment: '$1,970/mo',
  benefits: ['Rate lock available', 'Streamlined approval', 'Known customer pricing'],
}

export const INTEGRATIONS = [
  { name: 'Encompass 1003', icon: '📋' },
  { name: 'Figure', icon: '🏠' },
  { name: 'AI Summary', icon: '✨' },
  { name: 'Genesys', icon: '📞' },
]

