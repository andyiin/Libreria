import { retrieve } from "@/lib/session";
import { redirect } from "next/navigation";

async function getUser() {
    return await retrieve("user");
}

export default async function UserLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const user = await getUser();

    if (!user)
        redirect("/");

    return (
        children
    );
};
