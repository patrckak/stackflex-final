"use client";

import { AppSidebar } from "@/components/app-sidebar";
import EstimateForm from "@/components/ui/estimate-form";
import ThemedSection from "@/components/ui/themedSection";
import Layout from "./layout";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession();

  if (typeof window === "undefined") {
    return <div>Carregando...</div>; // Componente temporário no SSR
  }

  if (status === "loading") {
    return <div>Carregando sessão...</div>;
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

  return <div>Você precisa estar logado.</div>; // Quando não há sessão
}
