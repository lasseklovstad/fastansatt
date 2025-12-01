import { useEffect, useRef } from "react";
import { cn } from "~/lib/utils";
import { IconButton } from "./icon-button";
import { SvgClose } from "./icons";

interface DialogProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

export function Dialog({ isOpen, onClose, children }: DialogProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (isOpen) {
			dialog.showModal();
		} else {
			dialog.close();
		}
	}, [isOpen]);

	return (
		<dialog
			ref={dialogRef}
			className={cn(
				"w-full h-full max-w-full max-h-full m-0 p-0 bg-background text-foreground",
			)}
		>
			<IconButton
				onClick={onClose}
				className={cn("absolute top-4 right-4 z-10")}
				aria-label="Lukk"
			>
				<SvgClose />
			</IconButton>
			{children}
		</dialog>
	);
}
