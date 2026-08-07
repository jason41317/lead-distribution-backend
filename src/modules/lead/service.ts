import { Prisma } from "@prisma/client";
import leadRepository from "./repository";
import NotFoundError from "../../errors/NotFoundError";
import { CreateLeadRequest, UpdateLeadRequest } from "./schema";

class LeadService {
    async findAll(page: number, limit: number, search: string) {
        const { items, total } = await leadRepository.findAll(page, limit, search);
    
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
        const { formId, ...leadData } = data
        const lead: Prisma.LeadCreateInput = {
            ...leadData,
            form: { connect: { id: formId } },
            status: "unsent",
        }
        return leadRepository.create(lead);
    }

    async update(id: number, data: UpdateLeadRequest) {
        const lead = await leadRepository.findById(id);

        if (!lead) {
            throw new NotFoundError("Lead not found");
        }

        return leadRepository.update(id, data as Prisma.LeadUpdateInput);
    }

    async delete(id: number) {
        const lead = await leadRepository.findById(id);

        if (!lead) {
            throw new NotFoundError("Lead not found");
        }
        await leadRepository.update(id, { deletedAt: new Date() } as Prisma.BrokerUpdateInput);
        // await leadRepository.delete(id);

        return {
            message: "Lead deleted successfully",
        };
    }
}

export default new LeadService();