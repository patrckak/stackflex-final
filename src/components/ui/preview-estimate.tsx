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
import { Input } from "./input";
import { Label } from "./label";

export default function PreviewEstimate({ data }) {
  const items = JSON.parse(data.items);
  var total = 0;
  return (
    <span className="flex flex-col gap-3 items-center shadow-md  bg-neutral-100 dark:bg-zinc-800 rounded-lg p-10 min-w-[50vw] min-h-[60vh] max-h-[65vh] ">
      <h1 className="text-xl flex gap-1 items-center">
        <p className="font-black text-2xl font-mono">{data.clientCadastro}</p>
      </h1>
      <span className="flex flex-row gap-3">
        <span className="justify-self-start flex gap-2 flex-col items-center">
          <Label htmlFor="data">Data de Execução</Label>
          <Input
            name="data"
            onClick={(e) => e.preventDefault()} //? bloqueia abertura do calendário
            onKeyDown={(e) => e.preventDefault()} //? bloqueia edição por teclado
            className="w-36 text-black text-center dark:text-white disabled:text-black disabled"
            type="date"
            defaultValue={data.date}
          />
        </span>
      </span>
      <Table className="p-5 flex flex-col gap-2">
        <TableHeader className="w-[100%]">
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
                  className=" bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-white border-0"
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
            {/* //TODO: ADICIONAR CONDICIONAL PARA MOSTRAR TOTAL COM DESCONTO CASO TENHA. */}
            <TableCell className="w-[100%] text-left font-black text-red-500 dark:text-red-400">
              {total.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",

                minimumFractionDigits: 2,
              })}
            </TableCell>
          </TableRow>
        </TableBody>
        <TableCaption>{data.desc}</TableCaption>
      </Table>
    </span>
  );
}
