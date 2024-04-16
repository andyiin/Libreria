import LibroModel from "@/lib/models/libro";
import { WithId } from "mongodb";

export default function LibroDetallado(props: { libro: WithId<LibroModel> }) {
    return (
        <div className="flex flex-col md:flex-row text-zinc-900 p-5">
            
            <div className="md:col-span-2 mt-5">
                <h2 className="text-xl font-bold">Ficha Técnica</h2>
                <table className="table-auto w-full">
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2"><b>Número de páginas: </b>{props.libro.pages}</td>
                            <td className="border px-4 py-2"><b>Fecha lanzamiento: </b>{props.libro.publication.getUTCDate()}/{props.libro.publication.getUTCMonth()+1}/{props.libro.publication.getFullYear()}</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2"><b>Editorial: </b>{props.libro.editorial}</td>
                            <td className="border px-4 py-2"><b>idioma: </b>{props.libro.language}</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2"><b>ISBN: </b>{props.libro.isbn}</td>
                            <td className="border px-4 py-2"><b>Autor: </b>{props.libro.author}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}