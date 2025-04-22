import Head from "next/head";
import { Geist, Geist_Mono } from 'next/font/google'
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
            <div className={`${geistSans.variable} ${geistMono.variable}`}>
                <div>Header <span>{title || "Default Title"}</span></div>
                <div>{ children }</div>
                <div>Footer</div>
            </div>
        </div>
    );
}


