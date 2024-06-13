import { InfoUser } from "@/lib/models/usuario";
import Link from "next/link";

export default function CrearLibroBoton(props: { user: InfoUser | undefined }) {
    return (
        <>
            {props.user?.rol === "admin" && (
                <Link href="/dashboard/create-book">
                    <button className="mt-4 mx-4 px-4 py-2 rounded bg-emerald-800 hover:bg-emerald-900 text-white text-lg transition duration-300">
                        Crear libro
                    </button>
                </Link>
            )}
        </>
    );
}
