import Image from "next/image"
import Breadcrumb from "@/components/Breadcrumb"
import aboutBanner from "@/public/about.webp"
import booksCollection from "@/public/books-collection.webp"

export const metadata = {
  title: "About",
  openGraph: {
    title: "About",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/about-us`,
  },
  twitter: { title: "About" },
}

export default function Page() {
  return (
    <>
      <div className="relative h-64 w-full">
        <Image
          src={aboutBanner}
          alt="Pile of books"
          className="object-cover brightness-50"
          fill
        />
        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-2xl font-bold capitalize text-skin-base">
          Conócenos
        </h1>
      </div>
      <main className="padding-x max-width pt-6 lg:px-20">
        <Breadcrumb />
        <div className="grid gap-4 pb-12 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-5">
          <section className="lg:col-span-3">
            <h2 className="font-serif text-xl font-bold">Misión</h2>
            <p className="my-2 font-sans">
            Fomentar el amor por la lectura y el conocimiento, ofreciendo libros que inspiran, educan y entretienen, en un espacio acogedor para todos los lectores.
            </p>
          </section>
          <section className="md:row-span-2 md:row-start-2 lg:col-span-3">
            <h2 className="font-serif text-xl font-bold">¿Quiénes somos?:</h2>
            <p className="my-2 font-sans">
            Somos una librería comprometida con acercarte a mundos extraordinarios a través de las páginas de cada libro. Aquí encuentras cultura, aprendizaje y pasión por la lectura.
            </p>
          </section>
          <div className="image-container md:col-start-2 md:row-span-3 md:row-start-1 lg:col-span-2 lg:col-start-4">
            <Image
              src={booksCollection}
              alt="Books Collection"
              className="border-8 border-skin-dark md:max-h-96 md:max-w-[24rem]"
            />
          </div>
        </div>
      </main>
    </>
  )
}
