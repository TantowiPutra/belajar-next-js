import '../styles/globals.css'
import { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <header>Ini Header Global</header> 
      <Component {...pageProps} />
      <footer>Ini Footer Global</footer> 
    </div>
  )
}
