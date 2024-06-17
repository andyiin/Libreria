"use client";
import PedidoModel from "@/lib/models/pedido";
import { WithId } from "mongodb";
import Link from "next/link";

export default function PedidoDetalladoAdmin(props: {
    id: string;
    pedido: WithId<PedidoModel>;
}) {
    return (
        <div className="text-black flex items-center justify-center">
            <div className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 w-96">
                <h1 className="text-2xl font-bold mb-2 text-indigo-800">
                    Pedido
                </h1>
                <ul>
                    <li className="mb-2">
                        <b>Estado: </b>
                        <span
                            className={`${
                                props.pedido.state === "Pendiente"
                                    ? "text-yellow-600"
                                    : props.pedido.state === "Aceptado"
                                    ? "text-emerald-800"
                                    : "text-red-800"
                            }`}
                        >
                            {props.pedido.state}
                        </span>
                    </li>
                    <li className="mb-2">
                        <b>Fecha del pedido: </b>
                        {props.pedido.date.getUTCDate()}/
                        {props.pedido.date.getUTCMonth() + 1}/
                        {props.pedido.date.getFullYear()}
                    </li>
                    <li className="mb-2">
                        <b>Productos: </b>
                        <ul className="mt-2 list-disc list-inside">
                            {Array.isArray(props.pedido.products) &&
                                props.pedido.products.map((product, index) => (
                                    <>
                                        <li key={index}>
                                            {product.name} (ud:{" "}
                                            {product.quantity})
                                        </li>
                                    </>
                                ))}
                        </ul>
                    </li>
                    <li className="mb-2">
                        <b>Total: </b>
                        {Intl.NumberFormat(undefined, {
                            currency: "EUR",
                            style: "currency",
                        }).format(+props.pedido.totalprice ?? 0)}
                    </li>
                </ul>
                <h1 className="text-2xl font-bold mb-2 text-indigo-800">
                    Dirección de envío
                </h1>
                <ul>
                    <li className="mb-2">
                        <b>Nombre: </b>
                        {props.pedido.name}
                    </li>
                    <li className="mb-2">
                        <b>Email: </b>
                        {props.pedido.email}
                    </li>
                    <li className="mb-2">
                        <b>Número de teléfono: </b>
                        {props.pedido.numphone}
                    </li>
                    <li className="mb-2">
                        <b>Dirección: </b>
                        {props.pedido.address}
                    </li>
                    <li className="mb-2">
                        <b>Ciudad: </b>
                        {props.pedido.city}
                    </li>
                    <li className="mb-2">
                        <b>C.P.: </b>
                        {props.pedido.postalcode}
                    </li>
                </ul>
                <Link href={`/orders/${props.id}/edit-order`}>
                    <button className="px-4 py-2 rounded bg-emerald-800 hover:bg-emerald-900 text-white text-lg transition duration-300">
                        Editar
                    </button>
                </Link>
            </div>
        </div>
    );
}
