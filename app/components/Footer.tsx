"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import SocialGroup from "app/components/SocialGroup"
import HeartIcon from "@/icons/HeartIcon"

const Footer = () => {
  const pathname = usePathname()

  // hide Footer on /cart and /wishlist on mobile/tablet
  const hideOnMobile = pathname === "/cart" ? "hidden lg:block" : ""
  const hideOnTablet = pathname === "/wishlist" ? "hidden md:block" : ""

  return (
    <footer className={`mt-auto shadow-inner ${hideOnMobile} ${hideOnTablet}`}>
      <div className="footer-container mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4 md:grid-rows-4 md:gap-x-6 md:gap-y-0 md:px-8 lg:gap-x-8 lg:gap-y-2">
        <div className="bookstore-desc col-span-2 md:row-span-3">
          <h2 className="my-2 font-serif text-xl font-semibold">
            Librería Oculta - Cajicá
          </h2>
          <div className="text-sm">
            <p className="my-1">
              Somos una librería en línea de Cajicá que ofrece una amplia
              selección de libros en diversos géneros, incluyendo ficción, 
              no ficción, biografías y más.
            </p>
            <p>
              Al comprar con nosotros, no solo disfrutas de una experiencia 
              de compra cómoda y agradable, sino que también te unes a nuestra 
              comunidad lectora. ¡Apoya nuestro emprendimiento y 
              haz parte de la Librería Oculta!.
            </p>
          </div>
        </div>

        {/* <div className="about-us md:row-span-4">
          <h2 className="my-1 font-serif text-xl font-semibold">Quick Links</h2>
          {quickLinks.map(({ id, href, title }) => (
            <div key={id}>
              <Link
                href={href}
                className="text-link inline-block py-1 font-sans"
              >
                {title}
              </Link>
            </div>
          ))}
        </div> */}

        <div className="services md:row-span-4">
          <h2 className="my-1 font-serif text-xl font-semibold">Contácto</h2>
          <p className="mb-3 text-sm">
            Email:{" "}
            <a href="mailto:info@nextbook.com" className="text-link mt-1 block">
              info@nextbook.com
            </a>
          </p>
          <p className="mb-3 text-sm">
            Teléfono:{" "}
            <a href="tel:+9-59-50-960-70" className="text-link mt-1 block">
              +959 50-960-70
            </a>
          </p>
          <p className="mb-3 text-sm">
            Dirección:{" "}
            <span className="mt-1 block">
              No (77), 123 Main Street, Thingangyun, Yangon
            </span>
          </p>
        </div>

        <div className="social-group col-span-2 md:row-span-1 md:self-center">
          <SocialGroup className="md:!justify-start" />
        </div>
      </div>
      <div className="copyright-notice-container bg-skin-dark">
        <div className="copyright-notice mx-auto flex max-w-6xl flex-col items-center py-1 px-4 text-skin-base md:flex-row  md:justify-between md:px-8">
          <span>© Copyright {new Date().getFullYear()} - Librería Oculta</span>
          <span>
            Hecho con{" "}
            <HeartIcon className="scale-75 fill-skin-base stroke-skin-base" />{" "}
            por{" "}
            <Link
              href="https://incuantaq.com"
              className="underline decoration-dashed underline-offset-2 hover:decoration-solid"
            >
              Incuantaq
            </Link>
            .
          </span>
        </div>
      </div>
    </footer>
  )
}

const quickLinks = [
  { id: 1, title: "Conócenos", href: "/about-us" },
  // { id: 2, title: "Contact Us", href: "/contact-us" },
  // { id: 3, title: "FAQ", href: "/faq" },
  // { id: 4, title: "Return Policy", href: "/return-policy" },
  // { id: 5, title: "Terms & Conditions", href: "/" },
]

export default Footer
