import { redirect } from "next/navigation";
import { signIn, auth, providerMap } from "../../../../auth";
import { AuthError } from "next-auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function SignInPage() {
  return (
    <section className="flex flex-col gap-2 h-screen w-screen justify-center items-center dark:bg-gray-700 bg-zinc-200">
      <form
        action={async (formData) => {
          "use server";
          try {
            await signIn("credentials", formData);
          } catch (error) {
            if (error instanceof AuthError) {
              redirect(`/auth/login?error=${error.type}`);
            }
            throw error;
          }
        }}
      >
        <div className="flex flex-col gap-5 items-center  h-fit p-16 ">
          <input
            name="redirectTo"
            type="hidden"
            defaultValue="/app/dashboard"
          />
          <span>
            <Label htmlFor="user">Usuário</Label>
            <Input
              className="shadow-md hover:shadow-none"
              placeholder="123 456 789 10"
              name="user"
              id="user"
            />
          </span>
          <span>
            <Label htmlFor="password">Senha</Label>
            <Input
              className="shadow-md hover:shadow-none"
              placeholder="••••••••••"
              name="password"
              type="password"
              id="password"
            />
          </span>
          <p>
            Novo aqui?
            <Link
              href={"/new/account"}
              className="  text-blue-900 hover:text-blue-600 dark:text-sky-700"
            >
              &nbsp;Cadastre-se
            </Link>
          </p>
          <span className="flex gap-5">
            {/* <Button
              type="button"
              title="Voltar a página inicial"
              variant="secondary"
            >
              Início
            </Button> */}
            <Button type="submit" title="Autenticar" variant="default">
              Autenticar
            </Button>
          </span>
        </div>
      </form>
      {Object.values(providerMap).map((provider, index) => (
        <form
          key={provider.id}
          action={async () => {
            "use server";
            try {
              await signIn("credentials", {
                redirectTo: "/app/dashboard",
              });
            } catch (error) {
              if (error instanceof AuthError) {
                return console.log(error.type);
              }
              throw error;
            }
          }}
        >
          <button type="submit">
            <span>Sign in with {provider.name}</span>
          </button>
        </form>
      ))}
    </section>
  );
}
