import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import env from "~/lib/env";

import * as schema from "./schema";

const client = createClient({
  url: `file:${env.DB_FILE_NAME}`,
});

const db = drizzle(client, { schema, casing: "snake_case" });

export default db;
