# Portfolio Redesign Plan

Source of truth for the warm Claude.ai-inspired redesign. Updated as branches land.

## Stack constraints

- Next.js 15 App Router, JSX (no TypeScript)
- Tailwind v4 (tokens via `@theme` in `app/globals.css`, no `tailwind.config.mjs` extensions)
- `motion/react` for animations (already installed as `motion`)
- `lucide-react` for icons
- Supabase for endorsements (preserve all logic)
- Web3Forms for contact (preserve all logic)
- `next/font` for Fraunces + Inter (no Google CDN runtime fetch)

## Design tokens

Defined in `app/globals.css`. Components consume via Tailwind utilities (`bg-background`, `text-foreground`, `text-primary`, etc.) — never hardcode colors.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--background` | warm cream | warm charcoal | page background |
| `--foreground` | warm charcoal | warm cream | body text |
| `--primary` | terracotta | warm amber | accents, italic emphasis, dots |
| `--muted-foreground` | mid-warm gray | soft cream | secondary text |
| `--card` | lighter cream | slightly lighter charcoal | card surfaces |
| `--border` | warm beige | warm dark border | dividers, card outlines |

Fonts: `font-display` (Fraunces, headings), `font-body` (Inter, body).

## Conventions

- **No hardcoded secrets.** All sensitive values from `.env.local`, never inline. Web3Forms key already lives in `Contact.jsx` — move to env in the contact branch.
- **No comments in component files** unless explaining a non-obvious *why* (CSS workarounds, browser quirks, accessibility hooks). No "this is the hero" or "render the title" comments.
- **No comments in CSS** beyond section dividers.
- **No new dependencies** without confirmation. Use what's already installed.
- **Preserve backend logic.** EndorsementForm submission, EndorsementsFeed Supabase realtime, Contact Web3Forms submit — restyle markup, never touch logic flow.
- **Use existing CSS vars.** Don't introduce parallel token systems.
- **Variants via prop, not duplication.** No copy-pasted dark/light variants in markup.
- **Accessibility:** semantic HTML, `aria-label` on icon-only buttons, `prefers-reduced-motion` honored, focus-visible rings on interactive elements.

## File map

| Section | File | Action |
|---|---|---|
| Tokens + fonts | `app/globals.css`, `app/layout.js` | ✅ done (foundation branch) |
| Site shell layout | `app/(site)/layout.jsx` | rewrite (shell branch) |
| Theme provider | `app/(site)/components/ThemeProvider.jsx` | keep, verify |
| Navbar | `app/components/Navbar.jsx` | rewrite (shell) |
| Hero | `app/components/Header.jsx` | rewrite (shell) |
| Footer | `app/components/Footer.jsx` | rewrite (shell) |
| About | `app/components/About.jsx` | rewrite (content) |
| Projects | `app/components/Work.jsx` | rewrite (content) |
| Volunteering | `app/components/Services.jsx` | rewrite (content) |
| Endorsements shell | `app/components/EndorsementsHome.jsx` | rewrite UI (interactive) |
| Endorsement form | `app/components/EndorsementForm.jsx` | restyle inputs, preserve Supabase logic |
| Endorsements feed | `app/components/EndorsementsFeed.jsx` | restyle cards, preserve Supabase realtime |
| Contact | `app/components/Contact.jsx` | restyle form, preserve Web3Forms submit, move key to env |
| Page composition | `app/(site)/page.jsx` | update imports/props as needed |

## Reference design

Full design source: `/mnt/user-data/uploads/Hero.html` (in chat context). Sections in that file: hero, about, projects, volunteering, endorsements, contact. Translate markup + styles into JSX components using Tailwind utilities backed by the tokens above.

Hero video: `/public/videos/hero.mp4` (already in place).

## Branch order

1. ✅ `feat/redesign-foundation` — globals.css, fonts, primitives. Merged.
2. 🟡 `feat/redesign-hero` — Navbar + Header (hero) + Footer + (site)/layout.jsx wiring. **In progress.**
3. ⬜ `feat/redesign-content` — About, Work (Projects), Services (Volunteering).
4. ⬜ `feat/redesign-interactive` — EndorsementsHome, EndorsementForm, EndorsementsFeed, Contact.
5. ⬜ `feat/redesign-cleanup` — remove legacy CSS aliases (`--font-Ovo`, `bg-rose-50` overrides, `darkTheme`), prune unused asset imports, lint pass.

Each branch: build → `npm run dev` test → push → PR to `dev` → merge → next branch.

After branch 5 lands in `dev`: merge `dev` → `main`. `legacy/old-design` stays as permanent rollback.

## Acceptance per branch

A branch is done when:
- `npm run build` passes with no warnings
- All sections render correctly in light + dark mode
- Theme toggle works
- Smooth-scroll nav links scroll to the right section
- Backend submissions still work end-to-end (where applicable)
- No hardcoded colors, no inline secrets, no orphaned comments
