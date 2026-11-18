"use client";
import type { JSX } from "react";
import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import { cn } from "@/utils/cn";

export function Gotop(): JSX.Element | null {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const onScroll = (): void => {
			setVisible(window.scrollY > 900);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	if (!visible) {
		return null;
	}

	return (
		<button
			aria-label="Back to top"
			className={cn("fixed bottom-6 right-6 z-40 flex size-11 items-center justify-center rounded-full bg-primary/90 text-primary-content shadow-[0_16px_40px_-20px_rgba(18,50,74,0.7)] backdrop-blur transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-secondary hover:text-secondary-content active:scale-95")}
			type="button"
			onClick={() => window.scrollTo({ behavior: "smooth", top: 0 })}
		>
			<ArrowUp className={cn("size-4")} strokeWidth={1.5} />
		</button>
	);
}