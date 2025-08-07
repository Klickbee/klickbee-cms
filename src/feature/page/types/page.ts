// biome-ignore-all lint: Prisma DOC
import { BaseComponent } from "@/builder/types/components/component";
import type { Page } from "@/generated/prisma";

export type { Page } from "@/generated/prisma";

export type PageLight = Pick<Page, "id" | "title" | "slug" | "content">;

declare global {
	namespace PrismaJson {
		type PageContentMetaType = BaseComponent[] | {};
	}
}

export {};
