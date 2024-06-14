"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { saveOrder } from "@/lib/session";
import { retrieveCart, deleteCart } from "@/lib/cart";
import UsuarioModel from "@/lib/models/usuario";
import { ShippingSchema, CardSchema } from "@/lib/definitions";
import DeleteCart from "@/components/DeleteCart";
import DeleteItemFromCart from "@/components/DeleteItemFromCart";
import IncreaseQuantityCart from "@/components/IncreaseQuantityCart";
import DecreaseQuantityCart from "@/components/DecreaseQuantityCart";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function ListadoCarrito({ user }: { user: UsuarioModel }) {
    const router = useRouter();
    const [form, setForm] = useState({
        name: user?.name || "",
        email: user?.mail || "",
        phone: user?.numphone || "",
        street: user?.street || "",
        city: user?.city || "",
        postalcode: user?.postalcode || "",
        cardNumber: "",
        cardHolder: "",
        cardExpiry: "",
        cardCVV: ""
    });

    const [errors, setErrors] = useState<any>({});
    const [state, setState] = useState(0);
    const cart = useMemo(() => retrieveCart(), [state]);
    const [modalContent, setModalContent] = useState({ title: "", description: "" });
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const shippingValidation = ShippingSchema.safeParse({
            name: form.name,
            email: form.email,
            numphone: form.phone.toString(),
            street: form.street,
            city: form.city,
            postalcode: form.postalcode.toString(),
        });

        if (!shippingValidation.success) {
            setErrors(shippingValidation.error.flatten().fieldErrors);
            return;
        }

        const cardValidation = CardSchema.safeParse({
            cardname: form.cardHolder,
            cardnumber: form.cardNumber,
            expdate: form.cardExpiry,
            cvv: form.cardCVV,
        });

        if (!cardValidation.success) {
            setErrors(cardValidation.error.flatten().fieldErrors);
            return;
        }

        setErrors({});

        try {
            await saveOrder({ ...form, cart, user: user._id });
            deleteCart();
            setModalContent({
                title: "Compra realizada con éxito!",
                description: "Tu compra se ha realizado con éxito. Gracias por tu pedido."
            });
            setIsDialogOpen(true);
        } catch (error) {
            console.error("Error al guardar la orden:", error);
            setModalContent({
                title: "Error al realizar la compra",
                description: "Hubo un error al realizar la compra. Inténtalo nuevamente."
            });
            setIsDialogOpen(true);
        }
    };

    const handleDialogAction = () => {
        setIsDialogOpen(false);
        router.push("/");
    };

    return (
        <div className="container mx-auto flex flex-col lg:flex-row lg:space-x-8 p-2">
            <form className="lg:w-1/2" onSubmit={handleSubmit}>
                <h2 className="text-4xl text-indigo-800 font-bold pt-6 text-center lg:text-left">Envío</h2>
                <div className="grid grid-cols-1 gap-6 mt-6">
                    <label className="block">
                        <span className="text-gray-700">Nombre</span>
                        <input
                            type="text"
                            name="name"
                            className="form-input mt-1 block w-full border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-2"
                            value={form.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="text-red-600 font-bold">{errors.name}</p>}
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Email</span>
                        <input
                            type="email"
                            name="email"
                            className="form-input mt-1 block w-full border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-2"
                            value={form.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-600 font-bold">{errors.email}</p>}
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Número de teléfono</span>
                        <input
                            type="tel"
                            name="phone"
                            className="form-input mt-1 block w-full border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-2"
                            value={form.phone}
                            onChange={handleChange}
                        />
                        {errors.numphone && <p className="text-red-600 font-bold">{errors.numphone}</p>}
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Dirección</span>
                        <input
                            type="text"
                            name="street"
                            className="form-input mt-1 block w-full border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-2"
                            value={form.street}
                            onChange={handleChange}
                        />
                        {errors.street && <p className="text-red-600 font-bold">{errors.street}</p>}
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Ciudad</span>
                        <input
                            type="text"
                            name="city"
                            className="form-input mt-1 block w-full border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-2"
                            value={form.city}
                            onChange={handleChange}
                        />
                        {errors.city && <p className="text-red-600 font-bold">{errors.city}</p>}
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Código Postal</span>
                        <input
                            type="text"
                            name="postalcode"
                            className="form-input mt-1 block w-full border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-2"
                            value={form.postalcode}
                            onChange={handleChange}
                        />
                        {errors.postalcode && <p className="text-red-600 font-bold">{errors.postalcode}</p>}
                    </label>
                </div>
                <h2 className="text-4xl text-indigo-800 font-bold pt-6 text-center lg:text-left">Pago</h2>
                <div className="grid grid-cols-1 gap-6 mt-6">
                    <label className="block">
                        <span className="text-gray-700">Número de tarjeta</span>
                        <input
                            type="text"
                            name="cardNumber"
                            className="form-input mt-1 block w-full border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-2"
                            value={form.cardNumber}
                            onChange={handleChange}
                        />
                        {errors.cardnumber && <p className="text-red-600 font-bold">{errors.cardnumber}</p>}
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Titular</span>
                        <input
                            type="text"
                            name="cardHolder"
                            className="form-input mt-1 block w-full border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-2"
                            onChange={handleChange}
                        />
                        {errors.cardname && <p className="text-red-600 font-bold">{errors.cardname}</p>}
                    </label>
                    <div className="grid grid-cols-2 gap-6">
                        <label className="block">
                            <span className="text-gray-700">Fecha de caducidad</span>
                            <input
                                type="text"
                                name="cardExpiry"
                                className="form-input mt-1 block w-full border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-2"
                                value={form.cardExpiry}
                                onChange={handleChange}
                            />
                            {errors.expdate && <p className="text-red-600 font-bold">{errors.expdate}</p>}
                        </label>
                        <label className="block">
                            <span className="text-gray-700">CVV</span>
                            <input
                                type="text"
                                name="cardCVV"
                                className="form-input mt-1 block w-full border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-2"
                                value={form.cardCVV}
                                onChange={handleChange}
                            />
                            {errors.cvv && <p className="text-red-600 font-bold">{errors.cvv}</p>}
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-800 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded cursor-pointer mt-6"
                    >
                        Realizar compra
                    </button>
                </div>
            </form>

            <div className="lg:w-1/2 mt-8 lg:mt-0">
                <h2 className="text-4xl text-indigo-800 font-bold pt-6 text-center lg:text-left">Carrito</h2>
                <ul className="space-y-4 mt-6">
                    {cart?.products.map((product: any) => (
                        <li key={product._id} className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md">
                            <div className="flex items-center space-x-4 flex-grow">
                                <div className="flex flex-col p-1 flex-grow overflow-hidden">
                                    <p className="text-lg font-semibold">{product.name}</p>
                                    <p className="text-gray-500">{product.price} €/u</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 mt-4 md:mt-0">
                                <DecreaseQuantityCart id={product._id} stateChanged={setState} />
                                <p className="text-lg">{product.quantity}</p>
                                <IncreaseQuantityCart id={product._id} stateChanged={setState} />
                                <DeleteItemFromCart id={product._id} stateChanged={setState} />
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="mt-6 text-center flex justify-center space-x-4">
                    <DeleteCart stateChange={setState} />
                </div>
                <h2 className="text-2xl font-semibold mt-4 text-center">
                    Total: {Intl.NumberFormat(undefined, { currency: 'EUR', style: 'currency' }).format(cart?.totalPrice ?? 0)}
                </h2>
            </div>

            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{modalContent.title}</AlertDialogTitle>
                        <AlertDialogDescription>{modalContent.description}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={handleDialogAction}>
                            Aceptar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};
