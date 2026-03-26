import { prisma } from "./database/client";

async function main() {
  const users = await prisma.user.findMany();
  console.log(users);
}

main();