"use client";

import { AppSidebar } from "@/components/app-sidebar";
import ThemedSection from "@/components/ui/themedSection";
import Layout from "./layout";
import { redirect, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Check, Copy, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  deleteEstimate,
  getEstimateData,
  markReadyEstimate,
} from "@/app/actions/estimate";

export default function VisualizarOrcamento() {
  const { data: session } = useSession({ required: true });
  const { id } = useParams();
  const { toast } = useToast();
  const [viewDeleteDialog, setViewDeleteDialog] = useState<boolean>(false);
  const [viewReadyDialog, setViewReadyDialog] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [data, setData] = useState<any>();

  function handleDelete() {
    setViewDeleteDialog(!viewDeleteDialog);
  }

  function handleReady() {
    setViewReadyDialog(!viewReadyDialog);
  }

  async function handleReadyAction(e) {
    e.preventDefault();
    let res = await markReadyEstimate(session.user.role, id);
    if (res.status == 0) {
      toast({ description: res.msg, variant: "destructive" });
    } else {
      toast({ description: res.msg });
      handleReady();
    }
  }

  async function handleDeleteAction(e) {
    e.preventDefault();
    let res = await deleteEstimate(session.user.role, id, password);
    if (res.status == 0) {
      toast({ description: res.msg, variant: "destructive" });
    } else {
      toast({ description: res.msg });
      setTimeout(() => {
        redirect("/app/servicos");
      }, 500);
    }
  }

  async function defData() {
    let res = await getEstimateData(session.user.role, id);
    if (res.status == 0) {
      toast({ description: res.msg, variant: "destructive" });
    } else {
      console.log(res);
    }
  }

  useEffect(() => {
    if (session) {
      console.log("data atualizada.");
      setData(defData());
    }
  }, [session]);

  if (session) {
    return (
      <Layout>
        <AppSidebar session={session} />
        <ThemedSection>
          <div className="border border-black bg-white dark:bg-zinc-800 rounded-lg p-10 w-[60vw] min-h-[60vh] max-h-[65vh] no-scrollbar  overflow-scroll">
            teste
          </div>
          <span className="absolute m-auto bottom-10 border-black rounded-lg">
            <Button
              variant="ghost"
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700"
            >
              <Trash /> Apagar
            </Button>
            <Button
              variant="ghost"
              onClick={handleReady}
              className="text-emerald-600 hover:text-emerald-700"
            >
              <Check /> Marcar como finalizado
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(`/v/${id}#2321341}`);
                toast({
                  description: "Link copiado.",
                });
              }}
              variant="ghost"
              className="text-neutral-800 hover:text-neutral-900"
            >
              <Copy /> Copiar url
            </Button>
          </span>
          <Dialog open={viewReadyDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Você tem certeza?</DialogTitle>
                <DialogDescription>
                  Tenha certeza antes de prosseguir, pois esta ação é
                  permanente.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  onClick={handleReadyAction}
                  type="button"
                  variant="secondary"
                >
                  Finalizar
                </Button>
                <Button onClick={handleReady} type="button">
                  Fechar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={viewDeleteDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Você tem certeza disso?</DialogTitle>
                <DialogDescription>
                  Excluir este documento impedirá permanentemente o acesso a
                  ele. Esta ação é irreversível.
                </DialogDescription>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="password" className="sr-only">
                      Senha
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="•••••••••"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={(e) => {
                      handleDeleteAction(e);
                      handleDelete();
                    }}
                    size="sm"
                    className="px-3"
                  >
                    <span className="sr-only">Apagar</span>
                    <Trash />
                  </Button>
                </div>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={handleDelete} type="button">
                  Fechar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </ThemedSection>
      </Layout>
    );
  }
}
