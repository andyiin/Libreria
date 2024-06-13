import { logoutAction } from "@/lib/action";

export default function Logout() {
    return (
        <form action={logoutAction} className="text-center">
            <button className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" type="submit">
                Cerrar sesión
            </button>
        </form>
    );
};
