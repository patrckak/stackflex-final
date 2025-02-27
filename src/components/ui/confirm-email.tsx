"use server";

import { getEmailVerified } from "@/app/actions/user";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default async function ConfirmEmailAlert({ session }) {
  // const isEmailVerified = await getEmailVerified(session.user.role);
  // if (!isEmailVerified) {
  //   return (
  //     <Alert className="w-[75%]">
  //       <AlertDescription className="flex items-center gap-2">
  //         <AlertCircle />
  //         <p>
  //           Confirme seu email. Enviamos um link para&nbsp;
  //           <strong>{session.user.email}</strong>.
  //         </p>
  //       </AlertDescription>
  //     </Alert>
  //   );
  // }
}
