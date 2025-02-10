import { DollarSign, List, Pen, Plus, Wrench } from "lucide-react";
import { Button } from "./button";

export default function DashboardButtons() {
  return (
    <span className="flex flex-row gap-4">
      <span className="flex flex-col gap-4">
        <h3 className="text-center">Clientes</h3>
        <Button className="bg-green-500 hover:bg-green-400">
          <Plus /> Novo cliente
        </Button>
        <Button className="bg-red-500 hover:bg-red-400">
          <DollarSign /> Devedores (2)
        </Button>
        <Button variant="secondary">
          <List /> Listar clientes
        </Button>
      </span>
      <span className="flex flex-col gap-4 text-start">
        <h3 className="text-center">Funcionários</h3>

        <Button className="bg-green-500 hover:bg-green-400">
          <Pen /> Editar funcionários
        </Button>
        <Button className="bg-sky-500 hover:bg-sky-400">
          <Wrench /> Em serviço (0)
        </Button>
        <Button variant="secondary">
          <List />
          Listar clientes
        </Button>
      </span>
    </span>
  );
}
