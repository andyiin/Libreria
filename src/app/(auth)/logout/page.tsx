import { deleteCookie } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function LogoutPage() {
    redirect("/login");
}

export const action = async () => {
    "use server";
    
    await deleteCookie("user");
};
