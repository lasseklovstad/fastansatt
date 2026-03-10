import { useState } from "react";
import { H1, H2, H3 } from "~/components/headings";
import { AudioPlayer } from "./components/audio-player";
import { TrackList } from "./components/track-list";

interface Track {
	id: number;
	title: string;
	artist: string;
	filename: string;
}

const tracks: Track[] = [
	{
		id: 1,
		title: "Come Together",
		artist: "The Beatles",
		filename: "Come Togethor- Fast Ansatt.mp3",
	},
	{
		id: 2,
		title: "Let's Get It Started",
		artist: "Black Eyed Peas",
		filename: "Let's get it started - Fast Ansatt.mp3",
	},
	{
		id: 3,
		title: "Piano",
		artist: "Karpe",
		filename: "Piano - Fast Ansatt.mp3",
	},
	{
		id: 4,
		title: "Song 2",
		artist: "Blur",
		filename: "Song 2 - Fast Ansatt.mp3",
	},
];

export const Music = () => {
	const [currentTrackId, setCurrentTrackId] = useState<number | null>(null);

	const currentTrack = tracks.find((track) => track.id === currentTrackId);

	const handleTrackSelect = (trackId: number) => {
		setCurrentTrackId(trackId);
	};

	const handleNext = () => {
		if (!currentTrackId) {
			setCurrentTrackId(tracks[0].id);
			return;
		}
		const currentIndex = tracks.findIndex((t) => t.id === currentTrackId);
		const nextIndex = (currentIndex + 1) % tracks.length;
		setCurrentTrackId(tracks[nextIndex].id);
	};

	const handlePrevious = () => {
		if (!currentTrackId) {
			setCurrentTrackId(tracks[tracks.length - 1].id);
			return;
		}
		const currentIndex = tracks.findIndex((t) => t.id === currentTrackId);
		const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
		setCurrentTrackId(tracks[prevIndex].id);
	};

	return (
		<article className="px-4">
			<H2 className="mb-4">Musikk</H2>
			<p className="text-xl text-muted-foreground">
				Vi spiller masse forskjellig cover-låter. Her er live opptak av noen
				låter vi har spilt.
			</p>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
				{/* Track list */}
				<div>
					<H3 className="mb-4">Sanger</H3>
					<TrackList
						tracks={tracks}
						currentTrackId={currentTrackId}
						onTrackSelect={handleTrackSelect}
					/>
				</div>

				{/* Audio player */}
				<div>
					<H3 className="mb-4">Avspiller</H3>
					{currentTrack ? (
						<AudioPlayer
							currentTrack={{
								title: currentTrack.title,
								artist: currentTrack.artist,
								url: `/music/${currentTrack.filename}`,
							}}
							onNext={handleNext}
							onPrevious={handlePrevious}
						/>
					) : (
						<div className="border border-border rounded-lg p-6 text-center text-muted-foreground">
							Velg en sang for å begynne å spille
						</div>
					)}
				</div>
			</div>
		</article>
	);
};
