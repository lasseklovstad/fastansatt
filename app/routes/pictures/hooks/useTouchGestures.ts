import { useRef } from "react";

interface UseTouchGesturesProps {
	onSwipeLeft: () => void;
	onSwipeRight: () => void;
	threshold?: number;
}

export function useTouchGestures({
	onSwipeLeft,
	onSwipeRight,
	threshold = 50,
}: UseTouchGesturesProps) {
	const touchStartX = useRef<number | null>(null);

	const handleTouchStart = (event: React.TouchEvent) => {
		touchStartX.current = event.touches[0].clientX;
	};

	const handleTouchEnd = (event: React.TouchEvent) => {
		if (touchStartX.current === null) return;

		const touchEndX = event.changedTouches[0].clientX;
		const diff = touchStartX.current - touchEndX;

		if (Math.abs(diff) > threshold) {
			if (diff > 0) {
				onSwipeLeft();
			} else {
				onSwipeRight();
			}
		}

		touchStartX.current = null;
	};

	return {
		handleTouchStart,
		handleTouchEnd,
	};
}
