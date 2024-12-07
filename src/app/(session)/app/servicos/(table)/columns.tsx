"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Estimate = {
  id: string;
  valor: number;
  status: "Aguardando Aprovação" | "Pendente" | "Finalizado" | "Cancelado";
  clientid: string;
  date: string;
};

export const columns: ColumnDef<Estimate>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "clientid",
    header: "Cliente",
  },
  {
    accessorKey: "valor",
    header: "Total",
  },
  {
    accessorKey: "valor",
    header: "Total",
  },
];
