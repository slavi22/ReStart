"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet"

export function NavUsers({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Sheet>
          <SheetTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </SheetTrigger>

          {/* 🔥 Force right side */}
          <SheetContent side="right" className="w-[280px] sm:w-[320px]">
            <SheetHeader>
              <SheetTitle className="text-left flex items-center gap-2">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-sm">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </SheetTitle>
              <SheetDescription />
            </SheetHeader>

            <div className="mt-4 space-y-2 text-sm">
              <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 hover:bg-accent">
                <Sparkles className="size-4" />
                Upgrade to Pro
              </button>

              <hr className="my-2" />

              <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 hover:bg-accent">
                <BadgeCheck className="size-4" />
                Account
              </button>
              <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 hover:bg-accent">
                <CreditCard className="size-4" />
                Billing
              </button>
              <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 hover:bg-accent">
                <Bell className="size-4" />
                Notifications
              </button>

              <hr className="my-2" />

              <SheetClose asChild>
                <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-red-500 hover:bg-accent">
                  <LogOut className="size-4" />
                  Log out
                </button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
