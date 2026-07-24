"use client"

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import {
  productApi,
  ProductQueryParams,
} from "../api/product.api"

export function useProducts(
  params?: ProductQueryParams,
) {
  return useQuery({
    queryKey: [
      "products",
      params,
    ],

    queryFn: () =>
      productApi.getProducts(
        params,
      ),
  })
}

export function useProduct(
  id: number,
) {
  return useQuery({
    queryKey: [
      "product",
      id,
    ],

    queryFn: () =>
      productApi.getProduct(id),

    enabled: !!id,
  })
}

export function useMyProducts() {
  return useQuery({
    queryKey: [
      "my-products",
    ],

    queryFn:
      productApi.getMyProducts,
  })
}

export function useCreateProduct() {
  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn:
      productApi.createProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "products",
        ],
      })

      queryClient.invalidateQueries({
        queryKey: [
          "my-products",
        ],
      })
    },
  })
}

export function useUpdateProduct() {
  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number
      payload: Parameters<
        typeof productApi.updateProduct
      >[1]
    }) =>
      productApi.updateProduct(
        id,
        payload,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "products",
        ],
      })

      queryClient.invalidateQueries({
        queryKey: [
          "my-products",
        ],
      })

      queryClient.invalidateQueries({
        queryKey: [
          "product",
        ],
      })
    },
  })
}

export function useDeleteProduct() {
  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn:
      productApi.deleteProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "products",
        ],
      })

      queryClient.invalidateQueries({
        queryKey: [
          "my-products",
        ],
      })
    },
  })
}