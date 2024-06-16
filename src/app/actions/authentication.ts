"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import User from "@/lib/models/usuario";
import getDb from "@/lib/mongodb";
import { store } from "@/lib/session";
import { LoginSchema, RegisterSchema, FormState } from "@/lib/definitions";
import { ObjectId, OptionalId } from "mongodb";

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
 * Logs in a user with the provided form data.
 * @param _ - Placeholder parameter, not used in the function.
 * @param formData - The form data containing the email and password.
 * @returns A Promise that resolves to a FormState object.
 */
export async function login(_:any, formData: FormData) : Promise<FormState> {
    const {success, data: dataForm, error} = LoginSchema.safeParse({
        email: formData.get("email")?.toString().trim() ?? "",
        password: formData.get("password")?.toString().trim() ?? ""
    });

    if (!success)
        return { errors: error.flatten().fieldErrors };

    const user = await getUserByMail(dataForm.email);

    if (!user)
        return { errors: { email: ["Usuario no encontrado"] } };

    const isValid = await bcrypt.compare(dataForm.password, user.password);

    if (!isValid)
        return { errors: { password: ["Contraseña incorrecta"] } };

    if (!user.visible)
        return { errors: { email: ["Cuenta deshabilitada. Ponte en contacto con un administrador"] } };
    
    await store( "user", { _id: user._id, mail: user.mail, rol: user.rol, active: user.active, visible: user.visible, city: user.city, name: user.name, numphone: user.numphone, postalcode: user.postalcode, street: user.street, card: user.card });
    
    redirect("/");
};

/**
 * Registers a new user with the provided form data.
 * 
 * @param _ - Placeholder parameter, not used in the function.
 * @param formData - The form data containing the user's email and password.
 * @returns A Promise that resolves to a FormState object.
 */
export async function register(_:any, formData: FormData) : Promise<FormState> {
    const {success, data: dataForm, error} = RegisterSchema.safeParse({
        email: formData.get("email")?.toString().trim() ?? "",
        password: formData.get("password")?.toString().trim() ?? "",
        password2: formData.get("password-2")?.toString().trim() ?? ""
    });

    if (!success)
        return { errors: error.flatten().fieldErrors };

    if (dataForm.password !== dataForm.password2)
        return { errors: { password: ["Las contraseñas no coinciden"] } };

    const user = await getUserByMail(dataForm.email);

    if (user)
        return { errors: { email: ["El email ya está en uso"] } };

    const password = await bcrypt.hash(dataForm.password, 10);

    await getDb().then(db => db.collection<OptionalId<User>>("users").insertOne({ mail: dataForm.email, password, rol: "user", active: true, visible: true, card: null, city: "", name: "", numphone: 0, postalcode: 0, street: ""}));

    const newUser = await getUserByMail(dataForm.email);
    await store( "user", {
        _id: newUser?._id ?? new ObjectId(),
        mail: newUser?.mail ?? "",
        rol: newUser?.rol ?? "user",
        active: newUser?.active ?? true,
        visible: newUser?.visible ?? true,
        city: newUser?.city ?? "",
        name: newUser?.name ?? "",
        numphone: newUser?.numphone ?? 0,
        postalcode: newUser?.postalcode ?? 0,
        street: newUser?.street ?? ""
    });

    redirect("/");
};
