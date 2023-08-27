
import prisma from "@/lib/db";
import getCurrentUser from "./session";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
    const currentUser = await getCurrentUser()
    const userId = currentUser?.userId
    
  if (!userId) {
    return false;
  }

  const userSubscription = await prisma.userSubscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  })

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

  return !!isValid;
};