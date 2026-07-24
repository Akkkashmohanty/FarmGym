"use client"

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import { orderApi } from "../api/order.api"

export function useCreateOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: orderApi.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      })
    },
  })
}

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: orderApi.getOrders,
  })
}

export function useSellerOrders() {
  return useQuery({
    queryKey: ["seller-orders"],
    queryFn: orderApi.getSellerOrders,
  })
}

export function useOrder(id: number) {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => orderApi.getOrder(id),
    enabled: !!id,
  })
}

export function useCancelOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: orderApi.cancelOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      })
      queryClient.invalidateQueries({
        queryKey: ["seller-orders"],
      })
    },
  })
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number
      status: string
    }) => orderApi.updateOrderStatus(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      })
      queryClient.invalidateQueries({
        queryKey: ["seller-orders"],
      })
    },
  })
}