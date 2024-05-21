"use client";
import { InfoUser } from "@/lib/models/usuario";
import { deleteLibro } from "@/app/detail/[id]/deleteLibro";
import Link from "next/link";

interface BorrarLibroBotonProps {
    id: string;
    user: InfoUser | undefined;
}

export default function BorrarLibroBoton({ id, user }: BorrarLibroBotonProps) {
    return (
        <>
            {user?.rol === "admin" && (
                <Link href="/">
                    <button
                        className="mt-2 mx-4 px-4 py-2 rounded bg-red-800 hover:bg-red-900 text-zinc-300 text-lg transition duration-300"
                        onClick={async () => {
                            if (user?.rol === "admin") {
                                await deleteLibro(id);
                            }
                        }}
                    >
                        Borrar libro
                    </button>
                </Link>
            )}
        </>
    );
}
