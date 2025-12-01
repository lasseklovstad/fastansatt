import type { ComponentPropsWithoutRef } from "react";
import { cn } from "~/lib/utils";

export const SvgPrevious = ({
	className,
	...props
}: ComponentPropsWithoutRef<"svg">) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={2}
		stroke="currentColor"
		className={cn("size-6", className)}
		{...props}
	>
		<title>Forrige</title>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M15.75 19.5L8.25 12l7.5-7.5"
		/>
	</svg>
);
export const SvgNext = ({
	className,
	...props
}: ComponentPropsWithoutRef<"svg">) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={2}
		stroke="currentColor"
		className={cn("size-6", className)}
		{...props}
	>
		<title>Neste</title>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M8.25 4.5l7.5 7.5-7.5 7.5"
		/>
	</svg>
);
export const SvgClose = ({
	className,
	...props
}: ComponentPropsWithoutRef<"svg">) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={2}
		stroke="currentColor"
		className={cn("size-6", className)}
		{...props}
	>
		<title>Lukk</title>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M6 18L18 6M6 6l12 12"
		/>
	</svg>
);
export const SvgMenu = ({
	className,
	...props
}: ComponentPropsWithoutRef<"svg">) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		strokeLinejoin="round"
		className={cn("size-6", className)}
		{...props}
	>
		<title>Meny</title>
		<line x1="3" y1="6" x2="21" y2="6" />
		<line x1="3" y1="12" x2="21" y2="12" />
		<line x1="3" y1="18" x2="21" y2="18" />
	</svg>
);
