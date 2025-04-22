import RootLayout from '@/layout'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import '../styles/globals.css'

/*
    Sebagai Pembungkus (semua) halaman ketika di load.
    Berfungsi untuk custom struktur utama. 
    
    Biasanya dipakai untuk mengwrap semua halaman untuk component yg reusable secara global
    kek misalnya header, footer, ato juga css global.

    Typesafe = bakal ada checking setiap kali ada type yg tidak fulfill saat pas parameter, much better than js which
    only can be found out during run time
*/

export default function MyApp({ Component, pageProps }: AppProps) {
  // Custom Hook dari NextJS untuk track routes
  const router = useRouter();

  // TERNARY CHECK PATH SAAT INI
  const metaTitle = router.pathname === '/' ? "HOME" : router.pathname.replace('/', '').toUpperCase();

  return (
    <div>
      <header>Ini Header Dari _app.tsx</header> 
      <RootLayout title="Test Passing Title" metaTitle={metaTitle}>
        <Component {...pageProps} />
      </RootLayout>
      <footer>Ini Footer Dari _app.tsx</footer> 
    </div>
  )
}
