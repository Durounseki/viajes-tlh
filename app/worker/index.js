import { Hono } from "hono";
const app = new Hono();

app.get("/api/", (c) => {
  console.log("Request received");
  return c.json({ name: "Cloudflare with Hono" });
});
export default app;
