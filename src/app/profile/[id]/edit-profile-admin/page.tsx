import getDb from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import Usuario from "@/lib/models/usuario";
import { redirect } from "next/navigation";
import EditarPerfilAdmin from "@/components/EditarPerfilAdmin";

// Server Action para cargar los datos del perfil del usuario
async function loadPerfil(id: string) {
    "use server";
    const db = await getDb();
    const perfil = await db.collection<Usuario>("users").findOne({ _id: new ObjectId(id) });

    if (!perfil) {
        return null;
    }

    const perfilCliente = {
        ...perfil,
        _id: perfil._id.toString()
    };

    return JSON.parse(JSON.stringify(perfilCliente));
}

async function updatePerfil(formData: FormData) {
    "use server";
    const db = await getDb();
    const numphone = formData.get("numphone");
    const postalcode = formData.get("postalcode");

    const data: Partial<Usuario> = {
        name: formData.get("name")?.toString(),
        mail: formData.get("mail")?.toString(),
        numphone: numphone ? +numphone : undefined,
        visible: formData.get("visible") === "true",
        street: formData.get("street")?.toString(),
        city: formData.get("city")?.toString(),
        postalcode: postalcode ? +postalcode : undefined,
    }

    await db
        .collection<Usuario>("users")
        .updateOne(
            { _id: new ObjectId(formData.get("id")?.toString()) },
            { $set: data }
        );
    redirect("../../dashboard");
}

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const perfil = await loadPerfil(id);

    if (!perfil) {
        redirect("/not-found");
    }

    return (
        <div className="bg-zinc-300 text-black py-10 flex items-center justify-center min-h-screen">
            <EditarPerfilAdmin perfil={perfil} onSubmit={updatePerfil} />
        </div>
    );
}
