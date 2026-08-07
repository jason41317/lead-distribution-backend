import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
    const exists = await prisma.user.findUnique({
        where: {
            email: "admin@example.com",
        },
    });
    if (exists) {
        console.log("Admin already exists.");
        return;
    }
    const password = await bcrypt.hash("password123", 10);
    await prisma.user.create({
        data: {
            email: "admin@example.com",
            password,
        },
    });
    console.log("Admin created.");
}
main()
    .catch(console.error)
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map