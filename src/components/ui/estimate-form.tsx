"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import { Trash, Plus, Users, Table2, Check } from "lucide-react";
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
import { Textarea } from "./textarea";
import PreviewEstimate from "./preview-estimate";

export default function EstimateForm() {
  const form = useForm<z.infer<typeof estimateForm>>({
    resolver: zodResolver(estimateForm),
  });

  const { toast } = useToast();
  const { data: session } = useSession();

  //? Estados da seleção de dados do cliente
  const [d, setD] = useState<any>([]);
  const [hasD, setHasD] = useState<any>(false);

  //? quais campos estão disponiveis
  const [changeView, setChangeView] = useState(1);
  //? 1 = campo de data + descrição + dados do cliente
  //? 2 = items do orçamento
  //? 3 = preview do orçamento + envio

  const forward = () => {
    switch (changeView) {
      case 0:
        setChangeView(1);
        break;
      case 1:
        setChangeView(2);
        break;
      case 2:
        setChangeView(3);
        break;
      default:
        setChangeView(1);
    }
  };

  const backward = () => {
    switch (changeView) {
      case 0:
        setChangeView(1);
        break;
      case 2:
        setChangeView(1);
        break;
      case 3:
        setChangeView(2);
        break;
      default:
        setChangeView(1);
    }
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

  const [items, setItems] = useState([]);

  const updateItems = () => {
    let stg = JSON.stringify(items);
    form.setValue("items", stg);
  };

  const TableForm = () => {
    //? Estados da tabela de serviços
    const [newItemName, setNewItemName] = useState("");
    const [newItemVal, setNewItemVal] = useState("");
    useEffect(() => {
      updateItems();
    }, [items]);

    const removeItem = async (id) => {
      setItems(items.filter((item) => item.id !== id));
    };

    const addItem = async () => {
      if (newItemName && newItemVal) {
        let newItem = {
          id: items.length + 1,
          nome: newItemName,
          valor: newItemVal,
        };
        setItems([...items, newItem]); // Atualizando a tabela com o novo item
        setNewItemName(""); // Limpando os inputs
        setNewItemVal("0");
        return true;
      }
    };

    return (
      <div className="border-2 border-black rounded-lg p-10 w-[50vw]">
        <Table>
          <TableHeader>
            <TableRow className=" bg-stone-950 hover:bg-stone-800 dark:bg-black dark:hover:bg-black">
              <TableHead className="text-white text-center w-[10px]">
                ID
              </TableHead>
              <TableHead className="text-white pl-5 w-[300px]">
                DESCRIÇÃO
              </TableHead>
              <TableHead className="text-white">VALOR</TableHead>
              <TableHead className="text-white w-[30px]">AÇÕES</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-center">{item.id}</TableCell>
                <TableCell className="pl-5">{item.nome}</TableCell>
                <TableCell>{item.valor}</TableCell>
                <TableCell>
                  <Button variant="ghost" onClick={() => removeItem(item.id)}>
                    <Trash className="text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex space-x-2 mt-4 ">
          <Input
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Serviço / Material"
          />
          <Input
            value={newItemVal}
            onChange={(e) => setNewItemVal(e.target.value)}
            placeholder="Valor Ex: 1.50"
          />
          <Button
            type="button"
            onClick={async (e) => {
              e.preventDefault();
              let a = await addItem();
              if (a) {
                setTimeout(async () => {
                  form.setValue("items", JSON.stringify(items));
                }, 3000);
              }
            }}
          >
            <Plus />
          </Button>
        </div>
      </div>
    );
  };

  if (session) {
    return (
      <div className="flex flex-col gap-3 p-5 w-fit h-fit items-center justify-center">
        <Breadcrumb className="absolute m-auto top-10">
          <BreadcrumbList>
            {changeView >= 1 ? (
              <>
                <BreadcrumbItem>
                  <Users size={18} /> <h4>Informações do cliente</h4>
                </BreadcrumbItem>
              </>
            ) : (
              <></>
            )}
            {changeView >= 2 ? (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <Table2 size={18} /> <h4>Items / Serviços</h4>
                </BreadcrumbItem>
              </>
            ) : (
              <></>
            )}
            {changeView >= 3 ? (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <Check size={18} /> Gerar orçamento
                </BreadcrumbItem>
              </>
            ) : (
              <></>
            )}
          </BreadcrumbList>
        </Breadcrumb>
        <Form {...form}>
          <form onSubmit={(e) => submit(e)} className="space-y-8">
            {changeView == 1 ? (
              <div className="flex flex-row gap-36 border-2 border-black rounded-lg p-10">
                <span className=" flex flex-col gap-5">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="hidden" disabled {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de execução</FormLabel>
                        <FormControl>
                          <Input
                            className="text-center"
                            type="datetime-local"
                            {...field}
                          />
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
                          <Textarea
                            placeholder="Orçamento válido por x dias"
                            className="w-[300px] min-h-[180px] dark:bg-black"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </span>

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
                          <Input type="hidden" {...field} />
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
              </div>
            ) : (
              <></>
            )}
            {/*//? VIEW DE INSERIR DADOS NO ORÇAMENTO*/}
            {changeView == 2 ? <TableForm /> : <></>}
            {changeView == 3 && form.getValues("cadastro") != undefined ? ( //! PRECISA CHECAR SE O CLIENTE ESTÁ DEFINIDO.
              <span className="min-w-[60vw] bg-white">
                <PreviewEstimate data={form.getValues()} />
              </span>
            ) : (
              <></>
            )}
            <span className="flex flex-row gap-6 absolute align-baseline bottom-10">
              {changeView > 1 ? (
                <Button
                  variant="secondary"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    backward();
                  }}
                >
                  Voltar
                </Button>
              ) : (
                <></>
              )}
              {changeView !== 3 ? (
                <Button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    updateItems();
                    forward();
                  }}
                >
                  Próximo
                </Button>
              ) : (
                <></>
              )}

              {changeView == 3 ? (
                <Button type="submit">Registrar</Button>
              ) : (
                <></>
              )}
            </span>
          </form>
        </Form>
      </div>
    );
  } else {
    return (
      <span className="min-h-screen content-center">
        <img src="https://i.imgur.com/vQxxDbM.png" alt="logo" />
      </span>
    );
  }
}
