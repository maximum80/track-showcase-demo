---
name: competitive-ui-review
description: Research competitor workforce management platforms for features, user flows, and AI integrations, then enrich requirements before PRD generation. Scrapes competitor websites to find how they solve the same problem. Use before requirements-to-prd to ensure we're building competitive features with modern flows and AI capabilities. Triggers on "check competitors", "competitive research", "what do competitors do", or as a pre-step to PRD generation.
---

# Competitive Feature Research

Before writing a PRD, research how competitor platforms solve the same problem. Scrape their websites for feature descriptions, user flows, AI integrations, and pricing positioning. Use this intelligence to **enrich requirements** — identify missing capabilities, better user flows, and AI opportunities the requirements haven't considered.

This is NOT about UI design patterns. This is about **what to build and how it should work** based on what the market offers.

## When to Use

- Before invoking `requirements-to-prd` — to ensure requirements are competitive
- When the user has raw requirements and wants to validate scope
- When exploring what AI capabilities competitors offer for a feature area

## Process

### Step 1: Understand the Feature Area

Read all files in the feature folder (`mock/feature/<feature-name>/`) to understand:
- What problem is being solved?
- Who is the target user?
- What's the current scope of requirements?

### Step 2: Identify Relevant Competitors

Based on the feature area, select which competitors to research. Use the competitor registry below to pick the most relevant 4-6 platforms.

### Step 3: Scrape Competitor Websites

Use the `WebFetch` tool to scrape each relevant competitor's feature pages, product pages, blog posts, and changelog/release notes. Focus on:

1. **Feature descriptions** — How do they describe the capability? What sub-features do they include?
2. **User flows** — What's the step-by-step workflow they advertise?
3. **AI/automation features** — What AI capabilities do they highlight? (Auto-scheduling, predictions, smart suggestions, NLP, document analysis, etc.)
4. **Integration points** — What does this feature connect to? (Slack, calendar, HRIS, payroll, etc.)
5. **Pricing tier placement** — Is this a basic feature or premium/enterprise? This signals market expectations.

### Step 4: Synthesize & Enrich

Compare competitor offerings against the current requirements. Identify:
- Features competitors offer that our requirements miss
- Better user flows than what's specified
- AI/automation opportunities not yet considered
- Integration points worth adding
- Table-stakes features (every competitor has it — we must too)
- Differentiators (only 1-2 competitors have it — potential competitive advantage)

### Step 5: Output Enriched Requirements + Competitive Brief

---

## Competitor Registry

### Tier 1: Direct Competitors (Resource Planning / PSA)

| Platform | URL Base | Strength | Best For Researching |
|---|---|---|---|
| **Runn** | `runn.io` | Resource planning, capacity forecasting | Resource allocation, forecasting, utilization |
| **Float** | `float.com` | Resource scheduling, time tracking | Scheduling flows, team management, mobile |
| **Mosaic** | `mosaicapp.com` | AI-powered resource management | AI features, predictive analytics, automation |
| **Kantata** (Mavenlink) | `kantata.com` | Professional services automation | Project financials, billing, enterprise workflows |
| **Parallax** | `parallaxteam.com` | Pipeline + resource planning | Pipeline management, forecasting, financial planning |
| **Resource Guru** | `resourceguruapp.com` | Simple resource scheduling | Availability search, booking flows, leave management |
| **Saviom** | `saviom.com` | Enterprise resource management | Enterprise scale, what-if scenarios, demand planning |

### Tier 2: Platform / Productivity (Feature Patterns)

| Platform | URL Base | Strength | Best For Researching |
|---|---|---|---|
| **Monday.com** | `monday.com` | Work OS, customizable workflows | Workflow automation, dashboards, multi-view, AI |
| **Linear** | `linear.app` | Issue tracking, project management | Clean UX, keyboard-first flows, AI triage |
| **Notion** | `notion.so` | Docs + databases + AI | AI writing/analysis, database views, templates |
| **Asana** | `asana.com` | Project management | Goals, portfolios, workflow automation, AI |
| **ClickUp** | `clickup.com` | All-in-one productivity | AI features, automation, custom fields |

### Tier 3: HR / Workforce Specific

| Platform | URL Base | Strength | Best For Researching |
|---|---|---|---|
| **Rippling** | `rippling.com` | Unified HR + IT + Finance | Onboarding flows, employee lifecycle, compliance, AI |
| **Bullhorn** | `bullhorn.com` | Staffing & recruiting | Talent pipelines, contractor portals, matching AI |
| **BambooHR** | `bamboohr.com` | HR management | Employee self-service, time-off, reporting |
| **Deel** | `deel.com` | Global workforce | Compliance, contracts, payments, EOR |
| **Gusto** | `gusto.com` | Payroll + HR | Payroll flows, benefits, onboarding |

### Tier 4: Japanese Market

| Platform | URL Base | Strength | Best For Researching |
|---|---|---|---|
| **SmartHR** | `smarthr.jp` | JP HR management | JP-specific flows, approval workflows, compliance |
| **freee** | `freee.co.jp` | JP accounting + HR | JP fiscal year, payroll, tax, mobile UX |
| **KING OF TIME** | `kingtime.jp` | JP attendance management | Clock-in/out, shift management, GPS verification |
| **Jobcan** | `jobcan.ne.jp` | JP attendance + workflow | Timesheet patterns, approval flows, leave management |
| **HRMOS** | `hrmos.co` | JP talent management | Recruiting, evaluation, talent analytics |
| **カオナビ (Kaonavi)** | `kaonavi.jp` | JP talent management | Skill mapping, org charts, people analytics |

---

## Scraping Strategy

For each selected competitor, fetch these pages (adjust paths based on what exists):

```
# Feature overview pages
{base}/features
{base}/features/{feature-area}
{base}/product
{base}/product/{feature-area}
{base}/solutions/{use-case}

# AI-specific pages (critical — this is where differentiation lives)
{base}/ai
{base}/features/ai
{base}/blog/ai  (or search for AI-related blog posts)
{base}/changelog  (recent AI feature launches)
{base}/whats-new

# Pricing (to understand feature tier placement)
{base}/pricing

# Integration pages
{base}/integrations
```

**Scraping tips:**
- Start with the main features page — it usually links to sub-feature pages
- Look for "What's New" or "Changelog" pages for latest AI features
- Blog posts often have the most detail about how AI features work
- Pricing pages reveal which features are table-stakes (free/basic) vs premium

---

## AI Feature Categories to Research

When researching competitor AI capabilities, look for these specific categories:

### Predictive & Forecasting AI
- Capacity forecasting (predict future resource needs)
- Project timeline prediction (will this project finish on time?)
- Attrition/turnover risk prediction
- Budget/cost forecasting
- Demand forecasting

### Smart Automation
- Auto-scheduling (assign resources based on skills, availability, preferences)
- Smart matching (match people to projects/roles)
- Workflow automation triggers (if X then Y)
- Auto-categorization (expenses, time entries, documents)
- Smart notifications (only notify when it matters)

### NLP & Document Intelligence
- Document analysis / extraction (resumes, contracts, invoices)
- Natural language search ("show me available React developers next month")
- Chat/conversational interfaces for data queries
- Meeting notes → action items extraction
- Email parsing for project updates

### Analytics & Insights AI
- Anomaly detection (unusual time entries, spending patterns)
- Trend analysis with natural language summaries
- Benchmarking (how does our utilization compare to industry?)
- Recommendation engines (suggested actions based on data)
- Report generation from natural language prompts

### Generative AI
- AI-written project descriptions, SOWs, proposals
- Auto-generated status reports
- Smart template suggestions
- AI-assisted data entry (auto-fill based on patterns)

---

## Output Format

```markdown
# Competitive Feature Brief: <Feature Name>

## Research Summary
- **Feature area:** [what problem space]
- **Competitors researched:** [list with URLs visited]
- **Date:** [today's date]

---

## Market Landscape

### Table-Stakes Features (Every competitor has this — we MUST have it)
| Feature | Who Has It | How They Do It |
|---|---|---|
| ... | All/Most | Brief description of common approach |

### Competitive Advantages (Only 1-2 have it — opportunity to differentiate)
| Feature | Who Has It | Why It Matters |
|---|---|---|
| ... | Specific platform | Impact on user workflow |

### Emerging Trends (New launches, beta features — where the market is heading)
| Feature | Who's Doing It | Status |
|---|---|---|
| ... | Platform | GA / Beta / Announced |

---

## Competitor Deep Dives

### <Competitor 1 Name>
- **URL:** [page scraped]
- **How they solve this:** [description of their approach]
- **User flow:** [step-by-step workflow they offer]
- **AI features:** [what AI/automation they provide]
- **Integrations:** [what this connects to]
- **Pricing tier:** [which plan includes this]
- **What we can learn:** [key takeaway for our product]

### <Competitor 2 Name>
...

---

## AI Opportunities

### Already Standard (competitors offer AI here — we should too)
1. **[Capability]** — [Which competitors] do this. [How it works]. [Why users expect it].

### Differentiators (few/no competitors — our chance to lead)
1. **[Capability]** — [Why this matters for our users]. [Technical feasibility note].

### Future Bets (emerging, not yet mainstream)
1. **[Capability]** — [Who's experimenting]. [Potential impact].

---

## Enriched Requirements

### Requirements Confirmed by Market
- [Existing requirement] — validated: [X competitors do this the same way]

### Requirements to Strengthen
- [Existing requirement] → **Enhancement:** [what competitors add that we should consider]

### Missing Requirements (gaps vs market)
- **[New requirement]** — [Why: X of Y competitors offer this]. [User impact]. [Priority: Must-have / Should-have / Nice-to-have]

### Requirements That Are Already Differentiating
- [Existing requirement] — [Few competitors do this; it's a strength to emphasize]

---

## User Flow Recommendations

### Current Flow (from requirements)
1. [Current step 1]
2. [Current step 2]
...

### Recommended Flow (informed by competitors)
1. [Improved step 1] — *[why, based on which competitor]*
2. [New step] — *[added because X competitor shows this reduces friction]*
...

### Key Flow Differences
| Step | Current | Recommended | Rationale |
|---|---|---|---|
| ... | ... | ... | Based on [competitor] |

---

## Recommendations for PRD

### Must Include (table-stakes gaps)
1. [Feature/flow to add] — every competitor has this

### Should Include (competitive advantage)
1. [Feature/flow to add] — [specific competitor] does this well

### Consider for V2 (emerging/differentiating)
1. [Feature/flow] — forward-looking, not blocking V1

### Integration Points to Plan For
1. [Integration] — [which competitors support it, why users need it]
```

---

## Step 6: User Decision

Present the competitive brief and ask:
1. **Proceed to PRD** — Use the enriched requirements as input to `requirements-to-prd`
2. **Deep dive** — Research a specific competitor or feature area more thoroughly
3. **Adjust scope** — Add/remove requirements based on findings before PRD

## Rules

1. **Actually scrape.** Don't rely on general knowledge — use `WebFetch` to get current competitor pages. Features change frequently, especially AI capabilities.
2. **Be specific about sources.** "Mosaic offers AI capacity forecasting (source: mosaicapp.com/features/ai)" not "some competitors have AI."
3. **Prioritize AI research.** AI features are the fastest-moving area — what was true 6 months ago is outdated. Always check recent changelogs/blogs.
4. **Japanese market matters.** Always include at least 1-2 Japanese competitors (SmartHR, freee, KING OF TIME, Jobcan) for JP-specific feature patterns.
5. **Don't overwhelm.** Research 4-6 most relevant competitors, not all 20. Pick based on feature area.
6. **Flag freshness.** If a competitor page looks outdated or thin, note it. Don't treat sparse marketing copy as authoritative.
7. **User flows over feature lists.** "How does the user do X?" is more valuable than "does it support X?" — the flow details inform our PRD.
8. **Pricing signals matter.** If every competitor puts a feature in their free tier, it's table-stakes. If it's enterprise-only, it's premium positioning.
