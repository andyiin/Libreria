/**
 * Handles the login functionality.
 * 
 * @param data - The login data containing the mail and password.
 * @returns A boolean indicating whether the login was successful.
 * @throws Error if the user is not found or the password is incorrect.
 */
import getDb from "@/lib/mongodb";
import User from "@/lib/models/usuario";
import { store } from "@/lib/auth";
import bcrypt from "bcryptjs";

export default async function handler(data: { mail: string, password: string }) {
    const db = await getDb();
    const user = await db.collection<User>("users").findOne({ mail: data.mail });

    if (!user)
        throw new Error("Usuario no encontrado");

    const isValid = await bcrypt.compare(data.password, user.password);

    if (!isValid)
        throw new Error("Contraseña incorrecta");
    
    await store({ mail: user.mail, rol: user.rol, active: user.active, visible: user.visible }, "user");

    return true;
};
