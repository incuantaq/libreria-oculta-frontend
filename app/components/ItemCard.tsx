"use client"

import Link from "next/link"
import Image from "next/image"
import HeartIcon from "@/icons/HeartIcon"
import { useCartStore, useToastStore, useWishlistStore } from "@/store/client"
import { useMounted } from "@/hooks"
import { Book } from "app/(routes)/(home)/layouts/BooksSection"

interface Props extends Book {
  className?: string
  id: string | string
  title: string
  unitPrice: number
  slug: string
  image: string
  sys: {
    id: string
  }
  sysId: string | string
}

const ItemCard = ({ className = "", id, title, unitPrice, slug, image, sysId }: Props) => {
  const { cart, addToCart } = useCartStore()
  const { wishlist, toggleWishlist } = useWishlistStore()
  const { setToast } = useToastStore()

  const handleAddToCart = () => {
    const alreadyAdded = cart.find(item => item.id === id)

    if (alreadyAdded) {
      setToast({
        status: "info",
        message: "El libro ya está en el carrito",
      })
    } else {
      addToCart({
        id, quantity: 1, title, unitPrice, slug, image, sysId,
        author: "",
        categoryId: "",
        coverImage: {
          url: ""
        },
        excerpt: "",
        sys: {
          id: ""
        }
      })
      setToast({
        status: "success",
        message: "El libro ha sido añadido al carrito",
      })
    }
  }

  const mounted = useMounted()

  return (
    <article
      className={`flex flex-col gap-y-2 rounded font-sans shadow hover:shadow-lg ${className}`}
    >
      <Link
        href={`/item/${slug}`}
        title={title}
        className="image-wrapper rounded border-2 border-skin-muted bg-skin-muted p-4 sm:p-8 md:p-4 lg:p-8"
      >
        <div className="relative h-44 w-full overflow-hidden transition-transform duration-200 hover:scale-105">
          <Image
            src={image}
            alt={title}
            fill
            sizes="
            (min-width: 1024px) 20vw,
            (min-width: 768px) 25vw,
            (min-width: 640px) 33vw,
            50vw"
            className="object-contain"
          />
        </div>
      </Link>
      <div className="content px-4 pb-4">
        <header className="h-10 line-clamp-2">
          <h3 className="text-sm">{title}</h3>
        </header>
        <div className="price mb-1 font-medium">
          <span>Precio: </span>
          <span>{unitPrice}</span>
        </div>
        <div className="buttons flex gap-x-2 h-8">
          <button
            type="button"
            onClick={handleAddToCart}
            className="primary-btn-color flex-1 rounded px-1 text-sm font-semibold"
          >
            Agregar al carrito
          </button>
          {/* WISHLIST ITEM <button
            type="button"
            className="outline-btn-color basis-1/4 rounded p-1"
            title="Add To Wishlist"
            onClick={handleAddToWishlist}
          >
            <HeartIcon
              className={`${
                mounted && hasWished
                  ? "fill-skin-accent !stroke-skin-accent"
                  : "!stroke-skin-dark"
              }`}
            />
          </button> */}
        </div>
      </div>
    </article>
  )
}

export default ItemCard
