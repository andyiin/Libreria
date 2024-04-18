import getDb from "@/lib/mongodb";
import User from "@/lib/models/usuario";
import { store } from "@/lib/auth";
import bcrypt from "bcryptjs";

/**
 * Retrieves a user from the database by their mail.
 * 
 * @param mail - The user's mail.
 * @returns The user object if found, otherwise null.
 */
async function getUserByMail(mail: string): Promise<User | null> {
    const db = await getDb();
    return await db.collection<User>("users").findOne({ mail });
};

/**
 * Handles the login functionality.
 * 
 * @param data - The login data containing the mail and password.
 * @returns A boolean indicating whether the login was successful.
 * @throws Error if the user is not found or the password is incorrect.
 */
export async function login(data: { mail: string, password: string }): Promise<boolean> {
    const user = await getUserByMail(data.mail);

    if (!user)
        throw new Error("Usuario no encontrado");

    const isValid = await bcrypt.compare(data.password, user.password);

    if (!isValid)
        throw new Error("Contraseña incorrecta");
    
    await store({ mail: user.mail, rol: user.rol, active: user.active, visible: user.visible }, "user");

    return true;
};

/**
 * Handles the register functionality.
 * 
 * @param data - The register data containing the mail and password.
 * @returns A boolean indicating whether the register was successful.
 * @throws Error if the mail is already in use.
 */
export async function register(data: { mail: string, password: string }): Promise<boolean> {
    const existingUser = await getUserByMail(data.mail);

    if (existingUser)
        throw new Error("El correo ya está en uso");

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser: User = {
        mail: data.mail,
        password: hashedPassword,
        rol: "user",
        active: true,
        visible: true
    };

    const db = await getDb();
    await db.collection<User>("users").insertOne(newUser);

    return true;
};
