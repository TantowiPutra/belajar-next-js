import { NextRequest, NextResponse } from "next/server";


export function middleware(req: NextRequest) {
    if(req.nextUrl.pathname.startsWith('/blog/')) {
        const newUrl = req.nextUrl.pathname.replace('/blog/', '/articles/');
        return NextResponse.rewrite(new URL(newUrl, req.url))
    }
}

// export function middleware(req: NextRequest) {
//     const token = req.cookies.get('token');

//     // Apakah ada token & url tujuannya dashboard
//     if(!token && req.nextUrl.pathname.startsWith('/dashboard')) {
//         return NextResponse.redirect(new URL("/login", req.url));
//     } else {
//         console.log("Gak masuk kondisi", req.nextUrl.pathname);
//     }

//     const res = NextResponse.next();
//     res.headers.set("X-API-KEY", 'API_KEY_TEST');
//     return res;
// }

// export const config = {
//     matcher: "/dashboard/:path*"
// }