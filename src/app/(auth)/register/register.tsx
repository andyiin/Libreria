import getDb from "@/lib/mongodb";
import User from "@/lib/models/usuario";
import bcrypt from "bcryptjs";

/**
 * Handles the register functionality.
 * 
 * @param data - The register data containing the mail and password.
 * @returns A boolean indicating whether the register was successful.
 * @throws Error if the mail is already in use.
 */

export default async function register(data: { mail: string, password: string }) {
    const db = await getDb();
    const user = await db.collection<User>("users").findOne({ mail: data.mail });

    if (user)
        throw new Error("El correo ya está en uso");

    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        await db.collection<User>("users").insertOne({ mail: data.mail, password: hashedPassword, rol: "user", active: true, visible: true });
    } catch (error) {
        console.error(error.message);
    }

    return true;
};
