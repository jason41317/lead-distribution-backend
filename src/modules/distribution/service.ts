import { Prisma } from "@prisma/client";
import distributionRepository from "./repository.js";
import formRepository from "../form/repository.js";
import NotFoundError from "../../errors/NotFoundError.js";
import { CreateDistributionBrokersRequest, CreateDistributionRequest, UpdateDistributionRequest } from "./schema.js";
import ValidationError from "../../errors/ValidationError.js";

class DistributionService {
  async findAll() {
    return distributionRepository.findAll();
  }

  async findById(id: number) {
    const distribution = await distributionRepository.findById(id);

    if (!distribution) {
      throw new NotFoundError("Distribution not found");
    }

    return distribution;
  }

  async create(data: CreateDistributionRequest) {
    const forms = await formRepository.findAll();

    if (forms.length === 0) {
      throw new ValidationError("Oops, please create a form first.");
    }

    const distributions = await distributionRepository.findAll();

    if (distributions.length >= 1) {
      throw new ValidationError("Only one distribution can be created");
    }

    const distribution = await distributionRepository.create({
      form: { connect: { id: data.formId } },
      name: data.name,
    } as Prisma.DistributionCreateInput);

    if (data && data.brokers && data.brokers.length > 0) {
      await distributionRepository.createDistributionBrokers(distribution.id, 
        data.brokers.map((broker) => (
          { ...broker, distributionId: distribution.id }
        ))  
      )
    }

    return distribution;
  }

  async update(id: number, data: UpdateDistributionRequest) {
    const distribution = await distributionRepository.findById(id);

    if (!distribution) {
      throw new NotFoundError("Distribution not found");
    }

    const updatedDistribution = await distributionRepository.update(id, {
      form: { connect: { id: data.formId } },
      name: data.name,
    } as Prisma.DistributionUpdateInput);

    if (data && data.brokers && data.brokers.length > 0) {
      await distributionRepository.createDistributionBrokers(id, 
        data.brokers.map((broker) => (
          { ...broker, distributionId: id }
        ))  
      )
    }
    return updatedDistribution
  }

  async delete(id: number) {
    const distribution = await distributionRepository.findById(id);

    if (!distribution) {
      throw new NotFoundError("Distribution not found");
    }
    await distributionRepository.update(id, {
      deletedAt: new Date(),
    } as Prisma.DistributionUpdateInput);

    return {
      message: "Distribution deleted successfully",
    };
  }

  async createDistributionBrokers(
    id: number,
    data: CreateDistributionBrokersRequest,
  ) {
    const distribution = await distributionRepository.findById(id);

    if (!distribution) {
      throw new NotFoundError("Distribution not found");
    }

    return distributionRepository.createDistributionBrokers(id, data.map((d) => (
      {
        ...d,
        distributionId: id
      }
    )));
  }
}

export default new DistributionService();
