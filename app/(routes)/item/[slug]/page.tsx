import BookView from "./BookView"

type Params = Promise<{ slug: string }>

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;

  return (
    <>
      <BookView name={slug} />
      <hr className="border border-skin-dark opacity-5" />
      {/* <RelatedBooks
        author={authorId}
        categories={categoryIds}
        currentBookId={currentBookId}
      /> */}
    </>
  )
}
