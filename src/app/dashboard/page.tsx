import { retrieve } from "@/lib/session";
import { PaginacionUsuarios } from "@/components/PaginacionUsuarios";
import BuscadorUsuarios from "@/components/BuscadorUsuarios";

async function getUser() {
    return await retrieve("user");
}

const Page = async () => {
    const user = await getUser();

    return (
        <div className="bg-zinc-300">
            <h1 className="text-4xl text-indigo-800 font-bold pt-6 text-center">
                Gestión usuarios
            </h1>
            <br/>
            <div className="flex justify-center">
                <BuscadorUsuarios />
            </div>
            <PaginacionUsuarios />
        </div>
    );
};

export default Page;
