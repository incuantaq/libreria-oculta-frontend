"use client"

import ItemCard from "@/components/ItemCard"
import CardSkeletons from "@/loading-ui/CardSkeletons"
import { getOptimizedImage } from "@/utils/utilFuncs"
import { Books } from "@/store/server/books/types"
import { useBooks } from "@/store/server/books/queries"

type Props = {
  slug: string
  books: Record<string, Books>
}

export default function BookRow({ slug, books }: Props) {

  console.log("books", books);
  console.log("slug", slug);
  /* const { data, isError, isLoading } = useBooks({
    initialData: books[slug],
    filter: { slug, limit: 5 },
  }) */
/* 
  console.log("data", data);
  console.log("isError", isError);
  console.log("isLoading", isLoading); */

  /* if (isLoading || isError) return <CardSkeletons num={5} slug={slug} /> */

  return (
    <div className="cards-container">
      {books[slug]?.data.map(({ id, attributes }) => {
        console.log("id", id);
        console.log("attributes", attributes);
        const { slug, price, title, image } = attributes
        return (
          <ItemCard
            key={id}
            className={`${
              books[slug]?.data.length >= 5
                ? "last:hidden sm:last:flex sm:even:hidden md:last:hidden md:even:flex lg:last:flex"
                : books[slug]?.data.length === 4
                ? "sm:last:hidden md:sm:last:flex"
                : ""
            }`}
            id={slug}
            unitPrice={price}
            slug={slug}
            title={title}
            sysId={id}
            image={getOptimizedImage(image)}
          />
        )
      })}
    </div>
  )
}
