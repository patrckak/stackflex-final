"use client";

import { ModeToggle } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import HeaderPublic from "@/components/ui/header-public";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrollBtn, setScrollBtn] = useState<boolean>(true);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      window.scrollY > 120 ? setScrollBtn(false) : setScrollBtn(true);
    });
  });

  return (
    <>
      <HeaderPublic />
      <span className="absolute right-10 top-32"></span>
      <section className="h-full w-screen dark:bg-gray-700 bg-zinc-200 select-none">
        <section id="prices" className="h-[100vh] dark:bg-gray-600 bg-zinc-200">
          <div className="p-32">
            <h1 className="drop-shadow-sm font-semibold text-[75px]">
              Por que&nbsp;
              <span className="font-bold bg-gradient-to-l from-blue-500 via-teal-500 to-green-500 text-transparent bg-clip-text">
                StackFlex
              </span>
              ?
            </h1>
            <span className="flex flex-col gap-6">
              <p className="">
                O StackFlex é um ERP flexível que se adapta ao seu orçamento e
                às necessidades da sua empresa. Seja uma startup ou uma grande
                corporação, nosso sistema permite personalizar funcionalidades,
                garantindo que o software cresça junto com o seu negócio.
              </p>
              <p>
                Com uma interface intuitiva e fácil de usar, o StackFlex
                simplifica a gestão empresarial, otimizando processos e
                economizando tempo. Além disso, a integração com diversas
                ferramentas e plataformas garante que você tenha um controle
                centralizado e eficiente de todas as operações, sem perder a
                flexibilidade necessária para se adaptar a mudanças do mercado.
              </p>
            </span>
            <span className="relative left-[90%]">
              <Button className=" bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-rose-500 via-pink-600 to-fuchsia-700 ">
                Planos
              </Button>
            </span>
          </div>
        </section>
        <section
          id="features"
          className="h-[100vh] dark:bg-gray-700 bg-zinc-300"
        >
          <div className="p-10"></div>
        </section>
        <section
          id="contact"
          className="h-[100vh] dark:bg-gray-600 bg-zinc-200"
        >
          contact
        </section>
        <span hidden={scrollBtn} className="fixed right-10 bottom-10">
          <Button
            variant="ghost"
            className="rounded-full"
            onClick={() => {
              document.body.scrollTop = 0; // For Safari
              document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            }}
          >
            <ArrowUp />
          </Button>
        </span>
      </section>
    </>
  );
}
