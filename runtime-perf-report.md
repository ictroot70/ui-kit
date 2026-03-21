# Runtime Performance Report (Phase 5)

## Measurement setup

- Harness script: `npm run perf:runtime`
- Renderer: React Profiler in headless Chromium (Playwright)
- Scenarios: `Input`, `ToastContainer`, `DatePickerSingle`
- Samples per scenario: `120` updates

## Files

- Baseline: `runtime-perf-baseline.json`
- Current: `runtime-perf-after.json`
- Comparison: `runtime-perf-comparison.json`

## Results

### Totals

- Commits: `449 -> 362` (`-19.38%`)
- Total actualDuration: `312.8 -> 265.7` (`-15.06%`)

### Per scenario

- Input:
  - Commits: `119 -> 119` (`0%`)
  - total actualDuration: `52.4 -> 46.2` (`-11.83%`)
- ToastContainer:
  - Commits: `207 -> 120` (`-42.03%`)
  - total actualDuration: `152.4 -> 121.4` (`-20.34%`)
- DatePickerSingle:
  - Commits: `123 -> 123` (`0%`)
  - total actualDuration: `108 -> 98.1` (`-9.17%`)

## KPI status

- Worst-case scenario by commit count (`ToastContainer`) improved by `42.03%`.
- This satisfies the Phase 5 KPI path `-25%` by **commit count**.
