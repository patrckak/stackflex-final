import { Bell, Check, Eye } from "lucide-react";
import { Input } from "./input";
import TaskItem from "./task-item";
import { redirect } from "next/navigation";
export default function DashboardTasks() {
  return (
    <span className="w-[100%] flex flex-col gap-4 ">
      <h6 className="text-center">Notificações</h6>
      <span className="flex flex-col gap-2 justify-center ">
        <TaskItem
          title={<Bell size={18} />}
          description={"Patrick iniciou o serviço #121"}
          date="há 2 horas"
        />
        <TaskItem
          title={<Check size={18} />}
          description={"Orçamento #121 aprovado"}
          date="agora"
        />
        <TaskItem
          title={<Bell size={18} />}
          description={"Maria concluiu o serviço #122"}
          date="há 3 horas"
          action={() => redirect("/app/servicos/visualizar/122")}
          actionTitle={<Eye size={18} />}
        />
      </span>
    </span>
  );
}
