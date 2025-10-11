import { Hono } from "hono";
const app = new Hono();

app.post("/api/contacto", async (c) => {
  try {
    const body = await c.req.json();
    console.log(body);
    return c.json({ message: "Recibido" });
  } catch (error) {
    console.log("Error submitting the form.");
    return c.json({ message: error }, 500);
  }
});
export default app;
