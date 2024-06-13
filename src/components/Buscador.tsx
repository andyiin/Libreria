import { redirect } from "next/navigation";

async function buscar(formData: FormData) {
    "use server";
    const busqueda = formData.get("buscador");
    redirect(`/search?busqueda=${busqueda}`);
}

export default function Buscador() {
    return (
        <form action={buscar} className="w-1/2 flex flex-row">
            <input
                name="buscador"
                type="text"
                placeholder="Buscar libro..."
                className="w-full px-4 py-2 pr-10 border border-gray-400 rounded-lg"
            />
            <button 
                className="bg-indigo-800 hover:bg-indigo-900 text-white ml-2 p-2 rounded-xl transition duration-300"
                onClick={buscar}
                >
                Buscar
            </button>
        </form>
    );
}
