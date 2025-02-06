"use client";

import { ModeToggle } from "@/components/theme-provider";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import HeaderPublic from "@/components/ui/header-public";
import { ArrowDown, ArrowUp, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrollBtn, setScrollBtn] = useState<boolean>(true);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      window.scrollY > 120 ? setScrollBtn(false) : setScrollBtn(true);
    });
  });

  const n = useRouter();

  return (
    <div className="scroll-smooth">
      {/* <HeaderPublic /> */}
      <span className="absolute right-10 top-10"></span>
      <section className="h-full w-screen dark:bg-gray-600 bg-zinc-200">
        <section
          id="sobre"
          className="h-[100vh] flex justify-center dark:bg-gray-600 bg-gradient-to-t from-zinc-200 to-zinc-300 "
        >
          {/* //! BOTÃO DE LOGIN  */}
          <Button
            className="absolute right-10 top-10"
            variant="ghost"
            onClick={() => n.replace("/app/dashboard")}
          >
            Entrar
          </Button>

          <span className="text-center absolute mx-auto my-10 flex flex-col items-center justify-center gap-3">
            <AnimatedText
              text="Stack Flex"
              underlineGradient="from-purple-700 to-purple-500  bg-200% animate-gradient-move"
              underlineClassName="h-[5px] "
              underlineOffset="mt-[1px]"
              duration={0.2}
              replay={true}
              delay={0.1}
              as="h1"
            />
            <img
              className="w-[40px]"
              src="https://i.imgur.com/vQxxDbM.png"
              alt="logo"
            />
          </span>

          {/* //! BOTÃO  */}
          <span className="relative top-[100px] flex flex-col gap-3">
            <span className="flex flex-col items-center justify-center relative bottom-[-50px] m-auto">
              <h3 className="text-2xl pb-2 font-medium">Abra sua conta</h3>
              <Button
                onClick={() => {
                  n.push("#modulos");
                }}
                className="rounded-full w-[30px] h-[30px]"
              >
                <ChevronDown />
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
            className="rounded-full w-[50px] h-[50px]"
            onClick={() => {
              document.body.scrollTop = 0; // For Safari
              document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            }}
          >
            <ChevronUp />
          </Button>
        </span>
      </section>
    </div>
  );
}
