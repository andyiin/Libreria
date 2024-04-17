import LibroModel from "@/lib/models/libro";
import { WithId } from "mongodb";

export default function AnnadirLibro(props: { libro: WithId<LibroModel> }) {
    return (
        <div className="flex flex-col md:flex-row justify-center p-5 w-1/3">  
            <div className="flex-none md:ml-5 border-l-2 border-zinc-900 pl-5">
                <p className="text-4xl font-bold">{props.libro.price.toString()}€</p>
                <button className="mt-2 px-4 py-2 rounded bg-indigo-800 hover:bg-indigo-900 text-zinc-300 text-lg transition duration-300">
                    Añadir a la cesta
                </button>
                <p className="mt-2">Recíbelo mañana</p>
                <p>Gastos de envío gratis</p>
            </div>
        </div>
    );
}