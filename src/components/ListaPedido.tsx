"use client";
import PedidoModel from "@/lib/models/pedido";
import { WithId } from "mongodb";
import PedidoDetallado from "@/components/PedidoDetallado";

export default function ListaPedido(props: { pedidos: WithId<PedidoModel>[] }) {
    return (
        <div>
            {props.pedidos.length === 0 && (
                <div className="text-center text-2xl py-10">
                    No has realizado ningún pedido aún
                </div>
            )}

            <ul className="flex flex-wrap justify-around gap-16 py-10 px-20">
                {props.pedidos.map((pedido) => (
                    <PedidoDetallado key={pedido._id.toString()} pedido={pedido} id={pedido._id.toString()} />
                ))}
            </ul>
        </div>
    );
}
