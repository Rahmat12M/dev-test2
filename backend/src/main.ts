
import "@/db/index";
import { initDb } from "@/db/db";
import app from '@/app';
import dotenv from 'dotenv';

dotenv.config();

// Authentifizieren und Tabellen abgleichen
await initDb();
const SERVER_PORT: number = Number(process.env.PORT || 3000);

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});
