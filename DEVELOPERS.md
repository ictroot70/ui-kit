# ✅ `DEVELOPERS.md` — **INTERNAL LEADERSHIP GUIDE**

```md
# 🛠 Guide for developers
```

## This document contains information for the development team working with the library`@ictroot/ui-kit`.

---

## ⚙️ TECHNOLOGIES

- **vite**- Assembly and DEV server
- **typescript** - typification
- **scss modules** - Styles
- **Storybook** - Documentation and visualization of components
- **plop** - generation of components
- **Changesets** - Office of versioning and Changelog
- **nps**- universal NPM scripts

---

## 📁 Project structure

<pre>
lib/
├── components/        # All UI components, organized by type.
│   ├── atoms/         # The smallest building blocks – simple, reusable elements with no internal structure.
│   ├── molecules/     # Groups of atoms combined into functional units (like inputs with labels).
│   ├── organisms/     # More complex components made up of molecules and/or atoms, often with logic.
│   ├── templates/     # Page-level layouts without actual data – structural placeholders.
│   └── pages/         # Complete pages with real content and logic, built from templates and components.
├── styles/            # Global SCSS variables, mixins, fonts, and base styling.
├── utils/             # Utility functions and helpers used across components or features.
└── index.ts           # Main entry point – exports everything that should be exposed by the library.
 </pre>

## 📚 Usage

| Script                     | Command              | Description                                              |
| -------------------------- | -------------------- | -------------------------------------------------------- |
| **START AND DEVELOPMENT**  |                      |                                                          |
| Start                      | `nps start`          | 🚀 Start Vite dev server                                 |
| Storybook Dev              | `nps dev`            | 📘 Launch Storybook on port 6006                         |
| Preview                    | `nps preview`        | 👀 Preview the built project                             |
| Build Storybook            | `nps buildStorybook` | 📘 Build Storybook                                       |
| **FORMATTING AND LINTING** |                      |                                                          |
| Format                     | `nps format`         | 🎨 Format the project using Prettier                     |
| Lint                       | `nps lint`           | 🔍 Lint the project                                      |
| LintFix                    | `nps lintFix`        | 🧹 Lint with auto-fix                                    |
| **TESTING**                |                      |                                                          |
| Test                       | `nps test`           | 🧪 Run tests using Vitest **_not implemented yet!_**     |
| **BUILD AND PREPARATION**  |                      |                                                          |
| Prebuild                   | `nps prebuild`       | 🧨 Clean the `dist` folder before build                  |
| Generate Index             | `nps generateIndex`  | 📄 Generate a shared index file for components           |
| Build                      | `nps build`          | 📦 Full project build: `index`, `Vite`, and `TypeScript` |
| **VERSIONING PROCESS**     |                      |                                                          |
| Preversion                 | `nps preversion`     | ⚙️ Tasks to run before bumping the version               |
| **COMMITS AND CHANGES**    |                      |                                                          |
| Add Changeset              | `nps addChangeset`   | 📦 Add a changeset with a manual description             |
| Git Commit                 | `nps gitCommit`      | 📮 Use an interface for creating a git commit            |
| **VERSIONS AND RELEASES**  |                      |                                                          |
| Version Patch              | `nps version.patch`  | 🔖 Bump the patch version                                |
| Version Minor              | `nps version.minor`  | 🆙 Bump the minor version                                |
| Version Major              | `nps version.major`  | 🚀 Bump the major version                                |
| Version Beta               | `nps version.beta`   | 🧪 Release a beta version                                |
| Version Alpha              | `nps version.alpha`  | 🧬 Release an alpha version                              |
| Version RC                 | `nps version.rc`     | 🧪 Release a release candidate version                   |

---

---

## 📚 Usage commands

- To run the project in development mode

```bash
nps start
```

- To run storybook

```bash
nps dev
```

- To preview the built project

```bash
nps preview
```

- To build the project

```bash
nps build
```

- To build storybook

```bash
nps buildStorybook
```

- To format the project

```bash

nps format
```

- To lint the project

```bash

nps lint
```

- To lint the project with auto-fix

```bash
nps lintFix
```

- To run tests(not implemented yet)

```bash
nps test
```

- To clean the `dist` folder

```bash
nps prebuild
```

- To generate a shared index file

```bash
nps generateIndex
```

- To run tasks before bumping the version

```bash
nps preversion
```

- To add a changeset

```bash
nps addChangeset
```

- To use an interface for creating a git commit

```bash
nps gitCommit
```

- To bump the patch version

```bash
nps version.patch
```

- To bump the minor version

```bash
nps version.minor
```

- To bump the major version

```bash
nps version.major
```

- To release a beta version

```bash
nps version.beta
```

- To release an alpha version

```bash
nps version.alpha
```

- To release a release candidate

```bash
nps version.rc
```
