import styles from '@/styles/Home.module.css'

/* 
    PENDEKATAN ROUTING MENGGUNAKAN FOLDER
    - profile/index.tsx

    PENDEKATAN INDEX ROUTING
    - profile.tsx

    PENDEKATAN NESTED ROUTING
    - /about/me, didalam folder about, path rootnya memiliki nama index.tsx, sehingga index.tsx merepresentasikan /about (root) 
*/

// ! CONTOH PENGGUNAAN INDEX ROUTE
export default function Home() {
    // INI ROUTE HALAMAN INDEX
    // WEBSITE MEMERLUKAN TAMBAHAN METADATA DISINI
    return (
        <>
            <div className={styles.footer}>
                Index Page
            </div>

            <div id={styles.footer_baru}>
                Test CSS Selector Using ID
            </div>

            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
        </>
    );
}