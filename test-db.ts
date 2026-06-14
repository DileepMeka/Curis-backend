import "dotenv/config";
import { createClient } from "@libsql/client";

async function testConnection() {
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!
  });

  const result = await client.execute(
    "SELECT 1 as test"
  );

  console.log(result.rows);
}

testConnection();