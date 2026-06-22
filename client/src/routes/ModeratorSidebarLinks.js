import { CreditCard, LayoutDashboard, Users } from "lucide-react";

export const moderatorSidebarLinks = [
  {
    label: "Dashboard",
    path: "/moderator/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    path: "/moderator/users",
    icon: Users,
  },
  {
    label: "Plans",
    path: "/moderator/plans",
    icon: CreditCard,
  },
  {
    label: "Uploads",
    path: "/moderator/uploads",
    icon: CreditCard,
  },
];
