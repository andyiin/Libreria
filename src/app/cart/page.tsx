import { ObjectId } from "mongodb";
import ListadoCarrito from "@/components/ListadoCarrito";
import { retrieve } from "@/lib/session";
import getDb from "@/lib/mongodb";
import Usuario from "@/lib/models/usuario";

export default async function Page() {
    const user = await retrieve("user");
    const id = user?._id;
    const db = await getDb();
    const perfil = await db.collection<Usuario>("users").findOne({ _id: new ObjectId(id) }) as Usuario;

    return (
        <ListadoCarrito user={perfil} />
    );
};
