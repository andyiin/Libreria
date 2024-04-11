import { Decimal128 } from "mongodb";

export default interface Libro {
    name: string;
    stock: number;
    price: Decimal128;
    description: string;
    author: string;
    image: string;
    categories: Array<string>;
    editorial: string;
    isbn: number;
    language: string;
    pages: number;
    publication: number;
    opinion: string;
}