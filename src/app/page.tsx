"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function LanguageSwitcher() {
	const [currentLocale, setCurrentLocale] = useState<string>("en");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const t = useTranslations("LandingPage.LanguageSwitcher");

	// Fetch current language on component mount
	useEffect(() => {
		const fetchCurrentLanguage = async () => {
			try {
				const response = await fetch("/api/language");
				const data = await response.json();
				if (data.locale) {
					setCurrentLocale(data.locale);
				}
			} catch (error) {
				console.error("Failed to fetch current language:", error);
			}
		};

		fetchCurrentLanguage();
	}, []);

	const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		const locale = e.target.value;
		setIsLoading(true);

		try {
			const response = await fetch("/api/language", {
				body: JSON.stringify({ locale }),
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
			});

			if (response.ok) {
				setCurrentLocale(locale);
				// Reload the page to apply the new language
				window.location.reload();
			}
		} catch (error) {
			console.error("Failed to change language:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="absolute top-4 right-6 z-10">
			<div className="relative inline-block">
				<select
					aria-label={t("Label")}
					className="appearance-none bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-lg px-4 py-2 pr-8 hover:bg-white/30 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50"
					disabled={isLoading}
					onChange={handleChange}
					value={currentLocale}
				>
					<option className="bg-gray-800 text-white" value="en">
						{t("English")}
					</option>
					<option className="bg-gray-800 text-white" value="fr">
						{t("French")}
					</option>
				</select>
				<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
					{isLoading ? (
						<svg
							className="animate-spin h-4 w-4 text-white"
							fill="none"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							></circle>
							<path
								className="opacity-75"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								fill="currentColor"
							></path>
						</svg>
					) : (
						<svg
							className="fill-current h-4 w-4"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
						</svg>
					)}
				</div>
			</div>
		</div>
	);
}

export default function Home() {
	const t = useTranslations("LandingPage");
	return (
		<div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
			{/* Hero Section */}
			<header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 relative">
				<LanguageSwitcher />
				<div className="container mx-auto px-6">
					<div className="flex flex-col md:flex-row items-center justify-between">
						<div className="md:w-1/2 mb-10 md:mb-0">
							<Image
								alt="Klickbee CMS Logo"
								className="mb-8"
								height={63}
								priority
								src="/Logo_Blanc_Couleur.png"
								width={300}
							/>
							<h1 className="text-4xl md:text-5xl font-bold mb-4">
								{t("Hero.Title")}
							</h1>
							<p className="text-xl mb-8 opacity-90">
								{t("Hero.Subtitle")}
							</p>
							<div className="flex flex-col sm:flex-row gap-4">
								<a
									className="bg-white text-indigo-700 hover:bg-indigo-100 transition-colors py-3 px-6 rounded-lg font-medium text-center"
									href="#getting-started"
								>
									{t("Hero.GetStarted")}
								</a>
								<a
									className="bg-transparent border border-white text-white hover:bg-white/10 transition-colors py-3 px-6 rounded-lg font-medium text-center"
									href="https://github.com/stralya-company/klickbee-cms"
									rel="noopener noreferrer"
									target="_blank"
								>
									{t("Hero.GitHub")}
								</a>
							</div>
						</div>
						<div className="md:w-1/2">
							<div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 shadow-xl">
								<pre className="text-sm overflow-x-auto">
									<code className="language-typescript">
										{`${t("Hero.AdminAccess")}
${t("Hero.DefaultCredentials")}
${t("Hero.Username")}
${t("Hero.Password")}

${t("Hero.HaveALookBuilder")}

${t("Hero.BuildTogether")}`}
									</code>
								</pre>
							</div>
						</div>
					</div>
				</div>
			</header>

			{/* Features Section */}
			<section className="py-20 bg-gray-50 dark:bg-gray-900">
				<div className="container mx-auto px-6">
					<h2 className="text-3xl font-bold text-center mb-16">
						{t("Features.Title")}
					</h2>

					<div className="grid md:grid-cols-3 gap-10">
						<div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
							<div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
								<svg
									className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
									/>
								</svg>
							</div>
							<h3 className="text-xl font-semibold mb-3">
								{t("Features.VisualBuilder.Title")}
							</h3>
							<p className="text-gray-600 dark:text-gray-300">
								{t("Features.VisualBuilder.Description")}
							</p>
						</div>

						<div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
							<div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
								<svg
									className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
									/>
								</svg>
							</div>
							<h3 className="text-xl font-semibold mb-3">
								{t("Features.CustomPostTypes.Title")}
							</h3>
							<p className="text-gray-600 dark:text-gray-300">
								{t("Features.CustomPostTypes.Description")}
							</p>
						</div>

						<div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
							<div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
								<svg
									className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
									/>
								</svg>
							</div>
							<h3 className="text-xl font-semibold mb-3">
								{t("Features.TechStack.Title")}
							</h3>
							<p className="text-gray-600 dark:text-gray-300">
								{t("Features.TechStack.Description")}
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Architecture Section */}
			<section className="py-20">
				<div className="container mx-auto px-6">
					<h2 className="text-3xl font-bold text-center mb-16">
						{t("Architecture.Title")}
					</h2>

					<div className="grid md:grid-cols-2 gap-12 items-center">
						<div>
							<h3 className="text-2xl font-semibold mb-6">
								{t("Architecture.FrontEndStructure")}
							</h3>
							<div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg font-mono text-sm">
								<pre>
									{`front/
├── static/[slug]
├── content/[cpt-type]/[cpt-slug]`}
								</pre>
							</div>

							<h3 className="text-2xl font-semibold mt-10 mb-6">
								{t("Architecture.AdminStructure")}
							</h3>
							<div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg font-mono text-sm">
								<pre>
									{`/admin/[generated_key]/
├── auth
    ├── login
    ├── password-reset
    ├── password-reset-request
├── manage/
│   ├── content/[cpt-type]
│   ├── static/[slug]
│   ├── settings
│   └── contact`}
								</pre>
							</div>
						</div>

						<div>
							<h3 className="text-2xl font-semibold mb-6">
								{t("Architecture.Benefits")}
							</h3>
							<ul className="space-y-4">
								<li className="flex items-start">
									<svg
										className="h-6 w-6 text-green-500 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											d="M5 13l4 4L19 7"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
										/>
									</svg>
									<span>{t("Architecture.Benefit1")}</span>
								</li>
								<li className="flex items-start">
									<svg
										className="h-6 w-6 text-green-500 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											d="M5 13l4 4L19 7"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
										/>
									</svg>
									<span>{t("Architecture.Benefit2")}</span>
								</li>
								<li className="flex items-start">
									<svg
										className="h-6 w-6 text-green-500 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											d="M5 13l4 4L19 7"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
										/>
									</svg>
									<span>{t("Architecture.Benefit3")}</span>
								</li>
								<li className="flex items-start">
									<svg
										className="h-6 w-6 text-green-500 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											d="M5 13l4 4L19 7"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
										/>
									</svg>
									<span>{t("Architecture.Benefit4")}</span>
								</li>
								<li className="flex items-start">
									<svg
										className="h-6 w-6 text-green-500 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											d="M5 13l4 4L19 7"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
										/>
									</svg>
									<span>{t("Architecture.Benefit5")}</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* Getting Started Section */}
			<section
				className="py-20 bg-gray-50 dark:bg-gray-900"
				id="getting-started"
			>
				<div className="container mx-auto px-6">
					<h2 className="text-3xl font-bold text-center mb-16">
						{t("GettingStarted.Title")}
					</h2>

					<div className="max-w-3xl mx-auto">
						<div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md mb-8">
							<h3 className="text-xl font-semibold mb-4">
								{t("GettingStarted.Option1")}
							</h3>
							<div className="space-y-4">
								<div>
									<p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
										{t("GettingStarted.Step1")}
									</p>
									<pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm overflow-x-auto">
										<code>cp .env.example .env</code>
									</pre>
								</div>
								<div>
									<p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
										{t("GettingStarted.Step2npm")}
									</p>
									<pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm overflow-x-auto">
										<code>npm run setup:dev</code>
									</pre>
								</div>
								<div>
									<p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
										{t("GettingStarted.Step3npm")}
									</p>
									<pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm overflow-x-auto">
										<code>npm run dev</code>
									</pre>
								</div>
							</div>
						</div>

						<div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-4">
								{t("GettingStarted.Option2")}
							</h3>
							<div className="space-y-4">
								<div>
									<p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
										{t("GettingStarted.Step1")}
									</p>
									<pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm overflow-x-auto">
										<code>cp .env.example .env</code>
									</pre>
								</div>
								<div>
									<p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
										{t("GettingStarted.Step2docker")}
									</p>
									<pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm overflow-x-auto">
										<code>docker compose up</code>
									</pre>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-800 text-white py-12">
				<div className="container mx-auto px-6">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<div className="mb-8 md:mb-0">
							<Image
								alt="Klickbee CMS Logo"
								className="mb-4"
								height={38}
								src="/Logo_Blanc_Couleur.png"
								width={180}
							/>
							<p className="text-gray-400">
								{t("Footer.Tagline")}
							</p>
						</div>

						<div className="grid grid-cols-2 md:grid-cols-3 gap-8">
							<div>
								<h4 className="font-semibold mb-4">
									{t("Footer.Resources")}
								</h4>
								<ul className="space-y-2">
									<li>
										<a
											className="text-gray-400 hover:text-white transition-colors"
											href="https://github.com/stralya-company/klickbee-cms"
										>
											GitHub
										</a>
									</li>
									<li>
										<a
											className="text-gray-400 hover:text-white transition-colors"
											href="https://github.com/stralya-company/klickbee-cms/blob/main/CONTRIBUTING.md"
										>
											Contributing
										</a>
									</li>
									<li>
										<a
											className="text-gray-400 hover:text-white transition-colors"
											href="https://github.com/stralya-company/klickbee-cms/blob/main/LICENSE"
										>
											License
										</a>
									</li>
								</ul>
							</div>

							<div>
								<h4 className="font-semibold mb-4">
									{t("Footer.Community")}
								</h4>
								<ul className="space-y-2">
									<li>
										<a
											className="text-gray-400 hover:text-white transition-colors"
											href="https://discord.gg/SmBxh4wPrv"
										>
											Discord
										</a>
									</li>
									<li>
										<a
											className="text-gray-400 hover:text-white transition-colors"
											href="https://www.reddit.com/r/klickbee_cms/"
										>
											Reddit
										</a>
									</li>
								</ul>
							</div>

							<div>
								<h4 className="font-semibold mb-4">
									{t("Footer.Contact")}
								</h4>
								<ul className="space-y-2">
									<li>
										<a
											className="text-gray-400 hover:text-white transition-colors"
											href="mailto:contact@stralya.com"
										>
											contact@stralya.com
										</a>
									</li>
									<li>
										<a
											className="text-gray-400 hover:text-white transition-colors"
											href="https://klickbee.com"
										>
											klickbee.com
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
						<p>
							{t("Footer.Copyright", {
								year: new Date().getFullYear(),
							})}
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
