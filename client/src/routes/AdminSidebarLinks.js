import {
  LayoutDashboard,
  Users,
  Upload,
  CreditCard,
  Settings,
} from "lucide-react";

export const adminSidebarLinks = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
    permission: "dashboard.read",
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: Users,
    permission: "user.read",
  },
  {
    label: "Uploads",
    path: "/admin/uploads",
    icon: Upload,
    permission: "upload.read",
  },
  {
    label: "Plans",
    path: "/admin/plans",
    icon: CreditCard,
    permission: "plan.read",
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
    permission: "system.settings",
  },
];
