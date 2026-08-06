import prisma from "../prisma/prisma";
import BaseRepository from "./BaseRepository";

class AuthRepository extends BaseRepository<typeof prisma.user> {
  constructor() {
    super(prisma.user);
  }

  findByEmail(email: string) {
    return this.model.findUnique({
      where: {
        email,
      },
    });
  }
}
