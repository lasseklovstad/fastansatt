import { useEffect, useRef, useState } from "react";
import { IconButton } from "~/components/icon-button";
import {
	SvgPause,
	SvgPlay,
	SvgSkipBack,
	SvgSkipForward,
	SvgVolume,
} from "~/components/icons";

interface AudioPlayerProps {
	currentTrack: {
		title: string;
		artist: string;
		url: string;
	} | null;
	onNext: () => void;
	onPrevious: () => void;
}

export function AudioPlayer({
	currentTrack,
	onNext,
	onPrevious,
}: AudioPlayerProps) {
	const audioRef = useRef<HTMLAudioElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(1);

	// Ensure new tracks start immediately when selected, including on iOS.
	useEffect(() => {
		if (!audioRef.current || !currentTrack) return;

		const audio = audioRef.current;
		audio.pause();
		audio.load();
		setCurrentTime(0);
		setDuration(0);

		audio.play().then(
			() => setIsPlaying(true),
			() => setIsPlaying(false),
		);
	}, [currentTrack]);

	const togglePlayPause = () => {
		const audio = audioRef.current;
		if (!audio) return;

		if (audio.paused) {
			audio.play().then(
				() => setIsPlaying(true),
				() => setIsPlaying(false),
			);
			return;
		}

		audio.pause();
		setIsPlaying(false);
	};

	// Update current time
	const handleTimeUpdate = () => {
		if (audioRef.current) {
			setCurrentTime(audioRef.current.currentTime);
		}
	};

	// Update duration when metadata loads
	const handleLoadedMetadata = () => {
		if (audioRef.current) {
			setDuration(audioRef.current.duration);
		}
	};

	// Handle track end
	const handleEnded = () => {
		setIsPlaying(false);
		onNext();
	};

	// Seek to position
	const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
		const time = Number.parseFloat(e.target.value);
		setCurrentTime(time);
		if (audioRef.current) {
			audioRef.current.currentTime = time;
		}
	};

	// Volume control
	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const vol = Number.parseFloat(e.target.value);
		setVolume(vol);
		if (audioRef.current) {
			audioRef.current.volume = vol;
		}
	};

	// Format time display
	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	};

	if (!currentTrack) {
		return null;
	}

	return (
		<div className="border border-border rounded-lg p-6 bg-background">
			{/** biome-ignore lint/a11y/useMediaCaption: Dette gidder jeg ikke */}
			<audio
				ref={audioRef}
				src={currentTrack.url}
				onPlay={() => setIsPlaying(true)}
				onPause={() => setIsPlaying(false)}
				onTimeUpdate={handleTimeUpdate}
				onLoadedMetadata={handleLoadedMetadata}
				onEnded={handleEnded}
			/>

			<div className="space-y-4">
				{/* Track info */}
				<div className="text-center">
					<h3 className="text-xl font-bold text-primary">
						{currentTrack.title}
					</h3>
					<p className="text-muted-foreground">{currentTrack.artist}</p>
				</div>

				{/* Progress bar */}
				<div className="space-y-2">
					<input
						type="range"
						min={0}
						max={duration || 0}
						value={currentTime}
						onChange={handleSeek}
						className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0"
					/>
					<div className="flex justify-between text-sm text-muted-foreground">
						<span>{formatTime(currentTime)}</span>
						<span>{formatTime(duration)}</span>
					</div>
				</div>

				{/* Controls */}
				<div className="flex items-center justify-center gap-4">
					<IconButton onClick={onPrevious} aria-label="Forrige sang">
						<SvgSkipBack />
					</IconButton>
					<IconButton
						onClick={togglePlayPause}
						aria-label={isPlaying ? "Pause" : "Spill av"}
						className="scale-125"
					>
						{isPlaying ? <SvgPause /> : <SvgPlay />}
					</IconButton>
					<IconButton onClick={onNext} aria-label="Neste sang">
						<SvgSkipForward />
					</IconButton>
				</div>

				{/* Volume control */}
				<div className="flex items-center gap-3 max-w-xs mx-auto">
					<SvgVolume className="text-muted-foreground" />
					<input
						type="range"
						min={0}
						max={1}
						step={0.01}
						value={volume}
						onChange={handleVolumeChange}
						className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0"
						aria-label="Volum"
					/>
				</div>
			</div>
		</div>
	);
}
