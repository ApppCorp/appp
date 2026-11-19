import type { Metadata } from "next";
import type { JSX, ReactNode } from "react";
import React from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";

import "./globals.css";
import { Gotop } from "@/components";
import { Footer, Navbar } from "@/layouts";
import { cn } from "@/utils/cn";
import { OG_IMAGE } from "@/utils/images";

const sans = Plus_Jakarta_Sans({
	display: "swap",
	subsets: ["latin"],
	variable: "--appp-sans"
});

const serif = Source_Serif_4({
	display: "swap",
	subsets: ["latin"],
	variable: "--appp-serif"
});

/** BCP 47 语言标签：zh 需要指明简体，en 指明澳大利亚。 */
const HTML_LANG: Record<string, string> = {
	en: "en-AU",
	zh: "zh-Hans"
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "meta" });

	return {
		alternates: {
			canonical: `/${locale}`,
			languages: {
				en: "/en",
				zh: "/zh"
			}
		},
		authors: [{ name: "Australia Premium Products Platform Pty Ltd" }],
		description: t("description"),
		keywords: t.raw("keywords") as string[],
		metadataBase: new URL("https://apppcorp.github.io"),
		openGraph: {
			description: t("description"),
			images: [{ height: 630, url: OG_IMAGE, width: 1200 }],
			locale: locale === "zh" ? "zh_CN" : "en_AU",
			siteName: "Australia Premium Products Platform",
			title: t("title"),
			type: "website"
		},
		title: t("title")
	};
}

export default async function LocaleLayout({
	children,
	params
}: Readonly<{
	children: ReactNode
	params: Promise<{ locale: string }>
}>): Promise<JSX.Element> {
	const { locale } = await params;
	const messages = await getMessages();
	return (
		<html
			className={cn(sans.variable, serif.variable)}
			data-theme="appp"
			lang={HTML_LANG[locale] ?? locale}
			suppressHydrationWarning
		>
			<body className={cn("bg-base-100 font-sans text-base-content antialiased")}>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<Navbar />
					{children}
					<Footer />
					<Gotop />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}