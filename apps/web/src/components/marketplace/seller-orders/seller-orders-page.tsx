"use client"

import { Package } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

import {
  useSellerOrders,
  useUpdateOrderStatus,
} from "@/features/marketplace/hooks/use-orders"

const STATUS_FLOW = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
]

function StatusBadge({
  status,
}: {
  status: string
}) {
  const colors: Record<string, string> = {
    Pending: "bg-yellow-100 text-yellow-700",
    Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-indigo-100 text-indigo-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  }

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        colors[status] ??
        "bg-muted text-muted-foreground"
      }`}
    >
      {status}
    </span>
  )
}

export default function SellerOrdersPage() {
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useSellerOrders()

  const updateStatus =
    useUpdateOrderStatus()

  async function nextStatus(
    order: any,
  ) {
    const current =
      STATUS_FLOW.indexOf(order.status)

    if (
      current === -1 ||
      current === STATUS_FLOW.length - 1
    )
      return

    const status =
      STATUS_FLOW[current + 1]

    try {
      await updateStatus.mutateAsync({
        id: order.id,
        status,
      })

      toast.success(
        `Order marked as ${status}.`,
      )
    } catch {
      toast.error(
        "Unable to update order."
      )
    }
  }

  if (isLoading)
    return (
      <main className="mx-auto max-w-6xl p-8">
        Loading seller orders...
      </main>
    )

  if (isError)
    return (
      <main className="mx-auto max-w-6xl p-8 text-red-600">
        Unable to load seller orders.
      </main>
    )

  return (
    <main className="mx-auto max-w-6xl space-y-8 p-8">

      <div>

        <h1 className="text-3xl font-black">
          Seller Orders
        </h1>

        <p className="text-muted-foreground">
          Manage customer purchases.
        </p>

      </div>

      {orders.length === 0 ? (

        <div className="rounded-3xl border bg-card p-16 text-center">

          <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

          <h2 className="text-xl font-bold">
            No Orders
          </h2>

        </div>

      ) : (

        <div className="space-y-6">

          {orders.map((order: any) => (

            <div
              key={order.id}
              className="rounded-3xl border bg-card p-6"
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="font-bold">
                    Order #{order.id}
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    {new Date(
                      order.created_at,
                    ).toLocaleString()}
                  </p>

                </div>

                <StatusBadge
                  status={order.status}
                />

              </div>

              <div className="mt-6 space-y-3">

                {order.items.map(
                  (item: any) => (

                    <div
                      key={item.id}
                      className="flex justify-between rounded-xl border p-4"
                    >

                      <div>

                        <p className="font-semibold">
                          Product #{item.product_id}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>

                      </div>

                      <span className="font-bold">
                        ₹{item.price}
                      </span>

                    </div>

                  ),
                )}

              </div>

              <div className="mt-6 flex items-center justify-between border-t pt-5">

                <div>

                  <p className="text-sm text-muted-foreground">
                    Total
                  </p>

                  <p className="text-2xl font-black">
                    ₹{order.total_amount}
                  </p>

                </div>

                {order.status !==
                  "Delivered" &&
                  order.status !==
                    "Cancelled" && (

                    <Button
                      onClick={() =>
                        nextStatus(
                          order,
                        )
                      }
                      disabled={
                        updateStatus.isPending
                      }
                    >
                      Move to Next Status
                    </Button>

                  )}

              </div>

            </div>

          ))}

        </div>

      )}

    </main>
  )
}