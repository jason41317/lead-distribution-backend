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
    });
  }

  findById(id: number) {
    return prisma.distribution.findUnique({
      where: {
        id,
      },
    });
  }

  create(data: Prisma.DistributionCreateInput) {
    return prisma.distribution.create({
      data,
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
}

export default new DistributionRepository();
