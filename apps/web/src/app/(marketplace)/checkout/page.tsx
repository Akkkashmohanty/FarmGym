"use client"

import { useState } from "react"

import OrderSummary from "@/components/marketplace/checkout/order-summary"
import PaymentButton from "@/components/marketplace/checkout/payment-button"

export default function CheckoutPage() {
  const [shippingAddress, setShippingAddress] =
    useState("")

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-3xl space-y-8">

        <div className="rounded-3xl border bg-card p-6 space-y-4">

          <div>
            <h2 className="text-xl font-bold">
              Shipping Address
            </h2>

            <p className="text-sm text-muted-foreground">
              Enter the address where your order should be delivered.
            </p>
          </div>

          <textarea
            value={shippingAddress}
            onChange={(e) =>
              setShippingAddress(e.target.value)
            }
            rows={4}
            placeholder="House / Flat No., Street, Area, City, State, PIN Code"
            className="w-full rounded-xl border bg-background p-3 outline-none focus:ring-2 focus:ring-green-600"
          />

        </div>

        <OrderSummary />

        <PaymentButton
          shippingAddress={shippingAddress}
        />

      </div>
    </main>
  )
}