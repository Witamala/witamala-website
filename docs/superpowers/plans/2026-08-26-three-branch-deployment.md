# Three-Branch Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enforce and document the `design` → `dev` → `main` promotion flow with CI, smoke tests, GitHub protections, and Vercel environment mappings.

**Architecture:** A small Node module owns the allowed pull-request transitions and is consumed by both automated tests and GitHub Actions. A separate dependency-free Node smoke runner verifies deployed routes. Repository instructions define the serialized working-branch contract, while GitHub and Vercel hold the external enforcement and environment aliases.

**Tech Stack:** Node.js 20, Node test runner, Next.js 14, GitHub Actions, GitHub branch protection, Vercel Git deployments.

**Spec:** `docs/superpowers/specs/2026-08-26-three-branch-deployment-design.md`

## Global Constraints

- Use exactly `design`, `dev`, and `main`; no other working or release branch naming scheme is permitted.
- Promotion moves only `design` → `dev` → `main`.
- Do not merge the initial `design` → `dev` pull request during setup.
- Do not promote to production until the user says “Push to production.”
- Only one active AI change or release may exist on `design` at a time.
- `design` is directly writable; `dev` and `main` require pull requests and CI and block force pushes and deletion.

---

### Task 1: Testable pull-request source policy

**Files:**
- Create: `scripts/check-pr-source.mjs`
- Create: `test/check-pr-source.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: `GITHUB_BASE_REF` and `GITHUB_HEAD_REF` when run as a CLI.
- Produces: `validatePullRequestSource(base, head): { allowed: boolean, message: string }`.

- [ ] **Step 1: Write failing transition tests**

Test `design` → `dev` and `dev` → `main` as allowed. Test `main` → `dev`, `design` → `main`, and any unapproved branch as rejected.

- [ ] **Step 2: Run the focused test and confirm it fails**

Run: `node --test test/check-pr-source.test.mjs`

Expected: failure because `scripts/check-pr-source.mjs` does not exist.

- [ ] **Step 3: Implement the policy module and CLI**

Define the exact map:

```js
const allowedSources = new Map([
  ['dev', 'design'],
  ['main', 'dev'],
]);
```

Return a clear rejection message for guarded bases and a neutral success message for unguarded bases. When executed directly, read the two GitHub variables, print the message, and set exit code `1` on rejection.

- [ ] **Step 4: Add the test script and run it**

Add `"test": "node --test"` to `package.json` and run `npm test`.

Expected: all transition tests pass.

- [ ] **Step 5: Commit**

```bash
git add package.json scripts/check-pr-source.mjs test/check-pr-source.test.mjs
git commit -m "test: enforce promotion branch sources"
```

### Task 2: Lint and CI validation gates

**Files:**
- Create: `scripts/lint.mjs`
- Create: `.github/workflows/ci.yml`
- Modify: `package.json`

**Interfaces:**
- Consumes: the Task 1 CLI and npm scripts.
- Produces: required GitHub check contexts `source-branch-guard` and `validate`.

- [ ] **Step 1: Add deterministic lint configuration**

Use Next.js's pinned compiled Babel parser to syntax-check repository JavaScript and JSX without adding registry dependencies. Reject trailing whitespace and unresolved merge-conflict markers. Add `"lint": "node scripts/lint.mjs"`.

- [ ] **Step 2: Run lint and correct repository lint failures**

Run: `npm run lint`

Expected: exit `0` with no ESLint errors.

- [ ] **Step 3: Create the workflow**

Trigger on pushes to `design` and pull requests targeting `dev` or `main`. The `source-branch-guard` job runs only for pull requests and executes `node scripts/check-pr-source.mjs`. The `validate` job runs `npm ci`, `npm run lint`, `npm test`, and `npm run build` on Node 20.

- [ ] **Step 4: Validate workflow syntax and all local commands**

Run `npm run lint`, `npm test`, and `npm run build`. Inspect `.github/workflows/ci.yml` to confirm both stable job IDs are present.

- [ ] **Step 5: Commit**

```bash
git add scripts/lint.mjs .github/workflows/ci.yml package.json docs/superpowers/plans/2026-08-26-three-branch-deployment.md
git commit -m "ci: validate the three-branch promotion flow"
```

### Task 3: Deployment smoke tests

**Files:**
- Create: `scripts/smoke.mjs`
- Create: `test/smoke.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: `SMOKE_BASE_URL` or the first CLI argument.
- Produces: `runSmokeTests(baseUrl, fetchImpl): Promise<Array<{ path: string, status: number }>>` and `npm run smoke -- <url>`.

- [ ] **Step 1: Write failing unit tests with a fake fetch implementation**

Cover a healthy route set, a non-2xx response, unexpected cross-origin redirects, and missing Witamala homepage content.

- [ ] **Step 2: Run the focused smoke tests and confirm they fail**

Run: `node --test test/smoke.test.mjs`

Expected: failure because `scripts/smoke.mjs` does not exist.

- [ ] **Step 3: Implement the dependency-free smoke runner**

Check `/`, `/about`, `/contact`, and `/blog`; require 2xx status; reject a final response origin different from the requested origin; require `/` HTML to contain `Witamala`; use an abort timeout; print one result line per route.

- [ ] **Step 4: Run all tests**

Add `"smoke": "node scripts/smoke.mjs"` and run `npm test`.

Expected: policy and smoke tests all pass.

- [ ] **Step 5: Commit**

```bash
git add package.json scripts/smoke.mjs test/smoke.test.mjs
git commit -m "test: add deployment smoke checks"
```

### Task 4: Operational instructions and pull-request guidance

**Files:**
- Create: `AGENTS.md`
- Create: `docs/deployment.md`
- Create: `.github/pull_request_template.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: npm validation and smoke scripts from Tasks 1–3.
- Produces: the human and AI operating contract for setup and promotion.

- [ ] **Step 1: Write the branch contract in `AGENTS.md`**

State the exact branch roles, serialized-work check, forbidden branch patterns, allowed source-target pairs, deployment commands, and prohibition on merging during initial setup.

- [ ] **Step 2: Write the deployment runbook**

Document environment URLs, Vercel branch mappings, exact “Deploy to testing” and “Push to production” procedures, evidence required in reports, rollback handling, and GitHub/Vercel administrator configuration.

- [ ] **Step 3: Add pull-request and README guidance**

The template records source/target, validation evidence, preview URL, testing evidence, and production evidence. README links to the runbook and shows lint, test, build, and smoke commands.

- [ ] **Step 4: Scan for forbidden branch names**

Run a repository search excluding `.git`, dependencies, build output, and the historical specification sentence that records the prohibition. No operational instruction may recommend a prefixed working branch.

- [ ] **Step 5: Commit**

```bash
git add AGENTS.md README.md docs/deployment.md .github/pull_request_template.md
git commit -m "docs: add deployment and promotion runbook"
```

### Task 5: Remote enforcement, Vercel mapping, and unmerged setup PR

**Files:**
- Modify: no source files; configure GitHub and Vercel external state.

**Interfaces:**
- Consumes: pushed `design`, workflow check contexts, Vercel project, and both domains.
- Produces: protected `dev` and `main`, automatic deployments, and an open `design` → `dev` pull request.

- [ ] **Step 1: Run full fresh validation**

Run `npm run lint`, `npm test`, `npm run build`, `git diff --check`, and confirm the current branch is `design`.

- [ ] **Step 2: Push `design`**

Push all setup commits to the remote `design` branch without updating `dev` or `main`.

- [ ] **Step 3: Configure GitHub protections**

For both `dev` and `main`, require pull requests, require `source-branch-guard` and `validate`, enforce protections for administrators, require branches to be current, and disable force pushes and deletion. Leave `design` directly writable.

- [ ] **Step 4: Configure the Vercel project**

Connect `Witamala/witamala-website`, set `main` as production, retain automatic previews for `design`, use the generated `dev` branch alias for testing, and map `witamala.io` to production without a branch override. Keep `witamala-website.vercel.app` and `witamala.ai` only as additional production aliases. Do not merge or promote a branch to trigger testing or production.

- [ ] **Step 5: Open the setup pull request**

Create a draft pull request from `design` into `dev` titled `chore: establish three-branch deployment flow`. Do not merge it.

- [ ] **Step 6: Verify external state and report**

Confirm remote branch SHAs, protection settings, PR source/target/state, workflow results on `design`, Vercel project mappings, and preview deployment status. Report blockers truthfully, especially DNS changes that require domain-owner action.
