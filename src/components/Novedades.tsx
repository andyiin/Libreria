// "use client";

// import React, { useEffect, useState } from "react";
// import LibroModel from "@/lib/models/libro";
// import { WithId } from "mongodb";

// const Novedades = ({ libros }: { libros: any[] }) => {
//     const [indiceActual, setIndiceActual] = useState(0);
//     const [librosProcesados, setLibrosProcesados] = useState<
//         WithId<LibroModel>[]
//     >([]);

//     useEffect(() => {
//         const librosConvertidos = libros.map((libro) => ({
//             ...libro,
//             _id: libro._id.toString(),
//             price: libro.price.toString(),
//             publication: new Date(libro.publication).toISOString(),
//         }));
//         setLibrosProcesados(librosConvertidos);
//     }, [libros]);

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setIndiceActual(
//                 (prevIndice) => (prevIndice + 1) % librosProcesados.length
//             );
//         }, 10000); // Cambia la imagen cada 10 segundos

//         // Limpieza del temporizador
//         return () => clearTimeout(timer);
//     }, [indiceActual, librosProcesados.length]);

//     if (!librosProcesados || librosProcesados.length === 0)
//         return (
//             <div className="flex justify-center items-center">
//                 No hay novedades disponibles.
//             </div>
//         );

//     const libroActual = librosProcesados[indiceActual];

//     const siguienteLibro = () => {
//         setIndiceActual(
//             (prevIndice) => (prevIndice + 1) % librosProcesados.length
//         );
//     };

//     const libroAnterior = () => {
//         setIndiceActual(
//             (prevIndice) =>
//                 (prevIndice - 1 + librosProcesados.length) %
//                 librosProcesados.length
//         );
//     };

//     return (
//         <div className="flex flex-col justify-center items-center min-h-screen p-2">
//             <h1 className="text-5xl text-indigo-800 font-bold mb-4 text-center">
//                 Novedades!!
//             </h1>
//             <div className="relative bg-zinc-900 text-zinc-200 p-10 w-full md:max-w-2xl xl:max-w-4xl shadow-lg rounded-lg overflow-hidden">
//                 <button
//                     className="absolute left-0 top-1/2 transform -translate-y-1/2 text-5xl text-white p-4"
//                     onClick={libroAnterior}
//                 >
//                     ⪻
//                 </button>
//                 <div className="flex flex-col md:flex-row items-center justify-center">
//                     <div className="w-full md:w-1/3">
//                         <img
//                             src="/img/imgTest.jpg"
//                             alt={libroActual.name}
//                             className="w-full h-auto object-cover"
//                         />
//                     </div>
//                     <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-4">
//                         <h2 className="text-3xl font-bold mb-2">
//                             {libroActual.name}
//                         </h2>
//                         <p className="text-xl mb-4">{libroActual.opinion}</p>
//                         <p className="text-zinc-400 mb-4">
//                             {libroActual.author}
//                         </p>
//                         <button className="bg-indigo-300 text-black py-2 px-4 rounded hover:bg-indigo-400 transition duration-300">
//                             Ver más →
//                         </button>
//                     </div>
//                 </div>
//                 <button
//                     className="absolute right-0 top-1/2 transform -translate-y-1/2 text-5xl text-white p-4"
//                     onClick={siguienteLibro}
//                 >
//                     ⪼
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Novedades;
'use client';
import React, { useEffect, useState } from "react";
import LibroModel from "@/lib/models/libro";
import { WithId } from "mongodb";

const Novedades = ({ libros }: { libros: any[] }) => {
    const [indiceActual, setIndiceActual] = useState(0);
    const [librosProcesados, setLibrosProcesados] = useState<
        WithId<LibroModel>[]
    >([]);

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
            setIndiceActual(
                (prevIndice) => (prevIndice + 1) % librosProcesados.length
            );
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
        setIndiceActual(
            (prevIndice) => (prevIndice + 1) % librosProcesados.length
        );
    };

    const libroAnterior = () => {
        setIndiceActual(
            (prevIndice) =>
                (prevIndice - 1 + librosProcesados.length) %
                librosProcesados.length
        );
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-2">
            <h1 className="text-5xl text-indigo-800 font-bold mb-4 text-center animate-bounce">
                Novedades!!
            </h1>
            <div className="relative bg-zinc-900 text-zinc-200 p-10 w-full md:max-w-2xl xl:max-w-4xl shadow-lg rounded-lg overflow-hidden">
                <button
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 text-5xl text-white p-4"
                    onClick={libroAnterior}
                >
                    ⪻
                </button>
                <div className="flex flex-col md:flex-row items-center justify-center">
                    <div className="w-full md:w-1/3">
                        <img
                            src="/img/imgTest.jpg"
                            alt={libroActual.name}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-4">
                        <h2 className="text-3xl font-bold mb-2">
                            {libroActual.name}
                        </h2>
                        <p className="text-xl mb-4">{libroActual.opinion}</p>
                        <p className="text-zinc-400 mb-4">
                            {libroActual.author}
                        </p>
                        <button className="bg-indigo-300 text-black py-2 px-4 rounded hover:bg-indigo-400 transition duration-300">
                            Ver más →
                        </button>
                    </div>
                </div>
                <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 text-5xl text-white p-4"
                    onClick={siguienteLibro}
                >
                    ⪼
                </button>
            </div>
        </div>
    );
};

export default Novedades;
