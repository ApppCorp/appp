import type { JSX } from "react";
import React from "react";
import { useTranslations } from "next-intl";

import { Eyebrow, Figure, Reveal } from "@/components";
import { cn } from "@/utils/cn";

export default function About(): JSX.Element {
	const t = useTranslations("home");
	const description = t.raw("about.description") as string[];

	return (
		<section className={cn("bg-base-100")} id="about">
			<div className={cn("mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-36")}>
				<div className={cn("grid items-start gap-14 lg:grid-cols-12 lg:gap-20")}>
					<div className={cn("lg:col-span-5 lg:sticky lg:top-32")}>
						<Reveal>
							<div className={cn("relative")}>
								<div className={cn("absolute -inset-3 hidden rounded-[2.25rem] border border-secondary/30 lg:block")} />
								<Figure
									alt={t("about.imageAlt")}
									className={cn("relative h-[280px] w-full rounded-[1.75rem] object-cover shadow-[0_40px_80px_-40px_rgba(18,50,74,0.5)] sm:h-[400px] lg:h-[520px]")}
									sizes="(min-width: 1024px) 40vw, 100vw"
									slot="about"
								/>
							</div>
						</Reveal>
					</div>
					<div className={cn("lg:col-span-7")}>
						<Reveal>
							<Eyebrow>{t("about.eyebrow")}</Eyebrow>
						</Reveal>
						<Reveal delay={0.08}>
							<h2 className={cn("mt-8 max-w-2xl font-serif text-[length:var(--appp-size-heading)] leading-[var(--appp-leading-heading)] text-primary sm:text-[length:var(--appp-size-heading-sm)] lg:text-[length:var(--appp-size-heading-lg)]")}>
								{t("about.title")}
							</h2>
						</Reveal>
						<Reveal delay={0.16}>
							<div className={cn("mt-10 max-w-2xl space-y-6")}>
								{description.map(paragraph => (
									<p key={paragraph} className={cn("text-base leading-relaxed text-primary/70 lg:text-lg")}>
										{paragraph}
									</p>
								))}
							</div>
						</Reveal>
					</div>
				</div>
			</div>
		</section>
	);
}