export type ClassValue = string
	| number
	| false
	| null
	| undefined
	| ClassValue[]
	| Record<string, boolean | null | undefined>;

/** 去掉首尾空白，并把中间的连续空白压成单个空格。 */
function normalize(value: string): string {
	return value.trim().replace(/\s+/g, " ");
}

/**
 * 拼接 className。
 *
 * - 条件类名用 `cond && "x"` 或对象 `{ active: isActive }` 表达；
 * - 结果统一去首尾空白、压缩连续空格，空片段直接丢弃，
 *   保证渲染出的 class 属性里不会有多余空格。
 */
export function cn(...inputs: ClassValue[]): string {
	const out: string[] = [];

	for (const input of inputs) {
		if (!input) continue;

		if (typeof input === "string" || typeof input === "number") {
			const text = normalize(String(input));
			if (text) out.push(text);
			continue;
		}

		if (Array.isArray(input)) {
			const text = cn(...input);
			if (text) out.push(text);
			continue;
		}

		for (const [key, enabled] of Object.entries(input)) {
			if (!enabled) continue;
			const text = normalize(key);
			if (text) out.push(text);
		}
	}

	return out.join(" ");
}