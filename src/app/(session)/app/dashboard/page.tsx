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
import ConfirmEmailAlert from "@/components/ui/confirm-email";

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
      <Layout>
        <AppSidebar session={session} />
        <ThemedSection>
          <span className="p-5  flex flex-row items-center justify-between absolute top-10 w-[75%]"></span>
          <span className="p-5  flex flex-row items-center justify-between absolute top-10 w-[75%]">
            <h5 className="text-lg">
              {saudarUsuario()},&nbsp;
              <span className="font-bold bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent ">
                <Link href="/app/conta">{session.user.name}</Link>
              </span>
              .
            </h5>
            <ConfirmEmailAlert session={session} />
            <span>
              <ModeToggle />
            </span>
          </span>
          <span className="absolute top-24 w-[75%] h-[30%]">
            <DashboardCards />
          </span>
          <span className="absolute flex justify-start flex-row gap-5 top-64 w-[75%] p-5 rounded-md">
            <hr />
            <DashboardButtons />
            <DashboardTasks />
          </span>
        </ThemedSection>
      </Layout>
    );
  } else {
    return <></>;
  }
}
