import { ObjectId } from "mongodb";

export default interface Usuario {
    _id: ObjectId;
    mail: string;
    password: string;
    rol: "user" | "admin";
    active: boolean;
    visible: boolean;
    name: string,
    street: string,
    numphone: number,
    city: string,
    postalcode: number
};

export type InfoUser = Omit<Usuario, "password">;
