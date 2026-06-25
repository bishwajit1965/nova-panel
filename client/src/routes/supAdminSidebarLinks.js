import {
  LayoutDashboard,
  Users,
  Upload,
  CreditCard,
  Settings,
  CreditCardIcon,
  Logs,
} from "lucide-react";

export const supAdminSidebarLinks = [
  {
    label: "Dashboard",
    path: "/superAdmin/dashboard",
    icon: LayoutDashboard,
    permission: "dashboard.read",
  },
  {
    label: "Audit Logs",
    path: "/superAdmin/audit-logs",
    icon: Logs,
    permission: "audit-logs.read",
  },
  {
    label: "Users",
    path: "/superAdmin/user-management",
    icon: Users,
    permission: "user.read",
  },
  {
    label: "Roles",
    path: "/superAdmin/roles",
    icon: Users,
    permission: "role.read",
  },
  {
    label: "Permissions",
    path: "/superAdmin/permissions",
    icon: Users,
    permission: "permission.read",
  },
  {
    label: "Roles & Permissions",
    path: "/superAdmin/roles-permissions-control",
    icon: Users,
    permission: "role_permission.manage",
  },
  {
    label: "Access Management",
    path: "/superAdmin/access-management",
    icon: CreditCardIcon,
    permission: "access.manage",
  },
  {
    label: "Plans Management",
    path: "/superAdmin/plans-management",
    icon: CreditCard,
    permission: "plan.read",
  },
  {
    label: "Uploads",
    path: "/superAdmin/uploads",
    icon: Upload,
    permission: "upload.read",
  },
  {
    label: "Settings",
    path: "/superAdmin/settings",
    icon: Settings,
    permission: "settings.read",
  },
];
