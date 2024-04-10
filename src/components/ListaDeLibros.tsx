import LibroModel from "@/lib/models/libro";
import { WithId } from "mongodb";
import Libro from "./Libro";

export default function ListaDeLibros(props: { libros: WithId<LibroModel>[] }) {
  return (
    <div>
      <h1>Listado de Libros</h1>
      <ul className="flex flex-wrap justify-around gap-4 px-4">
        {props.libros.map((libro) => (
          <Libro key={libro._id.toString()} libro={libro} />
        ))}
      </ul>
    </div>
  );
}
