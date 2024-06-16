"use server";

import { redirect } from "next/navigation";
import { deleteCookie } from "./session";

export const logoutAction = async () => {
    "use server";

    deleteCookie("user");
    redirect("/");
};
