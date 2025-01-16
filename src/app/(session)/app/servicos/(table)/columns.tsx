"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Settings } from "lucide-react";
import { redirect } from "next/navigation";
import { format } from "date-fns";

export type Estimate = {
  value: number;
  status: string;
  clientCadastro: string;
  estimateId: string;
  date: string;
};

const Columns: ColumnDef<Estimate>[] = [
  {
    sortingFn: "datetime",
    id: "actions",
    header: "Editar",
    cell: ({ row }) => {
      const estimate = row.original;

      return (
        <Button
          variant="ghost"
          onClick={() => {
            redirect(`/app/servicos/visualizar/${estimate.estimateId}`);
          }}
        >
          <Settings />
        </Button>
      );
    },
  },
  {
    accessorKey: "clientCadastro",
    header: "Cliente",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "date",
    header: "Emissão",
    cell: ({ row }) => {
      const estimate = row.original;
      let formatedDate = format(estimate.date, "dd/MM/yyyy");
      return formatedDate;
    },
  },
  {
    accessorKey: "value",
    header: "R$",
    cell: ({ row }) => {
      const estimate = row.original;
      let formatedVal = estimate.value.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
      return formatedVal;
    },
  },
];

export default Columns;
