"use client";
import React from "react";
import { WithId } from "mongodb";
import Usuario from "@/lib/models/usuario";
import Link from "next/link";

interface EditarPerfilProps {
    perfil: WithId<Usuario>;
    onSubmit: (formData: FormData) => void;
}

export default function EditarContrasenaAdmin({
    perfil,
    onSubmit,
}: EditarPerfilProps): JSX.Element {
    return (
        <div>
            <h1 className="text-4xl text-indigo-800 font-bold">
                Editar contraseña
            </h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(new FormData(e.target as HTMLFormElement));
                }}
                className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md"
                encType="multipart/form-data"
            >
                <input type="hidden" name="id" value={perfil._id.toString()} />
                <div className="flex flex-col">
                    {/* Nueva contraseña */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-indigo-800"
                        >
                            Nueva contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            className="w-full p-3 border border-gray-300 rounded mt-1"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="justify-center bg-indigo-800 hover:bg-indigo-900 text-zinc-300 font-bold py-3 px-4 rounded mt-6 transition duration-300"
                >
                    Actualizar Perfil
                </button>
                <Link href={`../../dashboard`}>
                    <button className="mx-4 justify-center bg-red-800 hover:bg-red-900 text-zinc-300 font-bold py-3 px-4 rounded mt-6 transition duration-300">
                        Cancelar
                    </button>
                </Link>
            </form>
        </div>
    );
}
