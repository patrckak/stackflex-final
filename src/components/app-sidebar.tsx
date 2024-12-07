"use client";

import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Home,
  House,
  Inbox,
  Minus,
  Paperclip,
  Plus,
  Search,
  Settings,
  SidebarIcon,
  Table,
  User2,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { Collapsible } from "@radix-ui/react-collapsible";
import { CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { StackIcon } from "@radix-ui/react-icons";

export function AppSidebar({ session }) {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>StackFlex - v1.0</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-3">
              <SidebarMenuButton
                title="Alterar barra lateral"
                className="w-fit"
                onClick={toggleSidebar}
              >
                <SidebarIcon />
                Esconder barra lateral
              </SidebarMenuButton>
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
                onClick={() => redirect("/app/servicos/novaordem")}
                className="w-fit"
              >
                <Paperclip />
                Nova O.S.
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
  );
}
