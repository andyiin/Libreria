import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { retrieve } from "@/lib/session"

export async function middleware(request: NextRequest) {
    const user = await retrieve("user");

    const protectedRoutes = ["/dashboard", "/logout", "/profile", "/create-book"];
    const publicRoutes = ["/login", "/register"];

    if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route)) && !user)
        return NextResponse.redirect(new URL("/", request.url));

    if (publicRoutes.includes(request.nextUrl.pathname) && user)
        return NextResponse.redirect(new URL("/", request.url));

    if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route)) && user?.rol !== "admin")
        return NextResponse.redirect(new URL("/", request.url));

    return NextResponse.next()
};

export const config = {
    matcher: ["/login", "/register", "/dashboard", "/logout", "/profile/:path*", "/create-book"]
};
