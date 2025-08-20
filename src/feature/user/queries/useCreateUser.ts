import { useMutation } from "@tanstack/react-query";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";
import { authClient } from "@/feature/auth/lib/authClient";
import { CreateUserFormValues } from "@/feature/user/schemas/createUserSchema";

function generateSecurePassword(): string {
	const lowercase = "abcdefghijklmnopqrstuvwxyz";
	const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const numbers = "0123456789";
	const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

	const allChars = lowercase + uppercase + numbers + symbols;
	const length = 16;

	let password = "";

	// Ensure at least one character from each category
	password += lowercase[Math.floor(Math.random() * lowercase.length)];
	password += uppercase[Math.floor(Math.random() * uppercase.length)];
	password += numbers[Math.floor(Math.random() * numbers.length)];
	password += symbols[Math.floor(Math.random() * symbols.length)];

	// Fill the rest randomly
	for (let i = password.length; i < length; i++) {
		password += allChars[Math.floor(Math.random() * allChars.length)];
	}

	// Shuffle the password to avoid predictable patterns
	return password
		.split("")
		.sort(() => Math.random() - 0.5)
		.join("");
}

export function useCreateUser() {
	const adminKey = useAdminKeyStore((state) => state.adminKey);

	return useMutation({
		mutationFn: async (createUserFormValues: CreateUserFormValues) => {
			await authClient.admin.createUser({
				...createUserFormValues,
				password: generateSecurePassword(), // empty password, user will set it via password reset
				role: "user",
			});

			await authClient.requestPasswordReset({
				email: createUserFormValues.email,
				redirectTo: `/admin/${adminKey}/auth/password-reset`,
			});
		},
	});
}
