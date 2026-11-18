import type { JSX } from "react";
import React from "react";
import { useTranslations } from "next-intl";

import { Eyebrow, Figure, Reveal } from "@/components";
import { cn } from "@/utils/cn";
import type { ImageSlot } from "@/utils/images";

interface ServiceItem {
	description: string
	image: string
	title: string
}

export default function Services(): JSX.Element {
	const t = useTranslations("home");
	const items = t.raw("services.items") as ServiceItem[];

	return (
		<section className={cn("bg-base-200")} id="services">
			<div className={cn("mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-36")}>
				<Reveal>
					<Eyebrow>{t("services.eyebrow")}</Eyebrow>
					<h2 className={cn("mt-8 max-w-2xl font-serif text-3xl leading-[1.12] text-primary sm:text-4xl lg:text-5xl")}>
						{t("services.title")}
					</h2>
				</Reveal>
				<div className={cn("mt-14 grid gap-5 lg:mt-20 lg:grid-cols-6")}>
					{items.map((item, index) => {
						const wide = index < 2;
						return (
							<Reveal
								key={item.title}
								className={cn(wide ? "lg:col-span-3" : "lg:col-span-2")}
								delay={0.06 * (index % 3)}
							>
								<article className={cn("group h-full rounded-[2rem] bg-primary/[0.04] p-1.5 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/[0.07]")}>
									<div className={cn("flex h-full flex-col overflow-hidden rounded-[calc(2rem-0.375rem)] bg-base-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]")}>
										<div className={cn("overflow-hidden", wide ? "h-64 lg:h-80" : "h-52 lg:h-60")}>
											<Figure
												alt={item.title}
												className={cn("h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]")}
												sizes={wide ? "(min-width: 1024px) 48vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"}
												slot={item.image as ImageSlot}
											/>
										</div>
										<div className={cn("flex flex-1 flex-col p-7 lg:p-9")}>
											<span className={cn("text-[10px] font-medium uppercase tracking-[0.2em] text-secondary")}>
												{String(index + 1).padStart(2, "0")}
											</span>
											<h3 className={cn("mt-4 font-serif text-xl leading-snug text-primary lg:text-2xl")}>
												{item.title}
											</h3>
											<p className={cn("mt-3 text-sm leading-relaxed text-primary/65")}>
												{item.description}
											</p>
										</div>
									</div>
								</article>
							</Reveal>
						);
					})}
				</div>
			</div>
		</section>
	);
}