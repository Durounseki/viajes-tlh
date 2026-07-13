import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";

const app = new Hono();

app.get("/sitemap.xml", async (c) => {
  const adapter = new PrismaD1(c.env.DB);
  const prisma = new PrismaClient({ adapter });
  try {
    const trips = await prisma.trip.findMany({
      where: { status: "PUBLISHED" },
      select: { id: true, slug: true, updatedAt: true },
    });

    const urls = [
      { loc: "https://viajerasporsiempre.com/", changefreq: "daily", priority: "1.0" },
      { loc: "https://viajerasporsiempre.com/nosotros", changefreq: "monthly", priority: "0.8" },
      { loc: "https://viajerasporsiempre.com/contacto", changefreq: "monthly", priority: "0.8" },
      { loc: "https://viajerasporsiempre.com/galeria", changefreq: "weekly", priority: "0.7" },
      { loc: "https://viajerasporsiempre.com/preguntas-frecuentes", changefreq: "monthly", priority: "0.5" },
      { loc: "https://viajerasporsiempre.com/terminos-y-condiciones", changefreq: "monthly", priority: "0.3" },
      { loc: "https://viajerasporsiempre.com/aviso-de-privacidad", changefreq: "monthly", priority: "0.3" },
    ];

    for (const trip of trips) {
      const slug = trip.slug || trip.id;
      urls.push({
        loc: `https://viajerasporsiempre.com/viajes/${slug}`,
        lastmod: trip.updatedAt.toISOString().split("T")[0],
        changefreq: "weekly",
        priority: "0.9",
      });
    }

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>` : ""}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

    return c.text(sitemapXml, 200, {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return c.text("Error generating sitemap", 500);
  }
});

app.get("/robots.txt", (c) => {
  return c.text(
    "User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: https://viajerasporsiempre.com/sitemap.xml"
  );
});

app.get("/viajes/:slug", async (c) => {
  const slug = c.req.param("slug");

  if (slug.includes(".")) {
    if (c.env.ASSETS) {
      return c.env.ASSETS.fetch(c.req.raw);
    }
    return c.notFound();
  }

  const adapter = new PrismaD1(c.env.DB);
  const prisma = new PrismaClient({ adapter });

  try {
    const trip = await prisma.trip.findFirst({
      where: {
        OR: [
          { id: slug },
          { slug: slug }
        ]
      },
      include: {
        images: {
          select: { src: true }
        }
      }
    });

    let indexResponse;
    if (c.env.ASSETS) {
      indexResponse = await c.env.ASSETS.fetch(new URL("/index.html", c.req.url));
    } else {
      indexResponse = await fetch(new URL("/index.html", c.req.url));
    }
    let htmlText = await indexResponse.text();

    if (trip) {
      const title = `${trip.destination} | Viajeras por Siempre`;
      const desc = trip.description || "";
      const imageUrl = trip.images?.[0]?.src
        ? `https://viajerasporsiempre.com/api/images/${trip.images[0].src}`
        : "https://viajerasporsiempre.com/social-share.png";
      const canonicalUrl = `https://viajerasporsiempre.com/viajes/${trip.slug || trip.id}`;

      htmlText = htmlText.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);

      htmlText = htmlText.replace(/(<meta[^>]*name="description"[^>]*content=")([^"]*)("[^>]*>)/i, `$1${desc}$3`);
      htmlText = htmlText.replace(/(<meta[^>]*property="og:description"[^>]*content=")([^"]*)("[^>]*>)/i, `$1${desc}$3`);
      htmlText = htmlText.replace(/(<meta[^>]*name="twitter:description"[^>]*content=")([^"]*)("[^>]*>)/i, `$1${desc}$3`);

      htmlText = htmlText.replace(/(<meta[^>]*property="og:title"[^>]*content=")([^"]*)("[^>]*>)/i, `$1${title}$3`);
      htmlText = htmlText.replace(/(<meta[^>]*name="twitter:title"[^>]*content=")([^"]*)("[^>]*>)/i, `$1${title}$3`);
      htmlText = htmlText.replace(/(<meta[^>]*property="og:image"[^>]*content=")([^"]*)("[^>]*>)/i, `$1${imageUrl}$3`);
      htmlText = htmlText.replace(/(<meta[^>]*name="twitter:image"[^>]*content=")([^"]*)("[^>]*>)/i, `$1${imageUrl}$3`);
      
      if (/<link[^>]*rel="canonical"[^>]*>/i.test(htmlText)) {
        htmlText = htmlText.replace(/(<link[^>]*rel="canonical"[^>]*href=")([^"]*)("[^>]*>)/i, `$1${canonicalUrl}$3`);
      } else {
        htmlText = htmlText.replace("</head>", `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
      }
    }

    return c.html(htmlText);
  } catch (error) {
    console.error("Error in pre-rendering:", error);
    try {
      if (c.env.ASSETS) {
        return c.env.ASSETS.fetch(new URL("/index.html", c.req.url));
      } else {
        return fetch(new URL("/index.html", c.req.url));
      }
    } catch (fallbackError) {
      return c.html("<h1>Internal Server Error</h1><p>Failed to serve the fallback index.html.</p>", 500);
    }
  }
});

export default app;
