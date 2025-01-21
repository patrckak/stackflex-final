"use client";

import { AppSidebar } from "@/components/app-sidebar";
import EstimateForm from "@/components/ui/estimate-form";
import ThemedSection from "@/components/ui/themedSection";
import Layout from "./layout";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession({ required: true });

  if (session) {
    return (
      <Layout>
        <AppSidebar session={session} />
        <ThemedSection>
          <EstimateForm />
        </ThemedSection>
      </Layout>
    );
  } else {
    return <></>;
  }
}
