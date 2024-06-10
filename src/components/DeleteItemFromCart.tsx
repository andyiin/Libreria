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
                <Image
                    src="/trash.svg"
                    alt="Borrar producto"
                    width={30}
                    height={30}
                />
                Borrar producto
            </button>
        </form>
    );
};
