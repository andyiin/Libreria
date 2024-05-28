import { deleteCookie } from "@/lib/session";
import { redirect } from "next/navigation";

const action = async () => {
    "use server";

    deleteCookie("user");
    redirect("/");
};

export default function Logout() {
    return (
        <form action={action} className="text-center">
            <button className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" type="submit">Logout</button>
        </form>
    );
};
