import { retrieveCart } from "@/lib/session";
import DeleteCart from "@/components/DeleteCart";
import DeleteItemFromCart from "@/components/DeleteItemFromCart";
import IncreaseQuantityCart from "@/components/IncreaseQuantityCart";
import DecreaseQuantityCart from "@/components/DecreaseQuantityCart";

const getCart = async () => {
    return await retrieveCart();
};

export default async function ListadoCarrito() {
    const cart = await getCart();

    return (
        <div className="container max-w-md mx-auto">
            <h1 className="text-4xl text-indigo-800 font-bold pt-6 text-center">Carrito</h1>
            <ul className="space-y-4 mt-6">
                {cart?.map((product: any) => (
                    <li key={product._id} className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md">
                        <div className="flex items-center space-x-4">
                            <div className="flex flex-col p-1">
                                <p className="text-lg font-semibold">{product.name}</p>
                                <p className="text-gray-500">{product.price} €/u</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 mt-4 md:mt-0 p-1">
                            <DecreaseQuantityCart id={product._id} />
                            <p className="text-lg">{product.quantity}</p>
                            <IncreaseQuantityCart id={product._id} />
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center space-x-2">
                            <DeleteItemFromCart id={product._id} />
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mt-6 text-center flex justify-center space-x-4">
                <DeleteCart />
                <button className="bg-indigo-800 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded cursor-pointer">
                    Comprar
                </button>     
            </div>
            <h2 className="text-2xl font-semibold mt-4 text-center">
                Total: {cart?.reduce((acc: number, product: any) => acc + product.price * product.quantity, 0).toFixed(2)}€
            </h2>
        </div>
    );
};
