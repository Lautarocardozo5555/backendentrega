import { z } from "zod";

export const serviceSchema = z.object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    description: z.string().min(5, "La descripción debe tener al menos 5 caracteres"),

  // Convierte string a número y valida positivo
    duration: z.string()
    .transform(val => Number(val))
    .refine(val => !isNaN(val) && val > 0, "La duración debe ser un número positivo"),

    price: z.string()
    .transform(val => Number(val))
    .refine(val => !isNaN(val) && val > 0, "El precio debe ser un número positivo"),

    category: z.string().min(3, "La categoría es obligatoria"),

  // Convierte string "true"/"false" a boolean
    available: z.string()
    .transform(val => val === "true")
});

