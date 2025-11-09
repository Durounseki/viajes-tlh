import { Hono } from "hono";
const app = new Hono();
import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { authMiddleware } from "../auth/index";

app.get("/", authMiddleware, async (c) => {
  try {
    const adapter = new PrismaD1(c.env.DB);
    const prisma = new PrismaClient({ adapter });
    const users = await prisma.user.findMany({
      include: {
        bookings: {
          include: {
            trip: {
              select: {
                id: true,
                destination: true,
                startDate: true,
                endDate: true,
                price: true,
              },
            },
            payments: {
              select: {
                id: true,
                amount: true,
                paymentDate: true,
                method: true,
              },
              orderBy: {
                paymentDate: "desc",
              },
            },
          },
        },
      },
      orderBy: { name: "asc" },
    });
    return c.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return c.json({ error: "Failed to fetch users" }, 500);
  }
});

app.post("/", authMiddleware, async (c) => {
  try {
    const userInfo = await c.req.json();
    const adapter = new PrismaD1(c.env.DB);
    const prisma = new PrismaClient({ adapter });
    const newUserId = await prisma.user.create({
      data: {
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        isSuscribed: userInfo.isSuscribed,
      },
      select: {
        id: true,
      },
    });
    return c.json({ id: newUserId.id }, 201);
  } catch (error) {
    console.error("Error creating user:", error);
    return c.json({ error: "Failed to create user" }, 500);
  }
});

app.put("/:id", authMiddleware, async (c) => {
  try {
    const { id: userId } = c.req.param();
    const userInfo = await c.req.json();
    const adapter = new PrismaD1(c.env.DB);
    const prisma = new PrismaClient({ adapter });
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        isSuscribed: userInfo.isSuscribed,
      },
    });
    return c.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return c.json({ error: "Failed to update user" }, 500);
  }
});

app.delete("/:id", authMiddleware, async (c) => {
  try {
    const { id: userId } = c.req.param();
    const adapter = new PrismaD1(c.env.DB);
    const prisma = new PrismaClient({ adapter });
    await prisma.user.delete({
      where: { id: userId },
    });
    return c.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return c.json({ error: "Failed to delete user" }, 500);
  }
});

export default app;
