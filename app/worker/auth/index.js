import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { hashPassword, verifyPassword } from "./crypto.js";

const app = new Hono();

export const authMiddleware = async (c, next) => {
  const token = getCookie(c, "auth_token");

  if (!token) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const secret = c.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not configured.");

    const payload = await verify(token, secret);
    c.set("user", payload);
    await next();
  } catch (error) {
    return c.json({ error: `Invalid or expired token: ${error}` }, 401);
  }
};

const sendResetEmail = async (sender, receiver, resetLink, resendApiKey) => {
  const emailHtml = `
    <h1>Restablecer tu Contraseña</h1>
    <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
    <a href="${resetLink}">Restablecer Contraseña</a>
    <p>Este enlace expirará en 1 hora.</p>
    <p>Si no solicitaste esto, por favor ignora este correo.</p>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: sender,
        to: receiver,
        subject: "Restablecer Contraseña",
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error({ message: "Error sending reset link:", errorData });
    }
    const data = await response.json();

    console.log("Email sent successfully via Resend:", data);
  } catch (error) {
    console.error("Failed to send email:", error.errorData);
  }
};

app.post("/login", async (c) => {
  try {
    const { username, password } = await c.req.json();

    if (!c.env.ADMIN_KV) {
      throw new Error("Admin KV store is not configured.");
    }

    const storedHashAndSalt = await c.env.ADMIN_KV.get(username);
    if (!storedHashAndSalt) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    const isMatch = await verifyPassword(password, storedHashAndSalt);
    if (!isMatch) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    const payload = {
      sub: username,
      role: "admin",
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    };
    const secret = c.env.JWT_SECRET;
    const token = await sign(payload, secret);

    setCookie(c, "auth_token", token, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 60 * 60 * 24 * 7,
    });

    return c.json({ message: "Logged in successfully" });
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ error: "Login failed" }, 500);
  }
});

app.get("/", authMiddleware, (c) => {
  const user = c.get("user");
  return c.json({ user: user.sub });
});

app.post("/logout", authMiddleware, (c) => {
  deleteCookie(c, "auth_token", {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  return c.json({ message: "Logged out" });
});

app.put("/password", authMiddleware, async (c) => {
  try {
    const { oldPassword, newPassword } = await c.req.json();
    const user = c.get("user");
    const username = user.sub;

    const storedHashAndSalt = await c.env.ADMIN_KV.get(username);

    const isMatch = await verifyPassword(oldPassword, storedHashAndSalt);
    if (!isMatch) {
      return c.json({ error: "Invalid current password" }, 403);
    }

    const newHashedPassword = await hashPassword(newPassword);

    await c.env.ADMIN_KV.put(username, newHashedPassword);

    return c.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Password change error:", error);
    return c.json({ error: "Failed to update password" }, 500);
  }
});

app.post("/password-reset", async (c) => {
  try {
    const { email } = await c.req.json();
    const userExists = await c.env.ADMIN_KV.get(email);

    if (userExists) {
      const token = crypto.randomUUID();
      const tokenKey = `reset_${token}`;

      await c.env.ADMIN_KV.put(tokenKey, email, { expirationTtl: 3600 });

      const frontendUrl = c.env.FRONTEND_URL || "http://localhost:5173";
      const resetLink = `${frontendUrl}/reset-password-confirm?token=${token}`;

      await sendResetEmail(
        c.env.SENDER_EMAIL,
        email,
        resetLink,
        c.env.RESEND_API_KEY
      );
    }

    return c.json({
      message:
        "Revisa tu correo y haz click en link para restaurar tu contraseña.",
    });
  } catch (error) {
    console.error("Password reset request error:", error);
    return c.json({ error: "Failed to process request" }, 500);
  }
});

app.post("/password-reset-confirm", async (c) => {
  try {
    const { token, newPassword } = await c.req.json();

    const tokenKey = `reset_${token}`;

    const email = await c.env.ADMIN_KV.get(tokenKey);

    if (!email) {
      return c.json(
        { error: "El link a expirado o el correo es invalido" },
        401
      );
    }

    const newHashedPassword = await hashPassword(newPassword);

    await c.env.ADMIN_KV.put(email, newHashedPassword);

    await c.env.ADMIN_KV.delete(tokenKey);

    return c.json({ message: "Tu contraseña ha sido restablecida" });
  } catch (error) {
    console.error("Password reset confirmation error:", error);
    return c.json({ error: "Failed to reset password" }, 500);
  }
});

export default app;
