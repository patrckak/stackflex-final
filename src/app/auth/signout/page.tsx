import ThemedSection from "@/components/ui/themedSection";
import { auth, signOut } from "../../../../auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SignOutPage() {
  const session = await auth();
  if (session) {
    return (
      <ThemedSection>
        <span className="p-5 rounded-lg flex flex-col items-center gap-5">
          <span className="flex flex-col items-center gap-1 drop-shadow-md">
            <h3 className="text-lg">Deseja realmente finalizar sua sessão?</h3>
            <p>Tenha certeza que salvou todas suas alterações.</p>
          </span>
          <form
            action={async (formData) => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <span className="flex flex-row gap-3 items-center">
              <Link href="/app/dashboard">
                <Button variant="secondary">Voltar</Button>
              </Link>
              <Button variant="destructive" type="submit">
                Estou ciente.
              </Button>
            </span>
          </form>
        </span>
      </ThemedSection>
    );
  } else {
    return redirect("/");
  }
}
