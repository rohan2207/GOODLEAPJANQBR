# V3.0 Screenshots

Upload screenshots here before or after deployment. The release notes page renders clearly labeled placeholder frames for any missing files — so the page is safe to deploy at any time.

## Folders & File Names

### Full 1003 Application — `full-1003/`

| File name | What to capture |
|-----------|-----------------|
| `borrower-info.png` | Borrower Information section of the 1003 |
| `income-assets.png` | Income & Assets section |
| `declarations.png` | Declarations section |

### Smart Panel — `smart-panel/`

| File name | What to capture |
|-----------|-----------------|
| `panel-open.png` | Smart Panel open — showing credit & property summary |
| `panel-alerts.png` | Smart Panel — alerts view |

### Smart Credit — `smart-credit/`

| File name | What to capture |
|-----------|-----------------|
| `overview.png` | Smart Credit AI summary overview screen |
| `derogatory-flags.png` | Derogatory marks highlighted in the report |
| `talking-points.png` | AI-generated borrower talking points |

## Screenshot Guidelines

- **Format:** PNG or JPEG
- **Ideal size:** 1440×900 or 1280×800 (16:9)
- **Hide any real borrower PII** — use test loan data
- **Reference paths in code:** `/Screenshots/v3-0/<folder>/<file>.png`

> Note: Next.js serves `public/` at `/` — so `public/screenshots/v3-0/foo.png` is accessed at `/screenshots/v3-0/foo.png` (lowercase). The code uses `/Screenshots/` (capital S) which works on macOS case-insensitive volumes. On Linux (production), keep casing consistent.
