import { retrieve } from "@/lib/session";
import { PaginacionUsuarios } from "@/components/PaginacionUsuarios";

async function getUser() {
    return await retrieve("user");
}

const Page = async () => {
    const user = await getUser();

    return (
        <div className="bg-zinc-300">
            <PaginacionUsuarios />
        </div>
    );
};

export default Page;