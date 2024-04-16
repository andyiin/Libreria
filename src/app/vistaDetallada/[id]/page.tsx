import Libro from "@/lib/models/libro";
import getDb from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import LibroDetallado from "@/components/LibroDetallado";
import AnnadirLibro from "@/components/AnnadirLibro";
import FichaTecnica from "@/components/FichaTecnica";

const Page = async ({ params }: { params: { id: string } }) => {
    const libro = await getLibro(params.id);

    if (!libro) {
        notFound();
    }

    return (
        <div className="bg-zinc-300">
            <div className="flex">
                {libro && <LibroDetallado libro={libro} />}
                {libro && <AnnadirLibro libro={libro} />}
            </div>
            <div className="flex justify-center">{libro && <FichaTecnica libro={libro} />}</div>
        </div>
    );
};

export default Page;

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
