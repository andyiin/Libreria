"use client";

import React from "react";
import { WithId } from "mongodb";
import LibroModel from "@/lib/models/libro";
import { storeInCart } from "@/lib/cart";

export default function AnnadirLibro(props: { libro: WithId<LibroModel> }) {
    const hoy = new Date();
    const manana = new Date(hoy.getTime() + 24 * 60 * 60 * 1000);
    const opciones: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "numeric",
    };
    const fechaManana = manana.toLocaleDateString("es-ES", opciones);

    return (
        <div className="flex flex-col md:flex-row justify-center px-5 w-1/3 max-[768px]:w-full max-[768px]:items-center">
            <div className="flex-none md:ml-5 border-l-2 border-zinc-900 pl-5">
                <p className="text-4xl font-bold p-4">
                    {props.libro.price.toString()}€
                </p>
                <button
                    className="mt-2 mx-4 px-4 py-2 rounded bg-indigo-800 hover:bg-indigo-900 text-zinc-300 text-lg transition duration-300"
                    onClick={async () => {
                        storeInCart({
                            _id: props.libro._id,
                            name: props.libro.name,
                            price: parseFloat(props.libro.price.toString()),
                            quantity: 1,
                        });
                    }}
                >
                    Añadir a la cesta
                </button>
                <div className="flex items-center mt-2 p-4">
                    <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.25 7.5L12.75 7.5L12.75 11.6893L15.5303 14.4697L14.4697 15.5303L11.25 12.3107L11.25 7.5Z"
                            fill="#080341"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                            fill="#080341"
                        />
                    </svg>
                    <p>Recíbelo mañana {fechaManana}</p>
                </div>
                <div className="flex items-center mt-2 px-4">
                    <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.5 6H3V17.25H3.375H4.5H4.52658C4.70854 18.5221 5.80257 19.5 7.125 19.5C8.44743 19.5 9.54146 18.5221 9.72342 17.25H15.0266C15.2085 18.5221 16.3026 19.5 17.625 19.5C18.9474 19.5 20.0415 18.5221 20.2234 17.25H21.75V12.4393L18.3107 9H16.5V6ZM16.5 10.5V14.5026C16.841 14.3406 17.2224 14.25 17.625 14.25C18.6721 14.25 19.5761 14.8631 19.9974 15.75H20.25V13.0607L17.6893 10.5H16.5ZM15 15.75V9V7.5H4.5V15.75H4.75261C5.17391 14.8631 6.07785 14.25 7.125 14.25C8.17215 14.25 9.07609 14.8631 9.49739 15.75H15ZM17.625 18C17.0037 18 16.5 17.4963 16.5 16.875C16.5 16.2537 17.0037 15.75 17.625 15.75C18.2463 15.75 18.75 16.2537 18.75 16.875C18.75 17.4963 18.2463 18 17.625 18ZM8.25 16.875C8.25 17.4963 7.74632 18 7.125 18C6.50368 18 6 17.4963 6 16.875C6 16.2537 6.50368 15.75 7.125 15.75C7.74632 15.75 8.25 16.2537 8.25 16.875Z"
                            fill="#080341"
                        />
                    </svg>
                    <p className="ml-2">Gastos de envío gratis</p>
                </div>
            </div>
        </div>
    );
}
