import { create } from "zustand"
import { persist } from "zustand/middleware"

import { Product } from "../types/product.types"

export interface CartItem extends Product {
  quantity: number
}

interface CartState {
  cart: CartItem[]

  addToCart: (product: Product) => void
  increaseQuantity: (productId: number) => void
  decreaseQuantity: (productId: number) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void

  cartCount: () => number
  subtotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const existing = get().cart.find(
          (item) => item.id === product.id,
        )

        if (existing) {
          set({
            cart: get().cart.map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                  }
                : item,
            ),
          })

          return
        }

        console.log("Adding to cart:", product)

        set({
          cart: [
            ...get().cart,
            {
              ...product,
              quantity: 1,
            },
          ],
        })

        console.log("Current cart:", get().cart)
      },

      increaseQuantity: (productId) => {
        set({
          cart: get().cart.map((item) =>
            item.id === productId
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        })
      },

      decreaseQuantity: (productId) => {
        const item = get().cart.find(
          (i) => i.id === productId,
        )

        if (!item) return

        if (item.quantity === 1) {
          set({
            cart: get().cart.filter(
              (i) => i.id !== productId,
            ),
          })

          return
        }

        set({
          cart: get().cart.map((i) =>
            i.id === productId
              ? {
                  ...i,
                  quantity: i.quantity - 1,
                }
              : i,
          ),
        })
      },

      removeFromCart: (productId) => {
        set({
          cart: get().cart.filter(
            (item) => item.id !== productId,
          ),
        })
      },

      clearCart: () => {
        set({
          cart: [],
        })
      },

      cartCount: () =>
        get().cart.reduce(
          (total, item) =>
            total + item.quantity,
          0,
        ),

      subtotal: () =>
        get().cart.reduce(
          (total, item) =>
            total + item.price * item.quantity,
          0,
        ),
    }),
    {
      name: "farmgym-cart",
    },
  ),
)