"use client";
import React, { useState, useEffect } from "react";
import { getUsuarios } from "@/app/dashboard/getUsuarios";
import { WithId } from "mongodb";
import Usuario from "@/lib/models/usuario";
import ListaUsuario from "./ListaUsuario";

export const PaginacionUsuarios = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [usuarios, setUsuarios] = useState<WithId<Usuario>[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const usuariosPerPage = 12;

    useEffect(() => {
        const fetchUsuarios = async () => {
            const { usuarios: fetchedUsuarios, totalUsuarios } = await getUsuarios(
                currentPage,
                usuariosPerPage
            );
            setUsuarios(fetchedUsuarios);
            setTotalPages(Math.ceil(totalUsuarios / usuariosPerPage));
        };
        fetchUsuarios();
    }, [currentPage]);

    return (
        <>
            <h1 className="text-4xl text-indigo-800 font-bold pt-6 text-center">Gestión usuarios</h1>
            <ListaUsuario usuarios={usuarios} />
            <div className="flex flex-col items-center justify-center pb-4">
                <div className="flex flex-row items-center justify-center pb-4">
                    <button
                        className="bg-indigo-300 text-black py-2 px-4 mx-2 rounded hover:bg-indigo-400 transition duration-300"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <div className="flex flex-row items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-chevron-left h-4 w-4"
                            >
                                <path d="m15 18-6-6 6-6"></path>
                            </svg>
                            <span>Anterior</span>
                        </div>
                    </button>
                    <button
                        className="bg-indigo-300 text-black py-2 px-4 mx-2 rounded hover:bg-indigo-400 transition duration-300"
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        <div className="flex flex-row items-center">
                            <span>Siguiente</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-chevron-right h-4 w-4"
                            >
                                <path d="m9 18 6-6-6-6"></path>
                            </svg>
                        </div>
                    </button>
                </div>
                <span>
                    Página {currentPage} de {totalPages}
                </span>
                <br/>
            </div>
        </>
    );
};
