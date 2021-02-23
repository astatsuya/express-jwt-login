import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTodo = async () => {
  const todo = await prisma.todo.create({
    data: {
      description: "firstTodo",
      userId: 1,
    },
  });
};

export const getTodo = async () => {
  const todo = await prisma.todo.findMany({
    where: {
      userId: 1,
    },
    include: {
      user: true,
    },
  });
  console.dir(todo, { depth: null });
};
