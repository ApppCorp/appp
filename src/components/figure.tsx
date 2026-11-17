import type { JSX } from "react";
import React from "react";

import type { ImageSlot } from "@/utils/images";
import { images } from "@/utils/images";

type FigureProps = {
	alt: string
	className?: string
	/** 告诉浏览器该图在视口中的大致宽度，用于挑选合适的分辨率 */
	sizes: string
	slot: ImageSlot
};

/**
 * 响应式图片。
 *
 * script/build-images.mjs 已经把每张原片调色并导出为三档 WebP，
 * 这里直接给出 srcset，不再经过运行时图片优化。
 */
export function Figure({
	alt,
	className = "",
	sizes,
	slot
}: FigureProps): JSX.Element {
	const asset = images[slot];
	return (
		<img
			alt={alt}
			className={className}
			decoding="async"
			height={asset.height}
			loading="lazy"
			sizes={sizes}
			src={asset.src}
			srcSet={asset.srcSet}
			width={asset.width}
		/>
	);
}
