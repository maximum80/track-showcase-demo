---
name: requirements-to-prd
description: Generate a structured PRD and TECH spec from feature requirements. Use when creating or updating documentation for a feature in mock/feature/<name>/. Consolidates scattered notes into the standard file set.
---

# Requirements to PRD

When invoked, generate structured documentation from the feature's requirements artifacts, then clean up the folder to the standard file set.

## Standard Feature Folder

Every feature folder (`mock/feature/<feature-name>/`) must contain exactly these files:

| File | Required | Purpose |
|---|---|---|
| `PRD.md` | Yes | Product requirements — epics, user stories, workflows, acceptance criteria, test plan, status |
| `TECH.md` | Yes | Technical specification — API endpoints, architecture, key components, implementation details, DB changes |
| `ui-reference.png` | If available | UI mockup or screenshot reference (one canonical image, clean filename) |

**No other files.** All scattered notes (user stories, todos, PR descriptions, infra docs) must be consolidated into PRD.md and TECH.md, then removed.

## Input Discovery

Scan the feature folder for any existing files:
- `.md` files — user stories, todos, PR descriptions, technical notes, brainstorm docs
- `*.png`, `*.jpg`, `*.gif` — UI references
- Any other artifacts

Read ALL discovered files including images before writing.

## Output: PRD.md

```markdown
# <Feature Name> — Product Requirements Document

## Overview
1-2 paragraph summary: what the feature does, who it's for, why it matters.

## Problem Statement
What pain point or inefficiency does this solve?

## Goals
Numbered list of measurable objectives.

---

## Epic N: <Epic Title>

### Feature N.M: <Feature Title>

**Description:** What it does.

**User:** Target user role.

**User Story:** Original user story text (preserve Japanese if present).

**Workflow:**
1. Step-by-step user interaction flow

**UI Reference:** Reference to ui-reference.png if applicable.

**Acceptance Criteria:**
- Testable criteria for completion

**Status:** Implemented | Planned | In Progress

---

## Non-Functional Requirements
- i18n, security, performance, data privacy considerations

## How to Test
Step-by-step test instructions (absorbed from PR descriptions/todos).

### Potential Regressions
- What existing behavior to verify is unchanged

## Implementation Status
| Feature | Status |
|---|---|
| ... | ... |
```

## Output: TECH.md

```markdown
# <Feature Name> — Technical Specification

## Architecture
- External APIs, internal endpoints, data flow

## Key Components & Files
| File | Purpose |
|---|---|
| ... | ... |

## Implementation Details

### <Feature N.M>
- Technical details, patterns used, edge cases handled

### DB Schema
- Schema changes or "No schema changes"

## PR Reference
- Links to PR demos, screenshots, videos
```

## Rules

1. **Bilingual content:** Preserve Japanese text from user stories. Include English translations where helpful.
2. **Consolidate everything:** All info from scattered files goes into PRD.md or TECH.md. Product-facing content (stories, workflows, acceptance criteria, test plans) → PRD.md. Technical content (APIs, components, architecture, DB, deployment) → TECH.md.
3. **Separate implemented vs planned:** Use completion markers from source files to determine status.
4. **Don't invent requirements:** Only document what's stated or strongly implied. Flag assumptions.
5. **Clean filenames:** Rename images to `ui-reference.png` (or `ui-reference-N.png` for multiple).
6. **Remove source files:** After consolidation, delete all non-standard files from the folder.

## Post-Consolidation

After writing PRD.md and TECH.md:
1. Rename UI images to clean names (`ui-reference.png`)
2. Delete all other files (todos.md, user-story.md, scattered notes, etc.)
3. Verify the folder contains only the standard files
4. Report summary: epics/features count, implemented vs planned, files removed
