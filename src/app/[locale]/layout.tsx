import type { Metadata } from "next";
import type { JSX, ReactNode } from "react";
import React from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";

import "./globals.css";
import { Gotop } from "@/components";
import { Footer, Navbar } from "@/layouts";
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

const DESCRIPTION = "APPP is a Sydney-based B2B product sourcing and export company supplying selected Australian health supplements, milk powder and private label product solutions to international business customers.";

export const metadata: Metadata = {
	authors: [{ name: "Australia Premium Products Platform Pty Ltd" }],
	description: DESCRIPTION,
	keywords: [
		"APPP",
		"Australian health supplements",
		"full cream milk powder",
		"skim milk powder",
		"private label OEM",
		"export Mainland China",
		"product sourcing Australia"
	],
	metadataBase: new URL("https://apppcorp.github.io"),
	openGraph: {
		description: DESCRIPTION,
		images: [{ height: 630, url: OG_IMAGE, width: 1200 }],
		locale: "en_AU",
		siteName: "Australia Premium Products Platform",
		title: "APPP — Premium Australian Products For Growing Asian Markets",
		type: "website"
	},
	title: "APPP — Premium Australian Products For Growing Asian Markets"
};

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
		<html className={`${sans.variable} ${serif.variable}`} data-theme="appp" lang={locale} suppressHydrationWarning>
			<body className="bg-base-100 font-sans text-base-content antialiased">
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
