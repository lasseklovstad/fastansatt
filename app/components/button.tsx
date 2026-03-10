import type { ComponentPropsWithRef } from "react";
import { cn } from "~/lib/utils";

export const Button = ({
	className,
	...props
}: ComponentPropsWithRef<"button">) => {
	return (
		<button
			className={cn(
				"cursor-pointer inline-flex rounded-sm bg-primary px-5 py-2 text-base font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed",
				className,
			)}
			{...props}
		/>
	);
};
