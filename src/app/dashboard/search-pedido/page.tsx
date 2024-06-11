import BuscadorPedidos from "@/components/BuscadorPedidos";
import ListaPedido from "@/components/ListaPedido";
import Pedido from "@/lib/models/pedido";
import getDb from "@/lib/mongodb";

async function getPedidos(busqueda: string) {
    const db = await getDb();
    const pedidos = await db
        .collection<Pedido>("orders")
        .find({
            $or: [
                { mail: { $regex: busqueda, $options: "i" } },
                { name: { $regex: busqueda, $options: "i" } },
            ],
        })
        .toArray();

    return pedidos;
}

const Page = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string };
}) => {
    const pedidos = await getPedidos(searchParams.busqueda);
    return (
        <>
            <div className="bg-gray-300">
                <h1 className="text-4xl text-indigo-800 font-bold pt-6 text-center">
                    Gestión pedidos
                </h1>
                <br />
                <div className="flex justify-center">
                    <BuscadorPedidos />
                </div>
            </div>
            <div className="bg-zinc-300 text-black min-h-screen">
                <ListaPedido pedidos={pedidos} />
            </div>
        </>
    );
};

export default Page;
