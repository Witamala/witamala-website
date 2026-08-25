# Deployment runbook

## Promotion model

Witamala uses one forward-only promotion chain:

`design` → `dev` → `main`

| Branch | Role | Vercel environment | Canonical URL |
| --- | --- | --- | --- |
| `design` | Shared AI working and design | Automatic Preview | Generated Vercel preview URL |
| `dev` | Testing and staging | Automatic branch deployment | `https://witamala-website-git-dev-noraks-projects.vercel.app` |
| `main` | Production | Automatic Production | `https://witamala.io` |

Only one AI change or release may be active on `design`. Before accepting new work, confirm the preceding change was promoted, reverted, or intentionally replaced.

## Repository validation

The CI workflow in `.github/workflows/ci.yml` runs for pushes to `design` and pull requests targeting `dev` or `main`.

```sh
npm ci
npm run lint
npm test
npm run build
```

The pull-request source guard enforces these exact transitions:

- A pull request targeting `dev` must come from `design`.
- A pull request targeting `main` must come from `dev`.

The stable required check contexts are `source-branch-guard` and `validate`.

## GitHub protection settings

Protect both `dev` and `main` with:

- pull requests required before merging;
- `source-branch-guard` and `validate` required and current;
- protections enforced for administrators;
- force pushes disabled; and
- branch deletion disabled.

Leave `design` directly writable. The CI source guard is defense in depth and remains required even when branch protection is enabled.

## Vercel project settings

Connect the Vercel project to the GitHub repository `Witamala/witamala-website` and configure:

1. Framework preset: Next.js.
2. Production branch: `main`.
3. Automatic deployments: enabled for Git pushes.
4. Preview deployments: enabled for `design`.
5. Testing URL: use Vercel's generated branch alias `witamala-website-git-dev-noraks-projects.vercel.app` for `dev`.
6. Production domain: assign `witamala.io` to `main` with no branch-domain override.
7. Additional production aliases: `witamala-website.vercel.app` and `witamala.ai` may also follow `main`.

The project-wide `witamala-website.vercel.app` URL follows the production branch and must not be used as the `dev` testing gate. Custom production domains must be verified in Vercel and their DNS records must use the values Vercel provides. A domain is not healthy until HTTPS resolves to the intended Vercel deployment.

## Deploy to testing

Run this procedure only after the user says **“Deploy to testing.”**

1. Fetch remote state and confirm `design` is the only active change.
2. Confirm the current branch is `design` and the working tree contains only the intended work.
3. Run `npm run lint`, `npm test`, and `npm run build`.
4. Commit any remaining intended files and push `design`.
5. Create or update the `design` → `dev` pull request.
6. Wait for `source-branch-guard`, `validate`, and Vercel checks to pass.
7. Merge the pull request into `dev` without modifying `main`.
8. Record the resulting `dev` commit SHA.
9. Wait until the Vercel deployment for that exact SHA is ready at `https://witamala-website-git-dev-noraks-projects.vercel.app`.
10. Run `npm run smoke -- https://witamala-website-git-dev-noraks-projects.vercel.app`.
11. Report the commit SHA, pull request URL, Vercel deployment URL and state, canonical domain, and smoke-test result.

Do not treat an older healthy deployment as evidence for a newer `dev` commit.

## Push to production

Run this procedure only after the user says **“Push to production.”**

1. Read the current `dev` SHA.
2. Confirm that exact SHA is the version that passed the testing deployment and smoke tests at `https://witamala-website-git-dev-noraks-projects.vercel.app`.
3. Confirm `dev` has received no newer commit.
4. Create or update the `dev` → `main` pull request.
5. Wait for `source-branch-guard`, `validate`, and Vercel checks to pass.
6. Merge the pull request into `main`.
7. Record the resulting `main` commit SHA.
8. Wait until the Vercel production deployment for that exact SHA is ready at `https://witamala.io`.
9. Run `npm run smoke -- https://witamala.io`.
10. Report the commit SHA, pull request URL, Vercel deployment URL and state, canonical domain, and smoke-test result.

If `dev` changed after testing, stop and repeat the testing promotion before production.

## Smoke tests

The dependency-free smoke runner checks `/`, `/about`, `/contact`, and `/blog`. It requires successful HTTP responses, prevents unexpected cross-origin redirects, and confirms the homepage identifies Witamala.

```sh
npm run smoke -- https://witamala-website-git-dev-noraks-projects.vercel.app
npm run smoke -- https://witamala.io
```

## Failure and rollback handling

- Before merge: leave the target branch unchanged, correct the issue on `design`, and update the existing pull request.
- Testing failure after merge: report the failed `dev` SHA and deployment, then correct or explicitly revert through `design` → `dev`.
- Production failure after merge: report the failed `main` SHA and deployment immediately. Use Vercel rollback for urgent traffic recovery, then reconcile the repository through the normal forward flow.
- DNS or ownership failure: report the exact required record or verification step. Do not report the deployment as healthy.

## Required report evidence

Every promotion report includes:

- source and target branches;
- exact commit SHA;
- pull request number and URL;
- required-check results;
- Vercel deployment ID or URL and final state;
- canonical-domain HTTP result; and
- smoke-test pass or failure details.

## Initial setup

The initial setup ends with an open `design` → `dev` pull request. Leave it unmerged until the explicit testing command. No production pull request or deployment is part of initial setup.
