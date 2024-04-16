import React from "react";
import ListaDeLibros from "@/components/ListaDeLibros";
import Encabezado from "@/components/Encabezado";
import getDb from "@/lib/mongodb";
import Libro from "@/lib/models/libro";
import { retrieve } from "@/lib/auth";

async function getLibros() {
    const db = await getDb();

    const libros = await db.collection<Libro>("products").find({}).toArray();

    return libros;
};

async function getUser() {
    return await retrieve("user");
};

const Page = async () => {
    const libros = await getLibros();
    const user = await getUser();

    return (
        <div className="bg-zinc-900">
        <Encabezado user={user}/>
        <ListaDeLibros libros={libros} />
        </div>
    );
};

export default Page;
