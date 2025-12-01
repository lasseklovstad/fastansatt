import { useEffect, useRef } from "react";
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
	const dialogRef = useRef<HTMLDialogElement>(null);

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

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (isOpen) {
			dialog.showModal();
		} else {
			dialog.close();
		}
	}, [isOpen]);

	if (!isOpen) return null;

	const currentImage = images[currentIndex];

	return (
		<dialog
			ref={dialogRef}
			className="fixed inset-0 w-full h-full max-w-full max-h-full bg-transparent backdrop:bg-black/90 p-0 m-0"
		>
			<div
				className="relative w-full h-full flex items-center justify-center"
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
			>
				{/* Close Button */}
				<button
					type="button"
					onClick={onClose}
					className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
					aria-label="Close lightbox"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<title>Close</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				{/* Image Counter */}
				<div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium">
					{currentIndex + 1} / {images.length}
				</div>

				{/* Previous Button */}
				<button
					type="button"
					onClick={onPrevious}
					disabled={currentIndex === 0}
					className="absolute left-4 z-10 w-12 h-12 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
					aria-label="Previous image"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<title>Previous</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 19.5L8.25 12l7.5-7.5"
						/>
					</svg>
				</button>

				{/* Next Button */}
				<button
					type="button"
					onClick={onNext}
					disabled={currentIndex === images.length - 1}
					className="absolute right-4 z-10 w-12 h-12 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
					aria-label="Next image"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<title>Next</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M8.25 4.5l7.5 7.5-7.5 7.5"
						/>
					</svg>
				</button>

				{/* Image */}
				<img
					src={`/images/2025-bryllup-webp-1600/${currentImage}`}
					alt={`Wedding ${currentIndex + 1} of ${images.length}`}
					className="max-w-full max-h-full object-contain p-4"
				/>
			</div>
		</dialog>
	);
}
