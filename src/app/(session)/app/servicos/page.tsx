import { AppSidebar } from "../../../../components/app-sidebar";
import ThemedSection from "../../../../components/ui/themedSection";
import EstimateForm from "../../../../components/ui/estimate-form";
import EstimateTable from "./(table)/page";
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
