"use client";
import { useState, createContext } from "react";

interface ProductCart {
    id: number;
    title: string;
    price: number;
    quantity: number;
}

interface ProductCartContext {
    cartProducts: ProductCart[];
    addCartProducts: (product: ProductCartItem) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    totalQuantityProduct: number;
    totalPriceProduct: number;
}

interface ProductCartItem {
    id: number;
    title: string;
    price: number;
}

interface Props {
    children: React.ReactNode;
}

export const cartContext = createContext({} as ProductCartContext);

const CartProvider = ({ children }: Props) => {
    const [cartProducts, setCartProducts] = useState<ProductCart[]>([]);

    const addCartProducts = ({ id, title, price }: ProductCartItem) => {
        if (cartProducts.length === 0) {
            return setCartProducts([{ id, title, price, quantity: 1 }])
        }

        const productExist = cartProducts.find(p => p.id === id);
        if (!productExist) {
            return setCartProducts([...cartProducts, { id, title, price, quantity: 1 }])
        }

        setCartProducts(
            cartProducts.map(p => {
                if (p.id === id) {
                    return { ...p, quantity: p.quantity + 1 }
                } else {
                    return p;
                }
            })
        )
    }

    const increaseQuantity = (id: number) => {
        setCartProducts(
            cartProducts.map(p => {
                if (p.id === id) {
                    return { ...p, quantity: p.quantity + 1 }
                } else {
                    return p;
                }
            })
        )
    }
    const decreaseQuantity = (id: number) => {

        if (cartProducts.find(i => i.id === id)?.quantity === 1) {
            return setCartProducts(cartProducts.filter(i => i.id !== id));
        }

        setCartProducts(
            cartProducts.map(p => {
                if (p.id === id) {
                    return { ...p, quantity: p.quantity - 1 }
                } else {
                    return p;
                }
            })
        )
    }

    const totalQuantityProduct = cartProducts.reduce((acc, item) => acc + item.quantity, 0);
    const totalPriceProduct = cartProducts.reduce((acc, item) => acc + item.quantity * item.price, 0);


    return (
        <cartContext.Provider value={{ cartProducts, addCartProducts, increaseQuantity, decreaseQuantity, totalQuantityProduct, totalPriceProduct }}>
            {children}
        </cartContext.Provider>
    )
}

export default CartProvider;