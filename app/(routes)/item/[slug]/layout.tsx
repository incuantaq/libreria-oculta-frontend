import { getBook } from "@/store/server/books/queries"

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params
  const bookData = await getBook(slug)
  const title = bookData.data[0].attributes.title

  return {
    title,
    openGraph: {
      title,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/item/${slug}`,
    },
    twitter: { title },
  }
}

export default function ItemLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className="main-container">{children}</main>
}
