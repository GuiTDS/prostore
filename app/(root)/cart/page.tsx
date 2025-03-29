import { Metadata } from "next";
import CartTable from "./cart-table";
import { getMyCart } from "@/lib/actions/cart.actions";
import { Cart } from "@/types";

export const metadata: Metadata = {
  title: "Shopping Cart",
}


async function CartPage() {
  const cart = await getMyCart();
  return ( 
    <>
      <CartTable cart={cart as Cart}/>
    </>
   );
}

export default CartPage;