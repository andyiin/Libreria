"use client";

import { Dispatch, FormEventHandler, SetStateAction } from "react";
import Image from "next/image";
import { editQuantityCart } from "@/lib/cart";

export default function IncreaseQuantityCart({ id, stateChanged }: { id: string; stateChanged: Dispatch<SetStateAction<number>> }) {
    const submitHandler: FormEventHandler = (event) => {
        event.preventDefault();
        editQuantityCart(id, +1);
        stateChanged(d => ++d);
    };
    return (
        <form onSubmit={submitHandler} className="text-center">
            <input type="hidden" value={id} name="id"/>
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
