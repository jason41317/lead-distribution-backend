import { Prisma } from "@prisma/client";
import brokerRepository from "./repository.js";
import NotFoundError from "../../errors/NotFoundError.js";
import { CreateBrokerRequest, UpdateBrokerRequest } from "./schema.js";

class BrokerService {
  async findAll(page: number, limit: number, search: string) {
    const { items, total } = await brokerRepository.findAll(page, limit, search);

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
    const broker = await brokerRepository.findById(id);

    if (!broker) {
      throw new NotFoundError("Broker not found");
    }

    return broker;
  }

  async create(data: CreateBrokerRequest) {
    return brokerRepository.create(data as Prisma.BrokerCreateInput);
  }

  async update(id: number, data: UpdateBrokerRequest) {
    const broker = await brokerRepository.findById(id);

    if (!broker) {
      throw new NotFoundError("Broker not found");
    }

    return brokerRepository.update(id, data as Prisma.BrokerUpdateInput);
  }

  async delete(id: number) {
    const broker = await brokerRepository.findById(id);

    if (!broker) {
      throw new NotFoundError("Broker not found");
    }
    await brokerRepository.update(id, {
      deletedAt: new Date(),
    } as Prisma.BrokerUpdateInput);
    // await brokerRepository.delete(id);

    return {
      message: "Broker deleted successfully",
    };
  }
}

export default new BrokerService();
