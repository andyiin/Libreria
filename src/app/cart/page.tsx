import { ObjectId } from "mongodb";
import ListadoCarrito from "@/components/ListadoCarrito";
import { retrieve } from "@/lib/session";
import getDb from "@/lib/mongodb";
import Usuario from "@/lib/models/usuario";

export default async function Page() {
    // const user = await retrieve("user");
    // const id = user?._id;
    // const db = await getDb();
    // const perfil = await db.collection<Usuario>("users").findOne({ _id: new ObjectId(id) }) as Usuario;
    const perfil = {
        _id: new ObjectId("60d4b1b3b3e3f3b3b3e3f3b3"),
        mail: "no",
        rol: "user" as const,
        active: true,
        visible: true,
        name: "no",
        street: "no",
        numphone: 600123456,
        city: "no",
        postalcode: 12345,
        password: ""
    };

    console.log("HE SIDO LLAMADO")

    return (
        <ListadoCarrito user={perfil} />
    );
};
