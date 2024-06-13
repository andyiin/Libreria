import { Decimal128, ObjectId } from "mongodb";

type Products = {
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
    products: Products[];
};

export interface Cart extends Omit<Pedido, "email" | "numphone" | "address" | "city" | "postalcode" | "state"> {
    products: Products[];
};
