import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { authMiddleware } from "../auth/index";

const app = new Hono();

app.get("/", authMiddleware, async (c) => {
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

app.post("/", authMiddleware, async (c) => {
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

export default app;
