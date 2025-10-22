import { Hono } from "hono";
import createPrismaClient from "./db/client.js";
import imageApp from "./images/images.js";

const app = new Hono();

app.use("*", async (c, next) => {
  c.set("prisma", createPrismaClient(c.env));
  await next();
});

app.route("/api/images", imageApp);

app.get("/api/viajes", async (c) => {
  try {
    const prisma = c.get("prisma");
    const trips = await prisma.trip.getTrips();
    return c.json(trips);
  } catch (error) {
    console.error("Error fetching trips:", error);
    return c.json({ error: "Failed to fetch trips" }, 500);
  }
});

app.post("/api/viajes", async (c) => {
  try {
    const tripInfo = await c.req.json();
    const draftsKV = c.env.DRAFTS;
    const prisma = c.get("prisma");

    if (tripInfo.status === "DRAFT") {
      const draftId = tripInfo.id || crypto.randomUUID();
      const draftData = {
        ...tripInfo,
        id: draftId,
      };
      await draftsKV.put(`draft:${draftId}`, JSON.stringify(draftData), {
        metadata: {
          id: draftId,
          destination: draftData.destination,
        },
      });
      return c.json(draftData, 201);
    } else {
      const newTripId = await prisma.trip.createTrip(tripInfo);
      if (tripInfo.id) {
        await draftsKV.delete(`draft:${tripInfo.id}`);
      }
      return c.json({ message: "Nuevo viaje creado", id: newTripId }, 201);
    }
  } catch (error) {
    console.error("Error creating trip:", error);
    return c.json({ error: "Failed to create trip" }, 500);
  }
});

app.get("/api/payment-plans", async (c) => {
  try {
    const prisma = c.get("prisma");
    const plans = await prisma.paymentPlan.getPlans();
    return c.json(plans);
  } catch (error) {
    console.error("Error fetching payment plans:", error);
    return c.json({ error: "Failed to fetch payment plans" }, 500);
  }
});

app.post("/api/payment-plans", async (c) => {
  try {
    const planData = await c.req.json();
    const prisma = c.get("prisma");
    const newPlanId = await prisma.paymentPlan.createPlan(planData);
    return c.json({ message: "Nuevo plan de pago creado", id: newPlanId }, 201);
  } catch (error) {
    console.error("Error creating payment plan:", error);
    return c.json({ error: "Failed to create payment plan" }, 500);
  }
});

app.get("/api/included-items", async (c) => {
  try {
    const prisma = c.get("prisma");
    const items = await prisma.includedItem.getItems();
    return c.json(items);
  } catch (error) {
    console.error("Error fetching included items:", error);
    return c.json({ error: "Failed to fetch included items" }, 500);
  }
});

app.post("/api/included-items", async (c) => {
  try {
    const itemData = await c.req.json();
    const prisma = c.get("prisma");
    const newItemId = await prisma.includedItem.createItem(itemData);
    return c.json({ message: 'Nuevo "incluye" creado', id: newItemId }, 201);
  } catch (error) {
    console.error("Error creating included item:", error);
    return c.json({ error: "Failed to create included item" }, 500);
  }
});

export default app;
