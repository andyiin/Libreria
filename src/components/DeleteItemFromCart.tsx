"use client";

import { deleteItemFromCartAction } from "@/lib/action";
import Image from "next/image";

export default function DeleteItemFromCart({ id }: { id: string }) {
    return (
        <form action={deleteItemFromCartAction} className="text-center">
            <button
                className="flex items-center justify-center w-10 h-10 bg-red-500 hover:bg-red-700 text-white font-bold rounded cursor-pointer"
                type="submit">
                <Image
                    src="/trash.svg"
                    alt="Borrar producto"
                    width={20}
                    height={20}
                />
            </button>
        </form>
    );
};
