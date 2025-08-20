import BuilderStyleAdvanced from "./_partials/Advanced";
import BuilderStyleBackground from "./_partials/Background";
import BuilderStyleBordersAndCorners from "./_partials/BordersAndCorners";
import BuilderStyleContent from "./_partials/Content";
import BuilderStyleEffects from "./_partials/Effects";
import BuilderStyleLayout from "./_partials/Layout";
import BuilderStyleSizeAndSpacing from "./_partials/SizeAndSpacing";
import BuilderStyleTypography from "./_partials/Typography";

export default function BuilderStyleProperties() {
	return (
		<>
			<BuilderStyleContent />
			<BuilderStyleBackground />
			<BuilderStyleTypography />
			<BuilderStyleSizeAndSpacing />
			<BuilderStyleLayout />
			<BuilderStyleEffects />
			<BuilderStyleBordersAndCorners />
			<BuilderStyleAdvanced />
		</>
	);
}
