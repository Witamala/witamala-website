## Promotion

- [ ] This pull request is `design` → `dev`.
- [ ] This pull request is `dev` → `main`.
- [ ] The source and target match exactly one permitted promotion above.
- [ ] No unrelated change is included.

## Validation

- [ ] `npm run lint`
- [ ] `npm test`
- [ ] `npm run build`
- [ ] Required GitHub checks passed.

## Deployment evidence

- Commit SHA:
- Vercel deployment or Preview URL:
- Canonical environment URL:
- Smoke-test command and result:

## Release gate

- [ ] For testing: the user said “Deploy to testing.”
- [ ] For production: the exact `dev` commit passed at `https://witamala-website-git-dev-noraks-projects.vercel.app`, no newer commit entered `dev`, and the user said “Push to production.”
