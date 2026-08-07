import prisma from "../../prisma/prisma.js";
import { Prisma } from "@prisma/client";

class LeadRepository {
  async findAll(page: number, limit: number, search: string) {
    const skip = (page - 1) * limit;
    const whereClause = {
      name: {
        contains: search,
      }
    };

    const [items, total] = await prisma.$transaction([
      prisma.lead.findMany({
        skip,
        take: limit,
        orderBy: {
          id: "desc",
        },
        where: whereClause,
        include: {
          form: true,
          broker: true
        }
      }),

      prisma.lead.count({
        where: whereClause
      }),
    ]);

    return {
      items,
      total,
    };
  }

  findByBrokerId(brokerId: number) {
    return prisma.lead.findMany({
      where: {
        brokerId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  findById(id: number) {
    return prisma.lead.findUnique({
      where: {
        id,
      },
    });
  }

  create(data: Prisma.LeadCreateInput) {
    return prisma.lead.create({
      data,
    });
  }

  update(id: number, data: Prisma.LeadUpdateInput) {
    return prisma.lead.update({
      where: {
        id,
      },
      data,
    });
  }

  delete(id: number) {
    return prisma.lead.delete({
      where: {
        id,
      },
    });
  }
}

export default new LeadRepository();
