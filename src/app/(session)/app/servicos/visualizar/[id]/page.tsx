"use client";

import {
  deleteEstimate,
  getEstimateData,
  markReadyEstimate,
} from "@/app/actions/estimate";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PreviewEstimate from "@/components/ui/preview-estimate";
import ThemedSection from "@/components/ui/themedSection";
import { useToast } from "@/hooks/use-toast";
import { Check, Copy, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import Layout from "./layout";

import { ring2 } from "ldrs";

export default function VisualizarOrcamento() {
  const { data: session } = useSession({ required: true });
  const { id } = useParams();
  const { toast } = useToast();
  const [viewDeleteDialog, setViewDeleteDialog] = useState<boolean>(false);
  const [viewReadyDialog, setViewReadyDialog] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [data, setData] = useState<any>();
  ring2.register();

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
    } else if (res.status == 2) {
      //TODO MOSTRAR MENSAGEM DE ORÇAMENTO NÃO ENCONTRADO / REMOVIDO.
      // return setData({ key: "Orçamento não encontrado." });
    } else {
      setData(res.data);
    }
  }

  useEffect(() => {
    if (session) {
      defData();
    }
  }, [session]);

  if (session) {
    return (
      <Layout>
        <AppSidebar session={session} />
        <ThemedSection>
          {data != undefined ? data.key : <></>}
          <div className="border border-black bg-white dark:bg-zinc-800 rounded-lg p-10 w-[60vw] min-h-[80vh] max-h-[95vh] no-scrollbar  overflow-scroll">
            {data != undefined ? (
              <PreviewEstimate data={data} />
            ) : (
              <span className="flex h-[100%] justify-center items-center">
                <l-ring-2
                  size="40"
                  stroke="5"
                  stroke-length="0.25"
                  bg-opacity="0.1"
                  speed="0.8"
                  color="black"
                ></l-ring-2>
              </span>
            )}
          </div>
          <span className="absolute m-auto top-5 p-2 border-black rounded-lg">
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
              className="text-emerald-500 hover:text-emerald-700"
            >
              <Check /> Marcar como finalizado
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.host}/v/${id}/${data.key}`
                );
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
