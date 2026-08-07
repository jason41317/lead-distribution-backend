import prisma from "../../prisma/prisma";
import { Prisma } from "@prisma/client";

class LeadRepository {
  findAll() {
    return prisma.lead.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
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
