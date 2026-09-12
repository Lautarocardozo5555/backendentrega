import { z } from "zod";

export const bookingSchema = z.object({
    clientName: z.string().min(3, "El nombre del cliente debe tener al menos 3 caracteres"),
    clientEmail: z.string().email("Debe ser un email válido"),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe estar en formato YYYY-MM-DD"),
    time: z.string().regex(/^\d{2}:\d{2}$/, "La hora debe estar en formato HH:MM"),
    status: z.enum(["pendiente", "confirmada", "cancelada"], {
    errorMap: () => ({ message: "El estado debe ser pendiente, confirmada o cancelada" })
}),
    services: z.array(
    z.object({
        service: z.string().regex(/^[0-9a-fA-F]{24}$/, "El ID del servicio debe ser un ObjectId válido"),
        quantity: z.number().min(1, "La cantidad debe ser al menos 1")
    })
).optional()
});
