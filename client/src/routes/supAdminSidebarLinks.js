import {
  LayoutDashboard,
  Users,
  Upload,
  CreditCard,
  Settings,
} from "lucide-react";

export const supAdminSidebarLinks = [
  {
    label: "Dashboard",
    path: "/superAdmin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    path: "/superAdmin/users",
    icon: Users,
  },
  {
    label: "Uploads",
    path: "/superAdmin/uploads",
    icon: Upload,
  },
  {
    label: "Plans",
    path: "/superAdmin/plans",
    icon: CreditCard,
  },
  {
    label: "Settings",
    path: "/superAdmin/settings",
    icon: Settings,
  },
];
