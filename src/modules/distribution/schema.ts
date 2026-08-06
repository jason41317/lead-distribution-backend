import { z } from "zod";

export const CreateDistributionSchema = z.object({
    formId: z.number().min(1),
});

export const UpdateDistributionSchema = CreateDistributionSchema.partial();

export type CreateDistributionRequest = z.infer<typeof CreateDistributionSchema>;
export type UpdateDistributionRequest = z.infer<typeof UpdateDistributionSchema>;