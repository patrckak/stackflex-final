"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Layout from "./layout";
import { AppSidebar } from "@/components/app-sidebar";
import ThemedSection from "@/components/ui/themedSection";

export default function Page() {
  const { data: session } = useSession();

  if (session) {
    return (
      <Layout>
        <AppSidebar session={session} />
        <ThemedSection>
          <h3>{session.user.name}</h3>

          <span></span>
        </ThemedSection>
      </Layout>
    );
  }
}
