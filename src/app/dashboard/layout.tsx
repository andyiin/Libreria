import { retrieve } from "@/lib/session";
import { redirect } from "next/navigation";

async function getUser() {
    return await retrieve("user");
}

export default async function DashboardLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const user = await getUser();

    if (user?.rol !== "admin") {
        redirect("/");
    }

    return (
        children
    );
};
