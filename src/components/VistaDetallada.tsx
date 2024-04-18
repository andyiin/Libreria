import LibroDetallado from "@/components/LibroDetallado";
import AnnadirLibro from "@/components/AnnadirLibro";
import FichaTecnica from "@/components/FichaTecnica";
import ListaDeLibros from "@/components/ListaDeLibros";

export default function VistaDetallada(props: {id: string, libro: WithId<LibroModel>, librosAutor: WithId<LibroModel>[] }) {
    return (
        <div className="bg-zinc-300 text-black">
            <div className="flex">
                {props.libro && <LibroDetallado libro={props.libro} />}
                {props.libro && <AnnadirLibro libro={props.libro} />}
            </div>
            <div className="flex justify-center">{props.libro && <FichaTecnica libro={props.libro} />}</div>
            <div>
                <h2>Otros libros del autor</h2>
                {props.librosAutor && <ListaDeLibros libros={props.librosAutor} />}
            </div>

        </div>
    );
};
