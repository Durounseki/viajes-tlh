import { Hono } from "hono";
const app = new Hono();

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
      const fileKey = `${crypto.randomUUID()}-${file.name}`;

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

// const sizes = {
//   placeholder: {
//     width: 30,
//     height: 30,
//   },
//   thumbnail: {
//     width: 60,
//     height: 60,
//   },
//   small: {
//     width: 120,
//   },
//   medium: {
//     width: 360,
//   },
//   large: {
//     width: 720,
//   },
//   full: {},
// };

// app.get("/:key", async (c) => {
//   try {
//     if (/images/.test(c.req.header("Via"))) {
//       return fetch(c.req);
//     }
//     const accepts = c.req.header("Accept");
//     const key = c.req.param("key");
//     const size = sizes[c.req.query("size")];

//     if (size) {
//       const requestUrl = new URL(c.req.url);
//       requestUrl.search = "";
//       const imageURL = requestUrl.pathname;
//       console.log("Requesting image from:", imageURL);

//       let options = { cf: { image: { fit: "scale-down" } } };
//       options.cf.image = { ...options.cf.image, ...size };

//       if (/image\/avif/.test(accepts)) {
//         options.cf.image.format = "avif";
//       } else if (/image\/webp/.test(accepts)) {
//         options.cf.image.format = "webp";
//       }

//       if (!/\.(jpe?g|png|gif|webp)$/i.test(key)) {
//         if (/\.avif$/i.test(key)) {
//           return fetchOriginal(c, key);
//         } else {
//           return c.json({ message: "File extension not supported" }, 400);
//         }
//       }
//       const imageRequest = new Request(imageURL, {
//         headers: c.req.header(),
//       });

//       return fetch(imageRequest, options);
//     } else {
//       return fetchOriginal(c, key);
//     }
//   } catch (error) {
//     console.error("Error processing image:", error);
//     return c.json({ error: "Failed to process image" }, 500);
//   }
// });

// async function fetchOriginal(c, key) {
//   try {
//     const file = await c.env.BUCKET.get(key);
//     if (!file) {
//       console.error("File not found");
//       return c.json({ error: "Image not found" }, 404);
//     }
//     const body = file.body;
//     const contentType =
//       file.httpMetadata?.contentType || "aplication/octet-stream";
//     const headers = new Headers();
//     headers.set("Content-Type", contentType);
//     return new Response(body, { headers });
//   } catch (error) {
//     console.error("Error fetching image:", error);
//     return c.json({ error: "Failed to fetch image" }, 500);
//   }
// }

const sizes = {
  placeholder: { width: 30, height: 30, fit: "cover" },
  thumbnail: { width: 60, height: 60, fit: "cover" },
  small: { width: 120, fit: "scale-down" },
  medium: { width: 360, fit: "scale-down" },
  large: { width: 720, fit: "scale-down" },
  full: { fit: "scale-down" },
};

app.get("/:key", async (c) => {
  try {
    const key = c.req.param("key");
    const sizeKey = c.req.query("size");
    const size = sizes[sizeKey];

    const file = await c.env.BUCKET.get(key);
    if (!file) {
      console.error("File not found in R2 for key:", key);
      return c.json({ error: "Image not found" }, 404);
    }

    const headers = new Headers();
    headers.set(
      "Content-Type",
      file.httpMetadata?.contentType || "application/octet-stream"
    );
    headers.set("Cache-Control", "public, max-age=604800");

    let options = {};

    if (size) {
      const accepts = c.req.header("Accept");
      options.cf = {
        image: { ...size },
      };
      if (/image\/avif/.test(accepts)) {
        options.cf.image.format = "avif";
      } else if (/image\/webp/.test(accepts)) {
        options.cf.image.format = "webp";
      }
    }

    return new Response(file.body, {
      headers,
      ...options,
    });
  } catch (error) {
    console.error("Error processing image:", error);
    return c.json({ error: "Failed to process image" }, 500);
  }
});

export default app;
