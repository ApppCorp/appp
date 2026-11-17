import type { JSX } from "react";
import React from "react";
import { useTranslations } from "next-intl";

import { Eyebrow, Reveal } from "@/components";

type WhyItem = {
	description: string
	title: string
};

export default function WhyUs(): JSX.Element {
	const t = useTranslations("home");
	const items = t.raw("whyUs.items") as WhyItem[];

	return (
		<section className="bg-ink-deep">
			<div className="mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-32">
				<Reveal>
					<Eyebrow inverse>{t("whyUs.eyebrow")}</Eyebrow>
					<h2 className="mt-8 max-w-2xl font-serif text-3xl leading-[1.12] text-base-100 sm:text-4xl lg:text-5xl">
						{t("whyUs.title")}
					</h2>
				</Reveal>
				<div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-4 lg:gap-8">
					{items.map((item, index) => (
						<Reveal delay={0.07 * index} key={item.title}>
							<div className="border-t border-white/15 pt-7">
								<span className="text-[10px] font-medium uppercase tracking-[0.2em] text-secondary">
									{String(index + 1).padStart(2, "0")}
								</span>
								<h3 className="mt-4 font-serif text-lg leading-snug text-base-100 lg:text-xl">
									{item.title}
								</h3>
								<p className="mt-3 text-sm leading-relaxed text-base-100/60">
									{item.description}
								</p>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
