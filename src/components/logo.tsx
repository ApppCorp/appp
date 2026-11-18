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
				r="13.5"
				stroke="currentColor"
				strokeWidth="1.25"
				opacity="0.3"
			/>
			<ellipse
				cx="16"
				cy="16"
				rx="6"
				ry="13.5"
				stroke="currentColor"
				strokeWidth="1.25"
				opacity="0.5"
			/>
			<path
				d="M2.5 16h27"
				stroke="currentColor"
				strokeWidth="1.25"
				opacity="0.5"
			/>
			<path
				d="M5.4 9.6h21.2M5.4 22.4h21.2"
				stroke="currentColor"
				strokeWidth="1.25"
				opacity="0.3"
			/>
			<circle
				cx="16"
				cy="6.1"
				r="2.1"
				fill="currentColor"
			/>
		</svg>
	);
}
