import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type EnquiryBody = {
	companyName?: string
	contactName?: string
	email?: string
	country?: string
	productInterest?: string
	orderVolume?: string
	message?: string
	website?: string
};

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "sales_appp@outlook.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "APPP Website <onboarding@resend.dev>";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** 同一 IP 在 10 分钟内最多提交 5 次（单实例内存计数，够用于拦截脚本滥用）。 */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
	const now = Date.now();
	const recent = (hits.get(ip) ?? []).filter((at) => now - at < RATE_LIMIT_WINDOW_MS);
	recent.push(now);
	hits.set(ip, recent);
	return recent.length > RATE_LIMIT_MAX;
}

function text(value: unknown): string {
	return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest): Promise<NextResponse> {
	const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for") ?? "unknown";
	if (rateLimited(ip)) {
		return NextResponse.json(
			{ ok: false, message: "Too many enquiries from this address. Please email us directly." },
			{ status: 429 }
		);
	}

	let body: EnquiryBody;
	try {
		body = await request.json() as EnquiryBody;
	} catch {
		return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
	}

	// 蜜罐被填写 → 直接当作成功，避免告诉机器人哪里被拦下了
	if (text(body.website)) {
		return NextResponse.json({ ok: true, message: "Thank you — your enquiry has been sent." });
	}

	const enquiry = {
		companyName: text(body.companyName),
		contactName: text(body.contactName),
		email: text(body.email),
		country: text(body.country),
		productInterest: text(body.productInterest),
		orderVolume: text(body.orderVolume),
		message: text(body.message)
	};

	const missing = [
		["companyName", enquiry.companyName],
		["contactName", enquiry.contactName],
		["email", enquiry.email],
		["country", enquiry.country],
		["productInterest", enquiry.productInterest],
		["message", enquiry.message]
	].filter(([, value]) => !value);

	if (missing.length > 0) {
		return NextResponse.json(
			{ ok: false, message: "Please complete all required fields." },
			{ status: 400 }
		);
	}

	if (!EMAIL_PATTERN.test(enquiry.email)) {
		return NextResponse.json(
			{ ok: false, message: "Please provide a valid email address." },
			{ status: 400 }
		);
	}

	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) {
		// 预览阶段：没有配置邮件服务时，先把内容打进日志，页面会提示直接发邮件给我们
		console.warn("[enquiry] RESEND_API_KEY 未配置，内容仅记录到日志：", enquiry);
		return NextResponse.json(
			{ ok: false, message: "The enquiry service is not configured yet. Please email us directly at sales_appp@outlook.com." },
			{ status: 503 }
		);
	}

	const subject = `Website enquiry — ${enquiry.companyName} — ${enquiry.productInterest}`;
	const html = `
		<h2 style="font-family:Arial,sans-serif;font-size:18px;margin:0 0 16px;">New website enquiry</h2>
		<table cellpadding="6" cellspacing="0" style="font-family:Arial,sans-serif;font-size:14px;color:#12324A;border-collapse:collapse;">
			<tr><td style="border-bottom:1px solid #e6e0d2;"><b>Company</b></td><td style="border-bottom:1px solid #e6e0d2;">${escapeHtml(enquiry.companyName)}</td></tr>
			<tr><td style="border-bottom:1px solid #e6e0d2;"><b>Contact</b></td><td style="border-bottom:1px solid #e6e0d2;">${escapeHtml(enquiry.contactName)}</td></tr>
			<tr><td style="border-bottom:1px solid #e6e0d2;"><b>Email</b></td><td style="border-bottom:1px solid #e6e0d2;">${escapeHtml(enquiry.email)}</td></tr>
			<tr><td style="border-bottom:1px solid #e6e0d2;"><b>Country / Region</b></td><td style="border-bottom:1px solid #e6e0d2;">${escapeHtml(enquiry.country)}</td></tr>
			<tr><td style="border-bottom:1px solid #e6e0d2;"><b>Product Interest</b></td><td style="border-bottom:1px solid #e6e0d2;">${escapeHtml(enquiry.productInterest)}</td></tr>
			<tr><td style="border-bottom:1px solid #e6e0d2;"><b>Estimated Order Volume</b></td><td style="border-bottom:1px solid #e6e0d2;">${escapeHtml(enquiry.orderVolume || "—")}</td></tr>
		</table>
		<h3 style="font-family:Arial,sans-serif;font-size:15px;margin:24px 0 8px;">Message</h3>
		<p style="font-family:Arial,sans-serif;font-size:14px;color:#12324A;white-space:pre-wrap;margin:0;">${escapeHtml(enquiry.message)}</p>
	`;

	const response = await fetch("https://api.resend.com/emails", {
		body: JSON.stringify({
			from: FROM_EMAIL,
			html,
			reply_to: enquiry.email,
			subject,
			text: [
				`Company: ${enquiry.companyName}`,
				`Contact: ${enquiry.contactName}`,
				`Email: ${enquiry.email}`,
				`Country / Region: ${enquiry.country}`,
				`Product Interest: ${enquiry.productInterest}`,
				`Estimated Order Volume: ${enquiry.orderVolume || "—"}`,
				"",
				enquiry.message
			].join("\n"),
			to: [TO_EMAIL]
		}),
		headers: {
			"Authorization": `Bearer ${apiKey}`,
			"Content-Type": "application/json"
		},
		method: "POST"
	});

	if (!response.ok) {
		const detail = await response.text();
		console.error("[enquiry] 邮件发送失败：", response.status, detail);
		return NextResponse.json(
			{ ok: false, message: "The enquiry could not be sent. Please email us directly at sales_appp@outlook.com." },
			{ status: 502 }
		);
	}

	return NextResponse.json({ ok: true, message: "Thank you — your enquiry has been sent. We will reply shortly." });
}

function escapeHtml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}
