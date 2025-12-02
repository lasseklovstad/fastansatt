import { useState } from "react";
import { H1 } from "~/components/headings";
import { ImageLightbox } from "./components/image-lightbox";

const weddingPictures = [
	"2025-host-bryllup/0K6A8447.webp",
	"2025-host-bryllup/0K6A8452.webp",
	"2025-host-bryllup/0K6A8455.webp",
	"2025-host-bryllup/0K6A8473.webp",
	"2025-host-bryllup/0K6A8501.webp",
	"2025-host-bryllup/0K6A8509.webp",
	"2025-host-bryllup/0K6A8511.webp",
	"2025-host-bryllup/0K6A8514.webp",
	"2025-host-bryllup/0K6A8517.webp",
	"2025-host-bryllup/0K6A8519.webp",
	"2025-host-bryllup/0K6A8525.webp",
	"2025-host-bryllup/0K6A8529.webp",
	"2025-sommer-bryllup/622.webp",
	"2025-sommer-bryllup/627.webp",
	"2025-sommer-bryllup/628.webp",
	"2025-sommer-bryllup/629.webp",
	"2025-sommer-bryllup/630.webp",
	"2025-sommer-bryllup/640.webp",
	"2025-sommer-bryllup/641.webp",
	"2025-sommer-bryllup/645.webp",
	"josefine-vertshus/1.webp",
	"josefine-vertshus/2.webp",
	"josefine-vertshus/3.webp",
	"josefine-vertshus/4.webp",
	"josefine-vertshus/5.webp",
	"josefine-vertshus/6.webp",
	"josefine-vertshus/7.webp",
	"josefine-vertshus/8.webp",
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
						className="w-full h-72 cursor-pointer hover:opacity-90 transition-opacity"
					>
						<img
							src={`/images-600/${name}`}
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
