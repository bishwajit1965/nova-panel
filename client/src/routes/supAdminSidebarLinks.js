import {
  LayoutDashboard,
  Users,
  Upload,
  CreditCard,
  Settings,
  CreditCardIcon,
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
    label: "Roles",
    path: "/superAdmin/roles",
    icon: Users,
  },
  {
    label: "Permissions",
    path: "/superAdmin/permissions",
    icon: Users,
  },
  {
    label: "Roles & Permissions",
    path: "/superAdmin/roles-permissions-control",
    icon: Users,
  },
  {
    label: "Access Management",
    path: "/superAdmin/access-management",
    icon: CreditCardIcon,
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
