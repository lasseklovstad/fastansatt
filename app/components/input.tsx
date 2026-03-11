import type { ComponentPropsWithRef } from "react";
import { cn } from "~/lib/utils";

export const Input = ({
	className,
	...props
}: ComponentPropsWithRef<"input">) => {
	return (
		<input
			className={cn(
				"w-full rounded-sm border border-muted bg-background px-3 py-2 text-foreground outline-none transition focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed",
				className,
			)}
			{...props}
		/>
	);
};
