import UsuarioModel from "@/lib/models/usuario";
import { WithId } from "mongodb";
import Link from "next/link";

export default function UsuarioDetallado(props: {
    id: string;
    usuario: WithId<UsuarioModel>;
}) {
    return (
        <div className="bg-zinc-300 text-black py-10 flex items-center justify-center min-h-screen">
            <div className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 max-w-4xl">
                <h1 className="text-2xl font-bold mb-6 text-indigo-800">
                    Mi perfil
                </h1>
                <div>
                    <p className="mb-2">
                        <b>Nombre: </b>
                        {props.usuario.name}
                    </p>
                    <p className="mb-2">
                        <b>Email: </b>
                        {props.usuario.mail}
                    </p>
                    <p className="mb-2">
                        <b>Número de teléfono: </b>
                        {props.usuario.numphone}
                    </p>
                </div>
                <h1 className="text-2xl font-bold mb-6 text-indigo-800">
                    Dirección
                </h1>
                <div>
                    <p className="mb-2">
                        <b>Dirección: </b>
                        {props.usuario.street}
                    </p>
                    <p className="mb-2">
                        <b>Ciudad: </b>
                        {props.usuario.city}
                    </p>
                    <p className="mb-2">
                        <b>C.P.: </b>
                        {props.usuario.postalcode}
                    </p>
                </div>
                <Link href={`/profile/${props.id}/edit-profile`}>
                    <button className="px-4 py-2 rounded bg-emerald-800 hover:bg-emerald-900 text-zinc-300 text-lg transition duration-300">
                        Editar
                    </button>
                </Link>
                <br/>
                <Link href={`/profile/${props.id}/edit-password`}>
                    <button className="px-4 py-2 mt-2 rounded bg-indigo-800 hover:bg-indigo-900 text-zinc-300 text-lg transition duration-300">
                        Cambiar contraseña
                    </button>
                </Link>
            </div>
        </div>
    );
}
