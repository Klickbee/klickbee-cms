"use client";

import { DeleteComponentProvider } from "@/builder/contexts/DeleteComponentContext";
import BuilderPreview from "@/components/builder/ui/BuilderPreview";
import { Toaster } from "@/components/ui/sonner";

export default function BuilderComponent() {
	return (
		<DeleteComponentProvider>
			<>
				<Toaster position={"bottom-center"} />
				<BuilderPreview />
				{/*<BuilderFloatingActions />*/}
			</>
		</DeleteComponentProvider>
	);
}
