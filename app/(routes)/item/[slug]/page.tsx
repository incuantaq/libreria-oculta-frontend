import BookView from "./BookView"

type Props = {
  params: { slug: string }
}

export default async function Page({ params }: Props) {
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
