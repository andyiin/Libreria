import Image from "next/image";
import { editQuantityCart } from "@/lib/session";

export default function DecreaseQuantityCart({ id }: { id: string }) {
    const action = async () => {
        "use server";

        editQuantityCart(id, -1);
    };

    return (
        <form action={action} className="text-center">
            <button
                className="flex items-center justify-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                type="submit">
                <Image
                    src="/minus.svg"
                    alt="Quitar unidad"
                    width={30}
                    height={30}
                />
            </button>
        </form>
    );
};
