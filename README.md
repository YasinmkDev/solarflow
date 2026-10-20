# SolarFlow — Business OS for Solar Installers

A SaaS app for small solar installation businesses: run the whole job from first lead to final installment in one place.

**Workflow** (modelled on real solar CRMs): Lead → Site survey → Quotation → Installation milestones → Installments (khata) → Service visits.

## Design

Industry-grade clean SaaS, designed research-first — see [DESIGN.md](DESIGN.md) for the full UX and design-system spec.

- References: Linear, Stripe, Attio, Mercury — restraint, clarity, calm data density
- Warm off-white canvas, white surfaces, hairline borders, near-flat elevation
- One flat accent (deep amber), muted semantic tints, Lucide icons only
- No gradients, no glow, no neon, no glassmorphism
- Motion is subtle and purposeful: one 220ms fade-rise entrance, count-up stats, a chart that draws once, animated progress

## Screens

- **Home** — attention dashboard: collected this month vs target (animated ring), attention list, 12-week collections chart, today's job, recent payments
- **Leads** — pipeline filtered by stage (New, Survey, Quoted, Won)
- **Quote** — quotation builder: system-size stepper, inverter/battery catalog pickers, net-metering toggle, live itemised total with per-kW price
- **Jobs** — installations with milestone steppers (Survey → Structure → Panels → Wiring → Net metering → Live) plus service visits
- **Payments** — khata: collection progress, per-customer paid/due with progress bars, recent payments
- **Customer detail** — system specs, monthly savings, payment position, WhatsApp reminder
- **SolarFlow Pro paywall** — monthly/yearly billing toggle, 7-day trial flow (demo, no real charge)

All sample data is realistic Pakistani solar business data (Swat names and areas, Inverex/Longi/Jinko catalog, Rs prices in South-Asian grouping).

## Tech

- Expo SDK 57 · React Native 0.86 · React 19.2 · TypeScript (strict) — SDK 57 matches the owner's Expo Go
- Expo Router (file routes in `src/app/`), React Native Reanimated 4, react-native-svg
- Native packages installed only via `npx expo install` (SDK-matched versions)

## Run

```bash
npm install
npx expo start        # then open in Expo Go
```

## Verify

```bash
npm run typecheck     # tsc --noEmit
npm run lint          # eslint
npx expo-doctor       # 20/20 checks
npx expo export --platform android   # production bundle
```

## Status

Front-end complete with local seed data. Next steps for a live product: Supabase auth + database per business, quotation PDF export, real JazzCash/EasyPaisa billing for Pro.
