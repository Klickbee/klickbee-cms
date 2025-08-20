export type Contact = {
	id: number;
	email: string | null;
	number: string | null;
	name: string | null;
	submitDate: Date;
	content: Record<string, unknown>;
	createdAt: Date;
};
