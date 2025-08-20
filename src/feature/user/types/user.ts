export type User = {
	id: string;
	name: string;
	image: string | null;
	createdAt: Date;
};
export type UserToUpdate = Omit<User, "createdAt">;
