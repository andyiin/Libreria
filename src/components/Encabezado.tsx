import Link from "next/link";
import Image from "next/image";
import { InfoUser } from "@/lib/models/usuario";
import Logout from "@/components/Logout";
import Menu from "@/components/MenuLogged";

export default function Encabezado(props: { user: InfoUser | undefined }) {
    return (
        <header className="flex items-center justify-between px-4 py-2 bg-gray-200 text-gray-800">
            <div>
                <Link href="/">
                    <h1 className="flex flex-row items-center text-2xl font-bold">
                        Librería
                        <Image
                            src="/home.svg"
                            alt="Logo"
                            width={65}
                            height={65}
                            className="ml-2"
                        />
                    </h1>
                </Link>
            </div>
            <nav className="flex gap-4">
                {props.user && (
                    <Link href={`/profile/${props.user._id}`} className="mr-4">
                        Mi perfil
                    </Link>
                )}
                {props.user && (
                    <>
                        {props.user.rol === "admin" && (
                            <Link href="/dashboard" className="mr-4">
                                Dashboard
                            </Link>
                        )}
                        <Logout />
                    </>
                
                    <Menu user={props.user} />

                )}
                {!props.user && (
                    <> 
                        <Link href="/login" className="bg-zinc-300 hover:bg-zinc-400 px-2 py-1 rounded-md ring-2 ring-indigo-800">
                            Iniciar sesión
                        </Link>

                        <Link href="/register" className="bg-zinc-300 hover:bg-zinc-400 px-2 py-1 rounded-md ring-2 ring-indigo-800">
                            Crear cuenta
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
}
