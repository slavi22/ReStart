"use client"

import * as React from "react"
import {
  BookOpen,
  LogIn,
  UserPlus,
} from "lucide-react"
import { useTranslation } from "react-i18next"
import { useAuth } from "@/features/auth/context/auth-context"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();

  const navItems = isAuthenticated
    ? [
        {
          title: t('sidebar.assessment'),
          url: "/assessment",
          icon: BookOpen,
          isActive: true,
        },
      ]
    : [
        {
          title: t('sidebar.login'),
          url: "/login",
          icon: LogIn,
        },
        {
          title: t('sidebar.register'),
          url: "/register",
          icon: UserPlus,
        },
      ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
