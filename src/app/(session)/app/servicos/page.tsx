import { AppSidebar } from "@/components/app-sidebar";
import ThemedSection from "@/components/ui/themedSection";
import EstimateTable from "@/app/(session)/app/servicos/table";
import { auth } from "../../../../../auth";
import Layout from "./layout";
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
