import prisma from "../../prisma/prisma";
import { Prisma } from "@prisma/client";

class FormRepository {
  findAll() {
    return prisma.form.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  findById(id: number) {
    return prisma.form.findUnique({
      where: {
        id,
      },
    });
  }

  create(data: Prisma.FormCreateInput) {
    return prisma.form.create({
      data,
    });
  }

  update(id: number, data: Prisma.FormUpdateInput) {
    return prisma.form.update({
      where: {
        id,
      },
      data,
    });
  }

  delete(id: number) {
    return prisma.form.delete({
      where: {
        id,
      },
    });
  }
}

export default new FormRepository();
