import '@/styles/globals.css'
import registerServiceWorker from '@/utils/register-service-worker';
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    registerServiceWorker('/sw.js');
  }, []);

  return <Component {...pageProps} />
}
