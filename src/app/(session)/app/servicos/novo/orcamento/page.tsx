"use client";

import { AppSidebar } from "@/components/app-sidebar";
import EstimateForm from "@/components/ui/estimate-form";
import ThemedSection from "@/components/ui/themedSection";
import Layout from "./layout";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();

  if (typeof window === "undefined") {
    return null; // Isso evita o erro durante o SSR
  }

  if (session) {
    return (
      <Layout>
        <AppSidebar session={session} />
        <ThemedSection>
          <EstimateForm />
        </ThemedSection>
      </Layout>
    );
  }
}
