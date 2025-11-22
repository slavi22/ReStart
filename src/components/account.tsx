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
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet"
import { useContext } from "react";
import { useAuth } from "@/features/auth/context/auth-context";
interface User {
  name: string;
  email: string;
  avatar?: string;
}

export function NavUsers({
  user,
}: {
  user: User | null
}) {

  const {logout} = useAuth()


  return (
      <Sheet>
          <SheetTrigger asChild>
              <button className="flex items-center gap-2 rounded-full bg-background px-3 py-2 text-sm shadow-sm hover:bg-accent">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="rounded-full">CN</AvatarFallback>
                </Avatar>
                <span className="max-w-[120px] truncate font-medium">
                  {user?.name}
                </span>
                <ChevronsUpDown className="h-4 w-4 opacity-60" />
              </button>
          </SheetTrigger>

          {/* 🔥 Force right side */}
          <SheetContent side="right" className="w-[280px] sm:w-[320px]">
            <SheetHeader>
              <SheetTitle className="text-left flex items-center gap-2">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-sm">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user?.email}
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
                <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-red-500 hover:bg-accent" onClick={logout}>
                  <LogOut className="size-4" />
                  Log out
                </button>
              </SheetClose>
            </div>
          </SheetContent>
      </Sheet>
  );
}
