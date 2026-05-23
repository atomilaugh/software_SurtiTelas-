import { z } from "zod";

export const userSchema = z.object({
  fullName: z
    .string()
    .min(3, "Nombre inválido"),

  email: z
    .string()
    .email("Correo inválido"),

  role: z.enum([
    "admin",
    "asesor",
    "domiciliario",
    "cliente",
  ]),
});

export type UserFormValues =
  z.infer<typeof userSchema>;