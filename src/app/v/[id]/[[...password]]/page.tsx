"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import ThemedSection from "@/components/ui/themedSection";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const params = useParams<{ id: string; password: string }>();

  const [password, setPassword] = useState<string>();

  const handlePasswordInput = (e) => {
    setPassword(e);
  };

  if (password.length == 6) {
    //? recuperar dados do orcamento
  }

  if (params.password != undefined) {
    return (
      <ThemedSection>
        <div className="flex flex-col items-center justify-center h-screen">
          {params.password} - {params.id}
        </div>
      </ThemedSection>
    );
  }
  return (
    <ThemedSection>
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
