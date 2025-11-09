import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { authMiddleware } from "../auth/index";

const app = new Hono();

app.get("/", async (c) => {
  try {
    const adapter = new PrismaD1(c.env.DB);
    const prisma = new PrismaClient({ adapter });
    const trips = await prisma.trip.findMany({
      select: {
        id: true,
        destination: true,
        startDate: true,
        endDate: true,
        price: true,
        currency: true,
        images: {
          select: {
            id: true,
            src: true,
            alt: true,
          },
        },
      },
      orderBy: {
        startDate: "asc",
      },
    });
    return c.json(trips);
  } catch (error) {
    console.error("Error fetching trips:", error);
    return c.json({ error: "Failed to fetch trips" }, 500);
  }
});

app.get("/:id", async (c) => {
  try {
    const { id: tripId } = c.req.param();
    const adapter = new PrismaD1(c.env.DB);
    const prisma = new PrismaClient({ adapter });
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        images: true,
        includedItems: true,
        paymentPlan: {
          include: {
            installments: true,
          },
        },
      },
    });
    return c.json(trip);
  } catch (error) {
    console.error("Error fetching trip:", error);
    return c.json({ error: "Failed to fetch trip" }, 500);
  }
});

app.put("/:id", authMiddleware, async (c) => {
  try {
    const { id: tripId } = c.req.param();
    const tripData = await c.req.json();
    delete tripData.id;
    delete tripData.createdAt;
    delete tripData.updatedAt;
    const adapter = new PrismaD1(c.env.DB);
    const prisma = new PrismaClient({ adapter });
    const updatedTrip = await prisma.trip.update({
      where: { id: tripId },
      data: tripData,
    });
    return c.json(updatedTrip);
  } catch (error) {
    console.error("Error updating trip:", error);
    return c.json({ error: "Failed to update trip" }, 500);
  }
});

app.delete("/:id", authMiddleware, async (c) => {
  try {
    const { id: tripId } = c.req.param();
    const adapter = new PrismaD1(c.env.DB);
    const prisma = new PrismaClient({ adapter });
    await prisma.trip.delete({
      where: { id: tripId },
    });
    return c.json({ message: "Viaje eliminado correctamente" });
  } catch (error) {
    console.error("Error deleting trip:", error);
    return c.json({ error: "Failed to delete trip" }, 500);
  }
});

app.post("/", authMiddleware, async (c) => {
  try {
    const tripInfo = await c.req.json();
    const adapter = new PrismaD1(c.env.DB);
    const prisma = new PrismaClient({ adapter });
    const newTripId = await prisma.trip.create({
      data: tripInfo,
      select: {
        id: true,
      },
    });
    return c.json({ id: newTripId.id }, 201);
  } catch (error) {
    console.error("Error creating trip:", error);
    return c.json({ error: "Failed to create trip" }, 500);
  }
});

export default app;
