"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import ThemedSection from "@/components/ui/themedSection";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams<{ id: string; password: string }>();

  const [password, setPassword] = useState<string>("");
  const [passwordStatus, setPasswordStatus] = useState<boolean>(false);

  //? verificar se a senha foi passada por parametro
  useEffect(() => {
    if (params.password != undefined) {
      setPasswordStatus(true);
      setPassword(params.password);
    }
  }, [password]);

  //? verificar se a senha foi digitada
  useEffect(() => {
    if (password.length == 6) {
      setPasswordStatus(true);
      //? recuperar dados do orcamento
    }
  }, [password]);

  const handlePasswordInput = (e) => {
    setPassword(e);
  };

  if (passwordStatus) {
    return (
      <ThemedSection>
        <div className="flex flex-col items-center justify-center h-screen">
          {password} - {params.id}
        </div>
      </ThemedSection>
    );
  }
  return (
    <ThemedSection>
      senha: {password}
      <div className="flex flex-col items-center justify-center h-screen">
        <span className="p-5 rounded-md bg-zinc-300 dark:bg-zinc-200 flex flex-col gap-3 items-center">
          <h3 className="">Senha de acesso ao orçamento.</h3>
          <InputOTP maxLength={6} onChange={handlePasswordInput}>
            <InputOTPGroup className="border-black">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </span>
      </div>
    </ThemedSection>
  );
}
