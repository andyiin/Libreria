"use server"

import "server-only";
import { cookies } from "next/headers";
import getDb from "@/lib/mongodb";
import { ObjectId, OptionalId } from "mongodb";
import { SignJWT, jwtVerify } from "jose";
import { InfoUser } from "./models/usuario";
import Pedido from "./models/pedido";

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
 * Stores the session data in the cart.
 * 
 * @param sessionData - The session data to be stored in the cart.
 * @returns A promise that resolves when the session data is successfully stored in the cart.
 */
export async function storeInCart<Cart>(sessionData: Cart) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    if (cookies().get("cart")) {
        const cart = await retrieveCart();
        const index = cart.findIndex((item: any) => item._id === sessionData._id);

        if (index !== -1)
            cart[index].quantity += 1;
        else
            cart.push(sessionData);

        cookies().set("cart", JSON.stringify(cart), {
            httpOnly: true,
            secure: true,
            expires: expiresAt,
            sameSite: "lax",
            path: "/"
        });
    } else {
        cookies().set("cart", JSON.stringify([sessionData]), {
            httpOnly: true,
            secure: true,
            expires: expiresAt,
            sameSite: "lax",
            path: "/"
        });
    }
};

/**
 * Retrieves the cart from the cookies.
 * @returns The cart object if it exists, otherwise undefined.
 */
export async function retrieveCart() {
    const cart = cookies().get("cart");
    if (!cart) return undefined;
    
    try {
        const value = JSON.parse(cart.value);
        return value;
    } catch (error) {
        console.error("Error parsing cookie value:", error);
        return undefined;
    }
};

/**
 * Increase or decrease the quantity of an item in the cart in 1 unit.
 * @param id The id of the item to edit.
 * @param operation The operation to perform: 1 to increase, -1 to decrease.
 */
export async function editQuantityCart(id: string, operation: number) {
    const cart = await retrieveCart();
    const index = cart.findIndex((item: any) => item._id === id);

    if (index !== -1) {
        cart[index].quantity += operation;
        if (cart[index].quantity !== 0) {
            cookies().set("cart", JSON.stringify(cart), {
                httpOnly: true,
                secure: true,
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                sameSite: "lax",
                path: "/"
            });
        }
    } else {
        console.error("Item not found in cart.");
    }
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

export async function deleteCart() {
    cookies().delete("cart");
};

/**
 * Deletes a specific item from the cart.
 */
export async function deleteItemFromCart(id: string) {
    const cart = await retrieveCart();
    const newCart = cart.filter((item: any) => item._id !== id);
    cookies().set("cart", JSON.stringify(newCart), {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        sameSite: "lax",
        path: "/"
    });
};

// export async function saveOrder(form: any) {
//     const db = await getDb();
//     const collection = db.collection("orders");
//     const order = {
//         user: new ObjectId(form.user),
//         name: form.name.trim(),
//         totalprice: form.cart.reduce((acc: number, item: any) => acc + parseFloat(item.price) * item.quantity, 0),
//         email: form.email,
//         numphone: form.phone,
//         address: form.street,
//         city: form.city,
//         postalcode: form.postalcode,
//         date: new Date(),
//         state: "Pendiente",
//         products: form.cart
//     };
//     await collection.insertOne(order);

//     const productsCollection = db.collection("products");
//     form.cart.forEach(async (item: any) => {
//         await productsCollection.updateOne({ _id: item._id }, { $inc: { stock: -item.quantity } });
//     });
// };
