import BooksSection from "./layouts/BooksSection"
import HeroSection from "./layouts/HeroSection"
import { getCategories } from "@/store/server/categories/queries"
import { getInitialBooks } from "@/utils/utilFuncs"

export default async function Home() {
  const categories = await getCategories(true)
  const books = await getInitialBooks(categories)

  return (
    <main>
      <HeroSection />
      <BooksSection categories={categories} books={books} />
    </main>
  )
}
