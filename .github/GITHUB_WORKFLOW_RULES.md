---
# 🚧 GitHub Workflow Rules

This document outlines the required rules and workflow for working with `main` and `dev` branches in this repository.
---

## 🔐 Branch Protection

> Applies to `main` and `dev` branches

### Forbidden:

- ❌ Pushing directly to `main` or `dev` — use Pull Requests only.

- ❌ Force pushing (`git push --force`) is disabled.

- ❌ Deleting protected branches is not allowed unless explicitly bypassed.

---

## ✅ Pull Request Requirements

- ✅ Create a separate feature/fix branch
  - Example: `feature/add-navbar`, `fix/login-bug`
    -✅ Open a Pull Request into `main` or `dev`

### Reviews:

- ✅ At least 2 approving reviews from reviewers with write access.

- 🔁 New commits after approval require re-approval.

- 🧑‍💻 Last commit must be approved by someone other than the author.

- 🧾 All conversations must be resolved before merging.

- ~~🧑‍🏫 Code Owners must approve if you modify files they own.~~

---

## ✅ Status Checks

- ✅ All required CI checks must pass (e.g., `build`, `lint`, `test`, etc.)

- ~~✅ If configured, Code Scanning (like CodeQL) must also succeed.~~

---

## ⚙️ Merge Strategy

- ✅ Use Squash and merge or Rebase and merge.

- ❌ Merge commits are not allowed — `linear history only`.

---

## 🚫 Don’t

- 🚫 Don’t merge PRs without approvals.

- 🚫 Don’t ignore unresolved conversations.

- 🚫 Don’t skip CI or required checks.

- 🚫 Don’t self-approve your last commit.

---

## 🔔 Suggestions

- 📄 Use Pull Request templates to remember the checklist.

- 👥 Assign reviewers early to keep flow moving.

- 🧪 Run tests and linter locally before pushing.

---

## ✅ Happy merging!

---
