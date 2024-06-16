"use client";

import { Dispatch, FormEventHandler, SetStateAction } from "react";
import Image from "next/image";
import { deleteItemFromCart } from "@/lib/cart";

export default function DeleteItemFromCart({ id, stateChanged }: { id: string; stateChanged: Dispatch<SetStateAction<number>> }) {
    const submitHandler: FormEventHandler = (event) => {
        event.preventDefault();
        deleteItemFromCart(id);
        stateChanged(d => ++d);
    };

    return (
        <form onSubmit={submitHandler} className="text-center">
            <input type="hidden" value={id} name="id"/>
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
