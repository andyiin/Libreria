import Image from "next/image";
import { deleteItemFromCart } from "@/lib/session";

export default function DeleteItemFromCart({ id }: { id: string }) {
    const action = async () => {
        "use server";

        deleteItemFromCart(id);
    };

    return (
        <form action={action} className="text-center">
            <button
                className="flex items-center justify-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                type="submit">
                <span className="mr-2">Borrar producto</span>
                <Image
                    src="/trash.svg"
                    alt="Borrar producto"
                    width={20}
                    height={20}
                    className="w-6 h-6"
                />
            </button>
        </form>
    );
};
