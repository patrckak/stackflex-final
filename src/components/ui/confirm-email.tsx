"use client";

import { getEmailVerified } from "@/app/actions/user";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";

export default function ConfirmEmailAlert({ session }) {
  const [data, setData] = useState<any>();

  getEmailVerified(session.user.role).then((d) => {
    setData(d);
  });
  if (data === false) {
    return (
      <>
        <Alert className="w-[75%]">
          <AlertDescription className="flex items-center gap-2">
            <AlertCircle />
            <p>
              Confirme seu email! Enviamos um link para&nbsp;
              <strong className="font-mono">{session.user.email}</strong>
            </p>
            <Button className="self-end" variant="link">
              Re-enviar
            </Button>
          </AlertDescription>
        </Alert>
      </>
    );
  } else {
    return <></>;
  }
}
