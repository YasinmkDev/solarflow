# SolarFlow — UX Design (written before any UI code)

## 1. References studied (research-first, not guessed)

- **Linear** — restraint, one sharp hierarchy, motion that explains, nothing decorative.
- **Stripe / Mercury / Attio** — clean B2B SaaS: white surfaces, hairline borders, calm data density, trust through clarity.
- **Base44-style documented systems** — warm off-white canvas `#FAF9F7`, white only for surfaces, ONE accent with maximum authority, radius ~12, near-flat elevation, hairline 1px borders, almost no shadow.
- **Real solar CRMs** (Solar CRM Pro, CrmLeaf, Fuzen Solar EPC) — the proven workflow this app must follow, one record end to end:
  Lead → Site survey → Quotation (BOQ) → Installation project (milestones) → Invoice / installments → Service.

## 2. Anti-patterns — banned in this app

- No neon, no glow, no glassmorphism, no purple/blue/amber **gradients** (the gradient package installed earlier is removed, unused).
- No dark-mode-with-bright-accent default. This app is light, like a serious business tool used outdoors in Swat sunlight.
- No emoji icons. One icon set only: Lucide.
- No invented metrics, no lorem ipsum, no "John Doe". All data is realistic Pakistani solar business data.

## 3. User and jobs

**Primary user:** owner of a small solar installation business (2–10 staff) in Pakistan.
His day in the app, in priority order:

1. Morning: "What needs my attention today?" — overdue payments, today's installations, new leads.
2. In the field / shop: "Make a quotation for this customer in under 2 minutes."
3. Evening: "Who still owes me money, and how much did we collect this month?"

**Secondary:** his customers exist as records (system size, savings, payment history), not as app users in v1.

## 4. Information architecture

Bottom tabs (thumb-first, 4 + centre action):

- **Home** — attention dashboard: greeting, collected-this-month, attention list, pipeline summary, today's jobs, recent payments.
- **Leads** — pipeline by stage (New, Survey, Quoted, Won) with stage filter chips, each card one tap to customer detail.
- **＋ Quote** (centre action) — quotation builder: system size stepper, panel/inverter/battery pickers, live itemised total, customer-ready summary.
- **Jobs** — installations with milestone progress (Survey → Structure → Panels → Wiring → Net metering → Live) + upcoming service visits.
- **Payments** — khata: collected vs outstanding, per-customer installment progress, overdue first, WhatsApp reminder affordance.

Stack screens: Customer detail, Paywall (Pro), Job detail is inline-expand in v1.

## 5. Design tokens

- Canvas: `#FAFAF8` (warm off-white). Surface: `#FFFFFF`. Surface alt: `#F4F4F2`.
- Text: primary `#16130E` (warm near-black), secondary `#6B7280`, tertiary `#9CA3AF`.
- Border: `#E8E6E1` hairline 1px. Elevation: one soft shadow only on floating action / sheets, otherwise flat + border.
- Accent (one, flat, sparing): deep solar amber `#D97706` — used for primary buttons (white text), active tab, key numbers' labels, chart line. Never as a background wash bigger than a chip.
- Semantic (muted, flat, soft tint backgrounds only): success `#15803D` on `#F0FDF4`, warning `#B45309` on `#FFFBEB`, danger `#B91C1C` on `#FEF2F2`, info `#1D4ED8` on `#EFF6FF`.
- Radius: cards 16, controls 12, chips/pills 999. Spacing: 4pt scale (4/8/12/16/20/24/32). Content padding 20.
- Type (system font, no webfont gimmicks): Display 28/700, Title 20/700, Section 16/600, Body 15/400, Caption 13/500, Mono numbers for money (tabular, right-aligned in tables).
- Money format: `Rs 4,85,000` (South-Asian grouping) everywhere, via one formatter.

## 6. Motion (subtle, professional)

- Screen content: fade + 8px rise, staggered by 40ms, 220ms ease-out (Reanimated `FadeInDown`).
- Numbers count up once on Home (800ms, ease-out) — data arriving, not decoration.
- Chart: single solid accent line, light flat area fill at 8% opacity, draws in 900ms. No gradient fill.
- Press: scale 0.98 + opacity, spring back. Tab change: no bounce.
- Progress bars/rings animate width/stroke on mount only.
- Respect reduced motion: Reanimated entering animations are short enough; no looping animations anywhere. No Lottie, no shimmer loops except a plain skeleton pulse on loading states.

## 7. Component inventory

ScreenHeader, StatBlock, SectionTitle, Card, Chip (stage/status), LeadCard, JobCard (milestone stepper), PaymentRow (progress), QuoteLineItem, PrimaryButton, GhostButton, ProgressBar, Ring (SVG), RevenueChart (SVG), EmptyState, AvatarInitials (flat tint circle, initials — no photos needed).

## 8. States for every screen

Loading = skeleton blocks matching layout. Empty = icon + one sentence + one action. Error = sentence + retry. All lists handle long names (2-line clamp) and large amounts.

## 9. Success test

A viewer should place this next to Linear/Stripe screenshots and not spot it as "AI-made": neutral canvas, one accent, consistent 16px radii, aligned money columns, calm density, and every animation explainable in one sentence.
