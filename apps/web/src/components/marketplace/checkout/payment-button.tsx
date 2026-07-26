"use client"

import { useState } from "react"
import { Lock, CheckCircle } from "lucide-react"
import { toast } from "sonner"
import { useCartStore } from "@/features/marketplace/store/cart.store"
import {
  useCreateOrder,
} from "@/features/marketplace/hooks/use-orders"

interface PaymentButtonProps {
  shippingAddress: string
}

export default function PaymentButton({
  shippingAddress,
}: PaymentButtonProps) {
  const { clearCart, cart } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const createOrder =
    useCreateOrder()

  const handleCheckout =
    async () => {

      if (cart.length === 0) {
        toast.error(
          "Cart is empty",
        )
        return
      }

      if (!shippingAddress.trim()) {
        toast.error(
          "Please enter a shipping address.",
        )
        return
      }

      try {

        setLoading(true)

        await createOrder.mutateAsync({
          shipping_address: shippingAddress,

          items: cart.map(
            (item) => ({
              product_id:
                item.id,

              quantity:
                item.quantity,
            }),
          ),
        })

        clearCart()

        setSuccess(true)

        toast.success(
          "Order placed successfully!",
        )

      } catch (error: unknown) {

        const message =
          error instanceof Error
            ? error.message
            : "Unable to place order."

        toast.error(message)

      } finally {

        setLoading(false)

      }
    }

  if (success) {
    return (
      <div className="rounded-3xl border border-green-600/20 bg-green-500/[0.02] p-8 text-center space-y-4 animate-in zoom-in-95 duration-350">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-green-600">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </span>
        <h4 className="font-black text-lg text-green-950 dark:text-green-200">Transaction Confirmed!</h4>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
          Thank you for shopping on the FarmGym Marketplace. Your items are scheduled for courier packaging and dispatch!
        </p>
      </div>
    )
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-2xl h-12 font-bold text-sm shadow-sm transition disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Processing Payment...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          <span>Pay and Place Order securely</span>
        </span>
      )}
    </button>
  )
}
