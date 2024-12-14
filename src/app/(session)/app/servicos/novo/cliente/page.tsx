"use client";

import { AppSidebar } from "../../../../../../components/app-sidebar";
import Layout from "./layout";
import { useSession } from "next-auth/react";
import ThemedSection from "../../../../../../components/ui/themedSection";
import EstimateForm from "../../../../../../components/ui/estimate-form";

export default function Page() {
  const { data: session } = useSession();

  return (
    <Layout>
      <AppSidebar session={session} />
      <ThemedSection>cadastro de cliente</ThemedSection>
    </Layout>
  );
}
