import type { JSX } from "react";
import React from "react";
import About from "./home/about";
import ChinaMarket from "./home/china-market";
import Contact from "./home/contact";
import Hero from "./home/hero";
import PrivateLabel from "./home/private-label";
import Products from "./home/products";
import Services from "./home/services";
import WhyUs from "./home/why-us";

export default function HomePage(): JSX.Element {
	return (
		<main>
			<Hero />
			<About />
			<Services />
			<Products />
			<ChinaMarket />
			<PrivateLabel />
			<WhyUs />
			<Contact />
		</main>
	);
}