import {
    LayoutDashboard,
    CalendarDays,
    ShoppingCart,
    BookOpen,
    Users,
    HeartHandshake,
    Activity,
    BarChart3,
    Bell,
    Dumbbell,
    Settings,
    Shield,
    Store,
    Package,
    PackagePlus,
    LucideIcon,
} from "lucide-react"

import { UserRole } from "@/types/auth.types"

export interface NavigationItem {
    label: string
    href: string
    icon: LucideIcon
    permission: string
    roles: UserRole[]
    section: "platform" | "dashboard" | "system"
}

export const navigationItems: NavigationItem[] = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        permission: "dashboard",
        roles: [
            "USER",
            "FARMER",
            "SELLER",
            "CREATOR",
            "ADMIN",
        ],
        section: "platform",
    },

    {
        label: "Planner",
        href: "/planner",
        icon: CalendarDays,
        permission: "planner",
        roles: [
            "USER",
            "FARMER",
            "ADMIN",
        ],
        section: "platform",
    },

    {
        label: "Marketplace",
        href: "/marketplace",
        icon: ShoppingCart,
        permission: "marketplace",
        roles: [
            "USER",
            "FARMER",
            "SELLER",
            "ADMIN",
        ],
        section: "platform",
    },

    {
        label: "My Orders",
        href: "/orders",
        icon: Package,
        permission: "orders",
        roles: [
            "USER",
            "FARMER",
            "SELLER",
            "ADMIN",
        ],
        section: "platform",
    },

    {
        label: "Seller Dashboard",
        href: "/seller/dashboard",
        icon: Store,
        permission: "seller-dashboard",
        roles: [
            "SELLER",
            "ADMIN",
        ],
        section: "platform",
    },

    {
        label: "Seller Orders",
        href: "/seller/orders",
        icon: Package,
        permission: "seller-orders",
        roles: [
            "SELLER",
            "ADMIN",
        ],
        section: "platform",
    },

    {
        label: "Upload Product",
        href: "/seller/uploads",
        icon: PackagePlus,
        permission: "seller-upload",
        roles: [
            "SELLER",
            "ADMIN",
        ],
        section: "platform",
    },

    {
        label: "Learning",
        href: "/learn",
        icon: BookOpen,
        permission: "learning",
        roles: [
            "USER",
            "FARMER",
            "CREATOR",
            "ADMIN",
        ],
        section: "platform",
    },

    {
        label: "Community",
        href: "/community",
        icon: Users,
        permission: "community",
        roles: [
            "USER",
            "FARMER",
            "SELLER",
            "CREATOR",
            "ADMIN",
        ],
        section: "platform",
    },

    {
        label: "Donation",
        href: "/donation",
        icon: HeartHandshake,
        permission: "donation",
        roles: [
            "USER",
            "FARMER",
            "ADMIN",
        ],
        section: "platform",
    },

    {
        label: "Gym",
        href: "/gym",
        icon: Dumbbell,
        permission: "gym",
        roles: [
            "USER",
            "FARMER",
            "ADMIN",
        ],
        section: "platform",
    },

    {
        label: "Activities",
        href: "/dashboard/activities",
        icon: Activity,
        permission: "activities",
        roles: [
            "USER",
            "FARMER",
            "SELLER",
            "CREATOR",
            "ADMIN",
        ],
        section: "dashboard",
    },

    {
        label: "Analytics",
        href: "/dashboard/analytics",
        icon: BarChart3,
        permission: "analytics",
        roles: [
            "USER",
            "FARMER",
            "SELLER",
            "CREATOR",
            "ADMIN",
        ],
        section: "dashboard",
    },

    {
        label: "Notifications",
        href: "/dashboard/notifications",
        icon: Bell,
        permission: "notifications",
        roles: [
            "USER",
            "FARMER",
            "SELLER",
            "CREATOR",
            "ADMIN",
        ],
        section: "dashboard",
    },

    {
        label: "Settings",
        href: "/settings",
        icon: Settings,
        permission: "settings",
        roles: [
            "USER",
            "FARMER",
            "SELLER",
            "CREATOR",
            "ADMIN",
        ],
        section: "system",
    },

    {
        label: "Admin",
        href: "/admin",
        icon: Shield,
        permission: "admin",
        roles: [
            "ADMIN",
        ],
        section: "system",
    },
]

export function getNavigationByRole(
    role: UserRole,
) {
    return navigationItems.filter((item) =>
        item.roles.includes(role),
    )
}