import Link from "next/link";
import Logout from "@/components/Logout";
import Image from "next/image";
import Buscador from "@/components/Buscador";

export default function Encabezado(props: { user: any }) {
    return (
        <header className="flex items-center justify-between px-4 py-2 bg-gray-200">
            <div>
                <Link href="/">
                    <h1 className="flex flex-row items-center text-2xl font-bold text-gray-800">
                        Librería
                        <Image
                            src="./home.svg"
                            alt="Logo"
                            width={65}
                            height={65}
                            className="ml-2"
                        />
                    </h1>
                </Link>
            </div>
            <div className="flex items-center w-1/2">
                <Buscador />
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
}
