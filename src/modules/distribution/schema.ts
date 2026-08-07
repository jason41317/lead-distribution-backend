import { z } from "zod";

export const CreateDistributionSchema = z.object({
    formId: z.number().min(1),
    name: z.string().min(1).max(255),
});

export const UpdateDistributionSchema = CreateDistributionSchema.partial();

export const CreateDistributionBrokersSchema = z.array(
  z.object({
    distributionId: z.number().min(1),
    brokerId: z.number().min(1),
    percentage: z.number().min(0).max(100),
    active: z.boolean(),
  })
);

export type CreateDistributionRequest = z.infer<typeof CreateDistributionSchema>;
export type UpdateDistributionRequest = z.infer<typeof UpdateDistributionSchema>;
export type CreateDistributionBrokersRequest = z.infer<typeof CreateDistributionBrokersSchema>;