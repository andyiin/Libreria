import Link from "next/link";
import LibroModel from "@/lib/models/libro";
import { WithId } from "mongodb";

export default function Libro(props: { libro: WithId<LibroModel> }) {
    return (
        <li className="flex flex-col w-72 rounded-xl overflow-hidden bg-zinc-300 text-zinc-900">
            <div>
                <Link href={`/vistaDetallada/${props.libro._id}`}>
                    <img
                        src="/img/imgTest.jpg"
                        alt=""
                        className="w-full flex-grow drop-shadow-2xl"
                    />
                </Link>
                <br />
            </div>
            <div className="px-3 pb-3">
                <div className="flex justify-between">
                    <p>
                        <b>{props.libro.name}</b>
                    </p>
                    <p className="text-xl">
                        <b>{props.libro.price.toString()}€</b>
                    </p>
                </div>
                <p className=" text-zinc-600">{props.libro.author}</p>
                <div className="flex">
                    <button className="px-3 py-0.5 bg-zinc-900 text-zinc-300">
                        Añadir
                    </button>
                </div>
            </div>
        </li>
    );
}
