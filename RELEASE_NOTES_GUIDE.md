# Release Notes Guide

How to create release notes for LinkAI from Jira tickets.

---

## Quick Start

1. Gather features from Jira
2. Convert to LO-friendly language
3. Add to `/releases` page
4. Create detail page (optional)
5. Deploy

---

## Step 1: Gather Features from Jira

### What to look for in Jira tickets:

| Jira Field | What to Extract |
|------------|-----------------|
| **Summary** | Feature name |
| **Description** | Technical details to translate |
| **Acceptance Criteria** | What it does for users |
| **Epic** | Group related features |
| **Fix Version** | Release version (e.g., 1.6, 2.2) |

### Example Jira ticket → Release note:

**Jira:**
```
Summary: Add Suffix dropdown to HELOC submission
Description: Add a Suffix dropdown under Applicant Name. 
Values: I, II, III, IV, V, Jr, Sr. Optional field.
Include selected value in Figure submission under {{applicant.name.suffix}}
```

**Release note:**
```
Name Suffix — Add Jr, Sr, II, III to applicant names
```

---

## Step 2: Convert to LO-Friendly Language

### Translation Guide

| Technical Term | LO-Friendly Version |
|----------------|---------------------|
| UI redesign | Easier navigation |
| Left navigation panel | Find any section in one click |
| Scenarios configuration | Compare loan options |
| Short 1003 submission | Quick application |
| API integration | Works automatically |
| Enum mapping | Matches Figure's system |
| Default value | Auto-selected / Smart default |
| Hidden field | Cleaner form |
| Validation | Reduces errors |

### Writing Tips

1. **Lead with the benefit**, not the feature
   - ❌ "Added suffix dropdown"
   - ✅ "Add Jr, Sr, II, III to names"

2. **Use action words**
   - ❌ "New navigation panel"
   - ✅ "Find any section in one click"

3. **Keep it short** — aim for 8 words or less per bullet

4. **Avoid jargon**
   - ❌ "Enum mapping for employment type"
   - ✅ "Updated job status options"

---

## Step 3: Add to /releases Page

### File: `app/releases/page.tsx`

Add new release to the `releases` array:

```typescript
{
  version: "1.6",
  date: "February 2026",
  slug: "v1-6",                    // URL path
  title: "HELOC Submission Updates",
  summary: "Smoother HELOC submissions with better name options and smart defaults",
  status: "released",              // "released" or "upcoming"
  month: "February",
  year: "2026",
  color: "teal",                   // See color options below
  bullets: [
    { icon: UserPlus, text: "Name Suffix — Add Jr, Sr to names" },
    { icon: Briefcase, text: "Employment Options — Updated job status list" },
    // ... more bullets
  ],
},
```

### Available Colors

| Color | Use For |
|-------|---------|
| `orange` | Major releases, upcoming features |
| `blue` | Data/intelligence features |
| `teal` | HELOC/submission updates |
| `purple` | AI features |
| `emerald` | Performance/efficiency |
| `amber` | Forms/applications |

### Available Icons

Import from `lucide-react`:
- `Layout` — UI/navigation
- `Sparkles` — AI/comparison
- `FileText` — Documents/forms
- `Bot` — AI assistants
- `UserPlus` — User/name fields
- `Briefcase` — Employment
- `DollarSign` — Money/income
- `MapPin` — Address/location
- `Home` — Property
- `Lock` — Security/liens

---

## Step 4: Create Detail Page (Optional)

For major releases, create a dedicated page.

### File Structure

```
app/
  v1-6/
    page.tsx      ← Detail page for V1.6
  v2-2/
    page.tsx      ← Detail page for V2.2
  releases/
    page.tsx      ← Main releases list
```

### Detail Page Template

Copy from an existing page (e.g., `app/v1-6/page.tsx`) and update:

1. **Email content** — Plain text and HTML versions
2. **Features array** — List of features with:
   - `id` — URL anchor
   - `icon` — Lucide icon
   - `title` — Feature name
   - `summary` — One-line description
   - `description` — Full explanation
   - `details` — Bullet points
   - `howItHelps` — Benefit statement
   - `color` — Theme color

3. **Header** — Version number, date, status badge

---

## Step 5: Deploy

```bash
# From project root
git add -A
git commit -m "Add V1.6 release notes"
git push origin main
```

Vercel auto-deploys on push to main.

---

## Templates

### Quick Release (No Detail Page)

Just add to `releases` array in `app/releases/page.tsx`.

### Full Release (With Detail Page)

1. Add to `releases` array
2. Create `app/v{version}/page.tsx`
3. Add screenshots to `public/Screenshots/` (if needed)

---

## Checklist

Before publishing:

- [ ] Version number is correct
- [ ] Date is correct
- [ ] Status is correct (`released` or `upcoming`)
- [ ] All bullets are LO-friendly (no jargon)
- [ ] Icons make sense for each feature
- [ ] Detail page link works (if applicable)
- [ ] Email copy is updated (if detail page)
- [ ] Screenshots are added (if needed)

---

## Examples

### Good Release Notes

✅ **V1.6 — HELOC Submission Updates**
- Name Suffix — Add Jr, Sr, II, III to names
- Employment Options — Updated job status list
- Simplified Income — Cleaner form
- Smart Defaults — Primary residence auto-selected

### Bad Release Notes

❌ **V1.6 — Backend Changes**
- Added suffix enum to API payload
- Fixed employment type mapping for Figure integration
- Removed deprecated income field from UI
- Set default occupancy_type value

---

## Questions?

Contact the development team or use the Feedback button in LinkAI.
