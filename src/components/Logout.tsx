import { deleteCookie } from "@/lib/session";
import { redirect } from "next/navigation";

const action = async () => {
    "use server";

    deleteCookie("user");
    redirect("/");
};

export default function Logout() {
    return (
        <form action={action}>
            <button type="submit">Logout</button>
        </form>
    );
};
