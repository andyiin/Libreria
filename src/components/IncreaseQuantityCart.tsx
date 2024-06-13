"use client";

import { increaseQuantityAction } from "@/lib/action";
import Image from "next/image";

export default function IncreaseQuantityCart({ id }: { id: string }) {
    return (
        <form action={increaseQuantityAction} className="text-center">
            <button
                className="flex items-center justify-center w-10 h-10 bg-green-500 hover:bg-green-700 text-white font-bold rounded cursor-pointer"
                type="submit">
                <Image
                    src="/add.svg"
                    alt="Añadir unidad"
                    width={20}
                    height={20}
                />
            </button>
        </form>
    );
};
