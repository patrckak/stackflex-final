"use client";

import { Button } from "../components/ui/button";
import ThemedSection from "../components/ui/themedSection";
import { House } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../../auth";

const NotFound = async () => {
  const session = await auth();

  if (session) {
    return (
      <ThemedSection>
        <span className="text-center flex-col flex gap-2 h-[100vh]">
          <h3>Página não encontrada :(</h3>
          <h6 className="text-sm">StackFlex - v1.1</h6>
          <Link href="/app/dashboard">
            <Button>
              Dashboard <House />
            </Button>
          </Link>
        </span>
      </ThemedSection>
    );
  } else {
    return (
      <ThemedSection>
        <span className="text-center flex-col flex gap-2">
          <h3>Página não encontrada :(</h3>
          <h6 className="text-sm">StackFlex - v1.1</h6>
          <Link href="/">
            <Button>
              Página Inicial <House />
            </Button>
          </Link>
        </span>
      </ThemedSection>
    );
  }
};

export default NotFound;
