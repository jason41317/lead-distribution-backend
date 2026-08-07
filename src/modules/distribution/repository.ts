import prisma from "../../prisma/prisma";
import { Prisma } from "@prisma/client";

class DistributionRepository {
  findAll() {
    return prisma.distribution.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        form: true
      }
    });
  }

  findById(id: number) {
    return prisma.distribution.findUnique({
      where: {
        id,
      },
      include: {
        brokers: true
      }
    });
  }

  create(data: Prisma.DistributionCreateInput) {
    return prisma.distribution.create({
      data
    });
  }

  update(id: number, data: Prisma.DistributionUpdateInput) {
    return prisma.distribution.update({
      where: {
        id,
      },
      data,
    });
  }

  delete(id: number) {
    return prisma.distribution.delete({
      where: {
        id,
      },
    });
  }

  async createDistributionBrokers(
    id: number,
    data: Prisma.DistributionBrokerCreateManyInput[],
  ) {
    await prisma.distributionBroker.deleteMany({
      where: { distributionId: id },
    });

    return prisma.distributionBroker.createMany({ data });
  }
}

export default new DistributionRepository();
