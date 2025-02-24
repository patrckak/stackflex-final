"use client";

import {
  ChevronDown,
  ChevronUp,
  HandCoins,
  House,
  Minus,
  Paperclip,
  Plus,
  SidebarIcon,
  Table,
  UserPlus,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible } from "@radix-ui/react-collapsible";
import { StackIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Avatar, AvatarImage } from "./ui/avatar";
import { CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function AppSidebar({ session }) {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="dark:bg-gray-700 bg-zinc-200 flex">
      <Sidebar collapsible="offcanvas">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-center font-bold w-[100%]">
              StackFlex - {}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-3">
                <SidebarSeparator />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarMenuButton
              onClick={() => redirect("/app/dashboard")}
              className="w-fit"
            >
              <House />
              Dashboard
            </SidebarMenuButton>
          </SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  Estoque
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarMenuButton
                  onClick={() => redirect("/app/estoque/")}
                  className="w-fit"
                >
                  <StackIcon />
                  Listagem
                </SidebarMenuButton>
                <SidebarMenuButton
                  onClick={() => redirect("/app/estoque/entrada")}
                  className="w-fit"
                >
                  <Plus />
                  Entrada
                </SidebarMenuButton>
                <SidebarMenuButton
                  onClick={() => redirect("/app/estoque/saida")}
                  className="w-fit"
                >
                  <Minus />
                  Saida
                </SidebarMenuButton>
                <SidebarGroupContent />
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>

          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  Clientes
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarMenuButton
                  onClick={() => redirect("/app/servicos")}
                  className="w-fit"
                >
                  <HandCoins />
                  Devedores
                </SidebarMenuButton>
                <SidebarMenuButton
                  onClick={() => redirect("/app/servicos/novo/cliente")}
                  className="w-fit"
                >
                  <UserPlus />
                  Novo cliente
                </SidebarMenuButton>

                <SidebarGroupContent />
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>

          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  Serviços
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarMenuButton
                  onClick={() => redirect("/app/servicos")}
                  className="w-fit"
                >
                  <Table />
                  Orçamentos
                </SidebarMenuButton>
                <SidebarMenuButton
                  onClick={() => redirect("/app/servicos/novo/orcamento")}
                  className="w-fit"
                >
                  <Paperclip />
                  Novo orçamento
                </SidebarMenuButton>

                <SidebarGroupContent />
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={session.user.image} />
                    </Avatar>{" "}
                    {session.user.name}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <Link className="font-semibold" href="/app/conta">
                    <DropdownMenuItem>Conta</DropdownMenuItem>
                  </Link>
                  <Link className="font-semibold" href="/app/conta/pagamentos">
                    <DropdownMenuItem>Pagamentos</DropdownMenuItem>
                  </Link>
                  <Link className="font-semibold" href="/app/conta/empresa">
                    <DropdownMenuItem>Empresa</DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <Link
                    className="text-red-500 dark:text-red-300 font-bold hover:text-red-500"
                    href={"/auth/signout"}
                  >
                    <DropdownMenuItem className="">Sair</DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <span
        className="relative h-fit cursor-pointer left-[10px] top-[10px] p-1 dark:bg-gray-600 bg-zinc-100 rounded-md shadow-md"
        onClick={toggleSidebar}
      >
        <SidebarIcon size={18} />
      </span>
    </div>
  );
}
