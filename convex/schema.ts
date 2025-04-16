import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    role: v.union(v.literal("candidate"), v.literal("interviewer")), // Either candidate or interviewer
    clerkId: v.string(),
  }).index("by_clerk_id", ["clerkId"]), // Index for fast lookups by clerkId
});
