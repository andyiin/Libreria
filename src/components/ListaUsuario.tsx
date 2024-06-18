import UsuarioModel from "@/lib/models/usuario";
import { WithId } from "mongodb";
import UsuarioDetalladoAdmin from "@/components/UsuarioDetalladoAdmin";

export default function ListaUsuario(props: { usuarios: WithId<UsuarioModel>[] }) {
    return (
        <div>
            <ul className="flex flex-wrap justify-around gap-16 py-10 px-20">
                {props.usuarios.length === 0 && (
                    <div className="text-center text-2xl py-10">
                        No se encontraron resultados
                    </div>
                )}
                {props.usuarios.map((usuario) => (
                    <UsuarioDetalladoAdmin key={usuario._id.toString()} usuario={usuario} id={usuario._id.toString()} />
                ))}
            </ul>
        </div>
    );
}
