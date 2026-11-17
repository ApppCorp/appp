"use client";
import type { JSX, ReactNode } from "react";
import React from "react";
import { motion } from "framer-motion";

type RevealProps = {
	children: ReactNode
	className?: string
	/** 同组元素依次入场的延迟（秒） */
	delay?: number
	/** 元素向上移动的距离（像素） */
	distance?: number
};

/**
 * 进入视口时的一次性淡入上移。
 *
 * 只使用 transform 与 opacity，避免触发重排。
 */
export function Reveal({
	children,
	className = "",
	delay = 0,
	distance = 28
}: RevealProps): JSX.Element {
	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y: distance }}
			transition={{ delay, duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
			viewport={{ once: true, margin: "-72px" }}
			whileInView={{ opacity: 1, y: 0 }}
		>
			{children}
		</motion.div>
	);
}
