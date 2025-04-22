import Head from "next/head";

export default function Home() {
    // INI ROUTE HALAMAN INDEX
    // WEBSITE MEMERLUKAN TAMBAHAN METADATA DISINI
    return (
        <>
            <Head>
                <title>Ini Title Website</title>
                <meta name="description" content="ini deskripsi website" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="file.svg" />
            </Head>
        </>
    );
}