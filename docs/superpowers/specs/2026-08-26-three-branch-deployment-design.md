# Three-Branch Deployment Strategy

## Purpose

Witamala uses one serialized AI working branch and two promotion branches. Changes move only in this direction:

`design` → `dev` → `main`

The workflow must prevent bypassing testing, make deployment ownership visible, and keep production promotion tied to the exact commit verified in testing.

## Branch Roles

- `design` is the only AI working and design branch. Direct AI commits are allowed. Only one active change or release may exist on it at a time.
- `dev` is the testing and staging branch. It accepts changes only through a pull request from `design`.
- `main` is the production branch. It accepts changes only through a pull request from `dev`.

Before new work begins on `design`, the previous change must have been promoted, reverted, or intentionally replaced. No additional branch is used.

## Repository Controls

GitHub Actions provides two required checks for pull requests targeting `dev` or `main`:

1. A source-branch guard rejects any `dev` pull request not sourced from `design`, and any `main` pull request not sourced from `dev`.
2. Validation installs locked dependencies, runs lint, executes automated tests, and creates a production build.

GitHub branch protection requires these checks and a pull request on `dev` and `main`, includes administrators, and disables force pushes and deletion. `design` remains directly writable.

The repository includes:

- `AGENTS.md` as the operational contract for AI work and promotion commands.
- `docs/deployment.md` as the human runbook and environment map.
- `.github/workflows/ci.yml` for source guards and validation.
- `.github/pull_request_template.md` for branch-flow and verification evidence.
- `scripts/check-pr-source.mjs` as a testable source-policy executable.
- `scripts/smoke.mjs` for post-deployment route and content checks.
- Node test files covering allowed and rejected branch transitions.

## Vercel Mapping

One Vercel project connects to `Witamala/witamala-website`.

- `design` produces automatic Preview deployments with generated Vercel URLs.
- `dev` produces automatic branch deployments at `https://witamala-website-git-dev-noraks-projects.vercel.app`.
- `main` is the Vercel production branch and owns `https://witamala.io`; `witamala-website.vercel.app` and `witamala.ai` may remain additional production aliases.

The Vercel project must have Git integration enabled and `main` selected as the production branch. Testing uses the generated `dev` branch alias; `witamala.io` is not assigned to a branch and therefore follows production. The project-wide `witamala-website.vercel.app` alias also follows production and cannot serve as the `dev` gate. Domain DNS must point to Vercel before production health verification can pass.

## Promotion Workflows

### Deploy to testing

Validate `design`; run lint, tests, and the production build; commit and push; create or update `design` → `dev`; wait for required checks; merge; wait for the `dev` deployment; verify `https://witamala-website-git-dev-noraks-projects.vercel.app`; run smoke tests; and report commit, pull request, deployment, and health.

### Push to production

Confirm the current `dev` commit is the exact commit that passed at `https://witamala-website-git-dev-noraks-projects.vercel.app`; ensure no newer commit entered `dev`; create or update `dev` → `main`; wait for required checks; merge; wait for the `main` deployment; verify `https://witamala.io`; run smoke tests; and report commit, pull request, deployment, and health.

## Initial Setup

The setup is committed and pushed on `design`. A pull request from `design` to `dev` is opened but remains unmerged. No testing or production promotion happens until the corresponding explicit user command.

## Failure Handling

- A source mismatch fails before validation and cannot be merged into a protected branch.
- A lint, test, or build failure blocks promotion.
- A failed Vercel deployment or smoke test leaves the target branch unchanged if merging has not occurred; after a merge, it is reported immediately and corrected through the same forward branch flow or an explicit revert.
- Missing DNS or domain ownership is reported as an external configuration blocker, never treated as a healthy deployment.

## Verification

Local verification consists of `npm run lint`, `npm test`, `npm run build`, and policy tests for every permitted and forbidden branch pair. Deployment verification checks representative public routes, expected Witamala content, redirect safety, and HTTP success at the environment's canonical domain.
