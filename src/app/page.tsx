import React from "react";
import getDb from "@/lib/mongodb";
import Libro from "@/lib/models/libro";
import ListaDeLibros from "@/components/ListaDeLibros";
import Novedades from "@/components/Novedades";
import Link from "next/link";

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
        <div className="bg-zinc-300 text-black flex flex-col items-center">
            <Novedades libros={novedades} />
            <Link href="/create-book">
                <button className="mt-4 mx-4 px-4 py-2 rounded bg-emerald-800 hover:bg-emerald-900 text-zinc-300 text-lg transition duration-300">
                    Crear libro
                </button>
            </Link>
            <ListaDeLibros libros={libros} />
        </div>
    );
};

export default Page;
