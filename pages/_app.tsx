import '../styles/globals.css'
import RootLayout from '@/layout'
import { AppProps } from 'next/app'

/*
    Sebagai Pembungkus (semua) halaman ketika di load.
    Berfungsi untuk custom struktur utama. 
    
    Biasanya dipakai untuk mengwrap semua halaman untuk component yg reusable secara global
    kek misalnya header, footer, ato juga css global.

    Typesafe = bakal ada checking setiap kali ada type yg tidak fulfill saat pas parameter, much better than js which
    only can be found out during run time
*/

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <header>Ini Header Global</header> 
      <RootLayout title="Test Passing Title">
        <Component {...pageProps} />
      </RootLayout>
      <footer>Ini Footer Global</footer> 
    </div>
  )
}
