"use client";
import { InfoUser } from "@/lib/models/usuario";
import { deleteLibro } from "@/app/detail/[id]/deleteLibro";
import Link from "next/link";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog"; // Asegúrate de que la ruta de importación sea correcta

interface BorrarLibroBotonProps {
    id: string;
    user: InfoUser | undefined;
}

export default function BorrarLibroBoton({ id, user }: BorrarLibroBotonProps) {
    return (
        <>
            {user?.rol === "admin" && (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button className="mt-2 mx-4 px-4 py-2 rounded bg-red-800 hover:bg-red-900 text-zinc-300 text-lg transition duration-300">
                            Borrar libro
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>¿Seguro que quieres borrar el libro?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta acción no se puede deshacer. Esto borrará
                                permanentemente el libro.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="bg-indigo-300 hover:bg-indigo-400">Cancelar</AlertDialogCancel>
                            <AlertDialogAction className="bg-indigo-800 hover:bg-indigo-900"
                                onClick={async () => {
                                    await deleteLibro(id);
                                }}
                            >
                                <Link href="/">Borrar</Link>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </>
    );
}
