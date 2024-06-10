import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Encabezado from "@/components/Encabezado";
import { retrieve } from "@/lib/session";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

async function getUser() {
    return await retrieve("user");
}

export const metadata: Metadata = {
    title: "Librería",
    description: "Generated by create next app",
};

export default async function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const user = await getUser();
    return (
        <html lang="es">
            <body className={inter.className}>
                <Encabezado user={user} />
                {children}
                <Footer />
            </body>
        </html>
    );
}
