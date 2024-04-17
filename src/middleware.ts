import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { retrieve } from "@/lib/auth"

export async function middleware(request: NextRequest) {
    const user = await retrieve("user");

    if (user && request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register")
        return NextResponse.redirect(new URL("/", request.url))

    if (!user && request.nextUrl.pathname === "/dashboard" || request.nextUrl.pathname === "/logout")
        return NextResponse.redirect(new URL("/", request.url))

    return NextResponse.next()
};

export const config = {
    matcher: ["/login", "/register", "/dashboard", "/logout"]
};
