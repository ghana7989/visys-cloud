import { registerSW } from 'virtual:pwa-register'

// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt: BeforeInstallPromptEvent | null = null

// Handle PWA installation
const handleInstallation = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    console.log(`User ${outcome} the installation`)
    deferredPrompt = null
  }
}

// Register service worker
const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    if (confirm('New content available. Reload?')) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline')
  },
  onRegistered(r) {
    console.log('Service Worker registered')
    
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault()
      // Store the event for later use
      deferredPrompt = e as BeforeInstallPromptEvent
      console.log('Install prompt available')
    })

    // Listen for successful installation
    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed')
      deferredPrompt = null
    })

    if (r) {
      setInterval(() => {
        r.update()
      }, 60 * 60 * 1000) // Check for updates every hour
    }
  },
  onRegisterError(error) {
    console.error('SW registration error', error)
  }
})

// Export for use in components if needed
export { handleInstallation } 
