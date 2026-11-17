import type { JSX } from "react";
import React from "react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

import { Button, Eyebrow, Figure, Reveal } from "@/components";

export default function PrivateLabel(): JSX.Element {
	const t = useTranslations("home");
	const description = t.raw("privateLabel.description") as string[];
	const items = t.raw("privateLabel.items") as string[];
	const disclaimer = t.raw("privateLabel.disclaimer") as string[];

	return (
		<section className="bg-base-100" id="private-label">
			<div className="mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-36">
				<div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-20">
					<div className="lg:col-span-7">
						<Reveal>
							<Eyebrow>{t("privateLabel.eyebrow")}</Eyebrow>
							<h2 className="mt-8 max-w-2xl font-serif text-3xl leading-[1.12] text-primary sm:text-4xl lg:text-5xl">
								{t("privateLabel.title")}
							</h2>
						</Reveal>
						<Reveal delay={0.08}>
							<div className="mt-8 max-w-2xl space-y-5">
								{description.map((paragraph) => (
									<p className="text-base leading-relaxed text-primary/70 lg:text-lg" key={paragraph}>
										{paragraph}
									</p>
								))}
							</div>
						</Reveal>
						<Reveal delay={0.14}>
							<ul className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2">
								{items.map((item) => (
									<li className="flex items-start gap-3 text-sm text-primary/80" key={item}>
										<Check className="mt-0.5 size-4 shrink-0 text-secondary" strokeWidth={1.75} />
										<span>{item}</span>
									</li>
								))}
							</ul>
						</Reveal>
						<Reveal delay={0.2}>
							<div className="mt-12 rounded-[1.5rem] border border-primary/10 bg-base-200 p-7">
								{disclaimer.map((line) => (
									<p className="text-xs leading-relaxed text-primary/55" key={line}>
										{line}
									</p>
								))}
							</div>
						</Reveal>
						<Reveal delay={0.26}>
							<div className="mt-10">
								<Button href="#contact">{t("privateLabel.cta")}</Button>
							</div>
						</Reveal>
					</div>
					<div className="lg:col-span-5">
						<Reveal delay={0.1} distance={40}>
							<div className="relative">
								<div className="absolute -inset-3 hidden rounded-[2.25rem] border border-secondary/30 lg:block" />
								<Figure
									alt="Production line operated by an Australian manufacturing partner"
									className="relative h-[280px] w-full rounded-[1.75rem] object-cover shadow-[0_40px_80px_-40px_rgba(18,50,74,0.5)] sm:h-[360px] lg:h-[440px]"
									sizes="(min-width: 1024px) 40vw, 100vw"
									slot="privateLabelMain"
								/>
							</div>
						</Reveal>
						<Reveal delay={0.16} distance={40}>
							<div className="relative mt-6 hidden lg:block">
								<Figure
									alt="Selected third-party Australian manufacturing partner facility"
									className="h-[240px] w-full rounded-[1.75rem] object-cover shadow-[0_40px_80px_-40px_rgba(18,50,74,0.45)]"
									sizes="(min-width: 1024px) 40vw"
									slot="privateLabelAlt"
								/>
							</div>
						</Reveal>
					</div>
				</div>
			</div>
		</section>
	);
}
