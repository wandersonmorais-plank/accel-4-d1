# /ship — Commit & Push After Approval

Run the full commit-and-push flow for the current feature branch.

## Steps

1. Run `pnpm lint` and `pnpm test` in parallel. Stop if either fails.
2. Run `git status` and `git diff` — summarize what changed.
3. Warn if any sensitive files (`.env`, secrets, build artifacts) are staged.
4. Stage only feature-related files by explicit path (never `git add -A`).
5. Propose a conventional commit message: `<type>(<scope>): <summary>`.
6. Ask for final approval before committing.
7. After approval: commit, then `git push origin <current-branch>`.
8. Report the branch name and commit hash when done.

## Safety

- Never skip hooks (`--no-verify`).
- Never force push to `main` or `master`.
- Block the commit if tests fail.
- Suggest a feature branch if the user is committing directly to `main`.
