"use client";
import React from "react";
import { WithId } from "mongodb";
import Usuario from "@/lib/models/usuario";
import Link from "next/link";

interface EditarPerfilProps {
    perfil: WithId<Usuario>;
    onSubmit: (formData: FormData) => void;
}

export default function EditarPerfil({
    perfil,
    onSubmit,
}: EditarPerfilProps): JSX.Element {
    const handleNumPhoneInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.slice(0, 9);
        event.target.value = value;
    };

    const handleCodePostalInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.slice(0, 5);
        event.target.value = value;
    };

    const handleMailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (emailRegex.test(value) || value === "") {
            event.target.setCustomValidity("");
        } else {
            event.target.setCustomValidity("Por favor, introduce una dirección de correo electrónico válida.");
        }
    
        event.target.reportValidity();
    };

    return (
        <div>
            <h1 className="text-4xl text-indigo-800 font-bold">
                Editar perfil
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
                    {/* Nombre */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-indigo-800"
                        >
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            defaultValue={perfil.name}
                            className="w-full p-3 border border-gray-300 rounded mt-1"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="mail"
                            className="block text-sm font-medium text-indigo-800"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            name="mail"
                            id="mail"
                            defaultValue={perfil.mail}
                            required
                            className="w-full p-3 border border-gray-300 rounded mt-1"
                            onChange={handleMailInput}
                        />
                    </div>

                    {/* Número de teléfono */}
                    <div>
                        <label
                            htmlFor="numphone"
                            className="block text-sm font-medium text-indigo-800"
                        >
                            Número de teléfono
                        </label>
                        <input
                            type="number"
                            name="numphone"
                            id="numphone"
                            min="0"
                            defaultValue={perfil.numphone}
                            className="w-full p-3 border border-gray-300 rounded mt-1"
                            onChange={handleNumPhoneInput}
                        />
                    </div>

                    {/* Dirección */}
                    <div>
                        <label
                            htmlFor="street"
                            className="block text-sm font-medium text-indigo-800"
                        >
                            Dirección
                        </label>
                        <textarea
                            name="street"
                            id="street"
                            defaultValue={perfil.street}
                            className="w-full p-3 border border-gray-300 rounded mt-1"
                        ></textarea>
                    </div>

                    {/* Ciudad */}
                    <div>
                        <label
                            htmlFor="city"
                            className="block text-sm font-medium text-indigo-800"
                        >
                            Ciudad
                        </label>
                        <input
                            type="text"
                            name="city"
                            id="city"
                            defaultValue={perfil.city}
                            className="w-full p-3 border border-gray-300 rounded mt-1"
                        />
                    </div>

                    {/* Código Postal */}
                    <div>
                        <label
                            htmlFor="postalcode"
                            className="block text-sm font-medium text-indigo-800"
                        >
                            C.P.
                        </label>
                        <input
                            type="number"
                            name="postalcode"
                            id="postalcode"
                            min="0"
                            defaultValue={perfil.postalcode}
                            className="w-full p-3 border border-gray-300 rounded mt-1"
                            onChange={handleCodePostalInput}
                        />
                    </div>

                </div>
                <button
                    type="submit"
                    className="justify-center bg-indigo-800 hover:bg-indigo-900 text-zinc-300 font-bold py-3 px-4 rounded mt-6 transition duration-300"
                >
                    Actualizar Perfil
                </button>
                <Link href={`./`}>
                    <button className="mx-4 justify-center bg-red-800 hover:bg-red-900 text-zinc-300 font-bold py-3 px-4 rounded mt-6 transition duration-300">
                        Cancelar
                    </button>
                </Link>
            </form>
        </div>
    );
}
