// verify.ts

import { db } from "./src/config/db";
import { categories } from "./src/db/schema/categories";

async function main() {
  const data = await db.select().from(categories);

  console.log(data);
}

main();