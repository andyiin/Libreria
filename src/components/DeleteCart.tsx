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
        <form action={action} className="text-center">
            <button
                className="flex items-center justify-center w-50 block px-4 py-2 text-sm text-gray-700 bg-red hover:bg-gray-200"
                type="submit">
                <Image
                    src="/trash.svg"
                    alt="Borrar carrito"
                    width={30}
                    height={30}            
                />
                Borrar carrito
            </button>
        </form>
    );
};
