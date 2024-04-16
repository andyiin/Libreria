import login from "./login.tsx";
import { redirect } from "next/navigation";
import Login from "@/components/Login";

export default function LoginPage() {
    async function handleLogin(formData: FormData) {
        "use server";

        const data = {
            mail: formData.get("email")?.toString().trim() ?? "",
            password: formData.get("password")?.toString().trim() ?? ""
        };

        let auth = false;
        try {
            auth = await login(data);
        } catch (error) {
            console.error(error.message);
        }
        if (auth) {
            redirect("/");
        }
    };

    return (
        <Login handleLogin={handleLogin} />
    );
};
