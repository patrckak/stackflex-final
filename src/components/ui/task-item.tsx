import { Eye, Check, Bell, BellRing, BellIcon } from "lucide-react";
import { Button } from "./button";

interface TaskProps {
  title: any;
  description: any;
  action?: any;
  actionTitle?: any;
  date?: any;
}

export default function TaskItem({
  title,
  description,
  action,
  date,
}: Readonly<TaskProps>) {
  if (action) {
    return (
      <span className="flex flex-row gap-2">
        <span className="min-w-[300px] w-[100%] h-[40px] hover:shadow-md transition-shadow dark:bg-zinc-800 bg-zinc-300 p-2 rounded-md flex flex-row gap-4 justify-between items-center">
          <h3>
            <BellIcon size={18} />
          </h3>
          <p>{description}</p>
          <span className="flex flex-row gap-2 items-center">
            <p className="font-mono text-sm text-end">{date}</p>
          </span>
        </span>
        <Button variant="default" className="w-fit h-fit p-2" onClick={action}>
          <Eye size={16} />
        </Button>
      </span>
    );
  }
  return (
    <span className="min-w-[300px] h-[40px] hover:shadow-md transition-shadow dark:bg-neutral-800 bg-zinc-300 p-2 rounded-md flex flex-row gap-4 justify-between items-center">
      <h3>
        <BellIcon size={18} />
      </h3>
      <p className="text-start">{description}</p>
      <p className="font-mono text-sm text-end">{date}</p>
    </span>
  );
}
