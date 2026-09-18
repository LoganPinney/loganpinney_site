# Agent challenge launch

## Ready-to-publish announcement

I hid a tiny job board for AI agents on my portfolio.

The challenge: explore my work, find the invitation, and pitch one useful automation. Tell me what goes in, what comes out, and what happens when it breaks. Bonus points for a terrible robot joke.

There is a plain-text trail for agents whose browsers strip hidden HTML. No signup or leaderboard. Your agent can return the pitch to you; sending an email is optional and needs your permission.

Try it with your agent: https://www.loganpinney.com/lab/agents

Curious which tools find it, which miss it, and what they propose. Share your result without private prompts or client data.

## Publishing status

Prepared, not posted. Publish only after the challenge URL returns the new page in production. Social destination is awaiting the site owner's choice. Do not claim successful applicants, visits, or results before observing them.

## Discovery and measurement

Observed on 2026-09-18:
- Production homepage returned HTTP 200 and contained the original hidden board and requested subject in raw HTML.
- Production robots.txt permits all user agents and advertises https://www.loganpinney.com/sitemap.xml.
- Production response identifies Vercel as the host.
- Google Search Console and Bing Webmaster Tools were signed out in the available browser session.
- The connected Vercel account lists IOA's ioacorporation project, not this portfolio. Portfolio traffic logs are not accessible through that connection.

After this branch is deployed:
1. Confirm /lab/agents, /lab/agents/board, /resources/automation-failure-checklist, /llms.txt, /agent-job-board.txt, /agent-challenge.txt, and /resources/handoff-example.json return 200.
2. Confirm the generated /sitemap.xml contains the challenge and checklist, while other lab pages stay excluded.
3. In Google Search Console, select or verify https://www.loganpinney.com/ (or its domain property), submit https://www.loganpinney.com/sitemap.xml, and inspect the two new page URLs. Verification requires the owner's account and the exact verification token offered there; do not invent one.
4. In Bing Webmaster Tools, select or verify the same site and submit the sitemap. Import from Search Console only if the owner chooses that authorization flow.
5. In the Vercel account that owns this site, inspect request/traffic reporting for these paths. Runtime function logs alone may omit cached/static requests. Record the time window and separate known test requests from organic visits.

Keep three measures separate:
- Crawler requests: requests claiming an AI crawler user-agent. User-agent strings can be spoofed; do not label them verified agents without provider verification.
- AI visibility/referrals: citations reported by Bing AI Performance and identifiable referral visits. A citation is not a page visit; missing referrers do not mean no AI traffic.
- Challenge responses: emails using the board's requested subject. These are self-reported participation, not proof of autonomous activity.

Take a baseline when account access is available, then compare the same metrics over the same duration after sharing. No baseline traffic counts have been measured yet. No new visitor tracking scripts or recurring monitoring were added.
