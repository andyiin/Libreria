import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email({ message: "Por favor introduzca un email válido" }).trim(),
    password: z.string().min(5, { message: "Debe tener al menos 5 caracteres" }).trim(),
});

export const RegisterSchema = z.object({
    email: z.string().email({ message: "Por favor introduzca un email válido" }).trim(),
    password: z.string().min(5, { message: "Debe tener al menos 5 caracteres" }).trim(),
    password2: z.string().min(5, { message: "Debe tener al menos 5 caracteres" }).trim(),
});

export const ShippingSchema = z.object({
    name: z.string().min(3, { message: "Debe tener al menos 3 caracteres" }).trim(),
    email: z.string().email({ message: "Por favor introduzca un email válido" }).trim(),
    numphone: z.string().regex(/^[6-9]\d{8}$/, { message: "Por favor introduzca un número de teléfono válido" }).trim(),
    street: z.string().min(3, { message: "Debe tener al menos 3 caracteres" }).trim(),
    city: z.string().min(3, { message: "Debe tener al menos 3 caracteres" }).trim(),
    postalcode: z.string().regex(/^\d{5}$/, { message: "Por favor introduzca un código postal válido" }).trim(),
});

export const CardSchema = z.object({
    cardname: z.string().min(3, { message: "Debe tener al menos 3 caracteres" }).trim(),
    cardnumber: z.string().trim().regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, { message: "Por favor introduzca un número de tarjeta válido" }),
    expdate: z.string().regex(/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/, { message: "Por favor introduzca una fecha de expiración válida" }).trim(),
    cvv: z.string().regex(/^\d{3}$/, { message: "Por favor introduzca un CVV válido" }).trim(),
});

export type ShippingState =
    | {
        errors?: {
            name?: string[];
            email?: string[];
            numphone?: string[];
            street?: string[];
            city?: string[];
            postalcode?: string[];
        }
        message?: string;
    }
    | undefined;

export type CardState =
    | {
        errors?: {
            cardname?: string[];
            cardnumber?: string[];
            expdate?: string[];
            cvv?: string[];
        }
        message?: string;
    }
    | undefined;

export type FormState = 
    | {
        errors?: {
            email?: string[];
            password?: string[];
        }
        message?: string;
    }
    | undefined;
