import getDb from "@/lib/mongodb";
import Libro from "@/lib/models/libro";
import { retrieve } from "@/lib/session";
import Novedades from "@/components/Novedades";
import { Paginacion } from "@/components/Paginacion";
import CrearLibroBoton from "@/components/CrearLibroBoton";
import Buscador from "@/components/Buscador";

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
            <div className="bg-zinc-300 text-black flex-col items-center">
                <Novedades libros={novedades} />
                <div className="flex justify-center">
                    <CrearLibroBoton user={user} />
                </div>
                <div className="flex justify-center pt-6">
                    <Buscador />
                </div>
                <Paginacion />
            </div>
    );
};

export default Page;
