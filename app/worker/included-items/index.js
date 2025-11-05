import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";

const app = new Hono();

app.get("/", async (c) => {
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

app.post("/", async (c) => {
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
