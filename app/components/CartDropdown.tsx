"use client"

import Image from "next/image"
import Link from "next/link"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import CartDropdownSkeleton from "@/loading-ui/CartDropdownSkeleton"
import CheckoutButton from "./CheckoutButton"
import CartIcon from "@/icons/CartIcon"
import CancelIcon from "@/icons/CancelIcon"
import EmptyCartIcon from "@/icons/EmptyCartIcon"
import { useCartStore } from "@/store/client"
import { useEffect, useState } from "react"

const CartDropdown = () => {
  const { cart, removeFromCart, updateQuantity } = useCartStore()
  const [totalQuantity, setTotalQuantity] = useState(cart.length);
  const [isLoading, setIsLoading] = useState(true);
  const [cartData, setCartData] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  
  useEffect(() => {
    if (cart?.length > 0) {
      setTotalQuantity(cart.length);
      setCartData(cart);
      setTotalPrice(
        cart.reduce((acc, item) => acc + item.unitPrice, 0)
      );
    }
    setIsLoading(false);
  }
  , [cart]);


  return (
    <NavigationMenu.Item className="nav-menu-dropdown cart-dropdown">
      <NavigationMenu.Trigger
        aria-label="Cart"
        className="relative flex h-full items-center justify-center gap-x-2 px-2"
        aria-controls="cart-content"
      >
        <CartIcon />
        <span className="hidden md:inline">Carrito</span>
        {totalQuantity > 0 && (
          <span
            aria-label={`Number of items: ${totalQuantity}`}
            className="bg-skin absolute -right-2 -top-2 inline-block rounded-full bg-skin-accent py-1 px-2 text-xs text-skin-base md:-left-1 md:right-auto md:-top-1"
          >
            {totalQuantity}
          </span>
        )}
      </NavigationMenu.Trigger>

      <NavigationMenu.Content
        id="cart-content"
        className="absolute top-14 right-0 rounded-sm border border-skin-muted bg-skin-base p-4 shadow-lg"
      >
        <div className="mb-4 text-center font-serif text-base font-semibold">
          Mi carrito de compras
        </div>
        <div className="mb-4 max-h-80 overflow-y-auto">
          {cart?.length < 1 ? (
            <div className="flex h-36 items-center justify-center">
              <div className="mx-3 flex w-64 flex-col items-center">
                <EmptyCartIcon className="h-12 w-12" />
                <span className="text-center text-sm opacity-75">
                  ¡Tu carrito está vacío!
                </span>
              </div>
            </div>
          ) : (
            <ul>
              {isLoading ? (
                <CartDropdownSkeleton num={cart?.length} />
              ) : (
                cartData.map(item => (
                  <li
                    key={item?.id}
                    className="grid grid-cols-[auto_2fr_auto] grid-rows-[2fr_1fr_1fr] gap-x-2 border-b py-2 font-sans text-sm"
                  >
                    <div className="row-span-4 w-24">
                      <Link
                        href={`/item/${item?.slug}`}
                        className="relative inline-block h-32 w-full"
                      >
                        <Image
                          src={item?.image}
                          alt={item?.title}
                          className="object-contain py-1"
                          fill
                          sizes="(min-width: 640px) 20vw, 50vw"
                          priority
                        />
                      </Link>
                    </div>
                    <div className="col-start-2 row-start-1 w-36">
                      <NavigationMenu.Link asChild>
                        <Link
                          href={`/item/${item?.slug}`}
                          className="text-link font-medium italic line-clamp-2"
                        >
                          {item?.title}
                        </Link>
                      </NavigationMenu.Link>
                    </div>
                    <div className="col-span-2 col-start-2 row-start-2">
                      <span className="">Precio: </span>
                      <span className="font-medium">
                        {item?.unitPrice}
                      </span>
                    </div>
                    {/* <div className="col-span-2 col-start-2 row-start-3">
                      <button
                        type="button"
                        title="Reduce Quantity"
                        onClick={() => updateQuantity(item?.id, "decrease")}
                        className={`rounded-sm border bg-skin-muted py-1 px-3 leading-none ${item?.quantity < 2
                            ? "cursor-not-allowed bg-skin-muted opacity-75"
                            : ""
                          }`}
                        tabIndex={item?.quantity < 2 ? -1 : 0}
                      >
                        -
                      </button>
                      <span className="mx-2 inline-block w-4 text-center">
                        {item?.quantity}
                      </span>
                      <button
                        type="button"
                        title="Reduce Quantity"
                        onClick={() => updateQuantity(item?.id, "increase")}
                        className="rounded-sm border bg-skin-muted py-1 px-3 leading-none"
                      >
                        +
                      </button>
                    </div> */}
                    <div className="col-span-1 col-start-3 row-span-1 row-start-1">
                      <button
                        title="Remove"
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <CancelIcon className="opacity-75 hover:stroke-2 hover:opacity-100" />
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>

        <hr />
        <div className="my-2 flex items-baseline justify-between">
          <span className="text-base">Precio total :</span>
          <span className="text-base font-semibold">{totalPrice}</span>
        </div>
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-base">Envío :</span>
          <span className="w-44 text-right font-sans text-xs italic opacity-75">
            Impuestos de envío serán calculados en el checkout
          </span>
        </div>
        <div className="flex justify-between gap-x-2 text-base">
          <NavigationMenu.Link asChild>
            <CheckoutButton
              className="rounded-sm"
              isDisabled={cart.length < 1}
            />
          </NavigationMenu.Link>
          <NavigationMenu.Link asChild>
            <Link
              href={`/cart`}
              className="outline-btn-color w-full rounded-sm py-1 text-center transition-colors duration-200"
            >
              Ver carrito
            </Link>
          </NavigationMenu.Link>
        </div>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  )
}

export default CartDropdown
