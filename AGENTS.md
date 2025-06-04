# AGENTS.md

## Scope
These instructions apply to the entire repository unless overridden by a nested `AGENTS.md`.

## Commit Guidelines
- Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) in commit messages  
  (`feat:`, `fix:`, `docs:`, `chore:` etc.).
- Keep the subject line under 72 characters.

## Testing and Linting
- Run `npm test` before committing. If tests can’t run due to missing dependencies or other environment issues, note this in the PR summary.
- Run `npm run lint` (and `npm run lint --fix` when appropriate) to keep code formatted and free of ESLint errors.

## Code Style
- Ensure all text files end with a newline.
- Use the existing TypeScript configuration.
- Avoid committing empty placeholder files. Remove or implement files like `src/app/testimonial/TestimonialCarousel.tsx` if they are no longer needed.

## Configuration Files
- Use `next-sitemap.config.ts` as the source of truth. Do not introduce additional `next-sitemap.config.*` files unless absolutely required.

## PR Summaries
- Summaries should mention key files changed and include the result of `npm test` and `npm run lint`.

