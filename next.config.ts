import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

type HeaderRule = Awaited<ReturnType<NonNullable<NextConfig["headers"]>>>;

function createHeader(): HeaderRule {
	// 静态资源由 Cloudflare 的 ASSETS 绑定直接返回，不经过 Next，所以那部分请求头写在 public/_headers 中
	return [
		{
			headers: [
				{ key: "X-Content-Type-Options", value: "nosniff" },
				{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
				{ key: "X-Frame-Options", value: "SAMEORIGIN" }
			],
			source: "/:path*"
		}
	];
}

const nextConfig: NextConfig = {
	headers: createHeader,
	images: {
		unoptimized: true
	}
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
