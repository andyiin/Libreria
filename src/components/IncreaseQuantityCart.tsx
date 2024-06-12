import Image from "next/image";
import { editQuantityCart } from "@/lib/session";

export default function IncreaseQuantityCart({ id }: { id: string }) {
    const action = async () => {
        "use server";

        editQuantityCart(id, 1);
    };

    return (
        <form action={action} className="text-center">
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
