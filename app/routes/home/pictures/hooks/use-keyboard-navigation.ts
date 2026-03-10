import { useEffect } from "react";

interface UseKeyboardNavigationProps {
	isOpen: boolean;
	onClose: () => void;
	onPrevious: () => void;
	onNext: () => void;
}

export function useKeyboardNavigation({
	isOpen,
	onClose,
	onPrevious,
	onNext,
}: UseKeyboardNavigationProps) {
	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			switch (event.key) {
				case "Escape":
					onClose();
					break;
				case "ArrowLeft":
					onPrevious();
					break;
				case "ArrowRight":
					onNext();
					break;
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, onClose, onPrevious, onNext]);
}
