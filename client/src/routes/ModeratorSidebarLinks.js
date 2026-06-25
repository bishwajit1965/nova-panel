import { CreditCard, LayoutDashboard, Users } from "lucide-react";

export const moderatorSidebarLinks = [
  {
    label: "Dashboard",
    path: "/moderator/dashboard",
    icon: LayoutDashboard,
    permission: "dashboard.read",
  },
  {
    label: "Users",
    path: "/moderator/users",
    icon: Users,
    permission: "user.read",
  },
  {
    label: "Plans",
    path: "/moderator/plans",
    icon: CreditCard,
    permission: "plan.read",
  },
  {
    label: "Uploads",
    path: "/moderator/uploads",
    icon: CreditCard,
    permission: "upload.read",
  },
];
