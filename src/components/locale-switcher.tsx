"use client";
import type { JSX } from "react";
import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { cn } from "@/utils/cn";

interface LocaleSwitcherProps {

	/** 当前所在章节，切换语言后尽量停留在同一位置 */
	activeSection?: string
	className?: string

	/** 深色底（页脚、移动端全屏菜单）用 inverse */
	inverse?: boolean
}

const LOCALES = ["zh", "en"] as const;

/**
 * 中英文切换。
 *
 * 站内导航全部是 `#section` 锚点，所以切换语言时要带上当前的锚点，
 * 否则读者会被甩回页面顶部。锚点优先取地址栏里的 hash，
 * 没有 hash 时退回到当前滚动到的章节。
 */
export function LocaleSwitcher({ activeSection = "", className, inverse = false }: LocaleSwitcherProps): JSX.Element {
	const t = useTranslations("navbar.language");
	const locale = useLocale();
	const [hash, setHash] = useState("");

	useEffect(() => {
		const sync = (): void => setHash(window.location.hash);
		sync();
		window.addEventListener("hashchange", sync);
		return () => window.removeEventListener("hashchange", sync);
	}, []);

	const anchor = hash || (activeSection ? `#${activeSection}` : "");

	return (
		<div aria-label={t("label")} className={cn("flex items-center gap-1", className)} role="group">
			{LOCALES.map(code => {
				const active = code === locale;
				return (
					<Link
						key={code}
						aria-current={active ? "true" : undefined}
						className={cn(
							"relative rounded-full px-2 py-1 text-[11px] tracking-wide transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
							active
								? inverse ? "text-base-100" : "text-primary"
								: inverse ? "text-base-100/45 hover:text-base-100" : "text-primary/45 hover:text-primary"
						)}
						href={anchor ? { hash: anchor, pathname: "/" } : { pathname: "/" }}
						locale={code}
					>
						{t(code)}
						{active
							? <span className={cn("absolute inset-x-2 -bottom-0.5 h-px bg-secondary")} />

							: null}
					</Link>
				);
			})}
		</div>
	);
}