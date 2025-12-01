import { useRef, useState } from "react";

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
	const [dragOffset, setDragOffset] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);

	const handleTouchStart = (event: React.TouchEvent) => {
		touchStartX.current = event.touches[0].clientX;
		setIsTransitioning(false);
	};

	const handleTouchMove = (event: React.TouchEvent) => {
		if (touchStartX.current === null) return;

		const touchCurrentX = event.touches[0].clientX;
		const diff = touchCurrentX - touchStartX.current;
		setDragOffset(diff);
	};

	const handleTouchEnd = (event: React.TouchEvent) => {
		if (touchStartX.current === null) return;

		const touchEndX = event.changedTouches[0].clientX;
		const diff = touchStartX.current - touchEndX;

		setIsTransitioning(true);
		setDragOffset(0);

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
		handleTouchMove,
		handleTouchEnd,
		dragOffset,
		isTransitioning,
	};
}
