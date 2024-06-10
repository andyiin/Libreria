import { ObjectId } from "mongodb";

type Products = {
    _id: ObjectId;
    price: number;
    quantity: number;
};

export default interface Pedido {
    totalPrice: number;
    userId: ObjectId;
    email: string;
    numphone: number;
    address: string;
    city: string;
    postalcode: number;
    state: "pending" | "sent" | "delivered";
    products: Products[];
};

// extendemos pedido para quitar campos no utiles en el carrito
export interface Cart extends Omit<Pedido, "email" | "numphone" | "address" | "city" | "postalcode" | "state"> {
    products: Products[];
};
