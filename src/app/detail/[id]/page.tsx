import Libro from "@/lib/models/libro";
import getDb from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import VistaDetallada from "@/components/VistaDetallada";
import BorrarLibroBoton from "@/components/BorrarLibroBoton";
import EditarLibroBoton from "@/components/EditarLibroBoton";
import { retrieve } from "@/lib/session";
import EncabezadoBuscador from "@/components/EncabezadoBuscador";

async function getUser() {
    return await retrieve("user");
}

async function getLibroYLibrosAutor(id: string) {
    try {
        const db = await getDb();
        const libro = await db
            .collection<Libro>("products")
            .findOne({ _id: new ObjectId(id) });

        if (!libro) {
            return { libro: null, librosAutor: null };
        }

        const librosAutor = await db
            .collection<Libro>("products")
            .find({ author: libro.author, _id: { $ne: libro._id } })
            .sort({ publication: -1 })
            .toArray();

        return { libro, librosAutor };
    } catch {
        return { libro: null, librosAutor: null };
    }
}

const Page = async ({ params }: { params: { id: string } }) => {
    const { libro, librosAutor } = await getLibroYLibrosAutor(params.id);
    const user = await getUser();

    if (!libro) {
        notFound();
    }

    return (
        <>
            <div className="flex items-center justify-center w-full bg-gray-200">
                <EncabezadoBuscador />
            </div>
            <div className="bg-zinc-300 text-black px-20 pt-10 ">
                <EditarLibroBoton id={params.id} user={user} />
                <BorrarLibroBoton id={params.id} user={user} />
            </div>
            <VistaDetallada
                id={params.id}
                libro={libro}
                librosAutor={librosAutor}
            />
        </>
    );
};

export default Page;
