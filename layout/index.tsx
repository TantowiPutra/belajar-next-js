/*
    Komponen ./layout/index.js menerima prop berupa children dari komponen induk, dan memberikan kembalian berupa komponen
    yang sudah disatukan dengan prop tersebut

    *gotta have to delve into ts more lol, never touched it b4
    - type :? membuat props yang dipassing menjadi opsional
    - && condition check, kalo memenuhi jalani komponen setelahnya, mirip ternary operator, tapi ada di JSX
*/

export default function RootLayout({ children, title } : { children: React.ReactNode; title: string }) {
    return (
        <div>
            <div>Header {title && <span>{title}</span>}</div>
            <div>{ children }</div>
            <div>Footer</div>
            <div>Footer 2</div>
        </div>
    );
}


