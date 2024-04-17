import LibroModel from "@/lib/models/libro";
import { WithId } from "mongodb";

const Novedades = ({ libro }: { libro: WithId<LibroModel> }) => {
    if (!libro) return <div className="flex justify-center items-center">No hay novedades disponibles.</div>;

    return (
        <div className="flex justify-center items-center h-50vh p-10">
            <div className="bg-zinc-900 text-zinc-200 p-10 w-full md:w-1/2 shadow-lg rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-5xl text-indigo-300 font-bold mb-4 text-center">Novedades!!</h1>
                        <h2 className="text-3xl font-bold mb-2">{libro.name}</h2>
                        <p className="text-xl mb-4">{libro.opinion}</p>
                        <p className="text-zinc-400">{libro.author}</p>
                        <button className="mt-4 bg-indigo-800 text-white py-2 px-4 rounded hover:bg-indigo-900 transition duration-300">Comprar ahora →</button>
                    </div>
                    <div className="h-auto drop-shadow-2xl relative">
                        <div className="clip-trapecio">
                            <img
                                src="/img/imgTest.jpg"
                                alt={libro.name}
                                //className="object-cover" // Esto reemplaza la propiedad objectFit
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Novedades;
