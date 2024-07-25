"use client"
import React, { useState } from "react"
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar"
import { SquareTerminal, Users, Settings, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"

export function SidebarAdmin({ children }: { children: React.ReactNode }) {
  const session = useSession()
  console.log(session)

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <SquareTerminal className="size-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Users",
      href: "/users",
      icon: (
        <Users className="size-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      href: "/settings",
      icon: (
        <Settings className="size-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "/login",
      icon: (
        <ArrowLeft className="size-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ]
  const [open, setOpen] = useState(false)
  return (
    <div
      className={cn(
        "flex w-full flex-1 flex-col overflow-hidden md:flex-row",
        "h-screen", // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-y-auto">
            {/* {open ? <Logo /> : <LogoIcon />} */}
            <Logo />
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label:
                  session.data?.user?.user?.name ||
                  session.data?.user?.user?.email ||
                  "User",
                href: "#",
                icon: (
                  <Image
                    src="/assets/avatar/man.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  )
}
export const Logo = () => {
  return (
    <Link
      href="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black/80"
    >
      <div className="h-6 w-7 flex-shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-black/80 dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="whitespace-pre font-medium text-black/80 dark:text-white"
      >
        Admin Panel
      </motion.span>
    </Link>
  )
}
export const LogoIcon = () => {
  return (
    <Link
      href="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black/80"
    >
      <div className="h-6 w-7 flex-shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-black/80 dark:bg-white" />
    </Link>
  )
}