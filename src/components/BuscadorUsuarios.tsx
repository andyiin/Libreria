import { redirect } from "next/navigation";

async function buscar(formData: FormData) {
    "use server";
    const busqueda = formData.get("buscador");
    redirect(`./dashboard/search?busqueda=${busqueda}`);
}

export default function BuscadorUsuarios() {
    return (
        <form action={buscar} className="w-1/2">
            <input
                name="buscador"
                type="text"
                placeholder="Buscar usuario..."
                className="w-full px-4 py-2 pr-10 border border-gray-400 rounded-lg"
            />
        </form>
    );
}
