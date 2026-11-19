import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

/**
 * 带 locale 前缀的导航 API。
 *
 * `Link` 传入 `locale` 即可跳到另一个语言版本，
 * 路径前缀由 next-intl 自动补上（/zh/... → /en/...）。
 */
export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing);