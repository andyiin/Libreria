import React from "react";
import Encabezado from "@/components/Encabezado";
import getDb from "@/lib/mongodb";
import Libro from "@/lib/models/libro";
import { retrieve } from "@/lib/auth";
import ListaDeLibros from "@/components/ListaDeLibros";
import Novedades from "@/components/Novedades";

async function getUser() {
    return await retrieve("user");
};

async function getLibros() {
    const db = await getDb();
    const libros = await db.collection<Libro>("products").find({}).toArray();
    return libros;
};

async function getNovedades() {
    const db = await getDb();
    const novedades = await db
        .collection<Libro>("products")
        .find({})
        .sort({ publication: -1 })
        .limit(3)
        .toArray();

    // Convierte cada libro a un formato serializable
    const novedadesSerializables = novedades.map((libro) => ({
        ...libro,
        _id: libro._id.toString(),
        price: libro.price.toString(),
        publication: libro.publication.toISOString(),
    }));

    return novedadesSerializables;
};

const Page = async () => {
    const libros = await getLibros();
    const novedades = await getNovedades();
    const user = await getUser();

    return (
        <div className="bg-zinc-300 text-black">
            <Encabezado user={user} />
            <Novedades libros={novedades} />
            <ListaDeLibros libros={libros} />
        </div>
    );
};

export default Page;
