"use server";
import Pedido from "@/lib/models/pedido";
import getDb from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function getPedidos(page: number = 1, pedidosPerPage: number = 8, userId?: ObjectId) {
    const db = await getDb();
    const totalPedidos = await db.collection<Pedido>("orders").countDocuments();
    const skip = (page - 1) * pedidosPerPage;
    const pedidos = await db
        .collection<Pedido>("orders")
        .find(userId ? {user: new ObjectId(userId)} : {} )
        .sort({ date: -1 })
        .skip(skip)
        .limit(pedidosPerPage)
        .toArray();

        const pedidosSerializables = pedidos.map((pedido) => ({
            ...pedido,
            _id: pedido._id.toString(),
            user: pedido.user.toString(),
            totalprice: pedido.totalprice.toString(),
        }));

        return { pedidos: pedidosSerializables, totalPedidos };
}