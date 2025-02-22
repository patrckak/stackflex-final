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

export default function Page() {
  const params = useParams<{ id: string; password: string }>();

  const [password, setPassword] = useState<string>("");
  const [passwordStatus, setPasswordStatus] = useState<boolean>(false);
  const [estimateData, setEstimateData] = useState<any>();

  const { toast } = useToast();

  function EstimatePreview() {
    return (
      <>
        <PreviewEstimate data={estimateData} />
        <span className="flex gap-3 pt-4">
          <Button>
            <Check /> Aprovar Orçamento
          </Button>
          <Button variant="destructive">
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
