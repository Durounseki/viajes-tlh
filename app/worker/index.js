import { Hono } from "hono";
import imageApp from "./images/index.js";
import usersApp from "./users/index.js";
import bookingsApp from "./bookings/index.js";
import paymentsApp from "./payments/index.js";
import authApp from "./auth/index.js";
import tripsApp from "./trips/index.js";
import reviewsApp from "./reviews/index.js";
import paymentPlansApp from "./payment-plans/index.js";
import includedItemsApp from "./included-items/index.js";
import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { seedDatabase } from "../prisma/seed.js";

const app = new Hono();

app.get("/api/seed", async (c) => {
  try {
    const adapter = new PrismaD1(c.env.DB);
    const prisma = new PrismaClient({ adapter });

    console.log("Starting seed from API...");
    await seedDatabase(prisma);
    console.log("Seed from API finished.");

    return c.json({ message: "Database seeded successfully!" });
  } catch (error) {
    console.error("Error seeding database:", error);
    return c.json(
      { error: "Failed to seed database", message: error.message },
      500
    );
  }
});

app.route("/api/auth", authApp);
app.route("/api/images", imageApp);
app.route("/api/users", usersApp);
app.route("/api/bookings", bookingsApp);
app.route("/api/payments", paymentsApp);
app.route("/api/reviews", reviewsApp);
app.route("/api/trips", tripsApp);
app.route("/api/payment-plans", paymentPlansApp);
app.route("/api/included-items", includedItemsApp);

export default app;
