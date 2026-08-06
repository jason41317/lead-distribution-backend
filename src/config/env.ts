import { z } from "zod";

const schema = z.object({
  PORT: z.coerce.number().default(3001),

  DATABASE_URL: z.string(),

  JWT_SECRET: z.string().min(10),
});

export const env = schema.parse(process.env);
