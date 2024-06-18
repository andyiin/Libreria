import LibroModel from "@/lib/models/libro";
import { WithId } from "mongodb";
import Libro from "./Libro";

export default function ListaDeLibros(props: { libros: WithId<LibroModel>[] }) {
    return (
        <div>
            {props.libros.length === 0 && (
                <div className="text-center text-2xl py-10">
                    No se encontraron resultados
                </div>
            )}

            <ul className="flex flex-wrap justify-around gap-16 py-10 px-20">
                {props.libros.map((libro) => (
                    <Libro key={libro._id.toString()} libro={libro} />
                ))}
            </ul>
        </div>
    );
}
