import React from "react";
import ListaDeLibros from "../components/ListaDeLibros";
import getDb from "@/lib/mongodb";

const Page = async() => {
  const libros = await getLibros();
    return (
        <div>
            <h1>Bienvenido a Nuestra Biblioteca</h1>
            <ListaDeLibros libros={libros} />
        </div>
    );
};

export default Page;

async function getLibros(): Promise<any[]> {
    const db = await getDb();

    const libros = await db.collection("products").find({}).toArray();

    return libros;
}
