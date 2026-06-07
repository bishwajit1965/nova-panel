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
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    label: "Uploads",
    path: "/admin/uploads",
    icon: Upload,
  },
  {
    label: "Plans",
    path: "/admin/plans",
    icon: CreditCard,
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];
