import { Hono } from "hono";
import imageApp from "./images/images.js";
import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";

const app = new Hono();

app.route("/api/images", imageApp);

app.get("/api/viajes", async (c) => {
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

app.get("/api/viajes/:id", async (c) => {
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

app.put("/api/viajes/:id", async (c) => {
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

app.post("/api/viajes", async (c) => {
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

app.get("/api/payment-plans", async (c) => {
  try {
    const adapter = new PrismaD1(c.env.DB);
    const prisma = new PrismaClient({ adapter });
    const plans = await prisma.paymentPlan.findMany();
    return c.json(plans);
  } catch (error) {
    console.error("Error fetching payment plans:", error);
    return c.json({ error: "Failed to fetch payment plans" }, 500);
  }
});

app.post("/api/payment-plans", async (c) => {
  try {
    const planData = await c.req.json();
    const adapter = new PrismaD1(c.env.DB);
    const prisma = new PrismaClient({ adapter });
    const newPlanId = await prisma.paymentPlan.create({
      data: {
        name: planData.name,
        installments: {
          createMany: {
            data: planData.installments,
          },
        },
      },
      select: {
        id: true,
      },
    });
    return c.json({ message: "Nuevo plan de pago creado", id: newPlanId }, 201);
  } catch (error) {
    console.error("Error creating payment plan:", error);
    return c.json({ error: "Failed to create payment plan" }, 500);
  }
});

app.get("/api/included-items", async (c) => {
  try {
    const adapter = new PrismaD1(c.env.DB);
    const prisma = new PrismaClient({ adapter });
    const items = await prisma.includedItem.findMany();
    return c.json(items);
  } catch (error) {
    console.error("Error fetching included items:", error);
    return c.json({ error: "Failed to fetch included items" }, 500);
  }
});

app.post("/api/included-items", async (c) => {
  try {
    const itemData = await c.req.json();
    const adapter = new PrismaD1(c.env.DB);
    const prisma = new PrismaClient({ adapter });
    const newItemId = await prisma.includedItem.create({
      data: {
        name: itemData.name,
      },
      select: {
        id: true,
      },
    });
    return c.json({ message: 'Nuevo "incluye" creado', id: newItemId.id }, 201);
  } catch (error) {
    console.error("Error creating included item:", error);
    return c.json({ error: "Failed to create included item" }, 500);
  }
});

export default app;
