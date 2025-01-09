"use client";
import { formatID } from "@/app/actions/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PencilLine } from "lucide-react";

export default function PreviewEstimate({ data }) {
  const items = JSON.parse(data.items);
  console.log(data);
  var total = 0;
  return (
    <span className="flex flex-col gap-3 items-center border-2 border-black rounded-lg p-10 w-[50vw] ">
      <h1 className="text-xl">{formatID(data.cadastro).msg}</h1>
      <Table className="p-5 flex flex-col gap-2">
        <TableCaption>{data.desc}</TableCaption>
        <TableHeader className="">
          <TableRow className="border bg-stone-950 hover:bg-stone-600 dark:bg-black dark:hover:bg-black">
            <TableHead className="max-w-[10px] rounded-l-lg font-bold text-center text-white">
              ID
            </TableHead>
            <TableHead className="w-[500px] font-bold text-left pl-5 text-white">
              DESCRIÇÃO
            </TableHead>
            <TableHead className="w-[100px] rounded-r-lg font-bold text-center text-white">
              VALOR
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="rounded-lg">
          {items.map((i) => {
            total = total + parseFloat(i.valor);
            return (
              <>
                <TableRow
                  className=" bg-zinc-300 hover:bg-zinc-400 dark:bg-cyan-950 dark:hover:bg-cyan-900 border-0"
                  key={i.id}
                >
                  <TableCell className="mt-2 text-center">{i.id}</TableCell>
                  <TableCell className="text-left pl-5">{i.nome}</TableCell>
                  <TableCell className="text-center">
                    {parseFloat(i.valor).toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </TableCell>
                </TableRow>
              </>
            );
          })}
          <TableRow className="">
            <TableCell className="w-[10px]">&nbsp;</TableCell>
            <TableCell className="w-[100%] text-right font-black">
              TOTAL:
            </TableCell>
            <TableCell className="w-[100%] text-left font-black text-red-500 dark:text-red-400">
              {total.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",

                minimumFractionDigits: 2,
              })}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </span>
  );
}
