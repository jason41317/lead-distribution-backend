import { Queue } from "bullmq";
import { redis } from "./redis.js";

export interface BindLeadJobData {
  leadId: number;
}

export const leadBrokerQueue = new Queue<BindLeadJobData>(
  "lead-broker-binding",
  {
    connection: redis,
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 1000,
      },
      removeOnComplete: 1000,
      removeOnFail: 5000,
    },
  },
);