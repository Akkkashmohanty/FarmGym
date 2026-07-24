import { api } from "@/lib/axios/client"

import {
  Product,
  ProductCreate,
  ProductUpdate,
} from "../types/product.types"

export interface ProductQueryParams {
  search?: string
  category?: string
  page?: number
  limit?: number
}

export const productApi = {
  async getProducts(
    params?: ProductQueryParams,
  ) {
    const response =
      await api.get<Product[]>(
        "/products",
        {
          params,
        },
      )

    return response.data
  },

  async getMyProducts() {
    const response =
      await api.get<Product[]>(
        "/products/me",
      )

    return response.data
  },

  async getProduct(
    id: number,
  ) {
    const response =
      await api.get<Product>(
        `/products/${id}`,
      )

    return response.data
  },

  async createProduct(
    payload: ProductCreate,
  ) {
    const response =
      await api.post<Product>(
        "/products",
        payload,
      )

    return response.data
  },

  async updateProduct(
    id: number,
    payload: ProductUpdate,
  ) {
    const response =
      await api.patch<Product>(
        `/products/${id}`,
        payload,
      )

    return response.data
  },

  async deleteProduct(
    id: number,
  ) {
    await api.delete(
      `/products/${id}`,
    )
  },
}