"use server"

import { cookies } from "next/headers";

/**
 * Encrypts the provided data.
 * 
 * @param data - The data to be encrypted.
 * @returns The encrypted data.
 */
async function encrypt(data: { mail: string, rol: string, active: boolean, visible: boolean }) {
    // Encrypt your data
    return data
};

/**
 * Decrypts the given data.
 * 
 * @param data - The data to be decrypted.
 * @returns The decrypted data.
 */
async function decrypt(data: string) {
    // Decrypt your data
    return data
};

/**
 * Stores the session data in a cookie.
 * @param sessionData - The session data to be stored.
 * @param name - The name of the cookie.
 */
export async function store(sessionData: { mail: string, rol: string, active: boolean, visible: boolean }, name: string) {
    const encryptedSessionData = await encrypt(sessionData);
    cookies().set({
        name: name,
        value: JSON.stringify(encryptedSessionData),
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        path: "/",
        sameSite: "none"
    });
};

/**
 * Retrieves the value of a cookie by name and decrypts it.
 * @param name - The name of the cookie to retrieve.
 * @returns The decrypted value of the cookie, or false if the cookie does not exist.
 */
export async function retrieve(name: string) {
    const cookie = cookies().get(name);
    if (!cookie) return false;
    
    const parsedValue = JSON.parse(cookie.value);
    return await decrypt(parsedValue);
};

/**
 * Deletes a cookie with the specified name.
 * @param name - The name of the cookie to delete.
 */
export async function deleteCookie(name: string) {
    cookies().delete(name);
};
