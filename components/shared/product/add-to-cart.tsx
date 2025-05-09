'use client';

import { CartItem } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PlusIcon, Minus, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { Cart } from "@/types";
import { useTransition } from "react";

function AddToCart({ item, cart }: { item: CartItem, cart?: Cart }) {
  const router = useRouter();
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  async function handleAddToCart() {
    startTransition(async () => {
      const res = await addItemToCart(item);
      console.log('resposta ao adicionar item', res);
      if (res && !res.success) {
        toast({
          variant: 'destructive',
          description: res.message,
        });
        return;
      }

      // handle success add to cart
      toast({
        description: res?.message,
        action: (
          <ToastAction
            className="bg-primary text-white hover:bg-gray-800"
            altText="Go To Cart"
            onClick={() => router.push('/cart')}
          >
            Go To Cart
          </ToastAction>
        ),
      });
    });

  }

  // handle remove from cart
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      toast({
        variant: res.success ? 'default' : 'destructive',
        description: res.message,
      });

      return;
    });
  }

  // check if item is already in cart
  const existItem = cart && cart.items.find((cartItem) => cartItem.productId === item.productId);

  return existItem ? (
    <div>
      <Button type="button" variant='outline' onClick={handleRemoveFromCart}>
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        )
          : (
            <Minus className="h-4 w-4" />
          )}
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button type="button" variant='outline' onClick={handleAddToCart}>
        {isPending ?
          (
            <Loader className="w-4 h-4 animate-spin" />
          )
          :
          (
            <PlusIcon className="h-4 w-4" />
          )}
      </Button>
    </div>
  ) : (
    <Button className="w-full" onClick={handleAddToCart}>
      {isPending ?
        (
          <Loader className="w-4 h-4 animate-spin" />
        )
        :
        (
          <PlusIcon className="h-4 w-4" />
        )} Add To Cart
    </Button>
  )
}

export default AddToCart;