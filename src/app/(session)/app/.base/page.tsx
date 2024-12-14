"use client";

import Layout from "./layout";
import { AppSidebar } from "../../../../components/app-sidebar";
import EstimateForm from "../../../../components/ui/estimate-form";
import { useSession } from "next-auth/react";
import ThemedSection from "../../../../components/ui/themedSection";

export default function Page() {
  const { data: session } = useSession();

  return (
    <Layout>
      <AppSidebar session={session} />
      <ThemedSection>cadastro de cliente</ThemedSection>
    </Layout>
  );
}
