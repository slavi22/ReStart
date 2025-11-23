"use client"

import * as React from "react"
import {
  BookOpen,
  LogIn,
  UserPlus,
  FileText,
} from "lucide-react"
import { useTranslation } from "react-i18next"
import { useAuth } from "@/features/auth/context/auth-context"
import { useAssessment } from "@/features/assessment/context/assessment-context"

import { NavMain } from "@/components/nav-main"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { insights } = useAssessment();

  const navItems = isAuthenticated
    ? [
        {
          title: t('sidebar.assessment'),
          url: "/assessment",
          icon: BookOpen,
          isActive: true,
        },
        ...(insights ? [
          {
            title: t('sidebar.personalizedArticles'),
            url: "/personalized-articles",
            icon: FileText,
          },
          {
            title: t('sidebar.recommendedCourses'),
            url: "/recommended-courses",
            icon: BookOpen,
          }
        ] : []),
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
      <SidebarRail />
    </Sidebar>
  )
}
