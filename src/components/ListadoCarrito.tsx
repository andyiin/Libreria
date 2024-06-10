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
                    <DeleteItemFromCart id={product._id} />
                        <IncreaseQuantityCart id={product._id}/>
                    <p>
                        {product.quantity}
                    </p>
                        <DecreaseQuantityCart id={product._id}/>
                    </>
                ))}
            </ul>
            <DeleteCart />
            <h2>Total: {cart?.reduce((acc: number, product: any) => acc + product.price * product.quantity, 0)}€</h2>
        </div>
    );
};
