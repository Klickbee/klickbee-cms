import BuilderTabPagesCollections from "./_partials/Pages/Collections";
import BuilderTabPagesPages from "./_partials/Pages/Pages";

export default function BuilderTabPages() {
	return (
		<>
			<BuilderTabPagesPages />
			<BuilderTabPagesCollections />
		</>
	);
}
