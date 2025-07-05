"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SessionProvider, useSession } from "next-auth/react";
import { auth } from "../../../auth";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }) {
  return (
    <SessionProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </SessionProvider>
  );
}
