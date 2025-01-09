import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { modals } from './modals.ts'
import { theme } from './theme.ts'
import './registerSW'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <Notifications />
      <ModalsProvider modals={modals}>
        <App />
      </ModalsProvider>
    </MantineProvider>
  </StrictMode>
)
