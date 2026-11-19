"use client";
import type { JSX } from "react";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

import { LocaleSwitcher, Logo } from "@/components";
import { useActiveSection } from "@/hooks";
import { cn } from "@/utils/cn";

const SECTIONS = [
	"home",
	"about",
	"services",
	"products",
	"china-market",
	"private-label",
	"contact"
] as const;

export function Navbar(): JSX.Element {
	const t = useTranslations("navbar");
	const [open, setOpen] = useState(false);
	const active = useActiveSection(SECTIONS);

	return (
		<>
			<header className={cn("fixed inset-x-0 top-0 z-50")}>
				<div className={cn("mx-auto max-w-7xl px-4 pt-4 lg:px-8 lg:pt-6")}>
					<nav className={cn("flex items-center justify-between gap-4 rounded-full border border-primary/8 bg-base-100/85 py-2 pl-4 pr-2 shadow-[0_20px_55px_-32px_rgba(18,50,74,0.55)] backdrop-blur-xl lg:pl-5 lg:pr-3")}>
						<a className={cn("flex shrink-0 items-center gap-2.5")} href="#home">
							<Logo className={cn("size-6 text-secondary")} />
							<span className={cn("font-serif text-lg tracking-tight text-primary")}>{t("title")}</span>
						</a>
						<ul className={cn("hidden items-center gap-0.5 lg:flex")}>
							{SECTIONS.map(id => (
								<li key={id}>
									<a
										className={cn(
											"relative rounded-full px-3 py-2 text-[13px] tracking-wide transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
											active === id ? "text-primary" : "text-primary/55 hover:text-primary"
										)}
										href={`#${id}`}
									>
										{t(`links.${id}`)}
										{active === id
											? <span className={cn("absolute inset-x-3 -bottom-0.5 h-px bg-secondary")} />

											: null}
									</a>
								</li>
							))}
						</ul>
						<div className={cn("flex shrink-0 items-center gap-2")}>
							<LocaleSwitcher activeSection={active} className={cn("hidden lg:flex")} />
							<a
								className={cn("hidden rounded-full bg-primary px-5 py-2.5 text-[13px] font-medium text-primary-content transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-secondary hover:text-secondary-content active:scale-[0.98] sm:inline-flex")}
								href="#contact"
							>
								{t("cta")}
							</a>
							<button
								aria-label={open ? t("close") : t("menu")}
								className={cn("flex size-10 items-center justify-center rounded-full text-primary transition-colors duration-500 hover:bg-primary/8 lg:hidden")}
								type="button"
								onClick={() => setOpen(!open)}
							>
								{open ? <X className={cn("size-5")} strokeWidth={1.5} /> : <Menu className={cn("size-5")} strokeWidth={1.5} />}
							</button>
						</div>
					</nav>
				</div>
			</header>
			<AnimatePresence>
				{open
					? (
						<motion.div
							animate={{ opacity: 1 }}
							className={cn("fixed inset-0 z-40 bg-ink-deep/95 backdrop-blur-2xl lg:hidden")}
							exit={{ opacity: 0 }}
							initial={{ opacity: 0 }}
							transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
						>
							<nav className={cn("flex h-full flex-col justify-center px-8")}>
								<ul className={cn("space-y-1")}>
									{SECTIONS.map((id, index) => (
										<li key={id}>
											<motion.a
												animate={{ opacity: 1, y: 0 }}
												className={cn("block py-3 font-serif text-3xl text-base-100")}
												href={`#${id}`}
												initial={{ opacity: 0, y: 40 }}
												transition={{ delay: 0.06 * index + 0.1, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
												onClick={() => setOpen(false)}
											>
												{t(`links.${id}`)}
											</motion.a>
										</li>
									))}
								</ul>
								<motion.div
									animate={{ opacity: 1, y: 0 }}
									className={cn("mt-10 flex flex-wrap items-center gap-4")}
									initial={{ opacity: 0, y: 40 }}
									transition={{ delay: 0.5, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
								>
									<a
										className={cn("inline-flex items-center gap-3 rounded-full bg-secondary px-6 py-3 text-sm font-medium text-secondary-content")}
										href="#contact"
										onClick={() => setOpen(false)}
									>
										{t("cta")}
									</a>
									<LocaleSwitcher activeSection={active} inverse />
								</motion.div>
							</nav>
						</motion.div>
					)
					: null}
			</AnimatePresence>
		</>
	);
}