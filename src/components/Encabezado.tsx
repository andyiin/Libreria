import Link from "next/link";
import Image from "next/image";
import { InfoUser } from "@/lib/models/usuario";
import Menu from "@/components/MenuLogged";
import { retrieveCart } from "@/lib/session";

export default async function Encabezado(props: { user: InfoUser | undefined }) {
    const cart = await retrieveCart();

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
                <div className="flex gap-4">
                    <Link href="/cart" className="px-2 py-1 flex items-center">
                        <Image
                            src="/cart.svg"
                            alt="Carrito"
                            width={30}
                            height={30}
                            />
                            {cart?.length > 0 && (
                                <span className="bg-red-500 text-xs text-white rounded-full px-0.5 py-0.25 opacity-75">
                                    {cart.length}
                                </span>
                            )}
                    </Link>
                </div>
                {props.user && (
                    <>
                        <p className="text-indigo-800 text-xl"><b>Bienvenido {props.user.name}</b></p>
                        <Menu user={props.user} />
                    </>
                )}
                {!props.user && (
                    <>
                        <Link
                            href="/login"
                            className="bg-indigo-300 hover:bg-indigo-800 hover:text-white p-2 px-6 rounded-md transition duration-300"
                        >
                            Iniciar sesión
                        </Link>

                        <Link
                            href="/register"
                            className="bg-indigo-300 hover:bg-indigo-800 hover:text-white p-2 px-6 rounded-md transition duration-300"
                        >
                            Crear cuenta
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
};
