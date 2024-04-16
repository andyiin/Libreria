import LibroModel from "@/lib/models/libro";
import { WithId } from "mongodb";

export default function LibroDetallado(props: { libro: WithId<LibroModel> }) {
    return (
        <div className="flex flex-col md:flex-row text-zinc-900 p-5 w-2/3">
            <div className="flex-none">
                <img
                    src="/img/imgTest.jpg"
                    alt=""
                    className="w-72 h-auto drop-shadow-2xl"
                />
            </div>
            <div className="flex-grow md:ml-5">
                <h1 className="text-2xl font-bold">{props.libro.name}</h1>
                <p className="text-l">{props.libro.author}</p>
                <div className="flex flex-wrap mt-2">
                    {props.libro.categories.map((category, index) => (
                        <span key={index} className="bg-blue-300 rounded-full px-4 py-1 mr-2 mb-2">
                            {category}
                        </span>
                    ))}
                </div>
                <br />
                <p className="text-xl">{props.libro.opinion}</p>
                <p className="text-md mt-2">{props.libro.description}</p>
            </div>      
        </div>
    );
}