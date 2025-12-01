import { Dialog } from "~/components/dialog";
import { IconButton } from "~/components/icon-button";
import { SvgNext, SvgPrevious } from "~/components/icons";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";
import { useTouchGestures } from "../hooks/useTouchGestures";

interface ImageLightboxProps {
	images: string[];
	currentIndex: number;
	isOpen: boolean;
	onClose: () => void;
	onNext: () => void;
	onPrevious: () => void;
}

export function ImageLightbox({
	images,
	currentIndex,
	isOpen,
	onClose,
	onNext,
	onPrevious,
}: ImageLightboxProps) {
	useKeyboardNavigation({
		isOpen,
		onClose,
		onNext,
		onPrevious,
	});

	const { handleTouchStart, handleTouchEnd } = useTouchGestures({
		onSwipeLeft: onNext,
		onSwipeRight: onPrevious,
	});

	const currentImage = images[currentIndex];

	return (
		<Dialog isOpen={isOpen} onClose={onClose}>
			<div
				className="relative w-full h-full flex items-center justify-center"
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
			>
				{/* Image Counter */}
				<div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium">
					{currentIndex + 1} / {images.length}
				</div>

				{/* Previous Button */}
				<IconButton
					onClick={onPrevious}
					disabled={currentIndex === 0}
					className="absolute left-4 z-10"
					aria-label="Forrige bilde"
				>
					<SvgPrevious />
				</IconButton>

				{/* Next Button */}
				<IconButton
					onClick={onNext}
					disabled={currentIndex === images.length - 1}
					className="absolute right-4 z-10"
					aria-label="Neste bilde"
				>
					<SvgNext />
				</IconButton>

				{/* Image */}
				<img
					src={`/images/2025-bryllup-webp-1600/${currentImage}`}
					alt={`Wedding ${currentIndex + 1} of ${images.length}`}
					className="max-w-full max-h-full object-contain p-4"
				/>
			</div>
		</Dialog>
	);
}
