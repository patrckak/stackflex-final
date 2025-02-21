"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Layout from "./layout";
import { AppSidebar } from "@/components/app-sidebar";
import ThemedSection from "@/components/ui/themedSection";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function Page() {
  const { data: session } = useSession();

  if (session) {
    console.log(session.user);
    return (
      <Layout>
        <AppSidebar session={session} />
        <ThemedSection>
          <h3 className="text-2xl">
            <Avatar>
              <AvatarImage src={session.user.image} />
            </Avatar>
            {session.user.name}
          </h3>

          <span></span>
        </ThemedSection>
      </Layout>
    );
  }
}
