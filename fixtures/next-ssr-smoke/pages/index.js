import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import { DatePickerSingle } from '@ictroot/ui-kit/datepicker'
import { ToastContainer } from '@ictroot/ui-kit/toast'

const Recaptcha = dynamic(() => import('@ictroot/ui-kit/recaptcha').then(mod => mod.Recaptcha), {
  ssr: false,
})

export default function HomePage() {
  const [hydrationState, setHydrationState] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setHydrationState(1)
    setIsClient(true)
  }, [])

  const toasts = useMemo(
    () => [
      {
        id: 'ssr-smoke-toast',
        type: 'success',
        message: 'Toast smoke rendered',
        duration: 3_000,
        createdAt: Date.now(),
      },
    ],
    []
  )

  return (
    <main style={{ padding: 24 }}>
      <h1>UI Kit SSR Smoke</h1>

      <div data-testid={'datepicker-smoke'}>
        <DatePickerSingle label={'Smoke Date'} placeholder={'Pick a date'} />
      </div>

      <div data-testid={'recaptcha-smoke'} style={{ marginTop: 24 }}>
        <Recaptcha sitekey={'test-site-key'} />
      </div>

      <button
        data-testid={'hydrate-action'}
        type={'button'}
        onClick={() => setHydrationState(value => value + 1)}
        style={{ marginTop: 24 }}
      >
        Increment hydration marker
      </button>
      <output data-testid={'hydration-state'} style={{ marginLeft: 12 }}>
        {`hydrated:${hydrationState}`}
      </output>

      {isClient && (
        <ToastContainer
          toasts={toasts}
          position={'top-right'}
          enableHoverPause={false}
          enableProgressBar={false}
          onRemove={() => {}}
          onPause={() => {}}
          onResume={() => {}}
          renderToast={toast => <div data-testid={'toast-smoke'}>{toast.message}</div>}
        />
      )}
    </main>
  )
}
