import { Decimal128 } from "mongodb";

export default interface Libro {
    name: string;
    stock: number;
    price: Decimal128;
    description: string;
    author: string;
    image: string
}