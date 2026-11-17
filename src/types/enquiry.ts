type EnquiryFieldName =
	| "companyName"
	| "contactName"
	| "email"
	| "country"
	| "productInterest"
	| "orderVolume"
	| "message";

type EnquiryPayload = {
	companyName: string
	contactName: string
	email: string
	country: string
	productInterest: string
	orderVolume: string
	message: string
	/** Honeypot — real visitors never fill this in. */
	website: string
};

type EnquiryResult = {
	ok: boolean
	message: string
};

export type {
	EnquiryFieldName,
	EnquiryPayload,
	EnquiryResult
};
