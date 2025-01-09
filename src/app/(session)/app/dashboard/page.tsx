"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { useSession } from "next-auth/react";
// import CardDashboard from "../../../../components/ui/card-dashboard";
import ThemedSection from "../../../../components/ui/themedSection";
import Layout from "./layout";

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

  const { data: session } = useSession({
    required: true,
  });

  if (session) {
    return (
      <Layout>
        <AppSidebar session={session} />
        <ThemedSection>
          <h5 className="text-lg top-5 left-5 ">
            {saudarUsuario()},&nbsp;
            <span className="font-bold bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent ">
              {session.user.name}
            </span>
            .
          </h5>
          <h3>{/* <CardDashboard /> */}</h3>
        </ThemedSection>
      </Layout>
    );
  } else {
    return <></>;
  }
}
