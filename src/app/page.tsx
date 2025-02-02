"use client";

import { ModeToggle } from "@/components/theme-provider";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import HeaderPublic from "@/components/ui/header-public";
import { ArrowDown, ArrowUp } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrollBtn, setScrollBtn] = useState<boolean>(true);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      window.scrollY > 120 ? setScrollBtn(false) : setScrollBtn(true);
    });
  });

  return (
    <div className="scroll-smooth">
      {/* <HeaderPublic /> */}
      <span className="absolute right-10 top-10"></span>
      <section className="h-full w-screen dark:bg-gray-700 bg-zinc-200 select-none">
        <section
          id="sobre"
          className="h-[100vh] flex justify-center dark:bg-gray-600 bg-zinc-200"
        >
          <Button
            className="absolute right-10 top-10"
            variant="ghost"
            onClick={() => redirect("/app/dashboard")}
          >
            Entrar
          </Button>
          <span className="relative top-[100px] flex flex-col gap-5">
            <span className="flex flex-col items-center pb-5 justify-center">
              <AnimatedText
                text="Stack Flex"
                className="text-center"
                underlineGradient="from-pink-500 via-purple-500 to-indigo-500 bg-200% animate-gradient-move"
                underlineClassName="h-[5px] "
                underlineOffset="mt-[1px]"
                replay={true}
                as="h1"
              />
              <p className="pt-3 text-center">
                Simplificando a Gestão, Multiplicando Resultados.
              </p>
            </span>

            <span className="flex flex-col items-center pt-10 justify-center border-red-100 border h-[200px] w-[200px]"></span>

            <span className="flex flex-col items-center pt-10 justify-center">
              <h3 className="text-2xl font-medium">Teste agora</h3>
              <Button
                onClick={() => {
                  redirect("#modulos");
                }}
                className="bg-purple-500 hover:bg-purple-600 rounded-full w-[30px] h-[30px]"
              >
                <ArrowDown />
              </Button>
            </span>
          </span>
        </section>
        <section
          id="modulos"
          className="h-[100vh] dark:bg-gray-700 bg-zinc-300"
        >
          features
        </section>
        <section
          id="valores"
          className="h-[100vh] dark:bg-gray-600 bg-zinc-200"
        >
          preços
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
    </div>
  );
}
