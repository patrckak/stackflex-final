"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { estimateForm } from "../../../utils/schemas";
import { newEstimate } from "@/app/actions/estimate";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

export default function EstimateForm() {
  const form = useForm<z.infer<typeof estimateForm>>({
    resolver: zodResolver(estimateForm),
  });

  const { toast } = useToast();

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

  const { data: session } = useSession();

  if (session) {
    return (
      <Form {...form}>
        <form onSubmit={(e) => submit(e)} className="space-y-8">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição do orçamento</FormLabel>
                <FormControl>
                  <Input disabled placeholder="shadcn" {...field} />
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
                  <Input placeholder="shadcn" {...field} />
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
                <FormLabel>CPF/CNPJ do cliente </FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
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
                  <Input placeholder="shadcn" {...field} />
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
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    );
  }
}
