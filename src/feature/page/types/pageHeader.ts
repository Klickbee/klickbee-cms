import type { PageHeader } from "@/generated/prisma";

export type { PageHeader } from "@/generated/prisma";

export type PageHeaderLight = Pick<PageHeader, "id" | "content">;

export {};
