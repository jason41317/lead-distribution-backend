import prisma from "../../prisma/prisma";

export class AuthRepository {
  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}

export default new AuthRepository();
