"use client";
import PedidoModel from "@/lib/models/pedido";
import { WithId } from "mongodb";
import PedidoDetalladoAdmin from "./PedidoDetalladoAdmin";

export default function ListaPedidoAdmin(props: { pedidos: WithId<PedidoModel>[] }) {
    return (
        <div>
            <ul className="flex flex-wrap justify-around gap-16 py-10 px-20">
                {props.pedidos.map((pedido) => (
                    <PedidoDetalladoAdmin key={pedido._id.toString()} pedido={pedido} id={pedido._id.toString()} />
                ))}
            </ul>
        </div>
    );
}
