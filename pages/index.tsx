import styles from '@/styles/Home.module.css'

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