"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { number, z } from "zod";

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
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function EstimateForm() {
  const form = useForm<z.infer<typeof estimateForm>>({
    resolver: zodResolver(estimateForm),
  });

  const { toast } = useToast();
  const { data: session } = useSession();

  const [d, setD] = useState<any>([]);
  const [hasD, setHasD] = useState<any>(false);

  const [items, setItems] = useState<any>({});

  const [list, setList] = useState<any>({
    qtd: String,
    desc: String,
    val: String,
  });

  const addItemsToList = async () => {
    console.log(items);
  };

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
          toast({
            description: "Dados do cliente encontrados.",
          });
        }
      }
    );
  };

  if (session) {
    return (
      <>
        <span className="absolute left-64">
          <form action={() => addItemsToList()}>
            <Input
              type="text"
              placeholder="qtd"
              onChange={(e) => setList({ ...list, qtd: e.target.value })}
              name="qtd"
            />
            <Input
              type="text"
              placeholder="descriminação"
              onChange={(e) => setList({ ...list, desc: e.target.value })}
              name="desc"
            />
            <Input
              type="text"
              placeholder="valor"
              onChange={(e) => setList({ ...list, val: e.target.value })}
              name="value"
            />
            <Button type="submit">Adicionar</Button>
          </form>
        </span>
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Registrar</Button>
          </form>
        </Form>
      </>
    );
  }
}
