import type { JSX } from "react";
import React from "react";
import { useTranslations } from "next-intl";

import { Button, Eyebrow, Figure, Reveal } from "@/components";
import { cn } from "@/utils/cn";

export default function Hero(): JSX.Element {
	const t = useTranslations("home");
	const title = t.raw("hero.title") as string[];
	const description = t.raw("hero.description") as string[];

	return (
		<section className={cn("relative overflow-hidden bg-base-200")} id="home">
			<div className={cn("mx-auto max-w-7xl px-4 pb-20 pt-28 lg:px-8 lg:pb-28 lg:pt-32")}>
				<div className={cn("grid items-center gap-14 lg:grid-cols-12 lg:gap-16")}>
					<div className={cn("lg:col-span-6")}>
						<Reveal>
							<Eyebrow>{t("hero.eyebrow")}</Eyebrow>
						</Reveal>
						<Reveal delay={0.08}>
							<h1 className={cn("mt-7 font-serif text-[2.4rem] leading-[1.06] text-primary sm:text-5xl lg:text-[3.5rem]")}>
								{title[0]}
								<span className={cn("mt-1.5 block italic text-primary/70")}>{title[1]}</span>
							</h1>
						</Reveal>
						<Reveal delay={0.16}>
							<div className={cn("mt-7 max-w-xl space-y-4")}>
								{description.map(paragraph => (
									<p key={paragraph} className={cn("text-base leading-relaxed text-primary/70 lg:text-lg")}>
										{paragraph}
									</p>
								))}
							</div>
						</Reveal>
						<Reveal delay={0.24}>
							<div className={cn("mt-9 flex flex-wrap gap-3")}>
								<Button href="#products">{t("hero.primaryCta")}</Button>
								<Button href="#contact" variant="outline">{t("hero.secondaryCta")}</Button>
							</div>
						</Reveal>
					</div>
					<div className={cn("lg:col-span-6")}>
						<Reveal delay={0.12} distance={44}>
							<div className={cn("relative")}>
								<div className={cn("absolute -inset-3 hidden rounded-[2.25rem] border border-secondary/35 sm:block")} />
								<Figure
									alt="Australian dairy cattle grazing on open pasture"
									className={cn("relative h-[300px] w-full rounded-[1.75rem] object-cover shadow-[0_50px_90px_-45px_rgba(18,50,74,0.55)] sm:h-[400px] lg:h-[520px]")}
									sizes="(min-width: 1024px) 46vw, 100vw"
									slot="hero"
								/>
							</div>
						</Reveal>
					</div>
				</div>
			</div>
		</section>
	);
}