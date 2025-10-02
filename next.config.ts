import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	experimental: {
		serverActions: {
			bodySizeLimit: "256mb",
		},
	},
};

const withNextIntl = createNextIntlPlugin(
	"./src/feature/translations/lib/request.ts",
);
export default withNextIntl(nextConfig);
