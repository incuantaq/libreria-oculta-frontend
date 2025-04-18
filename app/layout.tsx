import { Fraunces, Quicksand } from "next/font/google"
/* import TopBar from "@/components/TopBar" */
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import Toast from "@/components/Toast"
import Providers from "./providers"
import "./globals.css"

import { BooksContextProvider } from "./context/itemsContext";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
})

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  display: "swap",
})

export const metadata = {
  title: {
    default: "Librería Oculta - Tu Destino Único para Libros",
    template: "%s | Librería Oculta",
  },
  description:
    "Descubre tu próxima lectura favorita en Librería Oculta. Explora nuestra amplia selección de bestsellers, nuevos lanzamientos y rarezas. ¡Apoya tu pasión por la lectura!",
  openGraph: {
    title: {
      default: "Librería Oculta - Tu Destino Único para Libros",
      template: "%s | Librería Oculta",
    },
    url: process.env.NEXT_PUBLIC_SITE_URL,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/default-og.jpg`,
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "Librería Oculta - Tu Destino Único para Libros",
      template: "%s | Librería Oculta",
    },
    description:
      "Descubre tu próxima lectura favorita en Librería Oculta. Explora nuestra amplia selección de bestsellers, nuevos lanzamientos y rarezas. ¡Apoya tu pasión por la lectura!",
    creator: "@SatNaingDev",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/default-og.jpg`],
  },
  robots: {
    index: true,
  },
  icons: {
    icon: `${process.env.NEXT_PUBLIC_SITE_URL}/icons/icon.png`,
    shortcut: `${process.env.NEXT_PUBLIC_SITE_URL}/icons/favicon.ico`,
    apple: `${process.env.NEXT_PUBLIC_SITE_URL}/icons/apple-touch-icon.png`,
    other: [
      {
        rel: "icon",
        sizes: "16x16",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/icons/favicon-16x16.png`,
      },
      {
        rel: "icon",
        sizes: "32x32",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/icons/favicon-32x32.png`,
      },
    ],
  },
  themeColor: "#EDF4F4",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${quicksand.variable}`}>
      <head />
      <body>
        <div className="flex min-h-screen flex-col">
          <Providers>
            {/* <TopBar /> */}
            <NavBar />
            <BooksContextProvider>
              <main>{children}</main>
            </BooksContextProvider>
            <Footer />
            <Toast />
          </Providers>
        </div>
      </body>
    </html>
  )
}
