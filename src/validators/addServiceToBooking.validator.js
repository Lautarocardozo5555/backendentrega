import { z } from "zod";

export const addServiceToBookingSchema = z.object({
    quantity: z.number()
    .min(1, "La cantidad debe ser al menos 1")
    .max(10, "La cantidad no puede superar 10") 
});
