import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";

const app = new Hono();

app.post("/", async (c) => {
  try {
    const { amount, method, bookingUserId, bookingTripId, reference } =
      await c.req.json();

    if (!amount || !method || !bookingUserId || !bookingTripId) {
      return c.json({ error: "Missing required payment details" }, 400);
    }

    const adapter = new PrismaD1(c.env.DB);
    const prisma = new PrismaClient({ adapter });

    const newPayment = await prisma.payment.create({
      data: {
        amount: amount,
        method: method,
        bookingUserId: bookingUserId,
        bookingTripId: bookingTripId,
        reference: reference || null,
      },
    });
    return c.json(newPayment, 201);
  } catch (error) {
    console.error("Error creating payment:", error);
    return c.json({ error: "Failed to create payment" }, 500);
  }
});

app.delete("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const adapter = new PrismaD1(c.env.DB);
    const prisma = new PrismaClient({ adapter });

    await prisma.payment.delete({
      where: { id: id },
    });
    return c.json({ message: "Payment deleted successfully" });
  } catch (error) {
    console.error("Error deleting payment:", error);
    return c.json({ error: "Failed to delete payment" }, 500);
  }
});

export default app;
