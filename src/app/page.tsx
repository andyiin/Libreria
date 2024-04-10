import React from "react";
import ListaDeLibros from "@/components/ListaDeLibros";
import Encabezado from "@/components/Encabezado";
import getDb from "@/lib/mongodb";

const Page = async () => {
  const libros = await getLibros();
  return (
    <div>
      <Encabezado />
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
