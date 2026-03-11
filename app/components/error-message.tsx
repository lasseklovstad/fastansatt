import type { ComponentPropsWithRef } from "react";
import { cn } from "~/lib/utils";

export const ErrorMessage = ({
	className,
	errors,
	...props
}: ComponentPropsWithRef<"div"> & { errors: string[] | undefined }) => {
	return errors?.length ? (
		<div {...props} className={cn("text-red-500", className)}>
			{errors[0]}
		</div>
	) : null;
};
