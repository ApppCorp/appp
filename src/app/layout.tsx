import type { JSX, ReactNode } from "react";
import { Fragment } from "react";

/**
 * 根布局。
 *
 * Next.js 要求 app 目录下每个路由都有根布局；app/page.tsx（跳转到 /en）
 * 位于 [locale] 段之外，因此需要这一个透传布局。
 *
 * <html> / <body> 与主题、字体仍由 [locale]/layout.tsx 提供，
 * 保持 next-intl 的标准结构。
 */
export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
	return <Fragment>{children}</Fragment>;
}