import { validarCPF } from "@/lib/actions";
import { z } from "zod";

export const formSchema = z
  .object({
    // primeiro nome
    firstname: z
      .string({ required_error: "Em branco." })
      .min(3, "Não está faltando algo?")
      .regex(/^[A-Za-z]+$/, {
        message: "Apenas o primeiro nome!",
      }),

    // sobrenome completo
    lastname: z.string({ required_error: "Em branco." }),

    //cpf
    cpf: z
      .string({ required_error: "Em branco. :(" })
      .min(11, "Valor inválido")
      .max(11, "Valor inválido")
      .regex(/^\d+$/, "Apenas números por favor.")
      .refine(
        async (cpf) => await validarCPF(cpf),
        "CPF não consta como válido."
      ),

    // email de contato
    email: z
      .string({ required_error: "Em branco." })
      .email("Não está faltando algo?"),

    // senha de acesso
    password: z
      .string({ required_error: "Em branco." })
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message: "Senha muito fraca ainda...",
      })
      .min(8, { message: "Senha muito curta." }),

    // confirmação de senha
    confirmpassword: z.string({
      required_error: "Em branco.",
    }),

    // EMPRESA
    cnpj: z.string({ required_error: "Em branco." }).optional(),
    nomeEmpresa: z.string({ required_error: "Em branco." }).optional(),
    endereco: z.string({ required_error: "Em branco." }),
    cep: z.string({ required_error: "Em branco." }),
    cidade: z.string({ required_error: "Em branco." }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "As senhas não coincidem",
    path: ["confirmpassword"],
  });

export const clientForm = z.object({
  role: z.string().readonly(),
  name: z.string({ required_error: "Em branco." }),
  cadastro: z.string({ required_error: "Em branco." }),
  address: z.string({ required_error: "Em branco." }),
  contact: z.string({ required_error: "Em branco." }),
});

export const estimateForm = z.object({
  role: z.string(),
  desc: z.string({ required_error: "Em branco." }),
  date: z.string({ required_error: "Em branco." }),
  cadastro: z.string({ required_error: "Em branco." }),
  clientNumber: z.string({ required_error: "Em branco." }),
  items: z.string(),
  clientAddress: z.string({ required_error: "Em branco." }),
  clientId: z.string(),
});

//! Phone number validation

// Regex to validate the phone number in the format (XX) XXXXX or (XX) XXXXX-YYYY
const phoneRegex = /^\(\d{2}\) \d{5}(?:-\d{4})?$/;

// Interface for the form that includes the phone field
export interface PhoneFormSchema {
  contact_phone: string;
}

// Schema for phone number validation
const phoneSchema = z
  .string()
  .min(15, "This field is required")
  .length(15, `Must have 15 characters`)
  .regex(phoneRegex, "The phone number must be valid");

// Example of how to use the phone schema in an object
export const zodPhoneSchema = z.object({
  contact_phone: phoneSchema,
});

// Function to validate the phone number format
export const invalidPhoneNumberFormat = (number: string) => {
  return phoneRegex.test(number);
};
