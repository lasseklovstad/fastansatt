import type { ComponentPropsWithRef } from "react";
import { cn } from "~/lib/utils";

export const Label = ({
	className,
	...props
}: ComponentPropsWithRef<"label">) => (
	// biome-ignore lint/a11y/noLabelWithoutControl: Doesn't matter for reusable thing
	<label {...props} className={cn("block text-base font-medium", className)} />
);
