"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Edit, MoreHorizontal, Share } from "lucide-react";

export type Estimate = {
  value: number;
  clientId: string;
  status: string;
  id: string;
  date: string;
};

const Columns: ColumnDef<Estimate>[] = [
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const estimate = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(
                  `localhost:3000/visualizar/orcamento/${estimate.clientId}/${estimate.id}`
                );
              }}
            >
              <Share /> Compartilhar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit /> Editar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Check /> Finalizar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "clientCadastro",
    header: "Cliente",
  },
  {
    accessorKey: "value",
    header: "R$",
  },
  {
    accessorKey: "date",
    header: "Emissão",
  },

  {
    accessorKey: "id",
    header: "ID",
  },
];

export default Columns;
