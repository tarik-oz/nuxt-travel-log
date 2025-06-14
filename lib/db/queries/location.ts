import { and, eq } from "drizzle-orm";
import { customAlphabet } from "nanoid";

import db from "..";
import { type InsertLocation, location } from "../schema";

const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 5);

export async function findLocationByName(existing: InsertLocation, userId: number) {
  return db.query.location.findFirst({
    where: and(
      eq(location.slug, existing.name),
      eq(location.userId, userId),
    ),
  });
}

export async function findLocationBySlug(slug: string) {
  return db.query.location.findFirst({
    where: eq(location.slug, slug),
  });
}

export async function findUniqueSlug(slug: string) {
  let existing = !!(await findLocationBySlug(slug));

  while (existing) {
    const id = nanoid();
    const idSlug = `${slug}-${id}`;
    existing = !!(await findLocationBySlug(idSlug));
    if (!existing) {
      return idSlug;
    }
  }

  return slug;
}

export async function insertLocation(insertable: InsertLocation, slug: string, userId: number) {
  const [created] = await db.insert(location).values({
    ...insertable,
    slug,
    userId,
  }).returning();

  return created;
}
