"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/theme-provider";
import DashboardButtons from "@/components/ui/dashboard-buttons";
import DashboardTasks from "@/components/ui/dashboard-tasks";
import ThemedSection from "@/components/ui/themedSection";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Layout from "./layout";
import { Spinner } from "@/components/ui/spinner";
import DebugButton from "@/components/ui/debug-button";
// import ConfirmEmailAlert from "@/components/ui/confirm-email";

export default function Dashboard() {
  function saudarUsuario() {
    const dataAtual = new Date();
    const horas = dataAtual.getHours();
    let s;
    if (horas < 12) {
      s = "Bom dia";
    } else if (horas < 18) {
      s = "Boa tarde";
    } else {
      s = "Boa noite";
    }

    return s;
  }

  const DashboardCards = dynamic(
    () => import("@/components/ui/dashboard-cards"),
    {
      ssr: false,
    }
  );

  const { data: session } = useSession({
    required: true,
  });

  if (session) {
    return (
      // todo: verificar se o firstLogin é true, se sim, redirecionar para a página de configuração do perfil e selecionar o plano
      <Layout>
        <AppSidebar session={session} />
        <ThemedSection>
          <DebugButton />
          <DashboardCards />
          {/* <DashboardButtons /> */}
          <DashboardTasks />
        </ThemedSection>
      </Layout>
    );
  }
}
