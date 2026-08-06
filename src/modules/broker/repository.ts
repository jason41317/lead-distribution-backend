import prisma from "../../prisma/prisma";
import { Prisma } from "@prisma/client";

class BrokerRepository {
  findAll() {
    return prisma.broker.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  findById(id: number) {
    return prisma.broker.findUnique({
      where: {
        id,
      },
    });
  }

  create(data: Prisma.BrokerCreateInput) {
    return prisma.broker.create({
      data,
    });
  }

  update(id: number, data: Prisma.BrokerUpdateInput) {
    return prisma.broker.update({
      where: {
        id,
      },
      data,
    });
  }

  delete(id: number) {
    return prisma.broker.delete({
      where: {
        id,
      },
    });
  }
}

export default new BrokerRepository();
