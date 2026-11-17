import type { JSX } from "react";
import React from "react";
import { useTranslations } from "next-intl";
import { Mail, MapPin } from "lucide-react";

import { EnquiryForm, Eyebrow, Reveal } from "@/components";

export default function Contact(): JSX.Element {
	const t = useTranslations("home");
	const topics = t.raw("contact.topics") as string[];

	return (
		<section className="bg-base-200" id="contact">
			<div className="mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-36">
				<div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
					<div className="lg:col-span-5">
						<Reveal>
							<Eyebrow>{t("contact.eyebrow")}</Eyebrow>
							<h2 className="mt-8 max-w-xl font-serif text-3xl leading-[1.12] text-primary sm:text-4xl lg:text-5xl">
								{t("contact.title")}
							</h2>
						</Reveal>
						<Reveal delay={0.08}>
							<p className="mt-7 text-sm font-medium uppercase tracking-[0.16em] text-primary/50">
								{t("contact.subtitle")}
							</p>
							<ul className="mt-6 space-y-3">
								{topics.map((topic) => (
									<li className="flex items-baseline gap-3 text-sm text-primary/75" key={topic}>
										<span className="h-px w-5 shrink-0 translate-y-[-3px] bg-secondary" />
										{topic}
									</li>
								))}
							</ul>
						</Reveal>
						<Reveal delay={0.14}>
							<div className="mt-12 space-y-6 border-t border-primary/10 pt-10">
								<div className="flex items-start gap-4">
									<MapPin className="mt-0.5 size-4 shrink-0 text-secondary" strokeWidth={1.5} />
									<div>
										<h3 className="text-xs font-medium uppercase tracking-[0.16em] text-primary/50">
											{t("contact.address")}
										</h3>
										<p className="mt-2 text-sm leading-relaxed text-primary/75">
											Australia Premium Products Platform Pty Ltd
											<br />
											PO Box 21471, Sydney, NSW 2002, Australia
										</p>
									</div>
								</div>
								<div className="flex items-start gap-4">
									<Mail className="mt-0.5 size-4 shrink-0 text-secondary" strokeWidth={1.5} />
									<div>
										<h3 className="text-xs font-medium uppercase tracking-[0.16em] text-primary/50">
											{t("contact.email")}
										</h3>
										<a
											className="mt-2 block text-sm text-primary/75 transition-colors duration-500 hover:text-secondary"
											href="mailto:sales_appp@outlook.com"
										>
											sales_appp@outlook.com
										</a>
									</div>
								</div>
							</div>
						</Reveal>
					</div>
					<div className="lg:col-span-7">
						<Reveal delay={0.1} distance={36}>
							<div className="rounded-[2rem] bg-primary/[0.04] p-1.5">
								<div className="rounded-[calc(2rem-0.375rem)] bg-base-100 p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] lg:p-12">
									<h3 className="font-serif text-2xl text-primary">
										{t("contact.form.title")}
									</h3>
									<div className="mt-8">
										<EnquiryForm />
									</div>
								</div>
							</div>
						</Reveal>
					</div>
				</div>
			</div>
		</section>
	);
}
