import { retrieveCart } from "@/lib/session";
import DeleteCart from "@/components/DeleteCart";

const getCart = async () => {
    return await retrieveCart();
};

export default async function ListadoCarrito() {
    const cart = await getCart();
    console.log(JSON.stringify(cart));
 
    return (
        <div className="container max-w-md mx-auto">
            <h2>Carrito</h2>
            <ul className="list-disc list-inside flex flex-wrap">
                {cart?.map((product: any) => (
                    <>
                    <li key={product._id} className="flex flex-grow w-full">
                        <p>{product.name}</p>
                        <p>{product.price}€</p>
                    </li>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                        Borrar del carrito
                    </button>
                    <input type="number" defaultValue={product.quantity} className="w-10" />
                    </>
                ))}
            </ul>
            <DeleteCart />
        </div>
    );
};
