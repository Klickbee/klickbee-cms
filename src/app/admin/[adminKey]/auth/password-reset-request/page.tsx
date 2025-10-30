import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ResetPasswordRequestForm from "@/feature/auth/components/password-reset-request/resetPasswordRequestForm";

export default function ResetPasswordRequestPage() {
	const t = useTranslations("ResetPasswordRequest");

	return (
		<div className="flex min-h-screen items-center justify-center bg-muted w-full">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle>{t("ResetPasswordRequest")}</CardTitle>
				</CardHeader>
				<CardContent>
					<ResetPasswordRequestForm />
				</CardContent>
			</Card>
		</div>
	);
}
