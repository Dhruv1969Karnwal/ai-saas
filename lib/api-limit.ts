import prisma from "@/lib/db";
import { MAX_FREE_COUNTS } from "@/constants";
import getCurrentUser from "./session";

export const incrementApiLimit = async () => {
  const currentUser = await getCurrentUser();
  const userId = currentUser?.userId;

  if (!userId) {
    return;
  }

  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: { userId: userId },
  });

  if (userApiLimit) {
    await prisma.userApiLimit.update({
      where: { userId: userId },
      data: { count: userApiLimit.count + 1 },
    });
  } else {
    await prisma.userApiLimit.create({
      data: { userId: userId, count: 1 },
    });
  }
};

export const checkApiLimit = async () => {
  const currentUser = await getCurrentUser();
  const userId = currentUser?.userId;

  if (!userId) {
    return false;
  }

  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: { userId: userId },
  });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
};


