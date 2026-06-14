// run-migration.ts

import "dotenv/config";
import { createClient } from "@libsql/client";
import fs from "fs";

async function main() {
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });

  const sql = fs.readFileSync(
    "./drizzle/0000_violet_joystick.sql",
    "utf8"
  );

  await client.executeMultiple(sql);

  console.log("Migration executed successfully");
}

main().catch(console.error);