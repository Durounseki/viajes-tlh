import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import * as queries from "./queries.js";

export default function createPrismaClient(env) {
  const adapter = new PrismaD1(env.DB);
  const prisma = new PrismaClient({
    adapter,
  }).$extends({
    model: {
      user: {
        createUser: queries.createUser,
        getUsers: queries.getUsers,
        getUserById: queries.getUserById,
        updateUserInfo: queries.updateUserInfo,
        deleteUser: queries.deleteUser,
      },
      trip: {
        createTrip: queries.createTrip,
        getTrips: queries.getTrips,
      },
      paymentPlan: {
        getPlans: queries.getPlans,
        createPlan: queries.createPlan,
      },
      includedItem: {
        getItems: queries.getItems,
        createItem: queries.createItem,
      },
    },
  });
  return prisma;
}
