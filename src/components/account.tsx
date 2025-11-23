"use client"

import {
  ChevronsUpDown,
  LogOut,
  Globe,
  LogIn,
  UserPlus,
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
import { useAuth } from "@/features/auth/context/auth-context";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

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
  const { t, i18n } = useTranslation();

  return (
      <Sheet>
          <SheetTrigger asChild>
              <button className="flex items-center gap-2 rounded-full bg-background px-3 py-2 text-sm shadow-sm hover:bg-accent">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="rounded-full">
                    {user ? user.name.charAt(0).toUpperCase() : "G"}
                  </AvatarFallback>
                </Avatar>
                <span className="max-w-[120px] truncate font-medium">
                  {user ? user.name : t('sidebar.guestAccount', 'Guest')}
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
                  <AvatarFallback className="rounded-lg">
                    {user ? user.name.charAt(0).toUpperCase() : "G"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-sm">
                  <span className="truncate font-medium">
                    {user ? user.name : t('sidebar.guestAccount', 'Guest')}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user ? user.email : ""}
                  </span>
                </div>
              </SheetTitle>
              <SheetDescription />
            </SheetHeader>

            <div className="mt-4 space-y-2 text-sm">
              
              <div className="flex items-center justify-between rounded-md px-2 py-2 hover:bg-accent group">
                <div className="flex items-center gap-2">
                  <Globe className="size-4" />
                  <span>{t('language', 'Language')}</span>
                </div>
                <div className="flex gap-1">
                   <button 
                     onClick={(e) => { e.preventDefault(); i18n.changeLanguage('en'); }} 
                     className={`text-xs px-2 py-1 rounded transition-colors ${i18n.language === 'en' ? 'bg-primary text-primary-foreground font-medium' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                   >
                     EN
                   </button>
                   <button 
                     onClick={(e) => { e.preventDefault(); i18n.changeLanguage('bg'); }} 
                     className={`text-xs px-2 py-1 rounded transition-colors ${i18n.language === 'bg' ? 'bg-primary text-primary-foreground font-medium' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                   >
                     BG
                   </button>
                </div>
              </div>

              <hr className="my-2" />

              {user ? (
                <SheetClose asChild>
                  <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-red-500 hover:bg-accent" onClick={logout}>
                    <LogOut className="size-4" />
                    {t('sidebar.logout', 'Log out')}
                  </button>
                </SheetClose>
              ) : (
                 <div className="space-y-1">
                    <SheetClose asChild>
                        <Link to="/login" className="flex w-full items-center gap-2 rounded-md px-2 py-2 hover:bg-accent">
                            <LogIn className="size-4" />
                            {t('sidebar.login', 'Login')}
                        </Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link to="/register" className="flex w-full items-center gap-2 rounded-md px-2 py-2 hover:bg-accent">
                            <UserPlus className="size-4" />
                            {t('sidebar.register', 'Register')}
                        </Link>
                    </SheetClose>
                 </div>
              )}
            </div>
          </SheetContent>
      </Sheet>
  );
}
