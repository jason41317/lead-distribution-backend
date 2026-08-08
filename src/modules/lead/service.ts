import { LeadStatus, Prisma } from "@prisma/client";
import leadRepository from "./repository.js";
import NotFoundError from "../../errors/NotFoundError.js";
import { CreateLeadRequest, UpdateLeadRequest } from "./schema.js";
import { leadBrokerQueue } from "../../queues/lead-broker.queue.js";

class LeadService {
  async findAll(page: number, limit: number, search: string, brokerId: number, formId: number, status: LeadStatus) {
    const { items, total } = await leadRepository.findAll(page, limit, search, brokerId, formId, status);

    const totalPages = Math.ceil(total / limit);

    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async findById(id: number) {
    const lead = await leadRepository.findById(id);

    if (!lead) {
      throw new NotFoundError("Lead not found");
    }

    return lead;
  }

  async create(data: CreateLeadRequest) {
    const { formId, ...leadData } = data;
    const l: Prisma.LeadCreateInput = {
      ...leadData,
      form: { connect: { id: formId } },
      status: "unsent",
    };

    const lead = await leadRepository.create(l);

    console.log(`Lead created: ${lead.id}`);

    const job = await leadBrokerQueue.add("bind-broker", {
      leadId: lead.id,
    });

    console.log(`Broker binding job added: ${job.id}`);

    return lead;
  }

  async update(id: number, data: UpdateLeadRequest) {
    const lead = await leadRepository.findById(id);
    const { formId, brokerId, ...leadData } = data;
    const l = {
      ...leadData,
      ...(formId !== undefined ? { form: { connect: { id: formId } } } : {}),
      ...(brokerId !== undefined
        ? { broker: { connect: { id: brokerId } }, status: "sent" }
        : {}),
    };

    if (!lead) {
      throw new NotFoundError("Lead not found");
    }

    return leadRepository.update(id, l as Prisma.LeadUpdateInput);
  }

  async delete(id: number) {
    const lead = await leadRepository.findById(id);

    if (!lead) {
      throw new NotFoundError("Lead not found");
    }
    await leadRepository.update(id, {
      deletedAt: new Date(),
    } as Prisma.BrokerUpdateInput);
    // await leadRepository.delete(id);

    return {
      message: "Lead deleted successfully",
    };
  }
}

export default new LeadService();
