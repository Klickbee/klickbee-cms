import BuilderComponent from "@/components/builder/Builder";
import { getPageById } from "@/feature/page/lib/pages";
import { PageLight } from "@/feature/page/types/page";
import { getSetting } from "@/feature/settings/lib/settings";

export default async function BuilderPage() {
	return <BuilderComponent />;
}
