"use client";

import { getEstimateDataByPassword } from "@/app/actions/estimate";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import PreviewEstimate from "@/components/ui/preview-estimate";
import ThemedSection from "@/components/ui/themedSection";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  const params = useParams<{ id: string; password: string }>();

  const [password, setPassword] = useState<string>("");
  const [passwordStatus, setPasswordStatus] = useState<boolean>(false);
  const [estimateData, setEstimateData] = useState<any>();
  const [viewConfirmDialog, setViewConfirmDialog] = useState<boolean>(false);
  const [viewCancelDialog, setViewCancelDialog] = useState<boolean>(false);

  const handleCofirmDialog = () => {
    setViewConfirmDialog(!viewConfirmDialog);
  };

  const handleCancelDialog = () => {
    setViewCancelDialog(!viewCancelDialog);
  };

  const { toast } = useToast();

  function EstimatePreview() {
    return (
      <>
        <PreviewEstimate data={estimateData} />
        <span className="flex gap-3 pt-4">
          <Button
            onClick={handleCofirmDialog}
            className="bg-green-500 hover:bg-green-600"
          >
            <Check /> Aprovar Orçamento
          </Button>
          <Button onClick={handleCancelDialog} variant="destructive">
            <X /> Pedir revisão
          </Button>
        </span>
      </>
    );
  }

  useEffect(() => {
    //? verificar se a senha foi passada por parametro
    if (params.password != undefined) {
      getEstimateDataByPassword(params.password, params.id).then((d) => {
        if (d.msg == "ok") {
          setEstimateData(d.data);
          setPasswordStatus(true);
        } else {
          toast({ description: d.msg, variant: "destructive" });
        }
      });
    }

    //? verificar se a senha foi digitada
    if (password.length == 6) {
      getEstimateDataByPassword(password, params.id).then((d) => {
        if (d.msg == "ok") {
          setEstimateData(d.data);
          setPasswordStatus(true);
        } else {
          toast({ description: d.msg, variant: "destructive" });
        }
      });
    }
  }, [password]);

  const handlePasswordInput = (e) => {
    setPassword(e);
  };

  if (passwordStatus) {
    return (
      <ThemedSection>
        <div className="flex flex-col items-center justify-center h-screen">
          <EstimatePreview />
        </div>
        <Dialog open={viewConfirmDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Você tem certeza?</DialogTitle>
              <DialogDescription>
                Descreva o que você precisa de revisão.
              </DialogDescription>
              <Textarea />
            </DialogHeader>
            <DialogFooter>
              <Button type="button" variant="secondary">
                Finalizar
              </Button>
              <Button type="button">Fechar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ThemedSection>
    );
  }
  return (
    <ThemedSection>
      <div className="flex flex-col items-center justify-center h-screen">
        <span className="p-5 rounded-md bg-zinc-300 dark:bg-slate-900 flex flex-col gap-3 items-center">
          <h3 className="">Senha de acesso ao orçamento.</h3>
          <InputOTP maxLength={6} onChange={handlePasswordInput}>
            <InputOTPGroup className="border-black">
              <InputOTPSlot className="border-slate-600" index={0} />
              <InputOTPSlot className="border-slate-600" index={1} />
              <InputOTPSlot className="border-slate-600" index={2} />
              <InputOTPSlot className="border-slate-600" index={3} />
              <InputOTPSlot className="border-slate-600" index={4} />
              <InputOTPSlot className="border-slate-600" index={5} />
            </InputOTPGroup>
          </InputOTP>
        </span>
      </div>
    </ThemedSection>
  );
}
