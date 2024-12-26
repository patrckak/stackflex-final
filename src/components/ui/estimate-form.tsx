"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash, Plus } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { estimateForm } from "../../../utils/schemas";
import { newEstimate } from "../../app/actions/estimate";
import { useSession } from "next-auth/react";
import { useToast } from "../../hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function EstimateForm() {
  const form = useForm<z.infer<typeof estimateForm>>({
    resolver: zodResolver(estimateForm),
  });

  const { toast } = useToast();
  const { data: session } = useSession();

  //? Estados da seleção de dados do cliente
  const [d, setD] = useState<any>([]);
  const [hasD, setHasD] = useState<any>(false);

  const getClients = async () => {
    fetch(`/api/clients/list/${session.user.role}`).then(async (response) => {
      let a = await response.json();
      setD(a.data);
      setHasD(true);
    });
  };

  const submit = async (e: any) => {
    e.preventDefault();
    form.setValue("role", session.user.role);
    let r = newEstimate(form.getValues());
    console.log(await r);
    if ((await r).status != 0) {
      toast({ description: (await r).msg });
    } else {
      toast({ variant: "destructive", description: (await r).msg });
    }
  };

  const setClientDetails = async (clientId: string) => {
    await fetch(`/api/clients/get/${clientId}/${session.user.role}`).then(
      async (r) => {
        let res = await r.json();
        if (r.status !== 200) {
          return toast({
            variant: "destructive",
            description:
              "Erro ao buscar dados do cliente. por favor insira manualmente.",
          });
        }
        if (res) {
          console.log(res);
          form.setValue("cadastro", res.cadastro);
          form.setValue("clientAddress", res.address);
          form.setValue("clientNumber", res.contact);
          form.setValue("clientId", res.clientId);
          toast({
            description: "Dados do cliente encontrados.",
          });
        }
      }
    );
  };

  const [itemsStg, setItemsStg] = useState("");

  const TableForm = () => {
    //? Estados da tabela de serviços
    const [items, setItems] = useState([]);
    const [newItemName, setNewItemName] = useState("");
    const [newItemVal, setNewItemVal] = useState("0");
    useEffect(() => {
      let stg = JSON.stringify(items);
      form.setValue("items", stg);
    });

    const removeItem = async (id) => {
      setItems(items.filter((item) => item.id !== id));
    };

    const addItem = async () => {
      if (newItemName && newItemVal) {
        const newItem = {
          id: items.length + 1, // Pode ser um ID gerado dinamicamente
          nome: newItemName,
          valor: newItemVal,
        };
        setItems([...items, newItem]); // Atualizando a tabela com o novo item
        setNewItemName(""); // Limpando os inputs
        setNewItemVal("");
        return true;
      }
    };

    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Items do orçamento</h2>
        {/* Inputs para adicionar novo item */}
        <div className="flex space-x-2 mb-4">
          <Input
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Nome do item"
          />
          <Input
            value={newItemVal}
            onChange={(e) => setNewItemVal(e.target.value)}
            placeholder="Valor"
          />
          <Button
            onClick={async () => {
              let a = await addItem();
              if (a) {
                form.setValue("items", JSON.stringify(items));
              }
            }}
          >
            Adicionar Item
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.nome}</TableCell>
                <TableCell>{item.valor}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  if (session) {
    return (
      <div className="flex p-5 w-fit h-fit">
        <Form {...form}>
          <form onSubmit={(e) => submit(e)} className="space-y-8">
            <span className="hidden">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input disabled {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </span>
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de execução</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <span className="p-3 flex flex-col gap-3 border border-stone-400 dark:border-stone-300 rounded-lg">
              <Select
                onOpenChange={() => {
                  async function fetchD() {
                    await getClients();
                  }
                  fetchD();
                }}
                onValueChange={(v) => {
                  setClientDetails(v);
                  toast({ description: "Carregando dados do cliente." });
                }}
              >
                <SelectTrigger className=" bg-white dark:bg-black">
                  <SelectValue placeholder="Clientes" />
                </SelectTrigger>
                <SelectContent>
                  <Button
                    onClick={() => redirect("/app/servicos/novo/cliente")}
                    className="w-[100%]"
                    variant="ghost"
                  >
                    <Plus /> Novo cliente
                  </Button>
                  {hasD ? (
                    d.map((i) => {
                      return (
                        <SelectItem value={i.clientId} key={i.clientId}>
                          {i.name}
                        </SelectItem>
                      );
                    })
                  ) : (
                    <SelectItem disabled value="0">
                      Carregando clientes...
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>

              <FormField
                control={form.control}
                name="cadastro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF/CNPJ do cliente </FormLabel>
                    <FormControl>
                      <Input placeholder="000 000 000 00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="clientNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número do cliente </FormLabel>
                    <FormControl>
                      <Input placeholder="00 0000 0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="clientAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço </FormLabel>
                    <FormControl>
                      <Input placeholder="Rua sem nome, 01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </span>

            <FormField
              control={form.control}
              name="items"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Registrar</Button>
          </form>
        </Form>
        <TableForm />
      </div>
    );
  }
}
