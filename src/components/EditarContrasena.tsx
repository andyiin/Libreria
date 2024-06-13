"use client";
import React, { useState } from "react";
import { WithId } from "mongodb";
import Usuario from "@/lib/models/usuario";
import Link from "next/link";

interface EditarPerfilProps {
    perfil: WithId<Usuario>;
    onSubmit: (formData: FormData) => void;
}

export default function EditarContrasena({
    perfil,
    onSubmit,
}: EditarPerfilProps): JSX.Element {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = (e: { preventDefault: () => void; target: HTMLFormElement; }) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
        } else {
            onSubmit(new FormData(e.target as HTMLFormElement));
        }
    };

    return (
        <div>
            <h1 className="text-4xl text-indigo-800 font-bold">
                Editar contraseña
            </h1>
            <form
                onSubmit={handleSubmit}
                className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md"
                encType="multipart/form-data"
            >
                <input type="hidden" name="id" value={perfil._id.toString()} />
                <div className="flex flex-col">
                    {/* Contraseña actual */}
                    <div>
                        <p>
                            <b>
                                Para cambiar la contraseña debes poner la actual
                            </b>
                        </p>
                        <br />
                    </div>
                    <div>
                        <label
                            htmlFor="passwordActual"
                            className="block text-sm font-medium text-indigo-800"
                        >
                            Contraseña actual
                        </label>
                        <input
                            type="password"
                            name="passwordActual"
                            id="passwordActual"
                            required
                            className="w-full p-3 border border-gray-300 rounded mt-1"
                        />
                    </div>
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    {/* Confirmar contraseña */}
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-indigo-800"
                        >
                            Confirmar contraseña
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded mt-1"
                        />
                    </div>
                </div>

                {error && (
                    <p className="text-red-600 text-sm font-bold mt-2">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="justify-center bg-indigo-800 hover:bg-indigo-900 text-white font-bold py-3 px-4 rounded mt-6 transition duration-300"
                >
                    Actualizar Contraseña
                </button>
                <Link href={`./`}>
                    <button className="mx-4 justify-center bg-red-800 hover:bg-red-900 text-white font-bold py-3 px-4 rounded mt-6 transition duration-300">
                        Cancelar
                    </button>
                </Link>
            </form>
        </div>
    );
}