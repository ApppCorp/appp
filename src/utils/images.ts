// 由 script/build-images.mjs 自动生成，请勿手动编辑。
// 重新生成：npm run images

type ImageSlot =
	| "about"
	| "chinaHainan"
	| "chinaServing"
	| "hero"
	| "privateLabelAlt"
	| "privateLabelMain"
	| "productDairy"
	| "productPrivateLabel"
	| "serviceChina"
	| "serviceFulfilment"
	| "servicePrivateLabel"
	| "serviceSourcing"
	| "serviceSupply"

type ImageAsset = {
	aspect: number
	height: number
	src: string
	srcSet: string
	variants: { file: string; h: number; w: number }[]
	width: number
};

export type {
	ImageAsset,
	ImageSlot
};

export const images: Record<ImageSlot, ImageAsset> = {
		"hero": {
			"src": "/images/hero-960.webp",
			"width": 960,
			"height": 720,
			"aspect": 0.75,
			"srcSet": "/images/hero-960.webp 960w, /images/hero-1600.webp 1600w, /images/hero-2400.webp 2400w",
			"variants": [
				{
					"w": 960,
					"h": 720,
					"file": "hero-960.webp"
				},
				{
					"w": 1600,
					"h": 1200,
					"file": "hero-1600.webp"
				},
				{
					"w": 2400,
					"h": 1800,
					"file": "hero-2400.webp"
				}
			]
		},
		"about": {
			"src": "/images/about-720.webp",
			"width": 720,
			"height": 540,
			"aspect": 0.75,
			"srcSet": "/images/about-720.webp 720w, /images/about-1200.webp 1200w, /images/about-1800.webp 1800w",
			"variants": [
				{
					"w": 720,
					"h": 540,
					"file": "about-720.webp"
				},
				{
					"w": 1200,
					"h": 900,
					"file": "about-1200.webp"
				},
				{
					"w": 1800,
					"h": 1350,
					"file": "about-1800.webp"
				}
			]
		},
		"serviceSourcing": {
			"src": "/images/serviceSourcing-560.webp",
			"width": 560,
			"height": 420,
			"aspect": 0.75,
			"srcSet": "/images/serviceSourcing-560.webp 560w, /images/serviceSourcing-900.webp 900w, /images/serviceSourcing-1280.webp 1280w",
			"variants": [
				{
					"w": 560,
					"h": 420,
					"file": "serviceSourcing-560.webp"
				},
				{
					"w": 900,
					"h": 675,
					"file": "serviceSourcing-900.webp"
				},
				{
					"w": 1280,
					"h": 960,
					"file": "serviceSourcing-1280.webp"
				}
			]
		},
		"serviceSupply": {
			"src": "/images/serviceSupply-560.webp",
			"width": 560,
			"height": 420,
			"aspect": 0.75,
			"srcSet": "/images/serviceSupply-560.webp 560w, /images/serviceSupply-900.webp 900w, /images/serviceSupply-1280.webp 1280w",
			"variants": [
				{
					"w": 560,
					"h": 420,
					"file": "serviceSupply-560.webp"
				},
				{
					"w": 900,
					"h": 675,
					"file": "serviceSupply-900.webp"
				},
				{
					"w": 1280,
					"h": 960,
					"file": "serviceSupply-1280.webp"
				}
			]
		},
		"serviceFulfilment": {
			"src": "/images/serviceFulfilment-560.webp",
			"width": 560,
			"height": 420,
			"aspect": 0.75,
			"srcSet": "/images/serviceFulfilment-560.webp 560w, /images/serviceFulfilment-900.webp 900w, /images/serviceFulfilment-1280.webp 1280w",
			"variants": [
				{
					"w": 560,
					"h": 420,
					"file": "serviceFulfilment-560.webp"
				},
				{
					"w": 900,
					"h": 675,
					"file": "serviceFulfilment-900.webp"
				},
				{
					"w": 1280,
					"h": 960,
					"file": "serviceFulfilment-1280.webp"
				}
			]
		},
		"servicePrivateLabel": {
			"src": "/images/servicePrivateLabel-560.webp",
			"width": 560,
			"height": 279,
			"aspect": 0.4977,
			"srcSet": "/images/servicePrivateLabel-560.webp 560w, /images/servicePrivateLabel-900.webp 900w, /images/servicePrivateLabel-1280.webp 1280w",
			"variants": [
				{
					"w": 560,
					"h": 279,
					"file": "servicePrivateLabel-560.webp"
				},
				{
					"w": 900,
					"h": 448,
					"file": "servicePrivateLabel-900.webp"
				},
				{
					"w": 1280,
					"h": 637,
					"file": "servicePrivateLabel-1280.webp"
				}
			]
		},
		"serviceChina": {
			"src": "/images/serviceChina-560.webp",
			"width": 560,
			"height": 420,
			"aspect": 0.75,
			"srcSet": "/images/serviceChina-560.webp 560w, /images/serviceChina-900.webp 900w, /images/serviceChina-1280.webp 1280w",
			"variants": [
				{
					"w": 560,
					"h": 420,
					"file": "serviceChina-560.webp"
				},
				{
					"w": 900,
					"h": 675,
					"file": "serviceChina-900.webp"
				},
				{
					"w": 1280,
					"h": 960,
					"file": "serviceChina-1280.webp"
				}
			]
		},
		"productDairy": {
			"src": "/images/productDairy-600.webp",
			"width": 600,
			"height": 450,
			"aspect": 0.75,
			"srcSet": "/images/productDairy-600.webp 600w, /images/productDairy-1000.webp 1000w, /images/productDairy-1400.webp 1400w",
			"variants": [
				{
					"w": 600,
					"h": 450,
					"file": "productDairy-600.webp"
				},
				{
					"w": 1000,
					"h": 750,
					"file": "productDairy-1000.webp"
				},
				{
					"w": 1400,
					"h": 1050,
					"file": "productDairy-1400.webp"
				}
			]
		},
		"productPrivateLabel": {
			"src": "/images/productPrivateLabel-600.webp",
			"width": 600,
			"height": 800,
			"aspect": 1.3333,
			"srcSet": "/images/productPrivateLabel-600.webp 600w, /images/productPrivateLabel-1000.webp 1000w, /images/productPrivateLabel-1400.webp 1400w",
			"variants": [
				{
					"w": 600,
					"h": 800,
					"file": "productPrivateLabel-600.webp"
				},
				{
					"w": 1000,
					"h": 1333,
					"file": "productPrivateLabel-1000.webp"
				},
				{
					"w": 1400,
					"h": 1867,
					"file": "productPrivateLabel-1400.webp"
				}
			]
		},
		"chinaServing": {
			"src": "/images/chinaServing-720.webp",
			"width": 720,
			"height": 720,
			"aspect": 1,
			"srcSet": "/images/chinaServing-720.webp 720w, /images/chinaServing-1200.webp 1200w, /images/chinaServing-1800.webp 1800w",
			"variants": [
				{
					"w": 720,
					"h": 720,
					"file": "chinaServing-720.webp"
				},
				{
					"w": 1200,
					"h": 1200,
					"file": "chinaServing-1200.webp"
				},
				{
					"w": 1800,
					"h": 1800,
					"file": "chinaServing-1800.webp"
				}
			]
		},
		"chinaHainan": {
			"src": "/images/chinaHainan-720.webp",
			"width": 720,
			"height": 540,
			"aspect": 0.75,
			"srcSet": "/images/chinaHainan-720.webp 720w, /images/chinaHainan-1200.webp 1200w, /images/chinaHainan-1800.webp 1800w",
			"variants": [
				{
					"w": 720,
					"h": 540,
					"file": "chinaHainan-720.webp"
				},
				{
					"w": 1200,
					"h": 900,
					"file": "chinaHainan-1200.webp"
				},
				{
					"w": 1800,
					"h": 1350,
					"file": "chinaHainan-1800.webp"
				}
			]
		},
		"privateLabelMain": {
			"src": "/images/privateLabelMain-720.webp",
			"width": 720,
			"height": 540,
			"aspect": 0.75,
			"srcSet": "/images/privateLabelMain-720.webp 720w, /images/privateLabelMain-1200.webp 1200w, /images/privateLabelMain-1800.webp 1800w",
			"variants": [
				{
					"w": 720,
					"h": 540,
					"file": "privateLabelMain-720.webp"
				},
				{
					"w": 1200,
					"h": 900,
					"file": "privateLabelMain-1200.webp"
				},
				{
					"w": 1800,
					"h": 1350,
					"file": "privateLabelMain-1800.webp"
				}
			]
		},
		"privateLabelAlt": {
			"src": "/images/privateLabelAlt-560.webp",
			"width": 560,
			"height": 420,
			"aspect": 0.75,
			"srcSet": "/images/privateLabelAlt-560.webp 560w, /images/privateLabelAlt-900.webp 900w, /images/privateLabelAlt-1280.webp 1280w",
			"variants": [
				{
					"w": 560,
					"h": 420,
					"file": "privateLabelAlt-560.webp"
				},
				{
					"w": 900,
					"h": 675,
					"file": "privateLabelAlt-900.webp"
				},
				{
					"w": 1280,
					"h": 960,
					"file": "privateLabelAlt-1280.webp"
				}
			]
		}
	};

export const OG_IMAGE = "/images/og-cover.jpg";
