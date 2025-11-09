import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { authMiddleware } from "../auth/index";

const app = new Hono();

app.get("/", async (c) => {
  try {
    const adapter = new PrismaD1(c.env.DB);
    const prisma = new PrismaClient({ adapter });
    const bookings = await prisma.booking.findMany({
      include: {
        payments: {
          orderBy: {
            paymentDate: "asc",
          },
        },
      },
      orderBy: {
        bookingDate: "desc",
      },
    });
    return c.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return c.json({ error: "Failed to fetch bookings" }, 500);
  }
});

app.post("/", authMiddleware, async (c) => {
  try {
    const { userId, tripId, notes } = await c.req.json();
    if (!userId || !tripId) {
      return c.json({ error: "User ID and Trip ID are required" }, 400);
    }
    const adapter = new PrismaD1(c.env.DB);
    const prisma = new PrismaClient({ adapter });
    const newBooking = await prisma.booking.create({
      data: {
        userId: userId,
        tripId: tripId,
        notes: notes || null,
      },
    });
    return c.json(newBooking, 201);
  } catch (error) {
    console.error("Error creating booking:", error);
    if (error.code === "P2002") {
      return c.json(
        { error: "This user already has a booking for this trip" },
        409
      );
    }
    return c.json({ error: "Failed to create booking" }, 500);
  }
});

app.get("/:userId/:tripId", async (c) => {
  try {
    const { userId, tripId } = c.req.param();
    const adapter = new PrismaD1(c.env.DB);
    const prisma = new PrismaClient({ adapter });
    const booking = await prisma.booking.findUnique({
      where: {
        userId_tripId: { userId, tripId },
      },
      include: {
        payments: true,
        user: true,
        trip: true,
      },
    });

    if (!booking) {
      return c.json({ error: "Booking not found" }, 404);
    }
    return c.json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    return c.json({ error: "Failed to fetch booking" }, 500);
  }
});

app.delete("/:userId/:tripId", authMiddleware, async (c) => {
  try {
    const { userId, tripId } = c.req.param();
    const adapter = new PrismaD1(c.env.DB);
    const prisma = new PrismaClient({ adapter });

    await prisma.booking.delete({
      where: {
        userId_tripId: { userId, tripId },
      },
    });
    return c.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return c.json({ error: "Failed to delete booking" }, 500);
  }
});

export default app;
