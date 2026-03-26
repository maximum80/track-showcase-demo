# Mock Base Template

A ready-to-use React mock app shell for building workforce management UI prototypes and demos. Ships with a sidebar, header, panel stack, command palette, full component library, and EN/JA i18n — all wired up. Just add pages.

## Stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** with a custom design token system
- **react-router-dom** v6 — file-based page structure
- **i18next** — English + Japanese out of the box
- **lucide-react** — icon set
- **recharts** — charts

---

## Quick Start

```sh
# 1. Clone
git clone git@github.com:givery-technology/track-common-ai-mock.git my-mock
cd my-mock

# 2. Install
pnpm install

# 3. Configure (optional — defaults work out of the box)
cp .env.example .env.local

# 4. Run
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) and sign in with:
- **Username:** `admin`
- **Password:** `password123`

That's it. The shell is running with 3 placeholder pages.

---

## Project Structure

```
src/
  App.tsx                   # Routes
  auth.ts                   # Session auth (env-based credentials)
  i18n.ts                   # i18next setup
  types.ts                  # Shared TypeScript types
  mock-data.ts              # Your app's mock data goes here
  index.css                 # Global styles + Tailwind
  components/
    layout/
      AppLayout.tsx         # Sidebar + Header + Outlet wrapper
      Sidebar.tsx           # Collapsible nav with tooltips/flyouts
      Header.tsx            # Breadcrumb + search + notifications
      PanelStack.tsx        # Slide-in detail panel system
      CommandPalette.tsx    # Cmd+K search
    ui/
      index.tsx             # Button, Badge, Avatar, Card, KpiCard, Input, Select, Tabs, ToggleGroup…
  locales/
    en.ts                   # English strings
    ja.ts                   # Japanese strings
  pages/
    auth/SignIn.tsx
    dashboard/Dashboard.tsx
    example/ExamplePage.tsx
    settings/SettingsPage.tsx
```

---

## Adding a New Page

1. Create `src/pages/your-feature/YourPage.tsx`
2. Add a route in `src/App.tsx`
3. Add a nav item in `src/components/layout/Sidebar.tsx`
4. Add a route title in `src/components/layout/AppLayout.tsx`
5. Add translation keys to `src/locales/en.ts` and `ja.ts`

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `VITE_BASE_PATH` | `/` | Router base path (for sub-path deployments) |
| `VITE_MOCK_USERNAME` | `admin` | Login username |
| `VITE_MOCK_PASSWORD` | `password123` | Login password |

---

## Building with Claude Code

This template is designed to be extended using Claude Code with the **`mock-ui-design-system`** skill.

### Setup

1. Make sure Claude Code is installed: `npm i -g @anthropic-ai/claude-code`
2. Copy the shared skills submodule into this project:

```sh
git submodule add git@github.com:givery-technology/track-common-ai-skills.git .claude/shared
mkdir -p .claude/skills
cd .claude/skills
ln -s ../shared/skills/mock-ui-design-system mock-ui-design-system
```

Or if the submodule is already configured:

```sh
git submodule update --init
# Then symlink as above
```

3. Open Claude Code in this directory:

```sh
claude
```

### Using the `mock-ui-design-system` Skill

The `mock-ui-design-system` skill teaches Claude the full design system — colors, typography, component APIs, layout conventions, i18n patterns, and the panel stack — so every page it generates matches the existing shell exactly.

Claude loads it automatically when you ask it to build anything in the `mock/` folder. You can also trigger it explicitly:

```
Build a Talent Pool page with a searchable table, status badges, and a detail panel that slides in on row click.
```

Claude will:
- Use the correct Tailwind tokens (`text-body`, `text-caption`, `bg-neutral-50`, `text-primary`, etc.)
- Wire up `usePanelStack()` for the detail panel
- Add `useTranslation()` with keys in both `en.ts` and `ja.ts`
- Follow the standard page layout (`flex flex-col gap-6`, card wrappers, section headers)
- Use the `Button`, `Badge`, `Avatar`, `SearchInput`, `Tabs` components from `components/ui`

### What the Skill Covers

| Section | What Claude learns |
|---|---|
| Color system | All semantic tokens: `primary`, `positive`, `negative`, `warning`, sidebar colors, surface colors |
| Typography | `text-kpi`, `text-section`, `text-body`, `text-caption`, `text-tiny` — when to use each |
| Layout conventions | Page padding, gap, card structure, header height, sidebar widths |
| Component APIs | All props for Button, Badge, Card, KpiCard, Avatar, Input, Select, Tabs, ToggleGroup |
| Panel stack | How to `push()` detail panels, peek strips, keyboard dismiss |
| i18n | How to add translation keys, bilingual field naming (`name`/`nameJa`) |
| Data patterns | Mock data shape, how to filter/sort in-memory |
| Do's and Don'ts | What NOT to do — avoids common mistakes like wrong colors, missing transitions, skipping i18n |

### Example Prompts

```
Build a Projects list page with list and kanban view modes, status filter chips,
and a detail panel that shows contract count and budget.
```

```
Add a Settings page with tabs for Members, Departments, and Audit Log.
Use the Tabs component and keep each tab's content in a separate component.
```

```
Create a Resource Grid page — a table with frozen first column, horizontal scroll,
and cells showing utilization percentage with color coding.
```

Claude will apply the design system skill automatically and produce code that drops straight into the running app.
