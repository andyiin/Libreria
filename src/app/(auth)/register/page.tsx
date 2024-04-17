import register from "./register";
import { redirect } from "next/navigation";
import Registro from "@/components/Registro"

export default function RegisterPage() {
    async function handleRegistro(formData: FormData) {
        "use server";

        if (formData.get("password") !== formData.get("password-2")) {
            console.error("Las contraseñas no coinciden");
            return;
        }

        const data = {
            mail: formData.get("email")?.toString().trim() ?? "",
            password: formData.get("password")?.toString().trim() ?? ""
        };

        let auth = false;
        try {
            auth = await register(data);
        } catch (error) {
            console.error(error.message);
        }
        if (auth) {
            redirect("/");
        }
    };

    return (
        <Registro handleRegistro={handleRegistro} />
    );
};
