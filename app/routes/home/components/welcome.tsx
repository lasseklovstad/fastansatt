import { H1 } from "~/components/headings";

export function Welcome() {
	return (
		<>
			<H1>Fast Ansatt</H1>
			<p className="text-xl text-muted-foreground text-center p-4 max-w-3xl mx-auto">
				Ditt lokale cover-band som leverer rock og pop i Oslo-området! Sjekk ut
				bilder fra våre villeste konserter, se hvor vi spiller neste gang og møt
				gjengen bak musikken.
			</p>
			<img
				src="/images/2025-bryllup-webp-1200/cover-image.webp"
				srcSet="/images/2025-bryllup-webp-600/cover-image.webp 600w, /images/2025-bryllup-webp-1200/cover-image.webp 1200w, /images/2025-bryllup-webp-1600/cover-image.webp 1600w"
				sizes="100vw"
				alt=""
				className="w-full h-full object-cover"
			/>
		</>
	);
}
