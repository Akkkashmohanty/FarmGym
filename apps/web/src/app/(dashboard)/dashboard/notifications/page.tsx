"use client"

import {
    Award,
    Bell,
    ShieldAlert,
    Sprout,
} from "lucide-react"

import {
    useNotifications,
    useMarkNotificationRead,
} from "@/features/notification/hooks/use-notifications"

export default function NotificationsPage() {
    const {
        data: notifications = [],
        isLoading,
    } = useNotifications()

    const markReadMutation =
        useMarkNotificationRead()

    const unreadCount =
        notifications.filter(
            (notification) => !notification.is_read,
        ).length

    const markAllRead = async () => {
        for (const notification of notifications) {
            if (!notification.is_read) {
                await markReadMutation.mutateAsync(
                    notification.id,
                )
            }
        }
    }

    if (isLoading) {
        return (
            <main className="min-h-screen bg-background p-8">
                <div className="mx-auto max-w-5xl">
                    <div className="rounded-3xl border border-border bg-card p-8">
                        Loading notifications...
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-background p-8">
            <div className="mx-auto max-w-5xl">

                <div className="mb-8 flex items-center justify-between">

                    <div>
                        <h1 className="text-4xl font-black">
                            Notifications
                        </h1>

                        <p className="mt-2 text-muted-foreground">
                            All recent activity from your FarmGym account.
                        </p>
                    </div>

                    {unreadCount > 0 && (
                        <button
                            onClick={markAllRead}
                            className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                        >
                            Mark All Read
                        </button>
                    )}

                </div>

                {notifications.length === 0 ? (
                    <div className="rounded-3xl border border-border bg-card p-12 text-center">

                        <Bell className="mx-auto h-10 w-10 text-muted-foreground" />

                        <h2 className="mt-4 text-xl font-bold">
                            No Notifications
                        </h2>

                        <p className="mt-2 text-muted-foreground">
                            You&apos;re all caught up.
                        </p>

                    </div>
                ) : (
                    <div className="space-y-4">

                        {notifications.map(
                            (notification) => {

                                let Icon = Bell

                                let color =
                                    "text-green-600 bg-green-500/10 border-green-200"

                                if (
                                    notification.title.includes(
                                        "Completed",
                                    )
                                ) {
                                    Icon = Award

                                    color =
                                        "text-yellow-600 bg-yellow-500/10 border-yellow-200"
                                }

                                if (
                                    notification.title.includes(
                                        "Deleted",
                                    )
                                ) {
                                    Icon = ShieldAlert

                                    color =
                                        "text-red-600 bg-red-500/10 border-red-200"
                                }

                                if (
                                    notification.title.includes(
                                        "Created",
                                    )
                                ) {
                                    Icon = Sprout

                                    color =
                                        "text-green-600 bg-green-500/10 border-green-200"
                                }

                                return (
                                    <div
                                        key={notification.id}
                                        className={`rounded-2xl border p-5 transition ${notification.is_read
                                            ? "opacity-70"
                                            : "shadow-sm"
                                            }`}
                                    >
                                        <div className="flex gap-4">

                                            <div
                                                className={`flex h-11 w-11 items-center justify-center rounded-xl border ${color}`}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </div>

                                            <div className="flex-1">

                                                <div className="flex items-center gap-2">

                                                    <h3 className="font-bold">
                                                        {notification.title}
                                                    </h3>

                                                    {!notification.is_read && (
                                                        <span className="h-2 w-2 rounded-full bg-green-500" />
                                                    )}

                                                </div>

                                                <p className="mt-2 text-sm text-muted-foreground">
                                                    {notification.message}
                                                </p>

                                                <p className="mt-3 text-xs text-muted-foreground">
                                                    {new Date(
                                                        notification.created_at,
                                                    ).toLocaleString()}
                                                </p>

                                            </div>

                                        </div>
                                    </div>
                                )

                            },
                        )}

                    </div>
                )}

            </div>
        </main>
    )
}