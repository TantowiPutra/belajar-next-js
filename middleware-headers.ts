import { NextResponse } from "next/server";

export function middleware() {
    const res = NextResponse.next();
    res.headers.set("X-API-KEY", 'API_KEY_TEST');
    return res;
}

export const config = {
    matcher: "/:path*"
}