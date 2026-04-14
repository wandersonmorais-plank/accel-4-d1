## 🚀 Deploy to Vercel with GitHub Actions (Next.js + pnpm)

This guide shows how to configure **GitHub Actions** to deploy this repo to **Vercel** using the Vercel CLI.

## ✅ Prerequisites

- A Vercel account and a Vercel Project for this repo (you can import the repo in Vercel first, or create a project and link it).
- A GitHub repo with Actions enabled.
- `pnpm-lock.yaml` present (this repo uses `pnpm`).

## 🔐 Create required GitHub Secrets

In GitHub, go to: **Repo → Settings → Secrets and variables → Actions → New repository secret**.

Create these secrets:

- **`VERCEL_TOKEN`**: A Vercel Personal Token.
  - In Vercel: **Account Settings → Tokens → Create**.
- **`VERCEL_ORG_ID`**: Your Vercel Team/Org ID (or your user ID if not using a team).
- **`VERCEL_PROJECT_ID`**: The Vercel Project ID.

### How to get `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`

From your local machine (or any environment with Node):

```bash
pnpm dlx vercel login
pnpm dlx vercel link
```

After linking, Vercel will create `.vercel/project.json` which contains both IDs:

```json
{
  "orgId": "xxx",
  "projectId": "yyy"
}
```

Copy those values into the GitHub secrets.

## 🧩 Add the GitHub Actions workflow

Create this file:

- `.github/workflows/vercel-deploy.yml`

Use this workflow:

```yaml
name: Vercel Deploy

on:
  push:
    branches: [main]
  pull_request:

concurrency:
  group: vercel-${{ github.ref }}
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: read
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: latest

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Pull Vercel Environment Information
        run: pnpm dlx vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

      - name: Build (Preview)
        if: github.event_name == 'pull_request'
        run: pnpm dlx vercel build --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

      - name: Deploy (Preview)
        if: github.event_name == 'pull_request'
        run: pnpm dlx vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

      - name: Pull Vercel Environment Information (Production)
        if: github.event_name == 'push'
        run: pnpm dlx vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

      - name: Build (Production)
        if: github.event_name == 'push'
        run: pnpm dlx vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

      - name: Deploy (Production)
        if: github.event_name == 'push'
        run: pnpm dlx vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

## ⚙️ Notes / common gotchas

- **Environment variables**: Define them in Vercel (Project → Settings → Environment Variables). `vercel pull` makes them available for the build.
- **Framework detection**: Vercel auto-detects Next.js. If you customized output/build settings in Vercel, keep them consistent.
- **Preview vs Production**:
  - Pull Requests deploy **Preview**.
  - Pushes to `main` deploy **Production**.
- **Monorepos**: If the Next.js app is not at repo root, you’ll need `vercel pull/build/deploy` with the correct working directory and Vercel project settings (Root Directory).

