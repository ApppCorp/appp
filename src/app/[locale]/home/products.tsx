import type { JSX } from "react";
import React from "react";
import { useTranslations } from "next-intl";

import { Eyebrow, Figure, Reveal } from "@/components";
import { cn } from "@/utils/cn";
import type { ImageSlot } from "@/utils/images";

interface ProductItem {
	description: string
	image: string
	list: string[]
	note: string
	title: string
}

export default function Products(): JSX.Element {
	const t = useTranslations("home");
	const items = t.raw("products.items") as ProductItem[];

	return (
		<section className={cn("bg-base-100")} id="products">
			<div className={cn("mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-36")}>
				<Reveal>
					<Eyebrow>{t("products.eyebrow")}</Eyebrow>
					<h2 className={cn("mt-8 max-w-2xl font-serif text-[length:var(--appp-size-heading)] leading-[var(--appp-leading-heading)] text-primary sm:text-[length:var(--appp-size-heading-sm)] lg:text-[length:var(--appp-size-heading-lg)]")}>
						{t("products.title")}
					</h2>
				</Reveal>
				<div className={cn("mt-14 grid gap-5 lg:mt-20 lg:grid-cols-3")}>
					{items.map((item, index) => (
						<Reveal key={item.title} delay={0.08 * index}>
							<article className={cn("group flex h-full flex-col overflow-hidden rounded-[2rem] bg-primary/[0.04] p-1.5 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/[0.07]")}>
								<div className={cn("flex h-full flex-col overflow-hidden rounded-[calc(2rem-0.375rem)] bg-base-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]")}>
									{item.image
										? (
											<div className={cn("h-56 overflow-hidden lg:h-64")}>
												<Figure
													alt={item.title}
													className={cn("h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]")}
													sizes="(min-width: 1024px) 31vw, 100vw"
													slot={item.image as ImageSlot}
												/>
											</div>
										)
										: (

											/*
											 * 保健品品类按客户要求只以文字展示品牌名，不使用任何品牌 Logo，
											 * 因此这一张用深色排版卡片代替照片；标题、说明与品牌名保持连贯的阅读顺序。
											 */
											<div className={cn("flex flex-col bg-primary p-7 text-primary-content lg:p-9")}>
												<span className={cn("text-[length:var(--appp-size-label)] font-medium uppercase tracking-[var(--appp-track-label-sm)] text-secondary")}>
													{t("products.selectedBrands")}
												</span>
												<h3 className={cn("mt-5 font-serif text-xl leading-snug lg:text-2xl")}>
													{item.title}
												</h3>
												<p className={cn("mt-3 text-sm leading-relaxed text-primary-content/70")}>
													{item.description}
												</p>
												<ul className={cn("mt-6 space-y-1.5")}>
													{item.list.map(entry => (
														<li key={entry} className={cn("font-serif text-lg leading-snug lg:text-xl")}>
															{entry}
														</li>
													))}
												</ul>
											</div>
										)}
									<div className={cn("flex flex-1 flex-col p-7 lg:p-9")}>
										{item.image
											? (
												<>
													<h3 className={cn("font-serif text-xl leading-snug text-primary lg:text-2xl")}>
														{item.title}
													</h3>
													<p className={cn("mt-3 text-sm leading-relaxed text-primary/65")}>
														{item.description}
													</p>
													<ul className={cn("mt-6 space-y-3")}>
														{item.list.map(entry => (
															<li key={entry} className={cn("flex items-baseline gap-3 text-base text-primary/85")}>
																<span className={cn("h-px w-4 shrink-0 translate-y-[-3px] bg-secondary")} />
																<span className={cn("font-serif")}>{entry}</span>
															</li>
														))}
													</ul>
												</>
											)
											: null}
										{item.note
											? (
												<p className={cn("text-xs leading-relaxed text-primary/45", item.image && "mt-auto pt-7")}>
													{item.note}
												</p>
											)
											: null}
									</div>
								</div>
							</article>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}