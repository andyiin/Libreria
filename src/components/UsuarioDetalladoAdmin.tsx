import UsuarioModel from "@/lib/models/usuario";
import { WithId } from "mongodb";
import Link from "next/link";

export default function UsuarioDetalladoAdmin(props: {
    id: string;
    usuario: WithId<UsuarioModel>;
}) {
    return (
        <div className="text-black flex items-center justify-center">
            <div className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 w-96">
                <h1 className="text-2xl font-bold mb-2 text-indigo-800">
                    Perfil
                </h1>
                <ul>
                    <li className="mb-2">
                        <b>Email: </b>
                        {props.usuario.mail}
                    </li>
                    <li className="mb-2">
                        <b>Nombre: </b>
                        {props.usuario.name}
                    </li>
                    <li className="mb-2">
                        <b>Número de teléfono: </b>
                        {props.usuario.numphone}
                    </li>
                    <li className="mb-2">
                        <b>Rol: </b>
                        {props.usuario.rol}
                    </li>
                </ul>
                <h1 className="text-2xl font-bold mb-2 text-indigo-800">
                    Dirección
                </h1>
                <ul>
                    <li className="mb-2">
                        <b>Dirección: </b>
                        {props.usuario.street}
                    </li>
                    <li className="mb-2">
                        <b>Ciudad: </b>
                        {props.usuario.city}
                    </li>
                    <li className="mb-2">
                        <b>C.P.: </b>
                        {props.usuario.postalcode}
                    </li>
                </ul>
                <Link href={`/profile/${props.id}/edit-profile-admin`}>
                    <button className="px-4 py-2 rounded bg-emerald-800 hover:bg-emerald-900 text-white text-lg transition duration-300">
                        Editar
                    </button>
                </Link>
                <br/>
                <Link href={`/profile/${props.id}/edit-password-admin`}>
                    <button className="px-4 py-2 mt-2 rounded bg-indigo-800 hover:bg-indigo-900 text-white text-lg transition duration-300">
                        Cambiar contraseña
                    </button>
                </Link>
            </div>
        </div>
    );
}
