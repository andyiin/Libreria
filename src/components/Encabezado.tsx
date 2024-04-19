import Link from "next/link";
import Logout from "@/components/Logout";

export default function Encabezado(props: { user: any }) {

    return (
        <header className="flex items-center justify-between px-4 py-2 bg-gray-200">
            <div>
                <h1 className="text-2xl font-bold">Librería</h1>
            </div>
            <div className="flex items-center w-1/2">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="w-full px-4 py-2 pr-10 border border-gray-400 rounded-lg"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-gray-500"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z"
                                fill="#080341"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <nav>
                {props.user && (
                    <>
                        <Link href="/dashboard" className="mr-4">
                            Dashboard
                        </Link>
                        <Logout />
                    </>
                )}
                {!props.user && (
                    <>
                        <Link href="/login" className="mr-4">
                            Iniciar sesión
                        </Link>
                        <Link href="/register">Crear cuenta</Link>
                    </>
                )}
            </nav>
        </header>
);
};
