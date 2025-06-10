import "dotenv/config";
import { defineConfig } from "drizzle-kit";

import env from "./lib/env";

export default defineConfig({
  out: "./lib/db/migrations",
  schema: "./lib/db/schema/index.ts",
  casing: "snake_case",
  dialect: "sqlite",
  dbCredentials: {
    url: env.DB_FILE_NAME,
  },
});
