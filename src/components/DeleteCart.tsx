import Image from "next/image";
import { deleteCart } from "@/lib/session";
import { redirect } from "next/navigation";

const action = async () => {
    "use server";

    deleteCart();
    redirect("/");
};

export default function DeleteCart() {
    return (
        <form action={action} className="text-center inline-block">
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
                <span className="ml-2">Borrar carrito</span>
            </button>
        </form>
    );
};
