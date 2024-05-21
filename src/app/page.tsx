import getDb from "@/lib/mongodb";
import Libro from "@/lib/models/libro";
import Novedades from "@/components/Novedades";
import { Paginacion } from "@/components/Paginacion";
import CrearLibroBoton from "@/components/CrearLibroBoton";
import { retrieve } from "@/lib/auth";
import EncabezadoBuscador from "@/components/EncabezadoBuscador";

async function getUser() {
    return await retrieve("user");
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
    const novedades = await getNovedades();
    const user = await getUser();

    return (
        <>
            <div className="flex items-center justify-center w-full bg-gray-200">
                <EncabezadoBuscador />
            </div>
            <div className="bg-zinc-300 text-black flex flex-col items-center">
                <Novedades libros={novedades} />
                <CrearLibroBoton user={user} />
                <Paginacion />
            </div>
        </>
    );
};

export default Page;
