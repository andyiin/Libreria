import Libro from "@/lib/models/libro";
import getDb from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import VistaDetallada from "@/components/VistaDetallada";

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

    if (!libro) {
        notFound();
    }

    return (
        <VistaDetallada
            id={params.id}
            libro={libro}
            librosAutor={librosAutor}
        />
    );
};

export default Page;
