import { z } from "zod";

export const serviceSchema = z.object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    description: z.string().min(5, "La descripción debe tener al menos 5 caracteres"),
    duration: z.number().positive("La duración debe ser un número positivo"),
    price: z.number().positive("El precio debe ser un número positivo"),
    category: z.string().min(3, "La categoría es obligatoria"),
    available: z.boolean()
});
