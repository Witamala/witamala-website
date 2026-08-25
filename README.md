# Witamala — Next.js site

Production implementation of the Witamala website (App Router, React 18, no other dependencies).
Generated from the approved hi-fi design (`Witamala.dc.html` + `Foundations.dc.html` in the design project) — this codebase IS the target implementation, not a reference mock.

## Run

    npm install
    npm run dev        # http://localhost:3000
    npm run build && npm start

## Architecture

    app/
      layout.js                  fonts (next/font: Fraunces, Manrope, IBM Plex Mono, Noto Sans Thai/Khmer), Header/Footer shell
      globals.css                the entire design system: tokens, components, responsive tiers
      page.js                    Home (hero + thread material, three-domain band, capability garden, evidence, model, first brief)
      ai-innovation/ partnerships/ public-policy/   domain pages -> components/DomainPage.js
      blog/page.js               evidence index (filters: domain x witamala/prior) + evidence standard
      blog/<slug>/page.js        three post routes -> components/PostPage.js (15-field provenance block)
      about/ contact/ not-found.js
    components/                  Header (hamburger <=760px), Footer (trust disclosures, experience pref),
                                 MotionProvider (Quiet/Balanced/Alive + prefers-reduced-motion),
                                 Threads (living material), Garden, BriefBox, BlogIndex, EvidenceStandard,
                                 ContactForm (staged machine), Mewi, DomainPage, PostPage, SeenHome
    lib/facts.js                 SINGLE SOURCE OF TRUTH: nav, domains/offerings, posts, trust statements.
                                 No institutional fact is typed twice — edit here, every page updates.
    public/brand/                logo system (full, horizontal, monogram, favicon; light/dark colorways)

## Design tokens (verified contrast)

ivory #F5ECDC (surface, 65–75% of reading) · mahogany #670A0A (authority; 11.03:1 on ivory)
deep mahogany #60373D (contemplative; 8.49:1) · charcoal #262119 (text; 13.63:1, AAA)
night #1B1712 (working rooms; 15.21:1) · bronze #7F6118 (gold's functional agent on light; 4.94:1)
jade #1E7359 / guava #904D4C / indigo #5B5C95 (semantic accents, oklch(0.50 0.09 h))

**Gold rule (hard constraint):** #D4AF37 is 1.79:1 on ivory — NEVER text, controls or functional
lines on light surfaces; threads/nodes/rules only. Gold text is legal on mahogany (6.15:1),
deep (4.73:1, labels), night (8.48:1). The emblem gradient (#E6B763→#D5A151) appears on the
full lockup and rare milestone states only.

## Behavior notes

- Motion: three preferences (Quiet/Balanced/Alive) persisted at wt.pref.motion; Quiet is a complete
  experience, and prefers-reduced-motion forces stillness regardless.
- Contact: six named stages (acknowledged→validating→working→confirmed→inscribed→settled); drafts
  persist at wt.contact.draft from the first keystroke; the record lands at wt.contact.record;
  validation failure preserves everything and moves focus to the first invalid field. The one
  bloom animation fires at "inscribed" and settles <2s. No backend: completing composes a brief
  the visitor copies — wire a real transport in ContactForm.submit() when one exists.
- The home brief box and Contact share the same draft key.
- Side gate: sessionStorage wt.seenHome — direct Contact arrivals get the side-gate line.
- Blog posts are static routes because they are three placeholder files; when content becomes
  dynamic, replace app/blog/<slug>/ with app/blog/[slug]/page.js using generateStaticParams
  over F.posts (same for domains if they ever change).
- TRIZ / "Software Suculento" are internal system names — they must never appear in the UI.

## Before launch (bracketed placeholders to replace)

1. Legal identity + registration (footer, About, trust > Governance)
2. Contact address (footer, About)
3. The two [Placeholder] prior-work posts in lib/facts.js — or cut the Blog tab
