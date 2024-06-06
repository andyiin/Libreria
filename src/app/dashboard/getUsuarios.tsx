"use server";
import Usuario from "@/lib/models/usuario";
import getDb from "@/lib/mongodb";

export async function getUsuarios(page: number = 1, usuariosPerPage: number = 12) {
    const db = await getDb();
    const totalUsuarios = await db.collection<Usuario>("users").countDocuments();
    const skip = (page - 1) * usuariosPerPage;
    const usuarios = await db
        .collection<Usuario>("users")
        .find({})
        .sort({ rol: 1 })
        .skip(skip)
        .limit(usuariosPerPage)
        .toArray();

        const usuariosSerializables = usuarios.map((usuario) => ({
            ...usuario,
            _id: usuario._id.toString(),
        }));

    return { usuarios: usuariosSerializables, totalUsuarios };
}