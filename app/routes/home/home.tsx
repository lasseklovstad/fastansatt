import type { Route } from "./+types/home";
import { Gigs } from "./components/gigs";
import { Welcome } from "./components/welcome";

export function meta() {
	return [
		{ title: "Fast Ansatt" },
		{
			name: "description",
			content:
				"Ditt lokale cover-band som leverer rock og pop i Oslo-området! Sjekk ut bilder fra våre villeste konserter, se hvor vi spiller neste gang, snapp deg noe fett merch, hør liveopptak og møt gjengen bak musikken.",
		},
	];
}

export function loader({ context }: Route.LoaderArgs) {
	return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Home() {
	return (
		<main className="container mx-auto space-y-4">
			<Welcome />
			<Gigs />
		</main>
	);
}
