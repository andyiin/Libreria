"use client";
import React, { useState, useEffect } from "react";
import { getPedidos } from "@/app/dashboard/getPedidos";
import { ObjectId, WithId } from "mongodb";
import Pedido from "@/lib/models/pedido";
import ListaPedidoAdmin from "./ListaPedidoAdmin";

export const PaginacionPedidosAdmin = (props: {
    userId? : ObjectId;
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pedidos, setPedidos] = useState<WithId<Pedido>[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const pedidosPerPage = 8;

    useEffect(() => {
        const fetchPedidos = async () => {
            const { pedidos: fetchedPedidos, totalPedidos } = await getPedidos(
                currentPage,
                pedidosPerPage, props.userId
            );
            setPedidos(fetchedPedidos);
            setTotalPages(Math.ceil(totalPedidos / pedidosPerPage));
        };
        fetchPedidos();
    }, [currentPage, props.userId]);

    return (
        <>
            <ListaPedidoAdmin pedidos={pedidos} />
            <div className="flex flex-col items-center justify-center pb-6">
                <div className="flex flex-row items-center justify-center pb-4">
                    {/* solo sale anterior y siguiente si es posible esas opciones */}
                    {currentPage > 1 && (
                        <button
                            className="bg-indigo-300 text-black py-2 px-4 mx-2 rounded hover:bg-indigo-400 transition duration-300"
                            onClick={() => setCurrentPage(currentPage - 1)}
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
                    )}

                    {currentPage < totalPages && (
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
                    )}
                </div>
                <span>
                    Página {currentPage} de {totalPages}
                </span>
                <br/>
            </div>
        </>
    );
};
