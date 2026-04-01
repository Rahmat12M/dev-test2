import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import routesAuth from "@/routes/routesAuth";
import routesUser from "@/routes/routesUser";
import routesBook from "./routes/routesBook";

const app = express();
// Fixe Ports, via ENV überschreibbar
const CLIENT_PORT: number = Number(process.env.CLIENT_PORT || 4400);
const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN || `http://localhost:${CLIENT_PORT}`;

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
//  SessionID via cookie
app.use(
  session({
    secret: process.env.SESSION_SECRET ?? "dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // localhost sin https
      maxAge: 1000 * 60 * 60 * 24, // 1 día
    },
  }),
);

app.use(routesAuth);
app.use(routesUser);
app.use(routesBook);

export default app;
