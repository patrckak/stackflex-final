import React from "react";
import { SessionProvider } from "next-auth/react";
import { SidebarProvider } from "../../../../../../components/ui/sidebar";

export default function Layout({ children }) {
  return (
    <SessionProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </SessionProvider>
  );
}
