"use client";

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
import { Button } from "@/components/ui/button";
import ThemedSection from "@/components/ui/themedSection";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { AppSidebar } from "../../../../../../components/app-sidebar";
import Layout from "./layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { clientForm } from "../../../../../../../utils/schemas";
import { newClient } from "@/app/actions/client";
import { useToast } from "@/hooks/use-toast";

export default function Page() {
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof clientForm>>({
    resolver: zodResolver(clientForm),
  });

  const { toast } = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    form.setValue("role", session.user.role);
    let res = await newClient(form.getValues());
    if (res.status == 0) {
      toast({ description: res.msg, variant: "destructive" });
    } else {
      toast({ description: res.msg });
    }
  }

  if (session) {
    return (
      <Layout>
        <AppSidebar session={session} />
        <ThemedSection>
          <div className="flex flex-col  min-w-[500px] bg-neutral-100 shadow-md dark:bg-zinc-800 rounded-lg p-10 w-[20vw] min-h-[80vh] max-h-[95vh] no-scrollbar  overflow-scroll">
            <Form {...form}>
              <form onSubmit={(e) => handleSubmit(e)} className="space-y-8">
                <>
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
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Maria Oliveira" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cadastro"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF / CPNJ</FormLabel>
                        <FormControl>
                          <Input placeholder="00000000000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço</FormLabel>
                        <FormControl>
                          <Input placeholder="Rua sem nome, N 01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contato</FormLabel>
                        <FormControl>
                          <Input placeholder="981234561" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
                <span className="">
                  <Button type="submit" variant="outline" className="">
                    <Plus /> Registrar
                  </Button>
                </span>
              </form>
            </Form>
          </div>
        </ThemedSection>
      </Layout>
    );
  }
}
