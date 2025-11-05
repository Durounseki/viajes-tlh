import { Hono } from "hono";
import imageApp from "./images/index.js";
import usersApp from "./users/index.js";
import bookingsApp from "./bookings/index.js";
import paymentsApp from "./payments/index.js";
import authApp from "./auth/index.js";
import tripsApp from "./trips/index.js";
import reviewsApp from "./reviews/index.js";
import paymentPlansApp from "./payment-plans/index.js";
import includedItemsApp from "./included-items/index.js";

const app = new Hono();

app.route("/api/auth", authApp);
app.route("/api/images", imageApp);
app.route("/api/users", usersApp);
app.route("/api/bookings", bookingsApp);
app.route("/api/payments", paymentsApp);
app.route("/api/reviews", reviewsApp);
app.route("/api/trips", tripsApp);
app.route("/api/payment-plans", paymentPlansApp);
app.route("/api/included-items", includedItemsApp);

export default app;
