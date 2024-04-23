import React from "react";
import getDb from "@/lib/mongodb";
import Libro from "@/lib/models/libro";
import ListaDeLibros from "@/components/ListaDeLibros";
import Novedades from "@/components/Novedades";

async function getLibros() {
    const db = await getDb();
    const libros = await db
        .collection<Libro>("products")
        .find({})
        .sort({ publication: -1 })
        .toArray();
    return libros;
}

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
}

const Page = async () => {
    const libros = await getLibros();
    const novedades = await getNovedades();

    return (
        <div className="bg-zinc-300 text-black">
            <Novedades libros={novedades} />
            <ListaDeLibros libros={libros} />
        </div>
    );
};

export default Page;
