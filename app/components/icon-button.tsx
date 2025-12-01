import type { ComponentPropsWithRef } from "react";
import { cn } from "~/lib/utils";

export const IconButton = ({
	className,
	...props
}: ComponentPropsWithRef<"button">) => {
	return (
		<button
			type="button"
			className={cn(
				"cursor-pointer size-10 flex items-center justify-center transition-colors p-2 rounded text-foreground bg-transparent hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed",
				className,
			)}
			{...props}
		/>
	);
};
