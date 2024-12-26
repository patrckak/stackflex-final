import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DynamicTable = () => {
  // Estado para manter os dados da tabela
  const [items, setItems] = useState([
    { id: 1, nome: "Item 1", descricao: "Descrição 1", valor: "15" },
    { id: 2, nome: "Item 2", descricao: "Descrição 2", valor: "30" },
  ]);

  // Estados para os inputs de novos itens
  const [newItemName, setNewItemName] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");
  const [newItemVal, setNewItemVal] = useState("0");

  // Função para adicionar um novo item
  const addItem = () => {
    if (newItemName && newItemDesc && newItemVal) {
      const newItem = {
        id: items.length + 1, // Pode ser um ID gerado dinamicamente
        nome: newItemName,
        descricao: newItemDesc,
        valor: newItemVal,
      };
      setItems([...items, newItem]); // Atualizando a tabela com o novo item
      setNewItemName(""); // Limpando os inputs
      setNewItemDesc("");
      setNewItemVal("");
    }
  };

  // Função para remover um item por ID
  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Tabela Dinâmica</h2>

      {/* Inputs para adicionar novo item */}
      <div className="flex space-x-2 mb-4">
        <Input
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Nome do item"
        />
        <Input
          value={newItemDesc}
          onChange={(e) => setNewItemDesc(e.target.value)}
          placeholder="Descrição"
        />
        <Input
          value={newItemVal}
          onChange={(e) => setNewItemVal(e.target.value)}
          placeholder="Valor"
        />
        <Button onClick={addItem}>Adicionar Item</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items != null ? (
            items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.nome}</TableCell>
                <TableCell>{item.descricao}</TableCell>
                <TableCell>{item.valor}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>Sem items.</TableRow>
          )}
        </TableBody>
      </Table>

      <Button onClick={() => alert(JSON.stringify(items))}> Enviar </Button>
    </div>
  );
};

export default DynamicTable;
