# AGENTS.md

## Scope
These instructions apply to the entire repository unless overridden by a nested `AGENTS.md`.

## Project Positioning
- This is the Logan Pinney personal website / portfolio.
- Position the site around data systems architecture, operational automation, integrations, governance, and high-impact contract work.
- Unreal Engine work can support the credibility story, but the site should not read as primarily an Unreal Engine portfolio.
- Primary headline direction: "I fix broken operational systems."
- Core framing: most operational mess is not a tooling problem; it is a structure problem.
- Emphasize schemas, handoffs, automation pipelines, validation, permissions, orchestration, auditability, and failure handling.
- Present Riot Games work carefully as current contract work or case-study style operational automation work. Do not overstate tenure or disclose confidential details.

-All playable games live in /public/games/[game-name]/index.html
-All lab pages in /src/app/lab/[game-name]/page.tsx are wrappers, lore pages, or access gates.

## Local Workflow
- Install dependencies with `npm install`.
- Run the development server with `npm run dev`.
- Run production verification with `npm run build`.
- Run linting with `npm run lint`; use `npm run lint --fix` when appropriate.
- Run tests with `npm test`.

## Commit Guidelines
- Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) in commit messages  
  (`feat:`, `fix:`, `docs:`, `chore:` etc.).
- Keep the subject line under 72 characters.

## Testing and Linting
- Run `npm test` before committing. If tests can't run due to missing dependencies or other environment issues, note this in the PR summary.
- Run `npm run lint` (and `npm run lint --fix` when appropriate) to keep code formatted and free of ESLint errors.

## Code Style
- Ensure all text files end with a newline.
- Use the existing TypeScript configuration.
- Be careful with Next.js server/client boundaries. Do not pass event handlers such as `onMouseEnter` or `onMouseLeave` from Server Components into Client Component props.
- Prefer CSS hover classes for visual interactivity where possible.
- Avoid committing empty placeholder files. Remove or implement files like `src/app/testimonial/TestimonialCarousel.tsx` if they are no longer needed.

## Configuration Files
- Use `next-sitemap.config.ts` as the source of truth. Do not introduce additional `next-sitemap.config.*` files unless absolutely required.
- Main site content and config live in `src/config/site.config.ts`.
- Homepage work is mainly in `src/app/page.tsx`.
- About page work is mainly in `src/app/about/page.tsx`.
- Terminal work lives in `src/components/Terminal.tsx`.
- Global styling and glow/border behavior lives in `src/app/globals.css`.

## Design and UI Conventions
- The homepage terminal component belongs in the footer/global layout area, not duplicated on each page.
- Keep terminal treatments restrained and memorable, not overwhelming.
- Use the subtle "Start a conversation" hover glow as the standard glow treatment across buttons/cards.
- Cards should also gain a visible border/outline on hover.
- Selected work cards should feel clickable and high-value.
- Avoid inconsistent hover glow treatments across selected work, CTAs, and cards.
- The "architecture walkthrough available upon request" CTA should link to the same contact destination as "Start a conversation"; do not disable or hide it.
- Featured case study spacing should stay consistent with selected work section spacing.
- Do not add a future video workflow montage path unless the file exists.

## Content Conventions
- Keep copy direct, sharp, credible, and grounded in shipped work and real outcomes.
- Use practical business language, not hype. Avoid resume-like clutter where possible.
- Dates can make sections feel like a resume; remove or de-emphasize them unless needed.
- Avoid obvious AI-written punctuation/tone, especially overusing em dashes.
- Case studies may use blurred/redacted names and generalized metrics.
- Contact page copy should remain simple:
  "Let's talk.
  Short or long - doesn't matter. I'll read it and get back to you. If email is easier, reach out directly at info@loganpinney.com."
- Contact form fields are name, email, subject, and message.
- Form is powered by Formspree. No tracking, newsletter, or spam.

## Safety and Confidentiality
- Do not expose private Riot Games data, names, immigration details, staffing rosters, emails, or internal systems.
- Use generalized metrics where needed, such as 400-1,200 participants per event, reduced manual setup, validated workflow, or audit-ready logs.

## Hidden and Lab Features
- Hidden/lab/terminal Easter egg style features include Bean Wars and `/lab/memos/future-self`.
- Terminal help output should remain readable on mobile; prefer compact columns or clean line formatting.
- For Bean Wars, keep mobile and desktop layout constraints in mind. Phone may need button-only or narrower layout; desktop should avoid stretched presentation.

## PR Summaries
- Summaries should mention key files changed and include the result of `npm test` and `npm run lint`.

