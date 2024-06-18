import BuscadorPedidos from "@/components/BuscadorPedidos";
import ListaPedido from "@/components/ListaPedido";
import ListaPedidoAdmin from "@/components/ListaPedidoAdmin";
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
        .sort({ date: -1 })
        .toArray();

    const pedidosSerializables = pedidos.map((pedido) => ({
        ...pedido,
        _id: pedido._id.toString(),
        user: pedido.user.toString(),
        totalprice: pedido.totalprice,
    })) as unknown as Pedido[];

    return pedidosSerializables;
};

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
                    <BuscadorPedidos search={searchParams.busqueda} />
                </div>
            </div>
            <div className="bg-zinc-300 text-black min-h-screen">
                <ListaPedidoAdmin pedidos={pedidos} />
            </div>
        </>
    );
};

export default Page;
