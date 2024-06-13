"use server";

import { editQuantityCart, deleteCart, deleteItemFromCart } from "@/lib/cart";
import { redirect } from "next/navigation";
import { deleteCookie } from "./session";

export async function handleDeleteCartAction() {
    await deleteCart();
    redirect("/");
};

export async function decreaseQuantityAction(state: any, formData: FormData) {
    await editQuantityCart(formData.get("id")?.toString() ?? "", -1);
    return state + 1
};

export async function increaseQuantityAction(state: any, formData: FormData) {
    await editQuantityCart(formData.get("id")?.toString() ?? "", 1);
    return state + 1
};

export async function deleteItemFromCartAction(state: any, formData: FormData) {
    await deleteItemFromCart(formData.get("id")?.toString() ?? "");
    return state + 1
};

export const logoutAction = async () => {
    "use server";

    deleteCookie("user");
    redirect("/");
};
