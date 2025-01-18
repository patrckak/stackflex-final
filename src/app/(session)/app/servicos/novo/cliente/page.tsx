"use client";

import { AppSidebar } from "../../../../../../components/app-sidebar";
import Layout from "./layout";
import { useSession } from "next-auth/react";
import ThemedSection from "@/components/ui/themedSection";

export default function Page() {
  const { data: session } = useSession();

  if (session) {
    return (
      <Layout>
        <AppSidebar session={session} />
        <ThemedSection>cadastro de cliente</ThemedSection>
      </Layout>
    );
  }
}
