import Libro from "@/lib/models/libro";
import getDb from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";

const VistaDetallada = async ({ params }: { params: { id: string } }) => {
    const libro = await getLibro(params.id);

    if (!libro) {
        notFound();
    }

    return (
        <div>
            <h1>{libro.name}</h1>
        </div>
    );
};

export default VistaDetallada;

async function getLibro(id: string) {
    try {
        const db = await getDb();

        const libros = await db
            .collection<Libro>("products")
            .findOne({ _id: new ObjectId(id) });

        return libros;
    } catch {
      return null;
    }
}
