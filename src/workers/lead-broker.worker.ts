import { Worker } from "bullmq";

import { redis } from "../queues/redis.js";
import { BrokerBindingService } from "../modules/broker/binding.service.js";

const bindingService = new BrokerBindingService();

console.log("Starting lead broker worker...");

const leadBrokerWorker = new Worker(
  "lead-broker-binding",
  async (job) => {
    console.log(`Processing job ${job.id}: ${job.name}`);

    switch (job.name) {
      case "bind-broker":
        await bindingService.bindLead(job.data.leadId);
        break;

      default:
        throw new Error(`Unknown job: ${job.name}`);
    }
  },
  {
    connection: redis,
    concurrency: 5,
  },
);

leadBrokerWorker.on("ready", () => {
  console.log("Lead broker worker is ready");
});

leadBrokerWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

leadBrokerWorker.on("failed", (job, error) => {
  console.error(`Job ${job?.id} failed:`, error);
});

leadBrokerWorker.on("error", (error) => {
  console.error("Worker error:", error);
});
