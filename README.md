# 🧱 IctRoot UI Core

## Modular and expanded library of components created using Vite, Storybook and Typescript. Suitable for re-used UI elements in various projects

## 📚 Installation of the library

- pnpm

```bash
pnpm add @ictroot/ui-kit
```

- yarn

```bash
yarn add @ictroot/ui-kit
```

- npm

```bash
npm i @ictroot/ui-kit
```

---

---

## 💡 An example of use

```tsx
import '@ictroot/ui-kit/style.css'
import '@ictroot/ui-kit/fonts/inter.css' // optional, opt-in
import { Button } from '@ictroot/ui-kit'

export function MyComponent() {
  return <Button variant="primary">Click Me</Button>
}
```

```tsx
import { Search } from '@ictroot/ui-kit/icons'
```

```tsx
import { DatePickerSingle } from '@ictroot/ui-kit/datepicker'
import { ToastContainer } from '@ictroot/ui-kit/toast'
import { Recaptcha } from '@ictroot/ui-kit/recaptcha'
import { Modal } from '@ictroot/ui-kit/modal'
```

For Next.js App Router, prefer the client entrypoint for interactive UI:

```tsx
'use client'

import { Button, DatePickerSingle, ToastProvider } from '@ictroot/ui-kit/client'
```

Root import is still supported for DX, but subpath imports are recommended for heavy modules.

Heavy-module subpaths are intentionally limited to:
- `@ictroot/ui-kit/datepicker`
- `@ictroot/ui-kit/modal`
- `@ictroot/ui-kit/toast`
- `@ictroot/ui-kit/recaptcha`

For Next.js App Router, prefer the modal subpath from a client component:

```tsx
'use client'

import { Modal } from '@ictroot/ui-kit/modal'
```

Root import is still supported for backward compatibility:

```tsx
import { Modal } from '@ictroot/ui-kit'
```

Stable CSS override contract for app-level integration:

- Modal overlay z-index: `--ui-kit-modal-overlay-z-index`
- Modal content z-index: `--ui-kit-modal-content-z-index`
- Alert min-height: `--ui-kit-alert-min-height`
- Alert max-height: `--ui-kit-alert-max-height`
- Stable hooks (for targeted overrides): `data-ui-kit-modal-overlay`, `data-ui-kit-modal-content`, `data-ui-kit-alert`

SSR note for Next.js + Recaptcha:

```tsx
import dynamic from 'next/dynamic'

const Recaptcha = dynamic(() => import('@ictroot/ui-kit/recaptcha').then(mod => mod.Recaptcha), {
  ssr: false,
})
```

SSR smoke gate command:

```bash
npm run ssr:smoke
```

## 🗒 Changelog Policy

Consumer-visible changes are tracked in [CHANGELOG.md](./CHANGELOG.md).

Before each release:
- add all user-facing updates to `Unreleased` in `CHANGELOG.md`
- classify entries as `Added`, `Changed`, `Fixed`, or `Breaking`
- move `Unreleased` notes to a new version section with release date

## 📁 components

### Components are supported at all levels of Atomic Design

### - Atoms: `Button`, `Input`, `Checkbox`

### - Molecules: `InputGroup`, `CardHeader`

### - Organisms: `Modal`, `FormSection`

### A full list of components is in Storybook

---

---

## 🧪 View components

Check out the library of components, their options and documentation in
Storybook: [🔗 Open Storybook on Vercel](https://ict-root-ui-kit.vercel.app)

---

---

## 🛠 Support and Questions

### If you have any questions or suggestions for improvements, please open an [issue on GitHub](https://github.com/ictroot70/ui-kit/issues)

### You can find the full source code of the library [here](https://github.com/ictroot70/ui-kit)

---

---

## 👨‍💻 Author

### - [IctRoot](https://github.com/ictroot70)

---

## 👩 Project Manager

### - [Irina Sedmaya](https://github.com/IrinaSedmaya)

---

## 🙋‍♂️ Contributors

### - [Smbat Antonyan](https://github.com/Smbat1505)

### - [Dmitry Muzalev](https://github.com/DmitryMuzalev)

### - [Aliaksei Krasko](https://github.com/AliakseiKrasko)

### - [Kaminnik Andrey](https://github.com/KaminnikAndrey)

### - [Timofey Ostapchuk](https://github.com/TimofeyOst)

### - [kenesaryLastKing](https://github.com/kenesaryLastKing)

### - [Evgeny Guzeev](https://github.com/GuzeevZhenya)

---

---

## 📝 License

### [MIT](https://github.com/ictroot70/ui-kit/blob/main/LICENSE)

---

## 🛠 Guide for developers

### 📘 For details on how to use the library in development - see [guide for developers](./DEVELOPERS.md)
