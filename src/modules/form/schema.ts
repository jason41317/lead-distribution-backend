import { z } from "zod";

export const CreateFormSchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
});

export const UpdateFormSchema = CreateFormSchema.partial();

export type CreateFormRequest = z.infer<typeof CreateFormSchema>;
export type UpdateFormRequest = z.infer<typeof UpdateFormSchema>;