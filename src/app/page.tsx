import React from "react";
import ListaDeLibros from "@/components/ListaDeLibros";
import Encabezado from "@/components/Encabezado";
import getDb from "@/lib/mongodb";
import Libro from "@/lib/models/libro";
import Novedades from "@/components/Novedades";

const Page = async () => {
  const libros = await getLibros();
  const novedad = await getNovedad();

  return (
    <div className="bg-zinc-900">
      <Encabezado />
      <Novedades libro={novedad} /> 
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

async function getNovedad() {
  const db = await getDb();

  const novedad = await db.collection<Libro>("products")
    .find({})
    .sort({ publication: -1 })
    .limit(1)
    .toArray();

  return novedad[0];
}
