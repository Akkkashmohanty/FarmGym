import { api } from "@/lib/axios/client"

export interface OrderItemPayload {
  product_id: number
  quantity: number
}

export interface CreateOrderPayload {
  shipping_address: string
  items: OrderItemPayload[]
}

export const orderApi = {
  async createOrder(payload: CreateOrderPayload) {
    const { data } = await api.post("/orders", payload)
    return data
  },

  async getOrders() {
    const { data } = await api.get("/orders")
    return data
  },

  async getSellerOrders() {
    const { data } = await api.get("/orders/seller")
    return data
  },

  async getOrder(id: number) {
    const { data } = await api.get(`/orders/${id}`)
    return data
  },

  async cancelOrder(id: number) {
    const { data } = await api.delete(`/orders/${id}`)
    return data
  },

  async updateOrderStatus(
    id: number,
    status: string,
  ) {
    const { data } = await api.patch(
      `/orders/${id}/status`,
      { status },
    )

    return data
  },
}