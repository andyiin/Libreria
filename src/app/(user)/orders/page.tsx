import { notFound } from "next/navigation";
import { retrieve } from "@/lib/session";
import { PaginacionPedidos } from "@/components/PaginacionPedidos";

async function getUser() {
    return await retrieve("user");
}

const Page = async () => {
    const user = await getUser();

    if (!user) {
        notFound();
    }

    return (
        <div className="bg-zinc-300">
            <h1 className="text-4xl text-indigo-800 font-bold pt-6 text-center">
                Mis pedidos
            </h1>
            <PaginacionPedidos userId={user._id} />
        </div>
    );
};

export default Page;
