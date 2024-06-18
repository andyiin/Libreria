import BuscadorUsuarios from "@/components/BuscadorUsuarios";
import ListaUsuario from "@/components/ListaUsuario";
import Usuario from "@/lib/models/usuario";
import getDb from "@/lib/mongodb";

async function getUsuarios(busqueda: string) {
    const db = await getDb();
    const usuarios = await db
        .collection<Usuario>("users")
        .find({
            $or: [
                { mail: { $regex: busqueda, $options: "i" } },
                { name: { $regex: busqueda, $options: "i" } },
            ],
        })
        .toArray();

    return usuarios;
}

const Page = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string };
}) => {
    const usuarios = await getUsuarios(searchParams.busqueda);
    return (
        <>
            <div className="bg-gray-300">
                <h1 className="text-4xl text-indigo-800 font-bold pt-6 text-center">
                    Gestión usuarios
                </h1>
                <br />
                <div className="flex justify-center">
                    <BuscadorUsuarios search={searchParams.busqueda} />
                </div>
            </div>
            <div className="bg-zinc-300 text-black min-h-screen">
                <ListaUsuario usuarios={usuarios} />
            </div>
        </>
    );
};

export default Page;
