"use client";

import { Bell, Check, Eye } from "lucide-react";
import { Input } from "./input";
import TaskItem from "./task-item";
import { redirect } from "next/navigation";
import { getTasks } from "../../app/actions/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Spinner } from "./spinner";

export default function DashboardTasks() {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<any>();

  useEffect(() => {
    if (session)
      getTasks(session.user.role).then((d) => {
        setTasks(d.notifications);
      });
  }, [session]);

  if (session) {
    if (tasks != undefined) {
      console.log(tasks);
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
          </span>
        </span>
      );
    } else {
      return (
        <span className="w-[100%] flex flex-col gap-4 items-center justify-center">
          <Spinner className="text-purple-500" size={30} variant="circle" />
        </span>
      );
    }
  }
}
