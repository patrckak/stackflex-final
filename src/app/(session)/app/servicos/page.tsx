import { AppSidebar } from "@/components/app-sidebar";
import ThemedSection from "@/components/ui/themedSection";
import Layout from "./layout";
import EstimateForm from "@/components/ui/estimate-form";
import EstimateTable from "./(table)/page";
import { auth } from "../../../../../auth";
export default async function Page() {
  const session = await auth();

  if (session) {
    return (
      <Layout>
        <AppSidebar session={session} />
        <ThemedSection>
          <EstimateTable />
        </ThemedSection>
      </Layout>
    );
  }
}
