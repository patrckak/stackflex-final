"use client";

import ThemedSection from "@/components/ui/themedSection";
import { redirect } from "next/navigation";
import Header from "@/components/ui/header-session";
import { useSession } from "next-auth/react";
import { AppSidebar } from "@/components/app-sidebar";
import Layout from "./layout";

export default function PlansPage() {
  const { data: session, status } = useSession({ required: true });

  if (session) {
    return (
      <Layout>
        <ThemedSection>
          <div className="flex flex-col items-center justify-center h-full w-full">
            <h1 className="text-4xl top-10 font-bold">Planos</h1>
          </div>
        </ThemedSection>
      </Layout>
    );
  }
}
