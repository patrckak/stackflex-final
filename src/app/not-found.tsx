import { Button } from "../components/ui/button";
import ThemedSection from "../components/ui/themedSection";
import { House } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../../auth";

const NotFound = async () => {
  const session = await auth();

  if (session) {
    return (
      <ThemedSection>
        <div className="flex text-center items-center justify-center  min-h-screen">
          <span className="text-center justify-center p-10 rounded-md bg-gradient-to-r from-red-400 to-red-400 flex-col flex gap-2 max-h-fit max-w-fit">
            <h3 className="font-medium">Página não encontrada :(</h3>
            <h6 className="text-sm">StackFlex - {process.env.VER}</h6>
            <Link href="/app/dashboard">
              <Button>
                Dashboard <House />
              </Button>
            </Link>
          </span>
        </div>
      </ThemedSection>
    );
  } else {
    return (
      <ThemedSection>
        <div className="flex text-center items-center justify-center  min-h-screen">
          <span className="text-center justify-center p-10 rounded-md bg-gradient-to-r from-red-400 to-red-400 flex-col flex gap-2 max-h-fit max-w-fit">
            <h3>Página não encontrada :(</h3>
            <h6 className="text-sm">StackFlex - {process.env.VER}</h6>
            <Link href="/">
              <Button>
                Página Inicial <House />
              </Button>
            </Link>
          </span>
        </div>
      </ThemedSection>
    );
  }
};

export default NotFound;
