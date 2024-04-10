import React from "react";
import ListaDeLibros from "@/components/ListaDeLibros";
import Encabezado from "@/components/Encabezado";
import getDb from "@/lib/mongodb";
import Libro from "@/lib/models/libro";

const Page = async () => {
  const libros = await getLibros();
  return (
    <div className="bg-zinc-900">
      <Encabezado />
      <ListaDeLibros libros={libros} />
    </div>
  );
};

export default Page;

async function getLibros() {
  const db = await getDb();

  const libros = await db.collection<Libro>("products").find({}).toArray();

  return libros;
}
