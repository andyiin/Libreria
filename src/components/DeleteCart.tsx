"use client";

import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { deleteCart } from "@/lib/cart";
import { redirect } from "next/navigation";

export default function DeleteCart({ stateChange }: { stateChange: Dispatch<SetStateAction<number>> }) {
    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            deleteCart();
            stateChange(d => ++d);
            redirect("/");
        } } className="text-center inline-block">
            <button
                className="flex items-center justify-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                type="submit">
                <Image
                    src="/trash.svg"
                    alt="Borrar carrito"
                    width={20}
                    height={20}
                    className="w-6 h-6"
                />
                <span className="ml-2">Vaciar carrito</span>
            </button>
        </form>
    );
}
