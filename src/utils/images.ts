// 由 scripts/build-images.ts 自动生成，请勿手动编辑。
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
		"about": {
			"aspect": 0.75,
			"height": 540,
			"src": "/img/about-720.webp",
			"srcSet": "/img/about-720.webp 720w, /img/about-1200.webp 1200w, /img/about-1800.webp 1800w",
			"variants": [
				{
					"file": "about-720.webp",
					"h": 540,
					"w": 720
				},
				{
					"file": "about-1200.webp",
					"h": 900,
					"w": 1200
				},
				{
					"file": "about-1800.webp",
					"h": 1350,
					"w": 1800
				}
			],
			"width": 720
		},
		"chinaHainan": {
			"aspect": 0.75,
			"height": 540,
			"src": "/img/chinaHainan-720.webp",
			"srcSet": "/img/chinaHainan-720.webp 720w, /img/chinaHainan-1200.webp 1200w, /img/chinaHainan-1800.webp 1800w",
			"variants": [
				{
					"file": "chinaHainan-720.webp",
					"h": 540,
					"w": 720
				},
				{
					"file": "chinaHainan-1200.webp",
					"h": 900,
					"w": 1200
				},
				{
					"file": "chinaHainan-1800.webp",
					"h": 1350,
					"w": 1800
				}
			],
			"width": 720
		},
		"chinaServing": {
			"aspect": 1,
			"height": 720,
			"src": "/img/chinaServing-720.webp",
			"srcSet": "/img/chinaServing-720.webp 720w, /img/chinaServing-1200.webp 1200w, /img/chinaServing-1800.webp 1800w",
			"variants": [
				{
					"file": "chinaServing-720.webp",
					"h": 720,
					"w": 720
				},
				{
					"file": "chinaServing-1200.webp",
					"h": 1200,
					"w": 1200
				},
				{
					"file": "chinaServing-1800.webp",
					"h": 1800,
					"w": 1800
				}
			],
			"width": 720
		},
		"hero": {
			"aspect": 0.75,
			"height": 720,
			"src": "/img/hero-960.webp",
			"srcSet": "/img/hero-960.webp 960w, /img/hero-1600.webp 1600w, /img/hero-2400.webp 2400w",
			"variants": [
				{
					"file": "hero-960.webp",
					"h": 720,
					"w": 960
				},
				{
					"file": "hero-1600.webp",
					"h": 1200,
					"w": 1600
				},
				{
					"file": "hero-2400.webp",
					"h": 1800,
					"w": 2400
				}
			],
			"width": 960
		},
		"privateLabelAlt": {
			"aspect": 1.3333,
			"height": 747,
			"src": "/img/privateLabelAlt-560.webp",
			"srcSet": "/img/privateLabelAlt-560.webp 560w, /img/privateLabelAlt-900.webp 900w, /img/privateLabelAlt-1280.webp 1280w",
			"variants": [
				{
					"file": "privateLabelAlt-560.webp",
					"h": 747,
					"w": 560
				},
				{
					"file": "privateLabelAlt-900.webp",
					"h": 1200,
					"w": 900
				},
				{
					"file": "privateLabelAlt-1280.webp",
					"h": 1707,
					"w": 1280
				}
			],
			"width": 560
		},
		"privateLabelMain": {
			"aspect": 0.75,
			"height": 540,
			"src": "/img/privateLabelMain-720.webp",
			"srcSet": "/img/privateLabelMain-720.webp 720w, /img/privateLabelMain-1200.webp 1200w, /img/privateLabelMain-1800.webp 1800w",
			"variants": [
				{
					"file": "privateLabelMain-720.webp",
					"h": 540,
					"w": 720
				},
				{
					"file": "privateLabelMain-1200.webp",
					"h": 900,
					"w": 1200
				},
				{
					"file": "privateLabelMain-1800.webp",
					"h": 1350,
					"w": 1800
				}
			],
			"width": 720
		},
		"productDairy": {
			"aspect": 0.75,
			"height": 450,
			"src": "/img/productDairy-600.webp",
			"srcSet": "/img/productDairy-600.webp 600w, /img/productDairy-1000.webp 1000w, /img/productDairy-1400.webp 1400w",
			"variants": [
				{
					"file": "productDairy-600.webp",
					"h": 450,
					"w": 600
				},
				{
					"file": "productDairy-1000.webp",
					"h": 750,
					"w": 1000
				},
				{
					"file": "productDairy-1400.webp",
					"h": 1050,
					"w": 1400
				}
			],
			"width": 600
		},
		"productPrivateLabel": {
			"aspect": 1.3333,
			"height": 800,
			"src": "/img/productPrivateLabel-600.webp",
			"srcSet": "/img/productPrivateLabel-600.webp 600w, /img/productPrivateLabel-1000.webp 1000w, /img/productPrivateLabel-1400.webp 1400w",
			"variants": [
				{
					"file": "productPrivateLabel-600.webp",
					"h": 800,
					"w": 600
				},
				{
					"file": "productPrivateLabel-1000.webp",
					"h": 1333,
					"w": 1000
				},
				{
					"file": "productPrivateLabel-1400.webp",
					"h": 1867,
					"w": 1400
				}
			],
			"width": 600
		},
		"serviceChina": {
			"aspect": 0.75,
			"height": 420,
			"src": "/img/serviceChina-560.webp",
			"srcSet": "/img/serviceChina-560.webp 560w, /img/serviceChina-900.webp 900w, /img/serviceChina-1280.webp 1280w",
			"variants": [
				{
					"file": "serviceChina-560.webp",
					"h": 420,
					"w": 560
				},
				{
					"file": "serviceChina-900.webp",
					"h": 675,
					"w": 900
				},
				{
					"file": "serviceChina-1280.webp",
					"h": 960,
					"w": 1280
				}
			],
			"width": 560
		},
		"serviceFulfilment": {
			"aspect": 0.75,
			"height": 420,
			"src": "/img/serviceFulfilment-560.webp",
			"srcSet": "/img/serviceFulfilment-560.webp 560w, /img/serviceFulfilment-900.webp 900w, /img/serviceFulfilment-1280.webp 1280w",
			"variants": [
				{
					"file": "serviceFulfilment-560.webp",
					"h": 420,
					"w": 560
				},
				{
					"file": "serviceFulfilment-900.webp",
					"h": 675,
					"w": 900
				},
				{
					"file": "serviceFulfilment-1280.webp",
					"h": 960,
					"w": 1280
				}
			],
			"width": 560
		},
		"servicePrivateLabel": {
			"aspect": 0.4977,
			"height": 279,
			"src": "/img/servicePrivateLabel-560.webp",
			"srcSet": "/img/servicePrivateLabel-560.webp 560w, /img/servicePrivateLabel-900.webp 900w, /img/servicePrivateLabel-1280.webp 1280w",
			"variants": [
				{
					"file": "servicePrivateLabel-560.webp",
					"h": 279,
					"w": 560
				},
				{
					"file": "servicePrivateLabel-900.webp",
					"h": 448,
					"w": 900
				},
				{
					"file": "servicePrivateLabel-1280.webp",
					"h": 637,
					"w": 1280
				}
			],
			"width": 560
		},
		"serviceSourcing": {
			"aspect": 0.75,
			"height": 420,
			"src": "/img/serviceSourcing-560.webp",
			"srcSet": "/img/serviceSourcing-560.webp 560w, /img/serviceSourcing-900.webp 900w, /img/serviceSourcing-1280.webp 1280w",
			"variants": [
				{
					"file": "serviceSourcing-560.webp",
					"h": 420,
					"w": 560
				},
				{
					"file": "serviceSourcing-900.webp",
					"h": 675,
					"w": 900
				},
				{
					"file": "serviceSourcing-1280.webp",
					"h": 960,
					"w": 1280
				}
			],
			"width": 560
		},
		"serviceSupply": {
			"aspect": 0.75,
			"height": 420,
			"src": "/img/serviceSupply-560.webp",
			"srcSet": "/img/serviceSupply-560.webp 560w, /img/serviceSupply-900.webp 900w, /img/serviceSupply-1280.webp 1280w",
			"variants": [
				{
					"file": "serviceSupply-560.webp",
					"h": 420,
					"w": 560
				},
				{
					"file": "serviceSupply-900.webp",
					"h": 675,
					"w": 900
				},
				{
					"file": "serviceSupply-1280.webp",
					"h": 960,
					"w": 1280
				}
			],
			"width": 560
		}
	};

export const OG_IMAGE = "/img/og-cover.jpg";
