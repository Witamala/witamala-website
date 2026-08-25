# Witamala repository workflow

These instructions apply to every contributor and AI agent working in this repository.

## Branches

The repository uses exactly three branches:

- `design`: the only AI working and design branch. Direct AI commits are allowed.
- `dev`: the testing and staging branch. Changes arrive only through a pull request from `design`.
- `main`: the production branch. Changes arrive only through a pull request from `dev`.

The only promotion path is `design` → `dev` → `main`. Do not create or use any additional branch.

All deployment-strategy and product changes must be made on `design`. Never commit directly to `dev` or `main`, never force-push them, and never delete them.

## One active design change

`design` is shared and may contain only one active AI change or release at a time. Before new work begins:

1. Fetch the remote branch state and inspect open pull requests.
2. Compare `design` with `dev`.
3. Confirm the previous design change was promoted, reverted, or intentionally replaced.
4. If its disposition is unclear, stop and ask the user before changing files.

## Required validation

Before pushing `design`, run:

```sh
npm run lint
npm test
npm run build
```

After deployment, run:

```sh
npm run smoke -- https://witamala.io
npm run smoke -- https://witamala.ai
```

Use only the command appropriate to the environment just deployed.

## “Deploy to testing”

When the user says **“Deploy to testing”**:

1. Confirm the current branch is `design` and validate its working tree.
2. Run lint, tests, and the production build.
3. Commit and push `design`.
4. Create or update the pull request from `design` into `dev`.
5. Wait for every required check.
6. Merge `design` into `dev`.
7. Wait for Vercel to deploy `dev`.
8. Verify `https://witamala.io`.
9. Run the testing smoke tests.
10. Report the exact commit, pull request, deployment, and health result.

## “Push to production”

When the user says **“Push to production”**:

1. Verify that the current `dev` commit passed testing at `https://witamala.io`.
2. Confirm no newer untested commit entered `dev`.
3. Create or update the pull request from `dev` into `main`.
4. Wait for every required check.
5. Merge `dev` into `main`.
6. Wait for Vercel to deploy `main`.
7. Verify `https://witamala.ai`.
8. Run the production smoke tests.
9. Report the exact commit, pull request, deployment, and health result.

## Initial setup gate

During initial setup, commit and push the setup on `design` and open a `design` → `dev` pull request. Do not merge it until the user says **“Deploy to testing.”** Do not update `main` until the user says **“Push to production.”**

The complete operational runbook is in [`docs/deployment.md`](docs/deployment.md).
