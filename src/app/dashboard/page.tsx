import { PaginacionUsuarios } from "@/components/PaginacionUsuarios";
import BuscadorUsuarios from "@/components/BuscadorUsuarios";
import BuscadorPedidos from "@/components/BuscadorPedidos";
import { PaginacionPedidosAdmin } from "@/components/PaginacionPedidosAdmin";

const Page = async () => {
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

            <h1 className="text-4xl text-indigo-800 font-bold pt-6 text-center">
                Gestión pedidos
            </h1>
            <br/>
            <div className="flex justify-center">
                <BuscadorPedidos />
            </div>
            <PaginacionPedidosAdmin />
        </div>
    );
};

export default Page;
