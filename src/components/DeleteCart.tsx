"use client";

import Image from "next/image";
import { handleDeleteCartAction } from "@/lib/action";

export default function DeleteCart() {
    return (
        <form action={handleDeleteCartAction} className="text-center inline-block">
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
