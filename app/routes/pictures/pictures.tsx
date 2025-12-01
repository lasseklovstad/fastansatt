import { useState } from "react";
import { H1 } from "~/components/headings";
import { ImageLightbox } from "./components/image-lightbox";

const weddingPictures = [
	"0K6A8444.webp",
	"0K6A8445.webp",
	"0K6A8446.webp",
	"0K6A8447.webp",
	"0K6A8449.webp",
	"0K6A8450.webp",
	"0K6A8452.webp",
	"0K6A8453.webp",
	"0K6A8455.webp",
	"0K6A8456.webp",
	"0K6A8459.webp",
	"0K6A8473.webp",
	"0K6A8494.webp",
	"0K6A8497.webp",
	"0K6A8501.webp",
	"0K6A8507.webp",
	"0K6A8508.webp",
	"0K6A8509.webp",
	"0K6A8510.webp",
	"0K6A8511.webp",
	"0K6A8514.webp",
	"0K6A8516.webp",
	"0K6A8517.webp",
	"0K6A8519.webp",
	"0K6A8520.webp",
	"0K6A8522.webp",
	"0K6A8524.webp",
	"0K6A8525.webp",
	"0K6A8527.webp",
	"0K6A8529.webp",
];

export default function Pictures() {
	const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
		null,
	);

	const handleOpenLightbox = (index: number) => {
		setSelectedImageIndex(index);
	};

	const handleCloseLightbox = () => {
		setSelectedImageIndex(null);
	};

	const handleNext = () => {
		if (selectedImageIndex === null) return;
		setSelectedImageIndex((prev) =>
			prev === null || prev >= weddingPictures.length - 1 ? prev : prev + 1,
		);
	};

	const handlePrevious = () => {
		if (selectedImageIndex === null) return;
		setSelectedImageIndex((prev) =>
			prev === null || prev <= 0 ? prev : prev - 1,
		);
	};

	return (
		<main className="container mx-auto space-y-4">
			<H1>Bilder</H1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
				{weddingPictures.map((name, index) => (
					<button
						key={name}
						type="button"
						onClick={() => handleOpenLightbox(index)}
						className="w-full h-full cursor-pointer hover:opacity-90 transition-opacity"
					>
						<img
							src={`/images/2025-bryllup-webp-1200/${name}`}
							srcSet={`/images/2025-bryllup-webp-600/${name} 600w, /images/2025-bryllup-webp-1200/${name} 1200w, /images/2025-bryllup-webp-1600/${name} 1600w`}
							sizes="25vw"
							alt={`Wedding ${index + 1}`}
							loading="lazy"
							className="w-full h-full object-cover"
						/>
					</button>
				))}
			</div>

			{selectedImageIndex !== null && (
				<ImageLightbox
					images={weddingPictures}
					currentIndex={selectedImageIndex}
					isOpen={selectedImageIndex !== null}
					onClose={handleCloseLightbox}
					onNext={handleNext}
					onPrevious={handlePrevious}
				/>
			)}
		</main>
	);
}
