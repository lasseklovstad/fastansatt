const gig = {
	date: new Date(2026, 1, 17, 19),
	venue: "Josefine Vertshus",
	address: "Josefines gate 16, 0351 Oslo",
	eventLink: "https://www.facebook.com/events/3396215823865610",
};

export function Welcome() {
	return (
		<main className="container mx-auto space-y-4">
			<h1 className="text-6xl text-center font-bold">Fast Ansatt</h1>
			<p className="text-xl text-muted-foreground text-center p-8 max-w-3xl mx-auto">
				Ditt lokale cover-band som leverer rock og pop i Oslo-området! Sjekk ut
				bilder fra våre villeste konserter, se hvor vi spiller neste gang og møt
				gjengen bak musikken.
			</p>
			<img
				src="/cover-image.jpg"
				alt=""
				className="w-full h-full object-cover"
			/>

			<article className="px-4">
				<h2 className="text-3xl mb-4">Kommende konserter</h2>
				<div className="rounded p-6 border border-border">
					<div className="flex justify-between items-start mb-4">
						<div>
							<p className="text-primary font-semibold text-lg">
								{gig.date.toLocaleDateString(undefined, {
									dateStyle: "medium",
								})}
							</p>
							<p className="text-muted-foreground text-base">
								{gig.date.toLocaleDateString(undefined, { weekday: "long" })}
							</p>
						</div>
					</div>

					<h3 className="text-xl font-bold text-foreground mb-2">
						{gig.venue}
					</h3>
					<address className="text-muted-foreground mb-4">
						{gig.address}
					</address>
					<p className="text-sm text-muted-foreground mb-4">
						🕐 {gig.date.toLocaleTimeString(undefined, { timeStyle: "short" })}
					</p>

					<a
						target="_blank"
						rel="noopener noreferrer"
						href={gig.eventLink}
						className="bg-primary text-primary-foreground hover:opacity-90 rounded-sm px-4 py-2 text-lg"
					>
						Gå til eventside
					</a>
				</div>
			</article>
		</main>
	);
}
