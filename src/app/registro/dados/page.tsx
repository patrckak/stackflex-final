"use client";
import { createUser } from "@/components/db/createUser";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ThemedSection from "@/components/ui/themedSection";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { formSchema } from "../../../../utils/schemas";
import Layout from "./layout";

export default function AccountRegister() {
  const { data: session, status } = useSession();

  const { register, handleSubmit } = useForm();

  const { toast } = useToast();

  const mask = useHookFormMask(register);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const submit = async (data) => {
    let res = await createUser(data);
    if (res.status == 1) {
      return redirect("/new/prices");
    } else {
      return toast({ description: res.msg, variant: "destructive" });
    }
  };

  const buscarCEP = async () => {
    let v = form.getValues().cep;
    let r = await fetch(`https://brasilapi.com.br/api/cep/v1/${v}`, {
      mode: "cors",
    });
    let res = await r.json();
    form.setValue("cidade", res.city);
  };

  if (!session) {
    return (
      <Layout>
        <ThemedSection>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-8">
              <div className="w-fit h-fit p-5 flex flex-row gap-6">
                <span className="w-[320px] flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="João" {...field} />
                        </FormControl>
                        <FormDescription>Primeiro nome.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sobrenome</FormLabel>
                        <FormControl>
                          <Input placeholder="Oliveira da Silva" {...field} />
                        </FormControl>
                        <FormDescription>
                          Seu sobrenome completo.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF</FormLabel>
                        <FormControl>
                          <Input
                            maxLength={11}
                            placeholder="000 000 000 00"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Apenas os números do seu CPF. :D
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-Mail</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="joaodasilva@email.com"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Seu melhor e-mail. :D</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </span>

                <span className="w-[320px] flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <Input
                            title={
                              "Letras maiusculas, números e caracteres especiais (@!#$%()...)"
                            }
                            placeholder="•••••••••"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Uma senha bem forte...{" "}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmpassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirme sua senha</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            title={
                              "Letras maiusculas, números e caracteres especiais (@!#$%()...)"
                            }
                            placeholder="•••••••••"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Tenha certeza que seja segura.{" "}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cep"
                    render={({ field }) => (
                      <FormItem onBlur={buscarCEP}>
                        <FormLabel>CEP</FormLabel>
                        <FormControl>
                          <Input
                            maxLength={8}
                            placeholder="000000000"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Apenas os números.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cidade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input placeholder="São Paulo" {...field} />
                        </FormControl>
                        <FormDescription>Cidade de registro</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </span>
                <span className="w-[320px] flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="endereco"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço</FormLabel>
                        <FormControl>
                          <Input placeholder="Rua São Paulo N 1" {...field} />
                        </FormControl>
                        <FormDescription>
                          Onde as cartas devem chegar...
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cnpj"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CNPJ</FormLabel>
                        <FormControl>
                          <Input
                            maxLength={14}
                            placeholder="00 000 000 0000 00"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          CNPJ sem digitos. (caso tenha)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nomeEmpresa"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Razão Social</FormLabel>
                        <FormControl>
                          <Input placeholder="Empresa LTDA." {...field} />
                        </FormControl>
                        <FormDescription>
                          Nome completo da sua empresa. ;)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <span className="h-[95px] justify-center items-center flex flex-row gap-4">
                    <Button type="submit">Próxima Etapa</Button>
                  </span>
                </span>
              </div>
            </form>
          </Form>
        </ThemedSection>
      </Layout>
    );
  } else {
    redirect("/app/dashboard");
  }
}
