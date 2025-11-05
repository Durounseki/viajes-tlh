import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { authMiddleware } from "../auth/index";
const app = new Hono();

app.get("/published", async (c) => {
  try {
    const adapter = new PrismaD1(c.env.DB);
    const prisma = new PrismaClient({ adapter });
    console.log("Prisma:", prisma);
    const reviews = await prisma.review.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });
    return c.json(reviews);
  } catch (error) {
    console.error("Error fetching published reviews:", error);
    return c.json({ error: "Failed to fetch reviews" }, 500);
  }
});

app.post("/", async (c) => {
  try {
    const { author, quote } = await c.req.json();

    const adapter = new PrismaD1(c.env.DB);
    const prisma = new PrismaClient({ adapter });

    const newReview = await prisma.review.create({
      data: {
        author,
        quote,
        isPublished: false,
      },
    });

    return c.json(newReview, 201);
  } catch (error) {
    console.error("Error submitting review:", error);
    return c.json({ error: "Failed to submit review" }, 500);
  }
});

app.get("/", authMiddleware, async (c) => {
  try {
    const adapter = new PrismaD1(c.env.DB);
    const prisma = new PrismaClient({ adapter });
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: "desc" },
    });
    return c.json(reviews);
  } catch (error) {
    console.error("Error fetching all reviews:", error);
    return c.json({ error: "Failed to fetch reviews" }, 500);
  }
});

app.put("/:id", authMiddleware, async (c) => {
  try {
    const { id } = c.req.param();
    const { isPublished } = await c.req.json();

    if (typeof isPublished !== "boolean") {
      return c.json(
        { error: "Invalid 'isPublished' value. Must be true or false." },
        400
      );
    }

    const adapter = new PrismaD1(c.env.DB);
    const prisma = new PrismaClient({ adapter });

    const updatedReview = await prisma.review.update({
      where: { id: id },
      data: { isPublished },
    });

    return c.json(updatedReview);
  } catch (error) {
    console.error("Error updating review:", error);
    return c.json({ error: "Failed to update review" }, 500);
  }
});

app.delete("/:id", authMiddleware, async (c) => {
  try {
    const { id } = c.req.param();
    const adapter = new PrismaD1(c.env.DB);
    const prisma = new PrismaClient({ adapter });

    await prisma.review.delete({
      where: { id: id },
    });

    return c.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    return c.json({ error: "Failed to delete review" }, 500);
  }
});

export default app;
