import { Avatar, AvatarImage } from "./avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "./button";

export default function Header({ session }) {
  function greets() {
    const n = new Date();
    const h = n.getHours();

    if (h >= 6 && h < 12) {
      return `Bom dia ${session.user.name}`;
    } else if (h >= 12 && h < 18) {
      return `Boa tarde ${session.user.name}`;
    } else {
      return `Boa noite ${session.user.name}`;
    }
  }

  if (session) {
    return (
      <header className="p-5 bg-gray-300 dark:bg-gray-600 flex h-[60px] flex-row gap-3 justify-between items-center sticky top-0 shadow-md">
        <h4 className="relative left-4 font-black text-pretty text-lg">
          StackFlex
        </h4>
        <span>
          <ul className="flex list-none flex-row gap-5 justify-between">
            <li className="flex gap-1 items-center">
              <Button onClick={() => redirect("/app/dashboard")} variant="link">
                Dashboard
              </Button>
            </li>
            <li className="flex gap-1 items-center">
              <Button onClick={() => redirect("/app/estoque")} variant="link">
                Estoque
              </Button>
            </li>
            <li className="flex gap-1 items-center">
              <Button onClick={() => redirect("/app/servicos")} variant="link">
                Serviços
              </Button>
            </li>
          </ul>
        </span>
        <span className="relative right-4 ">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={session.user.image} />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Pagamentos</DropdownMenuItem>
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configuração</DropdownMenuItem>
              <Link href="/auth/signout">
                <DropdownMenuItem>Sair</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      </header>
    );
  }
}
