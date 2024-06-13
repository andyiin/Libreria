"use server";

import { editQuantityCart, deleteCart, deleteItemFromCart } from "@/lib/session";
import { redirect } from "next/navigation";

export async function handleDeleteCartAction() {
    await deleteCart();
    redirect("/");
};

export async function decreaseQuantityAction(id: string) {
    await editQuantityCart(id, -1);
};

export async function increaseQuantityAction(id: string) {
    await editQuantityCart(id, 1);
};

export async function deleteItemFromCartAction(id: string) {
    await deleteItemFromCart(id);
};
