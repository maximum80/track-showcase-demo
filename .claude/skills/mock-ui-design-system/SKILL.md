---
name: mock-ui-design-system
description: Enforce Track Workforce mock UI design consistency. Use before building any new page, component, or feature in the mock/ folder. Covers colors, typography, components, layout, i18n, data patterns, and page conventions.
metadata:
  author: hit
  version: "2.0.0"
---

# Track Workforce Mock UI Design System

This skill defines the design system extracted from the existing mock UI codebase (`mock/src/`). **Every new page, component, or feature MUST follow these conventions** to maintain visual and structural consistency.

---

## 1. Color System (Tailwind tokens from `tailwind.config.ts`)

### Semantic Colors
| Token | Hex (DEFAULT) | Usage |
|-------|---------------|-------|
| `primary` | `#1A58AF` | Primary actions, active states, links, focus rings |
| `secondary` | `#4bcacb` | Secondary accents, department icons |
| `positive` | `#288f73` | Success states, high utilization, won forecast |
| `negative` | `#d84642` | Errors, danger actions, overallocation |
| `warning` | `#fab631` | Warnings, medium states, negotiation |
| `accent` | `#eb6200` | Highlight accent (rarely used) |
| `neutral` | `#8e9094` | Text, borders, backgrounds, muted states |

### Sidebar-Specific
| Token | Value | Usage |
|-------|-------|-------|
| `sidebar-bg` | `#FBFCFE` | Sidebar background |
| `sidebar-hover` | `#f0f4fa` | Nav item hover |
| `sidebar-active` | `#e4eefb` | Active nav item bg (same as `primary-50`) |
| `sidebar-text` | `#42474d` | Default sidebar text |
| `sidebar-text-active` | `#1A58AF` | Active nav text (same as `primary`) |

### Surface
| Token | Value | Usage |
|-------|-------|-------|
| `surface` | `#FFFFFF` | Page/card backgrounds |
| `surface-muted` | `#f7f8f8` | Kanban columns, subtle backgrounds |
| `surface-border` | `#e6e6e7` | Default border color for all elements |

### Color Scale Convention
Every semantic color has shades: `50, 100, 200, 300, 400, 500 (DEFAULT), 600, 700, 800, 900`. Use:
- **50**: Light backgrounds (icon containers, badges)
- **100-200**: Borders for badges, subtle fills
- **500 (DEFAULT)**: Primary usage
- **600-700**: Hover/active states, darker text on light backgrounds

### Badge Variant → Color Mapping
```
default  → bg-neutral-100 text-neutral-700
success  → bg-positive-50 text-positive-700 border-positive-200
warning  → bg-warning-50 text-warning-700 border-warning-200
danger   → bg-negative-50 text-negative-700 border-negative-200
info     → bg-primary-50 text-primary-700 border-primary-200
muted    → bg-neutral-50 text-neutral-500
```

---

## 2. Typography (Tailwind fontSize from `tailwind.config.ts`)

| Token | Size / Weight | Usage |
|-------|---------------|-------|
| `text-kpi` | 28px / bold | KPI large numbers |
| `text-page-title` | 24px / bold | Page titles (rarely used — Header uses `text-section`) |
| `text-section` | 16px / semibold | Section headers, modal/sheet titles, Header h1 |
| `text-body` | 14px / normal | Default body text, table cells, nav items |
| `text-caption` | 12px / normal | Labels, secondary text, table headers, filter labels |
| `text-tiny` | 11px / normal | Timestamps, badge text, tooltips, helper text |

### Font Stack
```
Inter, Noto Sans JP, Hiragino Kaku Gothic ProN, Yu Gothic, Meiryo, sans-serif
```

### Japanese Text
```css
:lang(ja) { line-height: 1.75; word-break: break-all; }
```

---

## 3. Spacing & Layout

### Page Layout (`AppLayout.tsx`)
```
┌──────────┬────────────────────────────────────┐
│ Sidebar  │ Header (h-14, border-b)            │
│ w-[224px]│──────────────────────────────────── │
│ or       │ Content area                        │
│ w-[56px] │ px-6 py-4 gap-6 (flex-col)         │
│          │                                     │
└──────────┴────────────────────────────────────┘
```

- **Sidebar collapsed**: `w-[56px]`; **expanded**: `w-[224px]`
- **Header height**: `h-14` (56px)
- **Content padding**: `px-6 py-4`
- **Section gap**: `gap-6` (24px) between major sections
- **Card padding**: `p-5` (20px) via `Card.Body`

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| `rounded-card` | 8px | Cards, modals |
| `rounded-btn` | 8px | Buttons (via `rounded-lg`) |
| `rounded-lg` | 8px | Inputs, selects, dropdowns |
| `rounded-full` | 9999px | Avatars, badges, progress bars, dots |

### Common Spacing Patterns
- **Between items in a row**: `gap-2` (8px) or `gap-3` (12px)
- **Between form fields**: `space-y-5` (20px)
- **Table cell padding**: `px-3 py-3` (body), `px-5` (first column)
- **Icon container**: `w-8 h-8 rounded-lg bg-{color}-50` with `{Icon} size={16} text-{color}-500`

---

## 4. Component Library (`components/ui/index.tsx`)

### Button
```tsx
<Button variant="primary|secondary|ghost|danger|outline" size="sm|md|lg" icon={LucideIcon}>
```
- **Always** use `Button` from ui — never raw `<button>` for actions
- Default: `variant="primary" size="md"`
- Ghost for back navigation, secondary for less emphasis
- Size `sm`: `h-9 px-3`; `md`: `h-12 px-4`; `lg`: `h-12 px-6`

### Badge
```tsx
<Badge variant="default|success|warning|danger|info|muted" dot>{label}</Badge>
```
- Use `dot` prop for status indicators (project status, talent status)
- Pill shape: `rounded-full`, `text-tiny font-medium`

### Status Badges (Compound)
```tsx
<ProjectStatusBadge status={status} />    // active→success, planning→info, on_hold→warning
<ForecastBadge stage={stage} />           // won→success, negotiation→warning, proposal→info
<TalentStatusBadge status={status} />     // available→success, assigned→info
<AssignmentPhaseBadge phase={phase} />    // active→success, proposed→muted
```
- Access via compound: `StatusBadge.Project`, `StatusBadge.Forecast`, etc.

### Card
```tsx
<Card className="optional"><Card.Body className="optional">{content}</Card.Body></Card>
```
- `bg-white rounded-card border border-neutral-100`
- Body: `p-5`
- For colored accent bar: wrap Card in `relative` div with `absolute top-0 left-0 right-0 h-1 rounded-t-card` div

### Sheet (Slide-over Panel)
```tsx
<Sheet open={bool} onClose={fn} title="Title" width="w-[480px]">{form content}</Sheet>
```
- Right-aligned slide-over
- Sticky header with close button
- Default width: `w-[480px]`
- Use for create/edit forms (see `ProjectEditSheet` pattern)

### Modal
```tsx
<Modal open={bool} onClose={fn} title="Title" size="sm|md|lg">{content}</Modal>
```
- Centered overlay with `bg-black/40 backdrop-blur-sm`
- Sizes: `max-w-md`, `max-w-xl`, `max-w-3xl`

### Tabs
```tsx
<Tabs tabs={[{ id, label, icon?, count? }]} active={id} onChange={fn} />
```
- Bottom border style, `border-b-2`
- Active: `border-primary text-primary`
- Count badge: `rounded-full` pill next to label

### Input / Select / SearchInput
```tsx
<Input label="Label" error="Error" icon={Icon} />
<Select label="Label" options={[{ value, label }]} />
<SearchInput value={v} onChange={fn} placeholder="..." />
```
- Height: `h-9`
- Border: `border-neutral-100`
- Focus: `ring-2 ring-primary/30 border-primary`

### Avatar / AvatarGroup
```tsx
<Avatar name="Name" size="sm|md|lg" />
<AvatarGroup names={[...]} max={3} />
```
- Deterministic color from name hash
- Sizes: sm=28px, md=36px, lg=48px
- Group: `-space-x-2` overlap with `ring-2 ring-white`

### ToggleGroup (View Switcher)
```tsx
<ToggleGroup options={[{ id, label, icon }]} value={v} onChange={fn} />
```
- Used for List/Kanban view switching
- Active: `bg-primary text-white`

### Other Components
- `ProgressBar`: `h-2 rounded-full bg-neutral-100` with colored fill
- `UtilizationBar`: Color-coded by threshold (>100 negative, >=80 positive, >=50 warning)
- `SkillBadge`: Name + 5-dot level indicator
- `Collapsible`: Expandable section with chevron + uppercase title
- `Tooltip`: Hover tooltip with `bg-neutral-900 text-white rounded-lg`
- `Checkbox`: Custom styled with primary fill when checked
- `DensityToggle`: Visual bar-height selector (compact/default/comfortable)
- `EmptyState`: Centered icon + title + optional description for empty data

---

## 5. Page Structure Conventions

### Page Header Pattern
```tsx
<div className="flex items-center justify-between">
  <h1 className="text-page text-neutral-900">{title}</h1>
  <Button icon={Plus} onClick={action}>{actionLabel}</Button>
</div>
```

### Toolbar Pattern (Filters + Search)
```tsx
<div className="flex flex-wrap items-center gap-3">
  <div className="w-64"><SearchInput ... /></div>
  <Select ... className="w-36" />
  <Select ... className="w-36" />
  <div className="ml-auto"><ToggleGroup ... /></div>
</div>
```

### Detail Page Pattern
1. Back button: `<Button variant="ghost" size="sm" icon={ArrowLeft}>`
2. Header card with colored accent bar
3. Tabs component
4. Tab content panels (conditional rendering)

### Table Pattern
```tsx
<Card>
  <table className="w-full text-body">
    <thead>
      <tr className="border-b border-neutral-100 text-left text-caption text-neutral-500 font-medium">
        <th className="px-5 py-3">...</th>  {/* first col has px-5 */}
        <th className="px-3 py-3">...</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/60 transition-micro cursor-pointer">
        <td className="px-5 py-3">...</td>
        <td className="px-3 py-3">...</td>
      </tr>
    </tbody>
  </table>
</Card>
```

### Hover Actions Pattern
```tsx
<td className="px-3 py-3">
  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-micro">
    <button className="p-1.5 rounded hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600">
      <Icon size={14} />
    </button>
  </div>
</td>
```

### Info Card Pattern (Detail Page Overview)
```tsx
<Card><Card.Body>
  <div className="flex items-center gap-3 mb-3">
    <div className="w-8 h-8 rounded-lg bg-{color}-50 flex items-center justify-center">
      <Icon size={16} className="text-{color}-500" />
    </div>
    <span className="text-caption font-medium text-neutral-500">{label}</span>
  </div>
  <p className="text-body font-medium text-neutral-900">{value}</p>
</Card.Body></Card>
```

### Kanban Column Pattern
```tsx
<div className="flex flex-col bg-neutral-50/80 rounded-lg border border-neutral-100 min-h-[320px]">
  {/* Header */}
  <div className="px-4 py-3 border-b border-neutral-100">
    <span className="text-caption font-semibold text-neutral-700 uppercase tracking-wide">{title}</span>
    <span className="text-tiny font-medium text-neutral-400 bg-neutral-200/60 px-1.5 py-0.5 rounded-full">{count}</span>
  </div>
  {/* Cards */}
  <div className="flex-1 p-3 space-y-2.5 overflow-y-auto">
    <div className="bg-white rounded-lg border border-neutral-100 p-3.5 shadow-sm hover:shadow-md hover:border-neutral-300 transition-all duration-150 cursor-pointer">
      ...
    </div>
  </div>
</div>
```

---

## 6. Stacking Detail Panel Pattern (Primary Navigation)

**The overall movement of the app is to open right-side panels to show detail.** This is the PRIMARY navigation pattern — clicking a list item opens a detail panel that slides in from the right edge of the content area instead of navigating to a new page.

### Architecture (`components/layout/PanelStack.tsx`)

```
State 1: List only
┌──────────┬──────────────────────────────────┐
│ Sidebar   │ List content (full width)         │
└──────────┴──────────────────────────────────┘

State 2: Project panel slides in from right
┌──────────┬───────────────┬──────────────────┐
│ Sidebar   │ List (dimmed)  │ Project Detail    │
│           │               │ Panel (480px)     │
└──────────┴───────────────┴──────────────────┘

State 3: Contract stacks, project peeks on far right
┌──────────┬────────┬──────────────────┬──────┐
│ Sidebar   │ List   │ Contract Detail   │ Proj │
│           │ dimmed │ Panel (480px)     │ peek │
│           │        │                   │ 48px │
└──────────┴────────┴──────────────────┴──────┘
```

### How It Works
- **Panels stick to the right edge** and slide in from the right (`panel-slide-in-right` CSS animation)
- **Hierarchy stacks rightward**: deeper detail = new active panel, previous panel compresses to a **peek strip** (48px vertical bar with rotated title) on the far right
- **Peek strip click**: closes all panels above, restoring that panel as active
- **Dimmed area click** (left side): closes all panels
- **Escape key**: closes the top panel
- **Route change**: automatically closes all panels

### Context API (`usePanelStack`)
```tsx
import { usePanelStack } from '../../components/layout/PanelStack'

const { push, pop, closeTo, closeAll, isOpen } = usePanelStack()

// Open a detail panel
push({
  id: `project-${project.id}`,     // unique ID (prevents duplicates)
  title: project.name,              // peek strip label (EN)
  titleJa: project.nameJa,         // peek strip label (JA)
  color: project.color,             // accent color for peek strip + top bar
  content: <ProjectDetailPanel projectId={project.id} />,
})

// Open a child panel (stacks on top)
push({
  id: `contract-${contract.id}`,
  title: contract.name,
  titleJa: contract.nameJa,
  color: project.color,             // inherit parent's color
  content: <ContractDetailPanel projectId={project.id} contractId={contract.id} />,
})
```

### Panel Content Component Pattern
Panel content components receive entity IDs as props (NOT from `useParams`):

```tsx
export function ProjectDetailPanel({ projectId }: { projectId: string }) {
  const { t, i18n } = useTranslation()
  const { push } = usePanelStack()

  // Header: text-section title + subtitle + badges (no back button)
  // Tabs: same tabs as full page
  // Contract click: push({ content: <ContractDetailPanel ... /> })
  // Grid: 2-column (narrower than full page's 3-column)
  // Card.Body: p-4 (tighter than full page's p-5)
  // Icon containers: w-7 h-7 with size={14} (smaller than full page)
}
```

### Panel Sizing
| Element | Width | Notes |
|---------|-------|-------|
| Full panel | `720px` | Wider than Sheet (480px) for detail content |
| Peek strip | `48px` | Shows vertical rotated title |
| Color accent (peek) | `3px` right bar | Uses `panel.color` |
| Color accent (panel) | `h-1` top bar | Uses `panel.color` |

### When to Use Panels vs Routes
| Interaction | Use |
|-------------|-----|
| List row click | **Panel** (`push()`) |
| Kanban card click | **Panel** (`push()`) |
| Hover action Eye icon | **Panel** (`push()`) |
| Direct URL access (`/projects/:id`) | **Route** (full page still works) |
| Sidebar navigation | **Route** (closes all panels) |

### Panel vs Full-Page Adjustments
| Aspect | Full Page | Panel (480px) |
|--------|-----------|---------------|
| Grid columns | 3-col (`xl:grid-cols-3`) | 2-col (`grid-cols-2`) |
| Card padding | `p-5` | `p-4` |
| Icon container | `w-8 h-8`, `size={16}` | `w-7 h-7`, `size={14}` |
| Table font | `text-body` | `text-caption` |
| Section gap | `space-y-6` | `space-y-5` |
| Header | `text-page` + back button | `text-section` (no back button) |

### Stacking Hierarchy Convention
Always maintain parent → child ordering when opening multiple panels:
```tsx
// From list: open project, then contract on top
pushPanel({ id: `project-${p.id}`, ... })
pushPanel({ id: `contract-${c.id}`, ... })

// From project panel: only push contract
push({ id: `contract-${c.id}`, ... })
```

### Files
- `components/layout/PanelStack.tsx` — Context, provider, container, peek strips
- `pages/projects/ProjectDetailPanel.tsx` — Project detail panel content
- `pages/projects/ContractDetailPanel.tsx` — Contract detail panel content

---

## 7. Project → Contract Hierarchy Patterns

The app uses a `Project → Contract → Assign` model. Projects are containers; contracts are the working units.

### Data Model
```tsx
interface Contract {
  id: string           // prefixed: 'c1', 'c2'
  projectId: string    // FK to Project
  name: string
  nameJa: string
  contractCode: string // format: CT-YYYY-NNN-NN (font-mono)
  status: 'draft' | 'active' | 'completed' | 'cancelled'
  contractType: 'initial' | 'renewal' | 'addition' | 'one_off'
  periodStart: string
  periodEnd: string
  amount: number       // raw yen
  winProbability: number
}
```

### Badge Components (locale-aware)
```tsx
<ContractStatusBadge status={c.status} locale={i18n.language} />
<ContractTypeBadge type={c.contractType} locale={i18n.language} />
```
- **ContractStatusBadge**: active→success, draft→info, completed→muted, cancelled→danger (with dot)
- **ContractTypeBadge**: initial→info, renewal→success, addition→warning, one_off→muted (no dot)
- Both accept `locale` prop for EN/JA label switching

### Project List — Expandable Contract Rows
```tsx
// Chevron expand button (accessibility-compliant)
<button
  aria-expanded={isExpanded}
  aria-label={isExpanded ? t('common.collapse') : t('common.expand')}
  className="w-7 h-7 flex items-center justify-center rounded
    hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600
    focus:outline-none focus:ring-2 focus:ring-primary/30"
>
  {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
</button>

// Contract sub-row styling
<tr className="bg-neutral-50/40 hover:bg-neutral-100/50 transition-micro cursor-pointer">
  <td className="px-3 py-2.5 pl-8"> {/* indented */}
    <FileText size={13} className="text-neutral-400" />
    <span className="font-medium text-neutral-700 text-caption">{name}</span>
  </td>
  <td className="text-caption text-neutral-400 font-mono">{contractCode}</td>
</tr>

// Empty expanded state
<tr className="bg-neutral-50/40">
  <td colSpan={N} className="px-5 py-4 text-center text-caption text-neutral-400">
    {t('contracts.no_contracts')}
  </td>
</tr>
```

### Routing Convention
```
/projects                              → Project list
/projects/:id                          → Project detail (4 tabs)
/projects/:id/contracts/:contractId    → Contract detail (4 tabs)
```

### Project Detail Tabs
`Overview | Contracts (count badge) | Staffing (Cross) | QCD`

### Contract Detail Tabs
`Overview | Staffing Plan | Assignments (count badge) | Activity`

### Back Navigation
- Contract → Project: `← Back to Project — {projectName}`
- Project → List: `← Back to Projects`

### Computed Fields (Project Level)
- **Total Amount**: `SUM(contracts.amount)` — displayed with `formatBudget()`
- **Period**: `MIN(contracts.periodStart)` – `MAX(contracts.periodEnd)`
- **Contract Count**: shown as `Badge variant="info"`

### QCD Table Pattern
```tsx
// Grade badges: A=positive, B=warning, C=negative
<span className={cn(
  'inline-flex items-center justify-center w-8 h-8 rounded-lg font-semibold text-caption',
  grade === 'A' ? 'text-positive-600 bg-positive-50' :
  grade === 'B' ? 'text-warning-600 bg-warning-50' :
  'text-negative-600 bg-negative-50'
)}>
  {grade}
</span>
```

### Cross-Contract Staffing Pattern
One `Card` per contract, each containing its own man-month grid table. Card header shows contract name, code, period, and amount.

### Translation Domain
All contract keys use `contracts.*` prefix:
`contracts.title`, `contracts.add`, `contracts.code`, `contracts.type`, `contracts.amount`, `contracts.total_amount`, `contracts.win_probability`, `contracts.count`, `contracts.overview`, `contracts.staffing_cross`, `contracts.qcd`, `contracts.back_to_project`, `contracts.date`, `contracts.comment`

---

## 8. Accessibility Conventions

### Focus Rings
All interactive elements must have visible focus indicators:
```tsx
className="focus:outline-none focus:ring-2 focus:ring-primary/30"
// Danger variant:
className="focus:outline-none focus:ring-2 focus:ring-negative/30"
```

### Action Buttons (touch-target compliant)
```tsx
<button
  className="w-8 h-8 flex items-center justify-center rounded-lg
    hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600
    focus:outline-none focus:ring-2 focus:ring-primary/30"
  aria-label={t('common.edit')}
>
  <Icon size={15} />
</button>
```
- Minimum `w-7 h-7` (28px) for inline actions, `w-8 h-8` (32px) preferred
- Always add `aria-label` on icon-only buttons
- Use `focus-within:opacity-100` on hidden action groups to reveal on keyboard focus

### Expand/Collapse
- Always use `aria-expanded={boolean}` on toggle buttons
- Provide `aria-label` that describes the action

### Screen Reader
- QCD grade columns: use `aria-label` on `<th>` for full label (e.g., "Quality")
- Staffing plan inputs: `aria-readonly="true"` + descriptive `aria-label`

---

## 9. Bilingual (i18n) Conventions

### Translation Setup
- Library: `i18next` + `react-i18next`
- Files: `locales/en.ts`, `locales/ja.ts` (flat key-value objects)
- Key pattern: `{domain}.{key}` — e.g., `projects.title`, `common.save`, `nav.dashboard`

### In Components
```tsx
const { t, i18n } = useTranslation()
const isJa = i18n.language === 'ja'

// For static labels (menus, buttons, column headers):
t('projects.title')

// For data fields with dual language:
isJa ? project.nameJa : project.name
isJa ? project.clientJa : project.client
```

### Data Model Convention
Every user-facing string field has a bilingual pair:
```tsx
interface Project {
  name: string      // English
  nameJa: string    // Japanese
  client: string
  clientJa: string
}
```

### Adding New Translation Keys
1. Add to BOTH `locales/en.ts` and `locales/ja.ts`
2. Use consistent domain prefix (e.g., `contracts.title`, `contracts.add`)
3. Never hardcode user-facing strings — always use `t()` or `isJa` pattern

---

## 10. Data & State Patterns

### Mock Data (`mock-data.ts`)
- All mock data lives in one file, exported as named constants
- IDs: short prefixed strings (`p1`, `t1`, `a1`)
- Bilingual fields on all user-facing records
- Amounts in raw yen (e.g., `15000000`), formatted by `formatBudget()`

### Format Helpers (defined per-page, not shared)
```tsx
function formatBudget(amount: number): string {
  const man = amount / 10000
  if (man >= 10000) return `¥${(man / 10000).toFixed(1)}億`
  return `¥${man.toLocaleString()}万`
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}`
}
```

### State Management
- **No global store** — each page manages its own state via `useState`
- **Context pattern** for sheet/modal state shared between list and form:
  ```tsx
  const SheetContext = createContext(...)
  function SheetProvider({ children }) { ... }
  function useSheet() { return useContext(SheetContext) }
  ```
- **Outlet context** for cross-page state (persona, dark mode):
  ```tsx
  <Outlet context={{ persona, dark }} />
  ```

### Routing & Navigation
- React Router v6 with `useNavigate()` and `useParams()` for full-page routes
- **Primary**: List → Detail uses **stacking panels** via `usePanelStack().push()` (see §6)
- **Fallback**: Direct URL routes (`/projects/:id`) still render full-page detail views
- Panel-based detail components receive entity IDs as props, not from `useParams()`
- Route changes automatically close all open panels

---

## 11. CSS Conventions (`index.css`)

### Transition Utilities
```css
.transition-micro { transition: all 150ms ease; }     /* UI interactions */
.transition-panel { transition: all 250ms ease-out; }  /* Panel sliding */
```

### Scrollbar
```css
.scrollbar-thin  /* Thin scrollbar for sidebar and panels */
.hidden-scrollbar /* No visible scrollbar */
```

### Component Classes
```css
.kanban-col     /* bg-surface-muted rounded-card min-w-[280px] */
.kpi-card       /* bg-white rounded-card border p-5 with hover shadow */
.gantt-bar      /* Resource grid bar styles */
.frozen-shadow  /* Shadow for frozen left columns in grids */
```

### Density Variants
```css
.density-compact .table-row     { h-8 text-caption }
.density-default .table-row     { h-10 text-body }
.density-comfortable .table-row { h-12 text-body }
```

---

## 12. Icon Conventions

- **Library**: `lucide-react` (exclusively)
- **Sizes**:
  - Navigation icons: `size={18}` (sidebar), `size={15}` (nested nav)
  - Button icons: `size={14}` (sm), `size={16}` (md/lg)
  - Inline/action icons: `size={14}`
  - Icon containers (info cards): `size={16}` inside `w-8 h-8` container
  - Empty state: `size={24}` inside `w-12 h-12` container
- **Never** use icon libraries other than `lucide-react`

---

## 13. Animation

| Name | Keyframes | Usage |
|------|-----------|-------|
| `animate-slide-in` | translateX(-100%) → 0 | Sheet panels |
| `animate-fade-in` | opacity 0 → 1 | Flyout popovers |
| `animate-scale-in` | scale(0.95) + opacity 0 → 1 | Modals, dropdowns |

---

## 14. Do's and Don'ts

### DO
- Use existing `ui/index.tsx` components — extend them if needed
- Follow bilingual pattern for ALL user-facing text
- Use semantic color tokens (`positive`, `negative`, `warning`) not raw hex
- Use `cn()` utility for conditional classes
- Keep format helpers in the page file (not shared)
- Use `Card` for content containers, `Sheet` for forms, `Modal` for confirmations
- Use `transition-micro` on interactive elements

### DON'T
- Create new color values outside the Tailwind config
- Use raw `<button>` or `<input>` without wrapping in ui components
- Hardcode strings — always use `t()` or `isJa` ternary
- Use npm packages for icons — only `lucide-react`
- Add global state management (Redux, Zustand) — use local state + context
- Use `px` values directly in className — use Tailwind spacing scale
- Skip the `hover:bg-neutral-50/60 transition-micro` pattern on table rows
