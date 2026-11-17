"use client";
import type { JSX } from "react";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";

type FieldName = "companyName" | "contactName" | "email" | "country" | "productInterest" | "orderVolume" | "message";

const TEXT_FIELDS: { name: FieldName; type: string; autoComplete: string; placeholder?: string }[] = [
	{ autoComplete: "organization", name: "companyName", type: "text" },
	{ autoComplete: "name", name: "contactName", type: "text" },
	{ autoComplete: "email", name: "email", type: "email" },
	{ autoComplete: "country-name", name: "country", type: "text" }
];

const OPTION_FIELDS: { name: FieldName; placeholderKey: string }[] = [
	{ name: "productInterest", placeholderKey: "productInterestPlaceholder" },
	{ name: "orderVolume", placeholderKey: "orderVolumePlaceholder" }
];

export function EnquiryForm(): JSX.Element {
	const form = useTranslations("home.contact.form");
	const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
	const [feedback, setFeedback] = useState("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		setStatus("sending");
		setFeedback("");
		const data = new FormData(event.currentTarget);
		const payload = Object.fromEntries(data.entries());
		try {
			const response = await fetch("/api/enquiry", {
				body: JSON.stringify(payload),
				headers: { "Content-Type": "application/json" },
				method: "POST"
			});
			const result = await response.json() as { message?: string; ok?: boolean };
			if (response.ok && result.ok) {
				setStatus("done");
				setFeedback(result.message ?? form("success"));
				event.currentTarget.reset();
			} else {
				setStatus("error");
				setFeedback(result.message ?? form("error"));
			}
		} catch {
			setStatus("error");
			setFeedback(form("error"));
		}
	};

	return (
		<form className="space-y-5" noValidate onSubmit={handleSubmit}>
			<div className="grid gap-5 sm:grid-cols-2">
				{TEXT_FIELDS.map((field) => (
					<label className="flex flex-col gap-2" key={field.name}>
						<span className="text-xs font-medium uppercase tracking-[0.14em] text-primary/60">
							{form(field.name)}
						</span>
						<input
							autoComplete={field.autoComplete}
							className="w-full rounded-xl border border-primary/12 bg-base-100 px-4 py-3 text-sm text-primary transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-primary/30 focus:border-secondary focus:outline-none"
							name={field.name}
							required
							type={field.type}
						/>
					</label>
				))}
			</div>
			{OPTION_FIELDS.map((field) => (
				<label className="flex flex-col gap-2" key={field.name}>
					<span className="text-xs font-medium uppercase tracking-[0.14em] text-primary/60">
						{form(field.name)}
					</span>
					<input
						className="w-full rounded-xl border border-primary/12 bg-base-100 px-4 py-3 text-sm text-primary transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-primary/30 focus:border-secondary focus:outline-none"
						name={field.name}
						placeholder={form(field.placeholderKey)}
						required={field.name === "productInterest"}
						type="text"
					/>
				</label>
			))}
			<label className="flex flex-col gap-2">
				<span className="text-xs font-medium uppercase tracking-[0.14em] text-primary/60">
					{form("message")}
				</span>
				<textarea
					className="w-full resize-y rounded-xl border border-primary/12 bg-base-100 px-4 py-3 text-sm text-primary transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-primary/30 focus:border-secondary focus:outline-none"
					name="message"
					placeholder=""
					required
					rows={5}
				/>
			</label>
			{/* 蜜罐：真人不会填，机器人会填 */}
			<input
				aria-hidden="true"
				className="absolute h-0 w-0 opacity-0"
				name="website"
				tabIndex={-1}
				type="text"
			/>
			<button
				className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary py-4 text-sm font-medium text-primary-content transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-ink-deep active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
				disabled={status === "sending"}
				type="submit"
			>
				{status === "sending"
					? (
						<>
							<Loader2 className="size-4 animate-spin" strokeWidth={1.75} />
							{form("submitting")}
						</>
					)
					: (
						<>
							{form("submit")}
							<span className="flex size-7 items-center justify-center rounded-full bg-secondary text-secondary-content transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1">
								<svg className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
									<path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</span>
						</>
					)}
			</button>
			{feedback
				? (
					<p
						className={`rounded-xl border px-4 py-3 text-sm leading-relaxed ${
							status === "done"
								? "border-success/30 bg-success/8 text-success"
								: "border-error/30 bg-error/8 text-error"
						}`}
						role="status"
					>
						{feedback}
					</p>
				)
				: null}
			<p className="text-xs text-primary/45">
				{form("fallback")}{" "}
				<a className="text-primary/70 underline decoration-secondary underline-offset-4 hover:text-secondary" href="mailto:sales_appp@outlook.com?subject=Product%20Enquiry">
					sales_appp@outlook.com
				</a>
			</p>
		</form>
	);
}
