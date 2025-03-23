import axios from "@/lib/oldapi/axios"
import { useQuery } from "@tanstack/react-query"
import { Categories } from "./types"

/* ========== Get All/Featured Categories ========== */
export const getCategories = async (
  featured?: boolean
): Promise<Categories> => {
 /* const params = featured
    ? "?filters[featured][$eq]=true&sort=featured_order"
    : ""
  const response = await axios.get(`/categories${params}`)
  return response.data */
  return {
    data: [
      {
        "id": 1,
        "attributes": { 
          "name": "Literatura",
          "description": "Sumérgete en una variedad de obras literarias, desde clásicos hasta contemporáneos, que capturan la esencia de la experiencia humana.",
          "slug": "literatura"
        }
      },
      {
        "id": 2,
        "attributes": { 
          "name": "Biografías",
          "description": "Descubre la vida de figuras influyentes a través de relatos personales que inspiran y educan sobre sus logros y desafíos.",
          "slug": "biografias"
        }
      },
      {
        "id": 3,
        "attributes": { 
          "name": "Novelas y cuentos",
          "description": "Explora historias envolventes de ficción a través de novelas y cuentos que ofrecen reflexiones sobre la vida y la naturaleza humana.",
          "slug": "novelas-y-cuentos"
        }
      },
      {
        "id": 4,
        "attributes": { 
          "name": "Ciencias sociales",
          "description": "Adéntrate en estudios y teorías que exploran la conducta humana, la cultura y las dinámicas sociales en diversas sociedades.",
          "slug": "ciencias-sociales"
        }
      },
      {
        "id": 5,
        "attributes": { 
          "name": "Arte y arquitectura",
          "description": "Aprecia la belleza y el significado del arte y la arquitectura a través de textos que examinan obras maestras y estilos icónicos.",
          "slug": "arte-y-arquitectura"
        }
      },
      {
        "id": 6,
        "attributes": { 
          "name": "Bienestar",
          "description": "Prioriza tu salud y felicidad con guías sobre bienestar mental, físico y emocional, promoviendo un estilo de vida equilibrado.",
          "slug": "bienestar"
        }
      },
      {
        "id": 7,
        "attributes": { 
          "name": "Desarrollo y crecimiento personal",
          "description": "Impulsa tu desarrollo personal con libros que brindan herramientas y estrategias para mejorar tu vida y alcanzar tus metas.",
          "slug": "desarrollo-y-crecimiento-personal"
        }
      },
      {
        "id": 8,
        "attributes": { 
          "name": "Historia",
          "description": "Aprecia el pasado y sus lecciones a través de libros que analizan eventos clave, civilizaciones y figuras históricas.",
          "slug": "historia"
        }
      },
      {
        "id": 9,
        "attributes": { 
          "name": "Filosofía y psicología",
          "description": "Reflexiona sobre la existencia y el comportamiento humano con textos que abarcan temas de filosofía y teorías psicológicas.",
          "slug": "filosofia-y-psicologia"
        }
      },
      {
        "id": 10,
        "attributes": { 
          "name": "Matemáticas y ciencias naturales",
          "description": "Descubre el mundo de las matemáticas y las ciencias naturales con libros que explican conceptos y teorías fundamentales.",
          "slug": "matematicas-y-ciencias-naturales"
        }
      },
      {
        "id": 11,
        "attributes": { 
          "name": "Recetas / Manualidades / Pasatiempos / Jardinería / Viajes",
          "description": "Encuentra inspiración para tus hobbies con libros de recetas, jardinería y manualidades, ideales para exploraciones creativas.",
          "slug": "recetas-manualidades-pasatiempos-jardineria-viajes"
        }
      },
      {
        "id": 12,
        "attributes": { 
          "name": "Cómics / Historietas",
          "description": "Sumérgete en las emocionantes historias de cómics y historietas, donde la narrativa visual cobra vida de formas únicas.",
          "slug": "comics-historietas"
        }
      },
      {
        "id": 13,
        "attributes": { 
          "name": "Literatura infantil y juvenil",
          "description": "Fomenta la lectura en los más jóvenes con una selección de libros infantiles y juveniles que estimulan la imaginación.",
          "slug": "literatura-infantil-y-juvenil"
        }
      },
      {
        "id": 14,
        "attributes": { 
          "name": "Esoterismo y paranormal",
          "description": "Explora el mundo del esoterismo y lo paranormal a través de libros intrigantes que abordan creencias, misterios y espiritualidad.",
          "slug": "esoterismo-y-paranormal"
        }
      },
      {
        "id": 15,
        "attributes": { 
          "name": "Ciencias aplicadas y tecnología",
          "description": "Adéntrate en los avances tecnológicos y científicos con una colección de libros que exploran la aplicación práctica del conocimiento.",
          "slug": "ciencias-aplicadas-y-tecnologia"
        }
      },
      {
        "id": 16,
        "attributes": { 
          "name": "Negocios y liderazgo",
          "description": "Desarrolla tus habilidades de liderazgo con libros sobre negocios que enseñan estrategias exitosas y gestión efectiva del equipo.",
          "slug": "negocios-y-liderazgo"
        }
      },
      {
        "id": 17,
        "attributes": { 
          "name": "Otros idiomas",
          "description": "Aprende y practica otros idiomas con libros que enriquecen tu vocabulario y gramática en lenguas diversas.",
          "slug": "otros-idiomas"
        }
      },
      {
        "id": 18,
        "attributes": { 
          "name": "Ensayo",
          "description": "Sumérgete en la no ficción a través de ensayos que ofrecen nuevas perspectivas y reflexiones sobre temas relevantes y contemporáneos.",
          "slug": "ensayo"
        }
      },
      {
        "id": 19,
        "attributes": { 
          "name": "Religión y espiritualidad",
          "description": "Explora las creencias y tradiciones espirituales de diferentes culturas a través de libros sobre religión y espiritualidad.",
          "slug": "religion-y-espiritualidad"
        }
      },
      {
        "id": 20,
        "attributes": { 
          "name": "Generalidades",
          "description": "Una selección variada de temas de interés general, perfectos para aquellos que buscan aprender sobre una amplia gama de temas.",
          "slug": "generalidades"
        }
      }
    ]
  };
}

export const useCategories = ({
  categories,
  featured = false,
}: {
  categories: Categories
  featured?: boolean
}) =>
  useQuery({
    queryKey: featured ? ["categories", { featured: true }] : ["categories"],
    queryFn: () => getCategories(featured),
    initialData: categories,
    select: data =>
      data.data.map(({ attributes }) => ({
        name: attributes.name,
        slug: attributes.slug,
      })),
  })

/* ========== Get Category by Slug ========== */
export const getCategoryBySlug = async (slug: string): Promise<Categories> => {
  const response = await axios.get(
    `/categories?filters[slug][$eq]]=${slug}&populate=*`
  )
  return response.data
}
