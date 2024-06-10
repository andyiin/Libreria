import { ObjectId } from "mongodb";

export type CardType = {
    cardnumber: number,
    cardname: string,
    carddate: string,
    cardcvv: number
};

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
    postalcode: number,
    card: CardType | null
};

export type InfoUser = Omit<Usuario, "password">;
