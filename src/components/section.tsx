import type { JSX, ReactNode } from "react";
import React from "react";

type EyebrowProps = {
	children: ReactNode
	className?: string
	/** 深色底上使用反色 */
	inverse?: boolean
};

export function Eyebrow({ children, className = "", inverse = false }: EyebrowProps): JSX.Element {
	return (
		<span
			className={`inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] ${
				inverse ? "bg-white/10 text-secondary" : "bg-primary/8 text-primary"
			} ${className}`}
		>
			<span className="size-1 rounded-full bg-secondary" />
			{children}
		</span>
	);
}

type SectionHeadingProps = {
	eyebrow?: string
	inverse?: boolean
	subtitle?: string
	title: string
};

export function SectionHeading({
	eyebrow,
	inverse = false,
	subtitle,
	title
}: SectionHeadingProps): JSX.Element {
	return (
		<div className="max-w-3xl">
			{eyebrow
				? (
					<Eyebrow className="mb-7" inverse={inverse}>
						{eyebrow}
					</Eyebrow>
				)
				: null}
			<h2
				className={`text-3xl leading-[1.12] sm:text-4xl lg:text-5xl ${
					inverse ? "text-base-100" : "text-primary"
				}`}
			>
				{title}
			</h2>
			{subtitle
				? (
					<p className={`mt-6 max-w-2xl text-base leading-relaxed lg:text-lg ${
						inverse ? "text-base-100/70" : "text-primary/65"
					}`}
					>
						{subtitle}
					</p>
				)
				: null}
		</div>
	);
}
