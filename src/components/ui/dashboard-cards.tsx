"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardDescription, CardTitle } from "./card";
import { getEarns } from "@/app/actions/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Spinner } from "./spinner";

interface GanhosType {
  earnings?: number;
  costs?: number;
}

export default function DashboardCards() {
  const [ganhos, setGanhos] = useState<GanhosType>({ earnings: 0, costs: 0 });

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      getEarns(session.user.role).then((res) => {
        setGanhos(res);
      });
    }
  }, [session]);
  if (session) {
    return (
      <span className="flex flex-row gap-5 p-10 justify-around">
        <Card className="p-5 bg-green-500 border-none min-w-[200px] shadow-md hover:shadow-2xl transition-shadow">
          <CardTitle className="text-lg text-white flex items-center">
            <ChevronUp size={30} /> Entradas
          </CardTitle>
          <CardDescription className="text-3xl text-white">
            {ganhos.earnings.toLocaleString("pt-BR", {
              currency: "BRL",
              style: "currency",
            })}
          </CardDescription>
        </Card>
        <Card className="p-5 bg-red-500 border-none min-w-[200px] shadow-md hover:shadow-2xl transition-shadow">
          <CardTitle className="text-lg text-white flex items-center">
            <ChevronDown size={30} /> Saidas
          </CardTitle>
          <CardDescription className="text-3xl text-white">
            {ganhos.costs.toLocaleString("pt-BR", {
              currency: "BRL",
              style: "currency",
            })}
          </CardDescription>
        </Card>
        <Card className="p-5 bg-purple-500 border-none min-w-[200px] shadow-md hover:shadow-2xl transition-shadow">
          <CardTitle className="text-lg text-white flex items-center">
            <ChevronDown size={30} /> Lucro
          </CardTitle>
          <CardDescription className="text-3xl text-white">
            {(ganhos.earnings - ganhos.costs).toLocaleString("pt-BR", {
              currency: "BRL",
              style: "currency",
            })}
          </CardDescription>
        </Card>
      </span>
    );
  } else {
    <Spinner variant="circle" />;
  }
}
