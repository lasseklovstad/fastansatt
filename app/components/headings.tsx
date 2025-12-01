import type { ComponentPropsWithRef } from "react";
import { cn } from "~/lib/utils";

export const H1 = (props: ComponentPropsWithRef<"h1">) => (
	<h1
		{...props}
		className={cn("text-6xl text-center font-bold", props.className)}
	/>
);
export const H2 = (props: ComponentPropsWithRef<"h2">) => (
	<h2 {...props} className={cn("text-3xl", props.className)} />
);
export const H3 = (props: ComponentPropsWithRef<"h2">) => (
	<h2 {...props} className={cn("text-xl font-bold", props.className)} />
);
