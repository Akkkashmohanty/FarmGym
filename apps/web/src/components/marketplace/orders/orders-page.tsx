"use client"

import { Package, ShoppingBag, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

import {
  useCancelOrder,
  useOrders,
} from "@/features/marketplace/hooks/use-orders"

interface OrderItem {
  id: number
  product_id: number
  quantity: number
  price: number
}

interface Order {
  id: number
  created_at: string
  status: string
  total_amount: number
  items: OrderItem[]
}

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

export default function OrdersPage() {
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useOrders()

  const cancelOrder =
    useCancelOrder()

  async function handleCancel(
    id: number,
  ) {
    try {
      await cancelOrder.mutateAsync(id)

      toast.success(
        "Order cancelled successfully.",
      )
    } catch {
      toast.error(
        "Unable to cancel order.",
      )
    }
  }

  if (isLoading) {
    return (
      <main className="mx-auto max-w-5xl p-8">
        Loading orders...
      </main>
    )
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-5xl p-8 text-red-600">
        Unable to load orders.
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-5xl space-y-8 p-8">

      <div>

        <h1 className="text-3xl font-black">
          My Orders
        </h1>

        <p className="text-muted-foreground">
          View and manage all your marketplace orders.
        </p>

      </div>

      {orders.length === 0 ? (

        <div className="rounded-3xl border bg-card p-16 text-center">

          <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

          <h2 className="text-xl font-bold">
            No Orders Yet
          </h2>

          <p className="mt-2 text-muted-foreground">
            Your orders will appear here after checkout.
          </p>

        </div>

      ) : (

        <div className="space-y-6">

          {orders.map((order: Order) => (

            <div
              key={order.id}
              className="rounded-3xl border bg-card p-6"
            >

              <div className="flex items-start justify-between">

                <div>

                  <h2 className="text-lg font-bold">
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
                  (item: OrderItem) => (

                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-xl border p-4"
                    >

                      <div className="flex items-center gap-3">

                        <Package className="h-5 w-5 text-green-600" />

                        <div>

                          <p className="font-semibold">
                            Product #{item.product_id}
                          </p>

                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                          </p>

                        </div>

                      </div>

                      <span className="font-bold">
                        ₹{item.price}
                      </span>

                    </div>

                  ),
                )}

              </div>

              <div className="mt-6 flex items-center justify-between border-t pt-6">

                <div>

                  <p className="text-sm text-muted-foreground">
                    Total
                  </p>

                  <p className="text-2xl font-black">
                    ₹{order.total_amount}
                  </p>

                </div>

                {order.status !==
                  "Cancelled" && (

                  <Button
                    variant="destructive"
                    onClick={() =>
                      handleCancel(
                        order.id,
                      )
                    }
                    disabled={
                      cancelOrder.isPending
                    }
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Cancel Order
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