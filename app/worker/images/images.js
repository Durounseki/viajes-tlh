import { Hono } from "hono";
const app = new Hono();

app.get("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const bucket = c.env.BUCKET;
    const file = await bucket.get(id);
    if (!file) {
      return c.json({ error: "Image not found" }, 404);
    }
    const body = file.body;
    const contentType =
      file.httpMetadata?.contentType || "aplication/octet-stream";
    const headers = new Headers();
    headers.set("Content-Type", contentType);
    return new Response(body, { headers });
  } catch (error) {
    console.error("Error fetching image:", error);
    return c.json({ error: "Failed to fetch image" }, 500);
  }
});

app.post("/", async (c) => {
  try {
    const formData = await c.req.formData();
    const images = formData.getAll("images");
    const bucket = c.env.BUCKET;

    if (!images || images.length === 0) {
      return c.json({ error: "No images provided" }, 400);
    }
    const uploadResults = [];
    for (const file of images) {
      if (typeof file.stream !== "function") continue;
      const fileKey = `${crypto.randomUUID()}-${file.name.split(".").pop()}`;

      await bucket.put(fileKey, file.stream(), {
        httpMetadata: {
          contentType: file.type,
        },
      });
      uploadResults.push({ src: fileKey, alt: file.name });
    }
    return c.json(uploadResults, 201);
  } catch (error) {
    console.error("Error uploading images:", error);
    return c.json({ error: "Failed to upload images" }, 500);
  }
});

export default app;
