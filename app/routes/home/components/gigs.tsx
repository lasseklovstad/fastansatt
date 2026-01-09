import { H2, H3 } from "~/components/headings";

const gig = {
	date: new Date(2026, 0, 17, 19),
	venue: "Josefine Vertshus",
	address: "Josefines gate 16, 0351 Oslo",
	eventLink: "https://www.facebook.com/events/3396215823865610",
	ticketLink: "https://fast-ansatt.hoopla.no/event/372514305",
};

export const Gigs = () => (
	<article className="px-4">
		<H2 className="mb-4">Kommende konserter</H2>
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

			<H3 className="mb-2">{gig.venue}</H3>
			<address className="text-muted-foreground mb-4">{gig.address}</address>
			<p className="text-sm text-muted-foreground mb-4">
				🕐 {gig.date.toLocaleTimeString(undefined, { timeStyle: "short" })}
			</p>

			<div className="flex gap-2">
				<a
					target="_blank"
					rel="noopener noreferrer"
					href={gig.eventLink}
					className="bg-primary text-primary-foreground hover:opacity-90 rounded-sm px-4 py-2 text-lg"
				>
					Gå til eventside
				</a>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href={gig.ticketLink}
					className="bg-primary text-primary-foreground hover:opacity-90 rounded-sm px-4 py-2 text-lg"
				>
					Kjøp billett
				</a>
			</div>
		</div>
	</article>
);
