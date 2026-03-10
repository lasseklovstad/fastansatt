import { SvgPlay } from "~/components/icons";

interface Track {
	id: number;
	title: string;
	artist: string;
	filename: string;
}

interface TrackListProps {
	tracks: Track[];
	currentTrackId: number | null;
	onTrackSelect: (trackId: number) => void;
}

export function TrackList({
	tracks,
	currentTrackId,
	onTrackSelect,
}: TrackListProps) {
	return (
		<div className="space-y-3">
			{tracks.map((track) => {
				const isPlaying = track.id === currentTrackId;
				return (
					<button
						key={track.id}
						type="button"
						onClick={() => onTrackSelect(track.id)}
						className={`w-full text-left border border-border rounded-lg p-4 transition-colors hover:bg-gray-800 ${
							isPlaying ? "bg-gray-800 border-primary" : ""
						}`}
					>
						<div className="flex items-center gap-4">
							<div
								className={`flex items-center justify-center size-10 rounded-full ${
									isPlaying ? "bg-primary text-primary-foreground" : "bg-muted"
								}`}
							>
								<SvgPlay className="size-5" />
							</div>
							<div className="flex-1 min-w-0">
								<h3
									className={`font-semibold ${
										isPlaying ? "text-primary" : "text-foreground"
									}`}
								>
									{track.title}
								</h3>
								<p className="text-sm text-muted-foreground">{track.artist}</p>
							</div>
						</div>
					</button>
				);
			})}
		</div>
	);
}
