export type LeadStage = 'new' | 'survey' | 'quoted' | 'won';

export interface Customer {
  id: string;
  name: string;
  area: string;
  phone: string;
  systemKw: number;
  panels: string;
  inverter: string;
  battery: string;
  totalPrice: number;
  paid: number;
  installedOn: string;
  monthlySaving: number;
}

export interface Lead {
  id: string;
  customerId: string;
  name: string;
  area: string;
  stage: LeadStage;
  systemKw: number;
  estimate: number;
  source: 'Referral' | 'Walk-in' | 'Facebook' | 'Phone call';
  daysAgo: number;
  note: string;
}

export type Milestone = 'Survey' | 'Structure' | 'Panels' | 'Wiring' | 'Net metering' | 'Live';
export const MILESTONES: Milestone[] = [
  'Survey',
  'Structure',
  'Panels',
  'Wiring',
  'Net metering',
  'Live',
];

export interface Job {
  id: string;
  customerId: string;
  name: string;
  area: string;
  systemKw: number;
  milestoneIndex: number; // index into MILESTONES = current step
  scheduled: string;
  crew: string;
}

export interface ServiceVisit {
  id: string;
  name: string;
  area: string;
  task: string;
  when: string;
}

export interface Payment {
  id: string;
  customerId: string;
  name: string;
  amount: number;
  method: 'Cash' | 'Bank transfer' | 'JazzCash';
  when: string;
}

export const BUSINESS = {
  name: 'Swat Solar Solutions',
  owner: 'Yasin',
  monthCollected: 1845000,
  monthTarget: 2500000,
  outstanding: 967000,
  overdueCount: 3,
  revenueSeries: [42, 55, 48, 71, 64, 88, 79, 96, 84, 112, 98, 124], // Rs thousands per week, illustrative
  revenueLabels: ['W1', '', '', 'W4', '', '', 'W7', '', '', 'W10', '', 'W12'],
};

export const CUSTOMERS: Customer[] = [
  {
    id: 'c1',
    name: 'Haji Sher Muhammad',
    area: 'Khwazakhela Bazaar',
    phone: '0345 900 1122',
    systemKw: 10,
    panels: '18 × Longi 580W',
    inverter: 'Inverex Nitrox 10kW hybrid',
    battery: 'Lithium 48V 200Ah',
    totalPrice: 1485000,
    paid: 1200000,
    installedOn: '12 Sep 2026',
    monthlySaving: 38500,
  },
  {
    id: 'c2',
    name: 'Malak Bakht Zada',
    area: 'Shin, Khwazakhela',
    phone: '0333 945 7788',
    systemKw: 5,
    panels: '9 × Jinko 585W',
    inverter: 'Inverex Nitrox 5kW hybrid',
    battery: 'Lithium 48V 100Ah',
    totalPrice: 865000,
    paid: 865000,
    installedOn: '28 Aug 2026',
    monthlySaving: 19200,
  },
  {
    id: 'c3',
    name: 'Dr Fazal Rahman',
    area: 'Mingora',
    phone: '0346 888 2210',
    systemKw: 15,
    panels: '26 × Longi 580W',
    inverter: 'Growatt 15kW on-grid',
    battery: 'Net metering, no battery',
    totalPrice: 1975000,
    paid: 1100000,
    installedOn: '3 Oct 2026',
    monthlySaving: 56000,
  },
  {
    id: 'c4',
    name: 'Umar Farooq',
    area: 'Fatehpur',
    phone: '0312 456 9034',
    systemKw: 3,
    panels: '6 × Canadian 550W',
    inverter: 'Inverex Veyron 3.2kW',
    battery: 'Tubular 200Ah × 2',
    totalPrice: 485000,
    paid: 300000,
    installedOn: '19 Sep 2026',
    monthlySaving: 11400,
  },
  {
    id: 'c5',
    name: 'Bakht Rokhan',
    area: 'Charbagh',
    phone: '0300 971 6655',
    systemKw: 8,
    panels: '14 × Jinko 585W',
    inverter: 'Inverex Nitrox 8kW hybrid',
    battery: 'Lithium 48V 150Ah',
    totalPrice: 1210000,
    paid: 1210000,
    installedOn: '9 Aug 2026',
    monthlySaving: 29800,
  },
];

export const LEADS: Lead[] = [
  {
    id: 'l1',
    customerId: 'c3',
    name: 'Dr Fazal Rahman',
    area: 'Mingora',
    stage: 'won',
    systemKw: 15,
    estimate: 1975000,
    source: 'Referral',
    daysAgo: 21,
    note: 'Clinic + home. Load shedding 8 hrs. Wants net metering.',
  },
  {
    id: 'l2',
    customerId: 'c1',
    name: 'Haji Sher Muhammad',
    area: 'Khwazakhela Bazaar',
    stage: 'won',
    systemKw: 10,
    estimate: 1485000,
    source: 'Walk-in',
    daysAgo: 34,
    note: 'Shop + house on one system. Paid in 3 installments.',
  },
  {
    id: 'l6',
    customerId: 'c6',
    name: 'Sultan Room',
    area: 'Khwazakhela',
    stage: 'quoted',
    systemKw: 5,
    estimate: 865000,
    source: 'Facebook',
    daysAgo: 2,
    note: 'Quote sent on WhatsApp. Comparing with Mingora dealer.',
  },
  {
    id: 'l7',
    customerId: 'c7',
    name: 'Ihsan Ullah',
    area: 'Matta',
    stage: 'quoted',
    systemKw: 8,
    estimate: 1210000,
    source: 'Referral',
    daysAgo: 4,
    note: 'Wants lithium only. Asked for 2-year service plan.',
  },
  {
    id: 'l8',
    customerId: 'c8',
    name: 'Noor Wali Shah',
    area: 'Behrain Road',
    stage: 'survey',
    systemKw: 6,
    estimate: 940000,
    source: 'Phone call',
    daysAgo: 1,
    note: 'Survey booked Thursday. Roof is RCC, shade from west wall.',
  },
  {
    id: 'l9',
    customerId: 'c9',
    name: 'Abdul Qayum',
    area: 'Charbagh',
    stage: 'survey',
    systemKw: 3,
    estimate: 485000,
    source: 'Walk-in',
    daysAgo: 3,
    note: 'Small home. Budget tight — tubular battery option.',
  },
  {
    id: 'l10',
    customerId: 'c10',
    name: 'Hotel Swat Regency',
    area: 'Madyan',
    stage: 'new',
    systemKw: 25,
    estimate: 3200000,
    source: 'Phone call',
    daysAgo: 0,
    note: 'Manager asked for a site visit this week. 40 rooms.',
  },
  {
    id: 'l11',
    customerId: 'c11',
    name: 'Gul Rahman',
    area: 'Khwazakhela',
    stage: 'new',
    systemKw: 5,
    estimate: 865000,
    source: 'Facebook',
    daysAgo: 0,
    note: 'Messaged on Facebook page. Asked price of 5kW first.',
  },
];

export const JOBS: Job[] = [
  {
    id: 'j1',
    customerId: 'c3',
    name: 'Dr Fazal Rahman',
    area: 'Mingora',
    systemKw: 15,
    milestoneIndex: 4,
    scheduled: 'Today, 10:00 AM',
    crew: 'Team A — Shahid, Naveed',
  },
  {
    id: 'j2',
    customerId: 'c1',
    name: 'Haji Sher Muhammad',
    area: 'Khwazakhela Bazaar',
    systemKw: 10,
    milestoneIndex: 5,
    scheduled: 'Completed 12 Sep',
    crew: 'Team A — Shahid, Naveed',
  },
  {
    id: 'j3',
    customerId: 'c4',
    name: 'Umar Farooq',
    area: 'Fatehpur',
    systemKw: 3,
    milestoneIndex: 2,
    scheduled: 'Tomorrow, 9:00 AM',
    crew: 'Team B — Imran',
  },
  {
    id: 'j4',
    customerId: 'c8',
    name: 'Noor Wali Shah',
    area: 'Behrain Road',
    systemKw: 6,
    milestoneIndex: 0,
    scheduled: 'Thu, 11:00 AM',
    crew: 'Survey — Yasin',
  },
];

export const SERVICE_VISITS: ServiceVisit[] = [
  {
    id: 's1',
    name: 'Bakht Rokhan',
    area: 'Charbagh',
    task: '6-month free service — panel cleaning + tightening',
    when: 'Sat, 24 Oct',
  },
  {
    id: 's2',
    name: 'Malak Bakht Zada',
    area: 'Shin, Khwazakhela',
    task: 'Battery health check — customer reported early cut-off',
    when: 'Mon, 26 Oct',
  },
];

export const PAYMENTS: Payment[] = [
  {
    id: 'p1',
    customerId: 'c3',
    name: 'Dr Fazal Rahman',
    amount: 400000,
    method: 'Bank transfer',
    when: 'Today',
  },
  {
    id: 'p2',
    customerId: 'c1',
    name: 'Haji Sher Muhammad',
    amount: 250000,
    method: 'Cash',
    when: 'Yesterday',
  },
  {
    id: 'p3',
    customerId: 'c4',
    name: 'Umar Farooq',
    amount: 150000,
    method: 'JazzCash',
    when: '18 Oct',
  },
  {
    id: 'p4',
    customerId: 'c2',
    name: 'Malak Bakht Zada',
    amount: 215000,
    method: 'Bank transfer',
    when: '15 Oct',
  },
];

export interface QuoteOption {
  id: string;
  label: string;
  detail: string;
  price: number;
}

export const QUOTE_CATALOG = {
  panelsPerKw: {
    label: 'Solar panels',
    detail: 'Longi 580W Hi-MO, per kW installed',
    perKw: 58000,
  },
  inverters: [
    {
      id: 'inv5',
      label: 'Inverex Nitrox 5kW hybrid',
      detail: 'Best for homes up to 5kW',
      price: 185000,
    },
    { id: 'inv8', label: 'Inverex Nitrox 8kW hybrid', detail: 'For 6–8kW systems', price: 265000 },
    {
      id: 'inv10',
      label: 'Inverex Nitrox 10kW hybrid',
      detail: 'For 10kW and above',
      price: 335000,
    },
    { id: 'inv0', label: 'No inverter', detail: 'Customer already has one', price: 0 },
  ] as QuoteOption[],
  batteries: [
    {
      id: 'bat5',
      label: 'Lithium 48V 100Ah (5.1 kWh)',
      detail: '10-year life, fast charging',
      price: 285000,
    },
    {
      id: 'bat75',
      label: 'Lithium 48V 150Ah (7.7 kWh)',
      detail: 'For longer backup',
      price: 415000,
    },
    { id: 'batT', label: 'Tubular 200Ah × 2', detail: 'Budget option, 2-year life', price: 118000 },
    { id: 'bat0', label: 'No battery', detail: 'On-grid / net metering only', price: 0 },
  ] as QuoteOption[],
  extrasPerKw: {
    label: 'Structure, wiring & installation',
    detail: 'Galvanised frame, DC cabling, labour, per kW',
    perKw: 21000,
  },
  netMetering: { label: 'Net metering file & licence', detail: 'One-time, optional', price: 45000 },
};
