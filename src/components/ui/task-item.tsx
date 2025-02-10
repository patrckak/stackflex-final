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
  actionTitle,
  date,
}: Readonly<TaskProps>) {
  if (action) {
    return (
      <span className="min-w-[300px] h-[40px] dark:bg-zinc-800 bg-zinc-300 p-2 rounded-md flex flex-row gap-4 justify-between items-center">
        <h3>{title}</h3>
        <p>{description}</p>
        <span className="flex flex-row gap-2 items-center">
          <Button variant="ghost" className="w-fit h-fit p-2" onClick={action}>
            {actionTitle}
          </Button>
          <p className="font-mono text-sm text-end">{date}</p>
        </span>
      </span>
    );
  }
  return (
    <span className="min-w-[300px] h-[40px] dark:bg-neutral-800 bg-zinc-300 p-2 rounded-md flex flex-row gap-4 justify-between items-center">
      <h3>{title}</h3>
      <p className="text-start">{description}</p>
      <p className="font-mono text-sm text-end">{date}</p>
    </span>
  );
}
