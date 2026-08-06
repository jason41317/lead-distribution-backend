import { Prisma } from "@prisma/client";
import brokerRepository from "./repository";
import NotFoundError from "../../errors/NotFoundError";
import { CreateBrokerRequest, UpdateBrokerRequest } from "./schema";

class BrokerService {
    async findAll() {
        return brokerRepository.findAll();
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
        await brokerRepository.update(id, { deletedAt: new Date() } as Prisma.BrokerUpdateInput);
        // await brokerRepository.delete(id);

        return {
            message: "Broker deleted successfully",
        };
    }
}

export default new BrokerService();