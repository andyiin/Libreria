"use server"

import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { InfoUser } from "./models/usuario";
import getDb from "@/lib/mongodb"
import { Decimal128, Double, ObjectId } from "mongodb";

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

type CookieType = {
    user: InfoUser;
};

type CookieTypeField = keyof CookieType;

/**
 * Encrypts the provided data using JWT and returns the signed token.
 * @param data The data to be encrypted.
 * @returns A Promise that resolves to the signed token.
 */
async function encrypt<Field extends CookieTypeField>(data: CookieType[Field]) {
    return new SignJWT(data)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encodedKey);
};

/**
 * Decrypts the given data using JWT verification.
 * @param data - The encrypted data to be decrypted.
 * @returns The decrypted payload.
 */
async function decrypt<Field extends CookieTypeField>(data: string) {
    try {
        const { payload } = await jwtVerify<CookieType[Field]>(data, encodedKey, { algorithms: ["HS256"] });
        return payload;
    } catch (error) {
        console.error("Error decrypting data:", error);
    }
};

/**
 * Stores the session data in a cookie.
 * @param sessionData - The session data to be stored.
 * @param name - The name of the cookie.
 */
export async function store<Field extends CookieTypeField>(name: Field, sessionData: CookieType[Field]) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const session = await encrypt(sessionData);

    cookies().set(name, session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: "lax",
        path: "/"
    });
};

/**
 * Retrieves the value of a cookie and decrypts it.
 * 
 * @param name The name of the cookie to retrieve.
 * @returns The decrypted value of the cookie, or `undefined` if the cookie does not exist or cannot be decrypted.
 */
export async function retrieve(name: string) {
    const cookie = cookies().get(name);
    if (!cookie) return undefined;
    
    try {
        const value = await decrypt(cookie.value);
        return value;
    } catch (error) {
        console.error("Error parsing cookie value:", error);
        return undefined;
    }
};

/**
 * Deletes a cookie with the specified name.
 * @param name - The name of the cookie to delete.
 */
export async function deleteCookie<Field extends CookieTypeField>(name: Field) {
    cookies().delete(name);
};

/**
 * Saves the order in the database.
 * @param form - The order form data.
 */
export async function saveOrder(form: any) { 
    const db = await getDb();
    const collection = db.collection("orders");
    const order = {
        user: new ObjectId(form.user.toString()),
        name: form.name.trim(),
        totalprice: new Double(form.cart.totalPrice),
        email: form.email,
        numphone: form.phone,
        address: form.street,
        city: form.city,
        postalcode: form.postalcode,
        date: new Date(),
        state: "Pendiente",
        products: form.cart.products.map((product: any) => ({
            _id: new ObjectId(product._id.toString()),
            name: product.name,
            price: new Decimal128(product.price.toString()),
            quantity: product.quantity
        }))
    };
    await collection.insertOne(order);
};
