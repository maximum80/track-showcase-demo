---
name: feature-readiness
description: Audit new features for system readiness — onboarding items, docs, i18n, changelog, and user-facing completeness. Use when a feature is built and needs a readiness check before shipping.
---

# Feature Readiness Audit

When invoked, perform a systematic readiness check for the specified feature. This ensures every new feature is properly introduced to users and documented.

## Checklist

### 1. Onboarding Impact
- Does this feature need an onboarding todo item in the Dashboard checklist?
- If yes, draft the onboarding item with:
  - English title + description (emphasize AI capabilities)
  - Japanese title + description
  - Icon (from Lucide icon set)
  - Link to the relevant page
- Check if `mock/src/mock-data.ts` `onboardingTodos` needs a new entry
- Check if `mock/src/locales/en.ts` and `ja.ts` need new `onboarding.*` keys

### 2. Documentation Completeness
- Does `docs/en/product/feature-catalog.md` include this feature?
- Does `docs/ja/product/feature-catalog.md` include this feature?
- Does `docs/en/product/roadmap.md` reflect current status?
- Does `docs/ja/product/roadmap.md` reflect current status?
- Does `docs/en/product/changelog.md` have an entry for this change?
- Does `docs/ja/product/changelog.md` have an entry for this change?
- Is the feature referenced in the relevant user guide under `docs/en/user-guides/` and `docs/ja/user-guides/`?

### 3. i18n Completeness
- Are ALL user-facing strings in both `mock/src/locales/en.ts` and `mock/src/locales/ja.ts`?
- Does mock data include both `name`/`nameJa`, `label`/`labelJa` pairs?
- Are date/number formats locale-aware?

### 4. Mock Data
- Is there representative mock data for the feature?
- Does the mock data cover edge cases (empty states, full states)?
- Are types defined in `mock/src/types.ts`?

### 5. UI Consistency
- Does the feature follow the design system (see `mock-ui-design-system` skill)?
- Are existing UI components from `mock/src/components/ui` used where possible?
- Is the feature accessible from navigation or discoverable from existing pages?

### 6. Audit Log
- Should this feature generate audit log entries?
- If yes, add entries to `mock/src/mock-data.ts` `auditLog` array

## Output Format

Present findings as a checklist with status:
- ✅ Complete
- ⚠️ Needs attention (with specific action)
- ❌ Missing (with specific action)

End with a summary of required actions, grouped by file.
