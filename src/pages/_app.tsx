import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { appWithTranslation } from 'next-i18next'
import { ThemeProvider } from 'theme-ui'
import { theme } from '../lib/theme'
import NProgress from 'nprogress'
import { useRouter } from 'next/router'
import '../styles/nprogress.css'
import '../styles/nextjs.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    const handleStart = () => {
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default appWithTranslation(MyApp)
