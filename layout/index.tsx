import Head from "next/head";
import { Geist, Geist_Mono } from 'next/font/google'
import Link from "next/link";
/*
    Komponen ./layout/index.js menerima prop berupa children dari komponen induk, dan memberikan kembalian berupa komponen
    yang sudah disatukan dengan prop tersebut

    *gotta have to delve into ts more lol, never touched it b4
    - type :? membuat props yang dipassing menjadi opsional
    - && condition check, kalo memenuhi jalani komponen setelahnya, mirip ternary operator, tapi ada di JSX
*/

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export default function RootLayout({ children, title, metaTitle } : { children: React.ReactNode; title: string; metaTitle?: string}) {
    return (
        <div>
            <Head>
                <title>{`Next.js App ${metaTitle || "Default Meta Title"}`}</title>
                <meta name="description" content="ini deskripsi website" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="file.svg" />
            </Head>
            <div className={`${geistSans.variable} ${geistMono.variable} flex flex-col h-screen`}>
                <header className='bg-blue-600 text-white'>
                    <div className="container flex mx-auto justify-between items-center min-h-[100px]">
                        <h1 className="text-xl font-bold">Next.js App</h1>
                        <ul className="flex space-x-4">
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href="/about">About</Link>
                            </li>
                        </ul>
                    </div>
                </header>

                <main className="flex-1 container mx-auto p-4">
                    Header <span>{title || "Default Title"}</span>
                    <div>{ children }</div>
                </main>

                <footer className="bg-gray-800 text-white p4 text-center">
                  <p>&copy; { new Date().getFullYear() } My personal Website</p>  
                </footer>
            </div>
        </div>
    );
}


