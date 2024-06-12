"use client";
import React, { useState } from "react";
import { WithId } from "mongodb";
import Pedido from "@/lib/models/pedido";
import Link from "next/link";

interface EditarPedidoProps {
    pedido: WithId<Pedido>;
    onSubmit: (formData: FormData) => void;
}

export default function EditarPedido({
    pedido,
    onSubmit,
}: EditarPedidoProps): JSX.Element {
    const handleMailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(value) || value === "") {
            event.target.setCustomValidity("");
        } else {
            event.target.setCustomValidity(
                "Por favor, introduce una dirección de correo electrónico válida."
            );
        }

        event.target.reportValidity();
    };

    const handleNumPhoneInput = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value.slice(0, 9);
        event.target.value = value;
    };

    const handleCodePostalInput = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value.slice(0, 5);
        event.target.value = value;
    };

    return (
        <div>
            <h1 className="text-4xl text-indigo-800 font-bold">
                Editar pedido
            </h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    onSubmit(formData);
                }}
                className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md"
                encType="multipart/form-data"
            >
                <input type="hidden" name="id" value={pedido._id.toString()} />
                <div className="flex flex-col">
                    {/* Estado */}
                    <div>
                        <label
                            htmlFor="state"
                            className="block text-sm font-medium text-indigo-800"
                        >
                            Estado
                        </label>
                        <select
                            name="state"
                            id="state"
                            defaultValue={pedido.state}
                            className="w-full p-3 border border-gray-300 rounded mt-1"
                        >
                            <option value="Pendiente">Pendiente</option>
                            <option value="Aceptado">Aceptado</option>
                            <option value="Cancelado">Cancelado</option>
                        </select>
                    </div>

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
                            defaultValue={pedido.name}
                            className="w-full p-3 border border-gray-300 rounded mt-1"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-indigo-800"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            defaultValue={pedido.email}
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
                            defaultValue={pedido.numphone}
                            className="w-full p-3 border border-gray-300 rounded mt-1"
                            onChange={handleNumPhoneInput}
                        />
                    </div>

                    {/* Dirección */}
                    <div>
                        <label
                            htmlFor="address"
                            className="block text-sm font-medium text-indigo-800"
                        >
                            Dirección
                        </label>
                        <textarea
                            name="address"
                            id="address"
                            defaultValue={pedido.address}
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
                            defaultValue={pedido.city}
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
                            defaultValue={pedido.postalcode}
                            className="w-full p-3 border border-gray-300 rounded mt-1"
                            onChange={handleCodePostalInput}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="justify-center bg-indigo-800 hover:bg-indigo-900 text-white font-bold py-3 px-4 rounded mt-6 transition duration-300"
                >
                    Actualizar Pedido
                </button>
                <Link href={`../../dashboard`}>
                    <button className="mx-4 justify-center bg-red-800 hover:bg-red-900 text-white font-bold py-3 px-4 rounded mt-6 transition duration-300">
                        Cancelar
                    </button>
                </Link>
            </form>
        </div>
    );
}
