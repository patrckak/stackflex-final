"use client";

import ThemedSection from "@/components/ui/themedSection";
import { redirect } from "next/navigation";
import Header from "@/components/ui/header-session";
import Layout from "./layout";
import { useSession } from "next-auth/react";
import { AppSidebar } from "@/components/app-sidebar";

export default function Estoque() {
  const { data: session, status } = useSession({ required: true });

  if (session) {
    return (
      <Layout>
        <AppSidebar session={session} />
        <ThemedSection>a</ThemedSection>
      </Layout>
    );
  }
}
