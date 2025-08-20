interface DateCellProps {
	date: string | Date;
	locale: string;
}

export function DateCell({ date, locale }: DateCellProps) {
	return (
		<span>
			{new Intl.DateTimeFormat(locale, {
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
				month: "2-digit",
				year: "numeric",
			}).format(new Date(date))}
		</span>
	);
}
