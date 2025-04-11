"use client"

import Link from "next/link"
import BookRow from "@/components/BookRow"
import CaretDownIcon from "@/icons/CaretDownIcon"
import { useCategories } from "@/store/server/categories/queries"
import { Books } from "@/store/server/books/types"
import { Categories } from "@/store/server/categories/types"
import { useBooksContext } from "app/context/itemsContext";
import { useEffect, useState } from "react"

type Category = {
  id: number;
  attributes: {
    description: string | undefined
    name: string;
    slug: string;
  };
};

type mappedCategory = {
  name: string;
  slug: string;
}
export type Book = {
  author: string;
  categoryId: string;
  coverImage: {
    url: string;
  };
  excerpt: string;
  slug: string;
  sys: {
    id: string;
  };
  title: string;
  unitPrice: number;
};

function reduceItems(categories: Category[], items: Book[]) {
  const result: Record<string, { data: any[] }> = {};

  // Mapping categories for quick access
  const categoryMap: Record<number, { id: number; attributes: { name: string; slug: string; description?: string } }> = {};
  categories.forEach((category: Category) => {
    categoryMap[category.id] = {
      id: category.id,
      attributes: {
        name: category.attributes.name,
        slug: category.attributes.slug,
        description: category.attributes.description,
      }
    };
  });

  // Iterating through items to match with categories
  items?.forEach((item: any) => {
    const [categoryId] = item.categoryId.split(' - '); // Extracting category id
    const matchedCategory = categoryMap[categoryId];

    if (matchedCategory) {
      if (!result[matchedCategory.attributes.slug]) {
        result[matchedCategory.attributes.slug] = { data: [] };
      }

      result[matchedCategory.attributes.slug].data.push({
        id: item.sys.id,
        attributes: {
          title: item.title,
          price: item.unitPrice,
          description: item.excerpt,
          slug: item.slug,
          image: {
            data: [{
              id: item.sys.id + '-img',
              attributes: {
                url: item.coverImage.url
              }
            }]
          },
          in_stock: true, // Assuming all items are in stock
          author: item.author,
          categories: {
            data: {
              id: 12345,
              attributes: {
                name: matchedCategory.attributes.name,
                slug: `${matchedCategory.attributes.slug}/${item.slug}`
              }
            }
          }
        }
      });
    }
  });
  return result;
}


const BooksSection = ({
  categories,
  books,
}: {
  categories: Categories
  books: Record<string, Books>
}) => {
  const { data } = useCategories({ categories, featured: true })

  const [booksDemo, setBooksDemo] = useState({})
  const [ourCategories, setOurCategories] = useState<mappedCategory[]>([])
  const contextValue = useBooksContext();

  useEffect(() => {
    /* console.log("contextValue", contextValue);
    console.log("booksDemo", booksDemo); */

    
    const demo = reduceItems(categories.data, contextValue)
    const ourCategories = categories.data
      .filter((category: Category) => Object.keys(demo).includes(category.attributes.slug))
      .map(({attributes: {name, slug}}: Category) => ({name, slug}))
    
    setBooksDemo(demo)
    setOurCategories(ourCategories)
    
  }, [contextValue, categories.data])
  
  
  return (
    <div id="books" className="py-14">
      {ourCategories.map(({ name, slug }) => (
        <section key={slug} className="mx-auto max-w-6xl px-4 py-6 md:px-8">
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-2xl font-medium capitalize md:text-2xl">
              {name}
            </h2>
          </div>
          <BookRow key={slug} slug={slug} books={booksDemo} />

        </section>
      ))}
    </div>
  )
}


export default BooksSection
