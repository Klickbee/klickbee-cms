// biome-ignore-all lint: Prisma DOC
import { BuilderComponent } from "@/feature/builder/types/components/components";
import type { Page } from "@/generated/prisma";

export type { Page } from "@/generated/prisma";

export type PageLight = Pick<Page, "id" | "title" | "slug" | "content"> & {
	pageHeaderId?: Page["pageHeaderId"];
	pageFooterId?: Page["pageFooterId"];
};

declare global {
	namespace PrismaJson {
		type PageContentMetaType = BuilderComponent[] | {};
	}
}

export {};
