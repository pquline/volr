"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "@/i18n/client";
import { localeFlags, localeNames, locales } from "@/lib/i18n/config";
import { Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

export function SettingsMenu() {
	const { setTheme } = useTheme();
	const router = useRouter();
	const pathname = usePathname();
	const t = useTranslations();

	const handleLocaleChange = (newLocale: string) => {
		localStorage.setItem('preferredLocale', newLocale);
		router.replace(pathname, { locale: newLocale });
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<Settings className="h-[1.2rem] w-[1.2rem]" />
					<span className="sr-only">{t('settings.title')}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="max-w-[150px]">
				<DropdownMenuLabel>{t('theme.title')}</DropdownMenuLabel>
				<DropdownMenuGroup>
					<DropdownMenuItem
						className="space-x-2"
						onClick={() => setTheme("light")}
					>
						<span className="h-4 w-4">☀️</span>
						<span>{t('theme.light')}</span>
					</DropdownMenuItem>
					<DropdownMenuItem
						className="space-x-2"
						onClick={() => setTheme("dark")}
					>
						<span className="h-4 w-4">🌙</span>
						<span>{t('theme.dark')}</span>
					</DropdownMenuItem>
					<DropdownMenuItem
						className="space-x-2"
						onClick={() => setTheme("system")}
					>
						<span className="h-4 w-4">💻</span>
						<span>{t('theme.system')}</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuLabel>{t('language.title')}</DropdownMenuLabel>
				<DropdownMenuGroup>
					{locales.map((loc) => (
						<DropdownMenuItem
							key={loc}
							onClick={() => handleLocaleChange(loc)}
							className="space-x-2"
						>
							<span className="h-4 w-4">{localeFlags[loc]}</span>
							<span>{localeNames[loc]}</span>
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
