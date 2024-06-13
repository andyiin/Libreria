import getDb from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import Usuario from "@/lib/models/usuario";
import { redirect } from "next/navigation";
import EditarContrasena from "@/components/EditarContrasena";
import bcrypt from "bcryptjs";

// Server Action para cargar los datos de la contraseña del usuario
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
    const currentPassword = formData.get("passwordActual")?.toString().trim();
    const newPassword = formData.get("password")?.toString().trim();

    // Obtener el usuario actual de la base de datos
    const user = await db.collection<Usuario>("users").findOne({ _id: new ObjectId(formData.get("id")?.toString()) });

    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    // Verificar la contraseña actual
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
        throw new Error("La contraseña actual es incorrecta");
    }

    // Encriptar la nueva contraseña si se proporciona
    let hashedPassword = user.password;
    if (newPassword) {
        hashedPassword = await bcrypt.hash(newPassword, 10);
    }

    const data: Partial<Usuario> = {
        password: hashedPassword,
    };

    await db
        .collection<Usuario>("users")
        .updateOne(
            { _id: new ObjectId(formData.get("id")?.toString()) },
            { $set: data }
        );
    redirect("./");
}

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const perfil = await loadPerfil(id);

    if (!perfil) {
        redirect("/not-found");
    }

    return (
        <div className="bg-zinc-300 text-black py-10 flex items-center justify-center min-h-screen">
            <EditarContrasena perfil={perfil} onSubmit={updatePerfil} />
        </div>
    );
}
