import { z } from "zod";

export const CreateLeadSchema = z.object({
    name: z.string().min(1),
    email: z.email(),
    phone: z.string().min(1),
    ipAddress: z.string().min(1),
    formId: z.number().min(1)
});

export const UpdateLeadSchema = CreateLeadSchema.partial();

export type CreateLeadRequest = z.infer<typeof CreateLeadSchema>;
export type UpdateLeadRequest = z.infer<typeof UpdateLeadSchema>;