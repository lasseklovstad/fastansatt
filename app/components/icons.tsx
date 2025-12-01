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

export const SvgPlay = ({
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
		<title>Spill av</title>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
		/>
	</svg>
);

export const SvgPause = ({
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
		<title>Pause</title>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M15.75 5.25v13.5m-7.5-13.5v13.5"
		/>
	</svg>
);

export const SvgSkipForward = ({
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
		<title>Neste sang</title>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
		/>
	</svg>
);

export const SvgSkipBack = ({
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
		<title>Forrige sang</title>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
		/>
	</svg>
);

export const SvgVolume = ({
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
		<title>Volum</title>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
		/>
	</svg>
);
