# Next SSR/Hydration Smoke Fixture

This fixture validates that `@ictroot/ui-kit` heavy-module subpaths do not break SSR/hydration in Next.js.

Checked modules:
- `@ictroot/ui-kit/datepicker`
- `@ictroot/ui-kit/toast`
- `@ictroot/ui-kit/recaptcha` (with `next/dynamic` and `ssr: false`)

Run through the root script:

```bash
npm run build
npm run ssr:smoke
```
