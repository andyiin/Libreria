import getDb from "@/lib/mongodb";
import { Decimal128, ObjectId } from "mongodb";
import Pedido from "@/lib/models/pedido";
import { redirect } from "next/navigation";
import EditarPedido from "@/components/EditarPedido";

// Server Action para cargar los datos del pedido
async function loadPedido(id: string) {
    "use server";
    const db = await getDb();
    const pedido = await db
        .collection<Pedido>("orders")
        .findOne({ _id: new ObjectId(id) });

    if (!pedido) {
        return null;
    }

    const pedidoCliente = {
        ...pedido,
        _id: pedido._id.toString(),
    };

    return JSON.parse(JSON.stringify(pedidoCliente));
}

async function updatePedido(formData: FormData) {
    "use server";
    const db = await getDb();
    const numphone = formData.get("numphone");
    const postalcode = formData.get("postalcode");

    const data: Partial<Pedido> = {
        state: formData.get("state")?.toString(),
        name: formData.get("name")?.toString(),
        email: formData.get("email")?.toString(),
        numphone: numphone ? +numphone : undefined,
        address: formData.get("address")?.toString(),
        city: formData.get("city")?.toString(),
        postalcode: postalcode ? +postalcode : undefined,
    };

    await db
        .collection<Pedido>("orders")
        .updateOne(
            { _id: new ObjectId(formData.get("id")?.toString()) },
            { $set: data }
        );
    redirect("../../dashboard");
}

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const pedido = await loadPedido(id);

    if (!pedido) {
        redirect("/not-found");
    }

    return (
        <div className="bg-zinc-300 text-black py-10 flex items-center justify-center min-h-screen">
            <EditarPedido pedido={pedido} onSubmit={updatePedido} />
        </div>
    );
}
