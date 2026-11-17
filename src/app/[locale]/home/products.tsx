import type { JSX } from "react";
import React from "react";
import { useTranslations } from "next-intl";

import { Eyebrow, Figure, Reveal } from "@/components";
import type { ImageSlot } from "@/utils/images";

type ProductItem = {
	description: string
	image: string
	list: string[]
	note: string
	title: string
};

export default function Products(): JSX.Element {
	const t = useTranslations("home");
	const items = t.raw("products.items") as ProductItem[];

	return (
		<section className="bg-base-100" id="products">
			<div className="mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-36">
				<Reveal>
					<Eyebrow>{t("products.eyebrow")}</Eyebrow>
					<h2 className="mt-8 max-w-2xl font-serif text-3xl leading-[1.12] text-primary sm:text-4xl lg:text-5xl">
						{t("products.title")}
					</h2>
				</Reveal>
				<div className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-3">
					{items.map((item, index) => (
						<Reveal delay={0.08 * index} key={item.title}>
							<article className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-primary/[0.04] p-1.5 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/[0.07]">
								<div className="flex h-full flex-col overflow-hidden rounded-[calc(2rem-0.375rem)] bg-base-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
									{item.image
										? (
											<div className="h-56 overflow-hidden lg:h-64">
												<Figure
													alt={item.title}
													className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
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
											<div className="flex flex-col bg-primary p-7 text-primary-content lg:p-9">
												<span className="text-[10px] font-medium uppercase tracking-[0.2em] text-secondary">
													Selected brands
												</span>
												<h3 className="mt-5 font-serif text-xl leading-snug lg:text-2xl">
													{item.title}
												</h3>
												<p className="mt-3 text-sm leading-relaxed text-primary-content/70">
													{item.description}
												</p>
												<ul className="mt-6 space-y-1.5">
													{item.list.map((entry) => (
														<li className="font-serif text-lg leading-snug lg:text-xl" key={entry}>
															{entry}
														</li>
													))}
												</ul>
											</div>
										)}
									<div className="flex flex-1 flex-col p-7 lg:p-9">
										{item.image
											? (
												<>
													<h3 className="font-serif text-xl leading-snug text-primary lg:text-2xl">
														{item.title}
													</h3>
													<p className="mt-3 text-sm leading-relaxed text-primary/65">
														{item.description}
													</p>
													<ul className="mt-6 space-y-3">
														{item.list.map((entry) => (
															<li className="flex items-baseline gap-3 text-base text-primary/85" key={entry}>
																<span className="h-px w-4 shrink-0 translate-y-[-3px] bg-secondary" />
																<span className="font-serif">{entry}</span>
															</li>
														))}
													</ul>
												</>
											)
											: null}
										{item.note
											? (
												<p className={`text-xs leading-relaxed text-primary/45 ${item.image ? "mt-auto pt-7" : ""}`}>
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
