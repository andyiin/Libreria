import getDb from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import Usuario from "@/lib/models/usuario";
import UsuarioDetallado from "@/components/UsuarioDetallado";

async function getUsuario(id: string) {
    try {
        const db = await getDb();
        const usuario = await db
            .collection<Usuario>("users")
            .findOne({ _id: new ObjectId(id) });

        if (!usuario) {
            return { usuario: null };
        }

        return { usuario };
    } catch {
        return { usuario: null };
    }
}

const Page = async ({ params }: { params: { id: string }}) => {
    const { usuario } = await getUsuario(params.id);

    if (!usuario) {
        notFound();
    }

    return (
        <UsuarioDetallado id={params.id} usuario={usuario} />
    );
};

export default Page;
