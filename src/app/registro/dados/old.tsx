"use client";

import { createUser } from "@/components/db/createUser";
import { ModeToggle } from "@/components/theme-provider";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useMask } from "@react-input/mask";
import "@uploadthing/react/styles.css";
import { ScrollText, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UploadButton } from "../../../../utils/uploadthing";

export default function NewUser() {
  var avatarUrl =
    "https://utfs.io/f/SHkctA3zZK7UNJJh7RPsirWFqgMZSXO8ta0lynz9TEYoj2Hv";

  const { toast } = useToast();

  const [avatar, setAvatar] = useState<any>("");

  const [useCNPJ, setUseCNPJ] = useState<boolean>(false);

  const [storeType, setStoreType] = useState<number>(0);

  const handleToggle = () => {
    setUseCNPJ(!useCNPJ);
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formData = watch();

  const formSubmit = async (data: any) => {
    if (!data.cpf) {
      return toast({
        description: "CPF inválido.",
        variant: "destructive",
      });
    }
    let a = await createUser(data, useCNPJ, storeType, avatar);
    if (a.status === 0) {
      console.log(a);
      toast({
        description: a.msg,
        variant: "destructive",
      });
    } else if (a.status === 1) {
      toast({
        description: a.msg,
        variant: "default",
      });
    }
    // router.replace("/api/auth/signin");
  };

  return (
    <>
      <span className="absolute top-30 right-30">
        <ModeToggle />
      </span>
      <div className="no-scrollbar p-10 h-screen w-screen dark:bg-gray-700 bg-zinc-200 flex overflow-scroll justify-center items-center">
        <form
          className="mt-10 flex flex-wrap flex-row gap-16 justify-center items-center"
          onSubmit={handleSubmit(formSubmit)}
        >
          <div
            className="
          flex flex-row gap-6 justify-center bg-zinc-300 w-fit p-8 rounded-lg shadow-md
          dark:bg-slate-900 transition-all durantion-700 ease-in-out
          "
          >
            <span className="flex flex-col gap-4 items-center">
              <p className="font-bold text-lg flex items-center gap-1">
                <User strokeWidth={2.5} /> Usuário
              </p>
              <span>
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  {...register("cpf")}
                  name="cpf"
                  placeholder="000.000.000-00"
                />
              </span>
              <span>
                <Label htmlFor="username">Nome Completo</Label>
                <Input
                  {...register("username")}
                  name="username"
                  placeholder="João da Silva"
                />
              </span>
              <span>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  {...register("email")}
                  name="email"
                  placeholder="joão@email.com"
                />
              </span>
              <span>
                <Label htmlFor="passwd">Senha</Label>
                <Input
                  {...register("password")}
                  name="password"
                  type="password"
                  placeholder="*********"
                />
              </span>
              <span>
                <Label htmlFor="passwdr">Confirme sua Senha</Label>

                <Input
                  {...register("passwdr")}
                  name="passwdr"
                  type="password"
                  placeholder="*********"
                />
              </span>
              <span className="flex flex-row gap-5 justify-center items-center">
                <UploadButton
                  content={{
                    button: ({ ready, isUploading }) => {
                      if (!ready) return "Preparando...";
                      if (isUploading) return "Enviando...";
                      return "Enviar Avatar";
                    },
                    allowedContent: ({ ready, fileTypes, isUploading }) => {
                      if (!ready) return "";
                      if (isUploading) return "Enviando imagem...";
                      return `Arquivos até 4mb`;
                    },
                  }}
                  className=" mt-4 ut-button:bg-red-500 ut-button:ut-readying:bg-red-500/50"
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    let url = res.shift();
                    let formatedUrl = url?.appUrl.toString();
                    console.log(formatedUrl);
                    setAvatar(formatedUrl);
                  }}
                  onUploadError={(error: Error) => {
                    alert(
                      "Erro ao registrar avatar, caso o erro continue reporte ao suporte."
                    );
                  }}
                />
                <Avatar className="mb-3">
                  <AvatarImage src={avatar} />
                </Avatar>
              </span>
              <span className="flex gap-3 items-center m-auto">
                <Checkbox name="pj" onClick={handleToggle} />
                <Label htmlFor="pj">Conta PJ</Label>
              </span>
            </span>
            {useCNPJ ? (
              <>
                <Separator orientation="vertical" color="#000" />
                <span className="flex flex-col gap-4 items-center">
                  <p className="font-bold text-lg flex items-center gap-1">
                    <ScrollText strokeWidth={2.5} /> Empresa
                  </p>
                  <span>
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input
                      {...register("cnpj")}
                      name="cnpj"
                      placeholder="00 000 000/0000-00"
                    />
                  </span>
                  <span>
                    <Label htmlFor="storeName">Nome Fantásia</Label>
                    <Input
                      {...register("storeName")}
                      placeholder="Empresa LTDA"
                      name="storeName"
                    />
                  </span>
                  <span>
                    <Label htmlFor="storeDescription">Descrição Curta</Label>
                    <Input
                      {...register("storeDescription")}
                      placeholder="Slogan..."
                      name="storeDescription"
                    />
                  </span>
                  <span className="w-[100%]">
                    <Label htmlFor="storeType">Tipo</Label>
                    <Select
                      onValueChange={(value) => setStoreType(parseInt(value))}
                    >
                      <SelectTrigger name="storeType" className="w-[100%]">
                        <SelectValue placeholder="Escolha" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Loja</SelectItem>
                        <SelectItem value="2">Prestador de Serviço</SelectItem>
                      </SelectContent>
                    </Select>
                  </span>
                </span>
              </>
            ) : (
              <></>
            )}
          </div>

          <Button className="absolute bottom-8 right-8">Cadastrar</Button>
        </form>
      </div>
    </>
  );
}
