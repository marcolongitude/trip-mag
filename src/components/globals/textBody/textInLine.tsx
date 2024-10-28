type TextInLineProps = {
	title: string;
	value: string | number;
};

export function TextInLine({ title, value }: TextInLineProps) {
	return (
		<div className="flex w-full items-center justify-between">
			<span className="text-xs font-semibold tracking-wide ">
				{title}
			</span>
			<span className="text-xs tracking-wide ">{value}</span>
		</div>
	);
}
