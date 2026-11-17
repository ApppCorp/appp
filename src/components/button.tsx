import type { JSX, ReactNode } from "react";
import React from "react";
import { ArrowUpRight } from "lucide-react";

type ButtonProps = {
	children: ReactNode
	className?: string
	href?: string
	/** primary 深底 / outline 描边 / light 深色区块上的浅色按钮 */
	variant?: "primary" | "outline" | "light"
};

const VARIANTS: Record<string, string> = {
	primary: "bg-primary text-primary-content hover:bg-ink-deep",
	outline: "bg-transparent text-primary ring-1 ring-primary/20 hover:bg-primary hover:text-primary-content",
	light: "bg-base-100 text-primary hover:bg-secondary"
};

/**
 * 按钮：文字外侧套一层主按钮，尾部箭头独立装在自己的圆形容器里。
 */
export function Button({
	children,
	className = "",
	href = "#",
	variant = "primary"
}: ButtonProps): JSX.Element {
	return (
		<a
			className={`group inline-flex items-center gap-3 rounded-full py-1.5 pl-6 pr-1.5 text-sm font-medium tracking-wide transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] ${VARIANTS[variant]} ${className}`}
			href={href}
		>
			<span className="whitespace-nowrap">{children}</span>
			<span className="flex size-8 items-center justify-center rounded-full bg-secondary text-secondary-content transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1">
				<ArrowUpRight className="size-4" strokeWidth={1.5} />
			</span>
		</a>
	);
}
