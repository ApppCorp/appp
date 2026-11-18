import type { JSX } from "react";
import React from "react";
import { useTranslations } from "next-intl";

import { Eyebrow, Figure, Reveal } from "@/components";
import { cn } from "@/utils/cn";
import type { ImageSlot } from "@/utils/images";

interface ChinaBlock {
	description: string[]
	image: string
	status: string
	title: string
}

export default function ChinaMarket(): JSX.Element {
	const t = useTranslations("home");
	const blocks = t.raw("chinaMarket.items") as ChinaBlock[];

	return (
		<section className={cn("bg-base-200")} id="china-market">
			<div className={cn("mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-36")}>
				<Reveal>
					<Eyebrow>{t("chinaMarket.eyebrow")}</Eyebrow>
					<h2 className={cn("mt-8 max-w-3xl font-serif text-3xl leading-[1.12] text-primary sm:text-4xl lg:text-5xl")}>
						{t("chinaMarket.title")}
					</h2>
				</Reveal>
				<div className={cn("mt-16 space-y-20 lg:mt-24 lg:space-y-28")}>
					{blocks.map((block, index) => {
						const flipped = index % 2 === 1;
						return (
							<div key={block.title} className={cn("grid items-center gap-12 lg:grid-cols-12 lg:gap-16")}>
								<div className={cn("lg:col-span-6", flipped && "lg:order-2")}>
									<Reveal>
										<div className={cn("relative")}>
											<div className={cn("absolute -inset-3 hidden rounded-[2.25rem] border border-secondary/30 lg:block")} />
											<Figure
												alt={block.title}
												className={cn("relative h-[280px] w-full rounded-[1.75rem] object-cover shadow-[0_40px_80px_-40px_rgba(18,50,74,0.5)] sm:h-[380px] lg:h-[460px]")}
												sizes="(min-width: 1024px) 46vw, 100vw"
												slot={block.image as ImageSlot}
											/>
										</div>
									</Reveal>
								</div>
								<div className={cn("lg:col-span-6", flipped && "lg:order-1")}>
									<Reveal delay={0.08}>
										<span className={cn("inline-flex items-center gap-2.5 rounded-full border border-secondary/40 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-primary/70")}>
											<span className={cn("size-1 rounded-full bg-secondary")} />
											{block.status}
										</span>
									</Reveal>
									<Reveal delay={0.14}>
										<h3 className={cn("mt-7 font-serif text-2xl leading-snug text-primary sm:text-3xl lg:text-4xl")}>
											{block.title}
										</h3>
									</Reveal>
									<Reveal delay={0.2}>
										<div className={cn("mt-7 max-w-xl space-y-5")}>
											{block.description.map(paragraph => (
												<p key={paragraph} className={cn("text-base leading-relaxed text-primary/70")}>
													{paragraph}
												</p>
											))}
										</div>
									</Reveal>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}