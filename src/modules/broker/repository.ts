import prisma from "../../prisma/prisma.js";
import { Prisma } from "@prisma/client";

class BrokerRepository {
  async findAll(page: number, limit: number, search: string) {
    const skip = (page - 1) * limit;
    const whereClause = {
      name: {
        contains: search,
      },
      deletedAt: null,
    };

    const [items, total] = await prisma.$transaction([
      prisma.broker.findMany({
        skip,
        take: limit,
        orderBy: {
          id: "desc",
        },
        where: whereClause,
      }),

      prisma.broker.count({
        where: whereClause,
      }),
    ]);

    return {
      items,
      total,
    };
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

  async findEligibleForDistribution(distributionId: number) {
    return prisma.distributionBroker.findMany({
      where: {
        distributionId,
        active: true,
        broker: {
          active: true,
        },
      },
      include: {
        broker: true,
      },
    });
  }

  async getSentToday(brokerId: number, start: Date, end: Date) {
    return prisma.lead.count({
      where: {
        brokerId,
        createdAt: {
          gte: start,
          lt: end,
        },
        status: {
          not: "duplicate",
        },
      },
    });
  }

  async getTotalSentToday(start: Date, end: Date) {
    return prisma.lead.count({
      where: {
        createdAt: {
          gte: start,
          lt: end,
        },
        brokerId: {
          not: null,
        },
        status: {
          not: "duplicate",
        },
      },
    });
  }

  async getDailyLeadCount(brokerId: number, start: Date, end: Date) {
    return prisma.lead.count({
      where: {
        brokerId,
        createdAt: {
          gte: start,
          lt: end,
        },
        status: {
          not: "duplicate",
        },
      },
    });
  }
}

export default new BrokerRepository();
