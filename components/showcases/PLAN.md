# Website Enhancement Plan

## What We Have

### Showcases (built, in `/components/showcases/`)
| File | What it shows |
|---|---|
| `ChatShowcase` | Chat conversation → thinking/reasoning → cited answer |
| `IndexingShowcase` | File upload → parse → analyze → bounding box detection |
| `FormExtractionShowcase` | Select files → 4 processing steps → form cards with badges |
| `KeywordExtractionShowcase` | Excel + PDF → Go/No-Go metrics → QA cards (satisfied/not) |
| `BidderAnalysisShowcase` | Folder inputs → recommendation → compliance table |
| `RfqMatchingShowcase` | RFQ + product catalog → match score bar → specs table |
| `L1EvaluationShowcase` | Folders + bids → winner trophy → rankings table |
| `ComplianceShowcase` | Folders → compliance % bar → bidder cards (found/missing) |

### Shared Utilities
- `AnimatedItem` — fade-in + translate-y wrapper
- `useStepAnimation` — generic step timer hook
- `index.ts` — barrel export

### Preview Page
- `/showcases` — temporary page showing all showcases stacked

### Background Layers (implemented)
- **Layer 0 — Dot Grid**: `fixed inset-0 z-0 opacity-[0.15]` radial gradient dots (24px grid)
- **Layer 1 — Floating Cards**: 3 glass panels with parallax scroll + drift animations (`opacity-40`, hidden below `lg`)
- **Layer 2 — Content**: `main` with `relative z-[1]`, footer wrapped with `relative z-[1]`
- Heroes have `bg-background` to block layers bleeding through gradients

---

## Visual Content Audit (page-by-page)

### HOME PAGE (`/`)

| Section | Current Visual | Type | Status |
|---|---|---|---|
| Hero | Aurora animation + text + CTA | Animation | ✅ Done |
| Logo ticker | 6 client logos (Jha, Cortex, ABB, Welspun, SSA, Texmaco) | Infinite scroll | ✅ Keep |
| Video embed | YouTube (`CQuGznmJAZI`) + thumbnail (`/product/home_*.png`) | Video | ✅ Keep |
| "What Changes" stats | 80%, 3x, 99.7% — text only | Text | Could add count-up animation |
| Workflow Steps (4) | Static PNGs (`/workflow steps/01-04.png`) | Screenshots | **Update screenshots** or replace 2-3 with showcases |
| Automations cards (3) | **Text-only with bullets — NO visuals** | None | **🔴 Prime candidate for showcases** |
| Enterprise Ready | Text + badges + infra vendor logos + integration logos | Mixed | ✅ Keep |
| Testimonials | Text-only cards (name + title + quote) | Text | ✅ Keep (could add photos later) |
| FAQ | Accordion | Interactive | ✅ Keep |
| CTA | Text | Text | ✅ Keep |

### PRODUCT PAGE (`/product`)

| Section | Current Visual | Type | Status |
|---|---|---|---|
| Hero2 | Gradient + text | Animation | ✅ Done |
| Platform screenshot | ThemeAwareImage (`/product/home_*.png`) | Screenshot | **Update** or tabbed showcase |
| Building Blocks — Document Intelligence | ThemeAwareImage (`/product/document_*.png`) | Screenshot | **→ `IndexingShowcase`** |
| Building Blocks — Project Spaces | ThemeAwareImage (`/product/projects_*.png`) | Screenshot | **Update screenshot** |
| Building Blocks — Centralized Repository | ThemeAwareImage (`/product/file_manager_*.png`) | Screenshot | **Update screenshot** |
| Building Blocks — AI Assistant | ThemeAwareImage (`/product/chat_*.png`) | Screenshot | **→ `ChatShowcase`** |
| Integrations | 3 infinite scroll logo rows (13 logos) | Infinite scroll | ✅ Keep |
| Security & Governance | Text cards + infra badges | Text + icons | ✅ Keep |
| CTA | Text | Text | ✅ Keep |

### AUTOMATIONS HUB (`/automations`)

| Section | Current Visual | Type | Status |
|---|---|---|---|
| Hero2 | Gradient + text | Animation | ✅ Done |
| Tender Bidding (FeatureSide) | `/automation/bidding.png` — **not theme-aware** | Screenshot | **Update** or showcase |
| Tender Evaluation (FeatureSide) | `/automation/evaluation.png` — **not theme-aware** | Screenshot | **Update** or showcase |
| Contract Review (FeatureSide) | `/automation/contract_review.png` + "Coming Soon" | Screenshot | **Update** or teaser showcase |
| "What Changes" stats | Same 80%, 3x, 99.7% | Text | Could add count-up animation |
| CTA | Text | Text | ✅ Keep |

### TENDER BIDDING (`/automations/tender-bidding`)

| ScrollStack Step | Current Visual | Type | Status |
|---|---|---|---|
| Eligibility & Go/No-Go | `/bidding/go_nogo_*.png` (theme-aware) | Screenshot | **→ `KeywordExtractionShowcase`** or update |
| Information Extraction | `/bidding/information_extraction_*.png` | Screenshot | **→ `ChatShowcase`** or update |
| Form Extraction & Filling | `/bidding/form_extraction_*.png` | Screenshot | **→ `FormExtractionShowcase`** or update |
| Product & BOQ Matching | `/bidding/product_n_boq_*.png` | Screenshot | **→ `RfqMatchingShowcase`** or update |
| Risk & Compliance | `/bidding/risk_compliance_*.png` | Screenshot | Update screenshot |
| Tender Search | `/bidding/tender_search_*.png` | Screenshot | Update screenshot |

**Note**: Pick 2-3 key steps for showcases, update rest with fresh screenshots. All 6 as showcases would be overwhelming.

Also has: WorkflowStepCards (top), 3 highlight FeatureCards (text + icons), outcome metrics (text).

### TENDER EVALUATION (`/automations/tender-evaluation`)

| ScrollStack Step | Current Visual | Type | Status |
|---|---|---|---|
| Bid Comparison | `/evaluation/bid_comparison_*.png` (theme-aware) | Screenshot | **→ `BidderAnalysisShowcase`** or update |
| Deviation & Compliance | `/evaluation/deviation_*.png` | Screenshot | **→ `ComplianceShowcase`** or update |
| Scorecards & Reports | `/evaluation/scorecards_*.png` | Screenshot | **→ `L1EvaluationShowcase`** or update |

**Note**: 1-2 showcases + 1 updated screenshot.

Also has: WorkflowStepCards (top), 3 benefit FeatureCards (text + icons).

### SOLUTIONS (`/solutions`)

| Section | Current Visual | Type | Status |
|---|---|---|---|
| Hero2 | Gradient + text | Animation | ✅ Done |
| By Team — Operations | **Unsplash stock photo** | Stock | **🔴 → `FormExtractionShowcase`** |
| By Team — Business Dev | **Unsplash stock photo** | Stock | **🔴 → `KeywordExtractionShowcase`** |
| By Team — Compliance | **Unsplash stock photo** | Stock | **🔴 → `ComplianceShowcase`** |
| By Team — Management | **Unsplash stock photo** | Stock | **🔴 → `L1EvaluationShowcase`** |
| By Industry — Construction | **Unsplash stock photo** | Stock | **🔴 Replace with product screenshot** |
| By Industry — Technology | **Unsplash stock photo** | Stock | **🔴 Replace with product screenshot** |
| By Industry — Energy | **Unsplash stock photo** | Stock | **🔴 Replace with product screenshot** |
| By Industry — Manufacturing | **Unsplash stock photo** | Stock | **🔴 Replace with product screenshot** |
| By Industry — Real Estate | **Unsplash stock photo** | Stock | **🔴 Replace with product screenshot** |
| CTA | Text | Text | ✅ Keep |

### COMPANY (`/company`)

| Section | Current Visual | Type | Status |
|---|---|---|---|
| Hero2 | Gradient + text | Animation | ✅ Done |
| About Us | Text paragraph | Text | ✅ Keep |
| Mission/Vision/Values | 3 icon cards | Icons | ✅ Keep |
| Team grid | 8 headshot photos (`/team/*.png`) | Photos | ✅ Keep |
| CTA | Text | Text | ✅ Keep |

No showcases needed — just animations (done).

### CONTACT (`/contact`)

No images. Cal.com embed only. ✅ Done.

### FAQ (`/faq`)

No images. Accordion only. ✅ Done.

---

## Showcase → Page Mapping

| Showcase | Where to place |
|---|---|
| `ChatShowcase` | Product (AI Assistant), Tender Bidding (Information Extraction) |
| `IndexingShowcase` | Product (Document Intelligence) |
| `FormExtractionShowcase` | Homepage (Bidding automation card), Solutions (Operations tab), Tender Bidding (Form Extraction step) |
| `KeywordExtractionShowcase` | Solutions (Business Dev tab), Tender Bidding (Eligibility step) |
| `BidderAnalysisShowcase` | Homepage (Evaluation automation card), Tender Evaluation (Bid Comparison step) |
| `ComplianceShowcase` | Solutions (Compliance tab), Tender Evaluation (Deviation step) |
| `L1EvaluationShowcase` | Solutions (Management tab), Tender Evaluation (Scorecards step) |
| `RfqMatchingShowcase` | Tender Bidding (BOQ Matching step) |

### New showcases (if needed)
| Showcase | Purpose | Where Used |
|---|---|---|
| `TenderSearchShowcase` | Animated feed of tender cards with match scores | Tender Bidding (step 6) |
| `ContractReviewShowcase` | Document scanning → clause highlighting → "Coming Soon" | Homepage (3rd automation card), Automations hub |

---

## Priority Order

### Phase 1: Subtle Animations ✅ DONE
- RevealOnScroll, StaggerChildren animation utilities
- Wired into Section, CTASection, Hero2, PageHeader
- Tab section animations
- Background layers (dot grid + floating cards with parallax)

### Phase 2: Screenshot Updates (requires new images)
1. Collect new screenshots from updated UI
2. Replace all stale images across every page
3. Make automations hub images theme-aware (currently not)

### Phase 3: Showcase Placement
1. **Homepage** automations cards → live showcases (highest visibility)
2. **Solutions** By Team tabs → showcases replace stock photos (worst current state)
3. **Product** Building Blocks → IndexingShowcase + ChatShowcase (2 of 4)
4. **Tender Bidding** → 2-3 key ScrollStack steps get showcases
5. **Tender Evaluation** → 1-2 ScrollStack steps get showcases

### Phase 4: New Showcases (if needed)
1. TenderSearchShowcase
2. ContractReviewShowcase

---

## Open Questions

1. **Automations hub FeatureSide blocks** — showcases or updated screenshots? FeatureSide may need changes to accept a component instead of an image.
2. **Tender Bidding 6 steps** — which 2-3 get showcases? Recommendation: Form Extraction, BOQ Matching, Eligibility.
3. **Solutions By Industry** — showcases or product screenshots? Product screenshots make more sense for industry-specific contexts.
4. **Contract Review** — build a teaser showcase or just update screenshot? "Coming Soon" teaser builds anticipation.
5. **ScrollStack compatibility** — do showcases work inside ScrollStack's sticky scroll, or do we need layout changes?
6. **Homepage workflow steps** — update screenshots or replace some with showcases? Could do Step 2 → IndexingShowcase, Step 4 → ChatShowcase.
