"use client";

import { Bell, Check, Eye, Trash, X } from "lucide-react";
import { Input } from "./input";
import TaskItem from "./task-item";
import { redirect } from "next/navigation";
import { getTasks } from "../../app/actions/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Spinner } from "./spinner";
import { Button } from "./button";

export default function DashboardTasks() {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<any>();
  const [res, setRes] = useState<any>();

  const clearNotifications = async () => {
    fetch("/api/util/reset/notifications", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((d) => {
      setRes(d.json())
      toast
    })
  };

  useEffect(() => {
    if (session)
      getTasks(session.user.role).then((d) => {
        setTasks(d.notifications);
      });
  }, [session]);

  if (session) {
    if (tasks != undefined) {
      return (
        <span className="w-[100%] flex flex-col gap-4 ">
          <h6 className="text-center">Notificações</h6>
          <span className="flex flex-col gap-2 justify-center ">
            {tasks != undefined ? (
              JSON.parse(tasks).map((task: any, i: number) => (
                <TaskItem
                  key={i + 1}
                  description={task.description}
                  title={task.title}
                  action={task?.action}
                />
              ))
            ) : (
              <></>
            )}
            <Button onClick={clearNotifications} variant="outline">
              <X /> Limpar notificações
            </Button>
          </span>
        </span>
      );
    } else {
      return (
        <span className="w-[100%] flex flex-col gap-4 items-center justify-center">
          Sem notificações no momento.
        </span>
      );
    }
  }
}
