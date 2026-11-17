"use client";
import { useEffect, useState } from "react";

/**
 * 滚动时高亮当前所在的章节。
 *
 * 用上下各收缩 45% 的观察带判定“当前章节”，避免相邻区块同时命中。
 */
export function useActiveSection(ids: readonly string[]): string {
	const [active, setActive] = useState(ids[0] ?? "");
	const key = ids.join(",");

	useEffect(() => {
		const targets = key
			.split(",")
			.filter(Boolean)
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);
		if (targets.length === 0) {
			return;
		}
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
				if (visible[0]) {
					setActive(visible[0].target.id);
				}
			},
			{ rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
		);
		targets.forEach((target) => observer.observe(target));
		return () => observer.disconnect();
	}, [key]);

	return active;
}
