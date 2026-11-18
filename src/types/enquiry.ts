type EnquiryFieldName
	= | "companyName"
		| "contactName"
		| "email"
		| "country"
		| "productInterest"
		| "orderVolume"
		| "message";

interface EnquiryPayload {
	companyName: string
	contactName: string
	country: string
	email: string
	message: string
	orderVolume: string
	productInterest: string

	/** Honeypot — real visitors never fill this in. */
	website: string
}

interface EnquiryResult {
	message: string
	ok: boolean
}

export type {
	EnquiryFieldName,
	EnquiryPayload,
	EnquiryResult
};