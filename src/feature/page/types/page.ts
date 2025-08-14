// biome-ignore-all lint: Prisma DOC
import { BuilderComponent } from "@/builder/types/components/components";
import type { Page } from "@/generated/prisma";

export type { Page } from "@/generated/prisma";

export type PageLight = Pick<Page, "id" | "title" | "slug" | "content">;

declare global {
	namespace PrismaJson {
		type PageContentMetaType = BuilderComponent[] | {};
	}
}

export {};
