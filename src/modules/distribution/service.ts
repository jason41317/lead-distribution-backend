import { Prisma } from "@prisma/client";
import distributionRepository from "./repository";
import NotFoundError from "../../errors/NotFoundError";
import { CreateDistributionRequest, UpdateDistributionRequest } from "./schema";
import ValidationError from "../../errors/ValidationError";

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
    const forms = await distributionRepository.findAll();

    if (forms.length >= 1) {
      throw new ValidationError("Only one distribution can be created");
    }

    return distributionRepository.create({
      form: { connect: { id: data.formId } },
    } as Prisma.DistributionCreateInput);
  }

  async update(id: number, data: UpdateDistributionRequest) {
    const distribution = await distributionRepository.findById(id);

    if (!distribution) {
      throw new NotFoundError("Distribution not found");
    }

    return distributionRepository.update(id, data as Prisma.DistributionUpdateInput);
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
}

export default new DistributionService();
