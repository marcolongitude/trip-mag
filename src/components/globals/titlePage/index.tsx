type TitlePageProps = {
	title: string;
};

export function TitlePage({ title }: TitlePageProps) {
	return (
		<div className="flex w-full items-center justify-center">
			<span className="text-2xl font-semibold tracking-wide antialiased">
				{title}
			</span>
		</div>
	);
}
