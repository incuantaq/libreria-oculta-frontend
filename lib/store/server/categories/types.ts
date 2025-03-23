import { GetResponse } from "@/types/api"

export type Categories = GetResponse<Category[]>

export interface Category {
  id: number
  attributes: {
    name: string
    description: string
    slug: string
  }
}
