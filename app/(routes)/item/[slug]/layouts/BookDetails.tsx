"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import SocialGroup from "@/components/SocialGroup"
import HeartIcon from "@/icons/HeartIcon"
import LoadingIcon from "@/icons/LoadingIcon"
import { useMounted } from "@/hooks"
import { useCartStore, useToastStore, useWishlistStore } from "@/store/client"
import { init } from "next/dist/compiled/webpack/webpack"

type Props = {
  slug: string
  initialData: any
}

export default function BookDetails({ slug, initialData }: Props) {
  // quantity state
  const [quantity, setQuantity] = useState(1)

  // client global state
  const { addToCart } = useCartStore()
  const { wishlist, toggleWishlist } = useWishlistStore()
  const { setToast } = useToastStore()

  const mounted = useMounted()

  console.log("initialData", initialData)
  
  const id = initialData?.slug
  const bookImageObj = initialData?.coverImage.url
  const authorName = initialData?.author
  const title = initialData?.title
  const description = initialData?.description
  const price = initialData?.unitPrice
  const sysId = initialData?.sys.id

  const handleAddToCart = () => {
    console.log("sysId", sysId)
    addToCart({
      id, quantity: 1, title, unitPrice: price, slug, image: bookImageObj, sysId,
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

  const hasWishlisted = wishlist.find(item => item.id === id)
  const handleAddToWishlist = () => {
    setToast({
      status: hasWishlisted ? "info" : "success",
      message: `The book has been ${
        hasWishlisted ? "removed from" : "added to"
      } wishlist`,
    })
    toggleWishlist(id)
  }

  return (
    <div className="mb-12 flex flex-col gap-6 md:flex-row md:gap-10 lg:gap-16">
      <div
        className={`image-wrapper mx-auto w-full max-w-[20rem] rounded bg-skin-muted p-8 md:w-2/5 md:max-w-none md:self-start md:p-8 lg:p-16`}
      >
        <div className="relative h-72 w-full overflow-hidden transition-transform duration-500 hover:scale-110 md:h-80 xl:h-96">
          <Image
            src={bookImageObj}
            fill
            priority
            alt={title}
            className="object-contain"
          />
        </div>
      </div>
      <div className="md:w-3/5">
        <h1 className="text-xl font-bold md:text-2xl">{title}</h1>
        <div className="book-desc my-2 md:my-4">
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>

        <hr className="my-4 md:my-6" />

        <div className="grid grid-cols-2 gap-y-2 md:grid-cols-3 md:gap-y-4 lg:grid-cols-4">
          <div>Autor :</div>
          <div className="md:col-span-2 lg:col-span-3">{authorName}</div>

          {/* <div>Categories :</div>
          <div className="md:col-span-2 lg:col-span-3">
            {categories.map((category, index) => (
              <span key={category.slug}>
                {index > 0 ? ", " : ""}
                <Link
                  href={`/categories/${category.slug}`}
                  className="text-link italic"
                >
                  {category.name}
                </Link>
              </span>
            ))}
          </div> */}

          <div>Disponibilidad : </div>
          <div className="md:col-span-2 lg:col-span-3">
            En Stock
          </div>
          {/* <div className="md:col-span-2 lg:col-span-3">
            {bookData.in_stock ? "In Stock" : "Waiting time 2 weeks"}
          </div> */}
        </div>

        <div className="my-4 flex justify-between md:my-6 md:flex-col-reverse md:gap-y-6">
          <div>
            <button
              type="button"
              title="Reduce Quantity"
              onClick={() => setQuantity(prev => prev - (prev > 1 ? 1 : 0))}
              className="rounded border bg-skin-muted px-2 text-2xl leading-none md:px-3 md:text-3xl"
            >
              -
            </button>
            <span className="mx-2 md:mx-4 md:text-2xl">{quantity}</span>
            <button
              type="button"
              title="Increase Quantity"
              onClick={() => setQuantity(prev => prev + (prev < initialData.items ? 1 : 0))}
              className="rounded border bg-skin-muted px-2 text-2xl leading-none md:px-3 md:text-3xl"
            >
              +
            </button>
          </div>
          <span className="text-xl font-semibold">
            Precio: {price}
          </span>
        </div>

        <div className="my-6 flex flex-col-reverse gap-4 md:flex-row md:gap-8">
          <button
            type="button"
            onClick={handleAddToCart}
            className="primary-btn-color flex w-full items-center justify-center gap-x-4 rounded py-2 text-center text-lg font-medium"
          >
            Agregar al carrito
          </button>
          {/* <button
            type="button"
            onClick={handleAddToWishlist}
            className="outline-btn-color flex w-full items-center justify-center gap-x-4 rounded border-2 py-2 text-center text-lg font-medium"
          >
            {mounted ? (
              <>
                <HeartIcon
                  className={`stroke-2 ${
                    hasWishlisted ? "fill-skin-accent stroke-skin-accent" : ""
                  }`}
                />
                {hasWishlisted ? "Wishlisted" : "Add To Wishlist"}
              </>
            ) : (
              <span className="flex gap-x-4">
                <LoadingIcon className="!mb-0 h-7 w-7" /> Loading ...
              </span>
            )}
          </button> */}
        </div>

        <SocialGroup className="!justify-start" />
      </div>
    </div>
  )
}
