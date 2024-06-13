import getDb from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function saveOrder(form: any) {
    const db = await getDb();
    const collection = db.collection("orders");
    const order = {
        user: new ObjectId(form.user),
        name: form.name,
        totalprice: form.cart.reduce((acc: number, item: any) => acc + parseFloat(item.price) * item.quantity, 0),
        email: form.email,
        numphone: form.phone,
        address: form.street,
        city: form.city,
        postalcode: form.postalcode,
        date: new Date(),
        state: "Pendiente",
        products: form.cart
    };
    await collection.insertOne(order);

    const productsCollection = db.collection("products");
    form.cart.forEach(async (item: any) => {
        await productsCollection.updateOne({ _id: new ObjectId(item._id) }, { $inc: { stock: -item.quantity } });
    });
};
