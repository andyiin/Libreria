import Libro from "@/lib/models/libro";
import getDb from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import LibroDetallado from "@/components/LibroDetallado";
import AnnadirLibro from "@/components/AnnadirLibro";
import FichaTecnica from "@/components/FichaTecnica";
import ListaDeLibros from "@/components/ListaDeLibros";

const Page = async ({ params }: { params: { id: string } }) => {
    const { libro, librosAutor } = await getLibroYLibrosAutor(params.id);

    if (!libro) {
        notFound();
    }

    return (
        <div className="bg-zinc-300 text-black">
            <div className="flex">
                {libro && <LibroDetallado libro={libro} />}
                {libro && <AnnadirLibro libro={libro} />}
            </div>
            <div className="flex justify-center">{libro && <FichaTecnica libro={libro} />}</div>
            <div>
                <h2>Otros libros del autor</h2>
                {librosAutor && <ListaDeLibros libros={librosAutor} />}
            </div>

        </div>
    );
};

export default Page;

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
            .toArray();

        return { libro, librosAutor };
    } catch {
        return { libro: null, librosAutor: null };
    }
}
