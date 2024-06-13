"use client";

import { decreaseQuantityAction } from "@/lib/action";
import Image from "next/image";

export default function DecreaseQuantityCart({ id }: { id: string }) {
    return (
        <form action={decreaseQuantityAction} className="text-center">
            <button
                className="flex items-center justify-center w-10 h-10 bg-red-500 hover:bg-red-700 text-white font-bold rounded cursor-pointer"
                type="submit">
                <Image
                    src="/minus.svg"
                    alt="Quitar unidad"
                    width={20}
                    height={20}
                />
            </button>
        </form>
    );
};
