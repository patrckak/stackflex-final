"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Header from "@/components/ui/header-session";
import Layout from "./layout";
import ThemedSection from "../../../../components/ui/themedSection";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/app-sidebar";

export default function Dashboard() {
  const now = new Date();

  const { data: session } = useSession({
    required: true,
  });
  if (session) {
    console.log(session);
    console.log(now);
    return (
      <Layout>
        <AppSidebar session={session} />
        <ThemedSection>Olá {session.user?.name}</ThemedSection>
        <span className="absolute"></span>
      </Layout>
    );
  } else {
    return <></>;
  }
}
