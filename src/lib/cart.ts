"use client"

import { Product, type Cart } from "@/lib/models/pedido";

/**
 * Deletes a specific item from the cart.
 */
export function deleteItemFromCart(id: string) {
    const cart = retrieveCart();
    if (!cart) throw Error("unreacheable");

    cart.products = cart?.products.filter((item: any) => item._id !== id);
    cart.totalPrice = calculateTotalPrice(cart.products);

    localStorage.setItem("cart", JSON.stringify(cart));
};
    
    
export function deleteCart() {
    localStorage.removeItem("cart");
};
    
/**
 * Stores the session data in the cart.
 * 
 * @param sessionData - The session data to be stored in the cart.
 * @returns A promise that resolves when the session data is successfully stored in the cart.
*/
export function storeInCart(sessionData: Product) {
    const cart = retrieveCart();
    
    if (cart) {
        const index = cart?.products.findIndex((item: any) => item._id === sessionData._id);
        
    if (index !== -1)
        cart.products[index].quantity += 1;
    else
        cart.products.push(sessionData);
    
    cart.totalPrice = calculateTotalPrice(cart.products)
    localStorage.setItem("cart", JSON.stringify(cart));
    } else {
        localStorage.setItem("cart", JSON.stringify({
            products: [sessionData],
            totalPrice: sessionData.price
        } satisfies Cart));
    }
};

/**
 * Increase or decrease the quantity of an item in the cart in 1 unit.
 * @param id The id of the item to edit.
 * @param operation The operation to perform: 1 to increase, -1 to decrease.
 */
export function editQuantityCart(id: string, operation: number) {
    const cart = retrieveCart();
    if (!cart) throw Error("unrecheable")

    const index = cart.products.findIndex((item: any) => item._id === id);

    if (index !== -1) {
        cart.products[index].quantity += operation;
        if (cart.products[index].quantity !== 0) {
            cart.totalPrice = calculateTotalPrice(cart.products);
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    } else {
        console.error("Item not found in cart.");
    }
};

/**
 * Retrieves the cart from the cookies.
 * @returns The cart object if it exists, otherwise undefined.
 */
export function retrieveCart(): Cart | undefined {
    const cart = localStorage.getItem("cart");
    if (!cart) return undefined;
    
    try {
        const value = JSON.parse(cart);
        return value;
    } catch (error) {
        console.error("Error parsing cookie value:", error);
        return undefined;
    }
};

function calculateTotalPrice(products: Product[]): number  {
    return products.reduce((acc, product) => acc + product.price * product.quantity, 0)
}
