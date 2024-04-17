"use client";

import React, { useEffect, useState } from "react";
import LibroModel from "@/lib/models/libro";
import { WithId } from "mongodb";

const Novedades = ({ libros }: { libros: any[] }) => {
    const [indiceActual, setIndiceActual] = useState(0);
    const [librosProcesados, setLibrosProcesados] = useState<WithId<LibroModel>[]>([]);

    useEffect(() => {
        const librosConvertidos = libros.map((libro) => ({
            ...libro,
            _id: libro._id.toString(),
            price: libro.price.toString(),
            publication: new Date(libro.publication).toISOString(),
        }));
        setLibrosProcesados(librosConvertidos);
    }, [libros]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIndiceActual((prevIndice) => (prevIndice + 1) % librosProcesados.length);
        }, 10000); // Cambia la imagen cada 10 segundos

        // Limpieza del temporizador
        return () => clearTimeout(timer);
    }, [indiceActual, librosProcesados.length]);

    if (!librosProcesados || librosProcesados.length === 0)
        return (
            <div className="flex justify-center items-center">
                No hay novedades disponibles.
            </div>
        );

    const libroActual = librosProcesados[indiceActual];

    const siguienteLibro = () => {
        setIndiceActual((prevIndice) => (prevIndice + 1) % librosProcesados.length);
    };

    const libroAnterior = () => {
        setIndiceActual((prevIndice) => (prevIndice - 1 + librosProcesados.length) % librosProcesados.length);
    };

    return (
        <div className="flex justify-center items-center h-50vh p-10">
            <button className="text-5xl" onClick={libroAnterior}>⪻</button>
            <div className="bg-zinc-900 text-zinc-200 p-10 w-2/3 h-96 shadow-lg rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-center h-full">
                    <div className="w-2/3 mb-4 md:mb-0 flex flex-col justify-between">
                        <div>
                            <h1 className="text-5xl text-indigo-300 font-bold mb-4 text-center">
                                Novedades!!
                            </h1>
                            <h2 className="text-3xl font-bold mb-2">
                                {libroActual.name}
                            </h2>
                            <p className="text-xl mb-4">{libroActual.opinion}</p>
                            <p className="text-zinc-400">{libroActual.author}</p>
                        </div>
                        <button className="bg-indigo-800 text-white py-2 px-4 rounded hover:bg-indigo-900 transition duration-300 self-start">
                            Comprar ahora →
                        </button>
                    </div>
                    <div className="h-80 drop-shadow-2xl relative">
                        <img src="/img/imgTest.jpg" alt={libroActual.name} className="h-full w-full object-cover" />
                    </div>
                </div>
            </div>
            <button className="text-5xl" onClick={siguienteLibro}>⪼</button>
        </div>
    );
};

export default Novedades;