import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function seed() {
    await prisma.user.createMany({
        data: [
           { name: "alex", email: "reachmohdaltaf@gmail.com"},
        ]
    })
}

seed().then(()=> prisma.$disconnect())