import type { Decimal128, ObjectId } from "mongodb";

export type Product = {
    _id: ObjectId;
    name: string,
    price: number;
    quantity: number;
};

export default interface Pedido {
    _id: ObjectId;
    user: ObjectId;
    name: string;
    totalprice: Decimal128;
    email: string;
    numphone: number;
    address: string;
    city: string;
    postalcode: number;
    date: Date;
    state: "Pendiente" | "Aceptado" | "Cancelado";
    products: Product[];
};

export interface Cart  {
    products: Product[];
    totalPrice: number;
};
