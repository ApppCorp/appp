import type { JSX } from "react";
import React from "react";
import { useTranslations } from "next-intl";
import { Mail, MapPin } from "lucide-react";

import { Button, Logo } from "@/components";

const LINKS = [
	{ key: "home", href: "#home" },
	{ key: "about", href: "#about" },
	{ key: "services", href: "#services" },
	{ key: "products", href: "#products" },
	{ key: "china-market", href: "#china-market" },
	{ key: "private-label", href: "#private-label" },
	{ key: "contact", href: "#contact" }
] as const;

export function Footer(): JSX.Element {
	const t = useTranslations("footer");
	const n = useTranslations("navbar");
	const notice = t.raw("notice") as string[];

	return (
		<footer className="bg-ink-deep text-base-100">
			<div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
				<div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
					<div className="lg:col-span-5">
						<div className="flex items-center gap-2.5">
							<Logo className="size-7 text-secondary" />
							<span className="font-serif text-xl tracking-tight">{n("title")}</span>
						</div>
						<p className="mt-6 max-w-sm text-sm leading-relaxed text-base-100/60">
							{t("legalName")}
						</p>
						<div className="mt-8">
							<Button href="#contact" variant="light">
								{t("cta")}
							</Button>
						</div>
					</div>
					<div className="lg:col-span-3">
						<h3 className="text-[10px] font-medium uppercase tracking-[0.22em] text-secondary">
							{t("quickLinks")}
						</h3>
						<ul className="mt-6 space-y-3">
							{LINKS.map((link) => (
								<li key={link.key}>
									<a
										className="text-sm text-base-100/60 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-secondary"
										href={link.href}
									>
										{n(`links.${link.key}`)}
									</a>
								</li>
							))}
						</ul>
					</div>
					<div className="lg:col-span-4">
						<h3 className="text-[10px] font-medium uppercase tracking-[0.22em] text-secondary">
							{t("address")}
						</h3>
						<div className="mt-6 space-y-5">
							<div className="flex items-start gap-3">
								<MapPin className="mt-0.5 size-4 shrink-0 text-secondary" strokeWidth={1.5} />
								<p className="text-sm leading-relaxed text-base-100/60">{t("addressValue")}</p>
							</div>
							<div className="flex items-start gap-3">
								<Mail className="mt-0.5 size-4 shrink-0 text-secondary" strokeWidth={1.5} />
								<a
									className="text-sm text-base-100/60 transition-colors duration-500 hover:text-secondary"
									href={`mailto:${t("emailValue")}`}
								>
									{t("emailValue")}
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-16 space-y-5 border-t border-white/10 pt-8 lg:mt-20">
					{notice.map((line) => (
						<p className="text-xs leading-relaxed text-base-100/45" key={line}>
							{line}
						</p>
					))}
					<p className="pt-2 text-xs text-base-100/40">{t("copyright")}</p>
				</div>
			</div>
		</footer>
	);
}
