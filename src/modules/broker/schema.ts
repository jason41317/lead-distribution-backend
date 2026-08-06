import { z } from "zod";

export const CreateBrokerSchema = z.object({
    name: z.string().min(1),
    active: z.boolean(),
    dailyCap: z.number(),
    timezone: z.string(),
    openingTime: z.string(),
    closingTime: z.string(),
    workingDays: z.array(z.number().min(0).max(6)),
});

export const UpdateBrokerSchema = CreateBrokerSchema.partial();

export type CreateBrokerRequest = z.infer<typeof CreateBrokerSchema>;
export type UpdateBrokerRequest = z.infer<typeof UpdateBrokerSchema>;