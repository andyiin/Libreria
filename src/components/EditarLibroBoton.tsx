"use client";
import { InfoUser } from "@/lib/models/usuario";
import Link from "next/link";

interface EditarLibroBotonProps {
    id: string;
    user: InfoUser | undefined;
}

export default function EditarLibroBoton({ id, user }: EditarLibroBotonProps) {
    return (
        <>
            {user?.rol === "admin" && (
                <Link href={`/detail/${id}/edit`}>
                    <button className="mt-2 mx-4 px-4 py-2 rounded bg-emerald-800 hover:bg-emerald-900 text-white text-lg transition duration-300">
                        Editar libro
                    </button>
                </Link>
            )}
        </>
    );
}