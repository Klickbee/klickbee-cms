"use client";

import {
	ChevronRight,
	Files,
	Home,
	Images,
	Layers,
	Mail,
	Settings as SettingsIcon,
	User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import LogoutButton from "@/components/admin/_partials/logoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sidebar as ShadcnSidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";
import { useAllCollections } from "@/feature/collection/queries/useAllCollections";
import { useCurrentUser } from "@/feature/user/queries/useUser";

export function Sidebar() {
	const t = useTranslations("AdminSidebar");
	const adminKey = useAdminKeyStore((state) => state.adminKey);
	const pathname = usePathname();
	const { data: user } = useCurrentUser();
	const { data: collections } = useAllCollections();
	const items = [
		{
			href: `/admin/${adminKey}/`,
			icon: Home,
			label: t("Dashboard"),
		},
		{
			href: `/admin/${adminKey}/manage/media`,
			icon: Images,
			label: t("Media"),
		},
		{
			href: `/admin/${adminKey}/manage/pages`,
			icon: Files,
			label: t("Pages"),
		},
		{
			children:
				collections?.map((collection) => ({
					href: `/admin/${adminKey}/manage/content/${collection.slug}/items`,
					label: collection.name,
				})) || [],
			href: `/admin/${adminKey}/manage/content`,
			icon: Layers,
			label: t("Content"),
		},
		{
			href: `/admin/${adminKey}/manage/contact`,
			icon: Mail,
			label: t("Contact"),
		},
		{
			children: [
				{
					href: `/admin/${adminKey}/manage/settings/ai`,
					label: t("AI"),
				},
				{
					href: `/admin/${adminKey}/manage/settings/contact`,
					label: t("Contact"),
				},
				{
					href: `/admin/${adminKey}/manage/settings/users`,
					label: t("Users"),
				},
				{
					href: `/admin/${adminKey}/manage/settings/email`,
					label: t("Email"),
				},
				{
					href: `/admin/${adminKey}/manage/settings/builder`,
					label: t("Builder"),
				},
			],
			icon: SettingsIcon,
			label: t("Settings"),
		},
	];

	return (
		<ShadcnSidebar>
			<SidebarHeader className="p-4">
				<div className="flex items-center gap-3 w-full hover:bg-gray-50 rounded-lg p-2 -m-2 cursor-pointer">
					<div className="w-8 h-8 rounded-lg flex items-center justify-center">
						<Image
							alt="Klickbee Logo"
							className="w-full h-full rounded-lg"
							height={32}
							src="/logo-square-default.png"
							width={32}
						/>
					</div>
					<div className="flex flex-col min-w-0 flex-1">
						<p className="text-lg font-bold text-black truncate">
							Klickbee
						</p>
						<p className="text-xs text-gray-600 truncate">
							KlickBee.com
						</p>
					</div>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarMenu className="p-4">
					{items.map((item) =>
						item.children ? (
							<Collapsible
								className="group/collapsible"
								defaultOpen
								key={item.label}
							>
								<SidebarMenuItem
									className={
										"group data-[active=true]:bg-primary data-[active=true]:text-secondary"
									}
								>
									{item.href ? (
										<SidebarMenuButton
											asChild
											className="text-black data-[active=true]:bg-primary data-[active=true]:text-secondary"
											data-active={
												pathname === item.href ||
												pathname.startsWith(
													item.href +
														(item.href.endsWith("/")
															? ""
															: "/"),
												) ||
												item.children?.some(
													(child) =>
														pathname === child.href,
												)
											}
										>
											<Link
												className="flex items-center w-full"
												href={item.href}
											>
												<item.icon className="h-4 w-4" />
												<span>{item.label}</span>
												<CollapsibleTrigger
													asChild
													className={
														"cursor-pointer ml-auto"
													}
												>
													<ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
												</CollapsibleTrigger>
											</Link>
										</SidebarMenuButton>
									) : (
										<CollapsibleTrigger asChild>
											<SidebarMenuButton
												className="text-black data-[active=true]:bg-primary data-[active=true]:text-secondary"
												data-active={item.children?.some(
													(child) =>
														pathname === child.href,
												)}
											>
												<item.icon className="h-4 w-4" />
												{item.label}
												<ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
											</SidebarMenuButton>
										</CollapsibleTrigger>
									)}
								</SidebarMenuItem>
								<CollapsibleContent className="pt-2">
									<SidebarMenuSub>
										{item.children.map((subItem) => (
											<SidebarMenuSubItem
												key={subItem.label}
											>
												<SidebarMenuSubButton
													asChild
													className="text-black data-[active=true]:bg-primary data-[active=true]:text-secondary"
													data-active={
														pathname ===
														subItem.href
													}
												>
													<Link href={subItem.href}>
														{subItem.label}
													</Link>
												</SidebarMenuSubButton>
											</SidebarMenuSubItem>
										))}
									</SidebarMenuSub>
								</CollapsibleContent>
							</Collapsible>
						) : (
							<SidebarMenuItem key={item.label}>
								<SidebarMenuButton
									asChild
									className="text-black data-[active=true]:bg-primary data-[active=true]:text-secondary"
									data-active={
										pathname === item.href ||
										(item.href.endsWith("/") &&
											pathname ===
												item.href.slice(0, -1)) ||
										(!item.href.endsWith("/") &&
											pathname === item.href + "/")
									}
								>
									<Link
										className="flex items-center w-full"
										href={item.href}
									>
										<item.icon className="h-4 w-4" />
										<span>{item.label}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						),
					)}
				</SidebarMenu>
			</SidebarContent>
			<SidebarFooter className="p-4 border-t">
				{user && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<div className="flex items-center gap-3 w-full hover:bg-gray-50 rounded-lg p-2 -m-2 cursor-pointer">
								<Avatar className="h-8 w-8">
									<AvatarImage
										alt={user.name || ""}
										src={user.image || undefined}
									/>
									<AvatarFallback className="bg-gray-200">
										{user.name ? (
											user.name
												.split(" ")
												.map((n) => n[0])
												.join("")
												.toUpperCase()
										) : (
											<User className="h-4 w-4" />
										)}
									</AvatarFallback>
								</Avatar>
								<div className="flex flex-col min-w-0 flex-1">
									<p className="text-sm font-medium text-black truncate">
										{user.name || "Utilisateur"}
									</p>
									<p className="text-xs text-gray-600 truncate">
										{user.email}
									</p>
								</div>
								<SettingsIcon className="h-4 w-4 text-gray-500" />
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-64">
							<DropdownMenuItem asChild className="p-0">
								<LogoutButton />
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</SidebarFooter>
		</ShadcnSidebar>
	);
}
