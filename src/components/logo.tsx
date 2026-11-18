import type { JSX } from "react";
import React from "react";

import { cn } from "@/utils/cn";

export function Logo({ className = "size-6" }: { className?: string }): JSX.Element {
	return (
		<svg
			className={cn(className)}
			fill="none"
			viewBox="0 0 32 32"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				cx="16"
				cy="16"
				opacity="0.3"
				r="13.5"
				stroke="currentColor"
				strokeWidth="1.25"
			/>
			<ellipse
				cx="16"
				cy="16"
				opacity="0.5"
				rx="6"
				ry="13.5"
				stroke="currentColor"
				strokeWidth="1.25"
			/>
			<path
				d="M2.5 16h27"
				opacity="0.5"
				stroke="currentColor"
				strokeWidth="1.25"
			/>
			<path
				d="M5.4 9.6h21.2M5.4 22.4h21.2"
				opacity="0.3"
				stroke="currentColor"
				strokeWidth="1.25"
			/>
			<circle
				cx="16"
				cy="6.1"
				fill="currentColor"
				r="2.1"
			/>
		</svg>
	);
}