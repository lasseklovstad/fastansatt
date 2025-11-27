import { Link } from "react-router";
import { Welcome } from "../welcome/welcome";
import type { Route } from "./+types/home";

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
		<>
			<header className="container mx-auto flex gap-2 items-center justify-center">
				<nav>
					<ul className="p-8 flex flex-wrap">
						<li className="p-4">
							<Link to="/" className="p-4 min-w-16 text-lg hover:bg-gray-800">
								Hjem
							</Link>
						</li>
						<li className="p-4">
							<Link
								to="/musikk"
								className="p-4 min-w-16 text-lg hover:bg-gray-800"
							>
								Musikk
							</Link>
						</li>
						<li className="p-4">
							<Link
								to="/bilder"
								className="p-4 min-w-16 text-lg hover:bg-gray-800"
							>
								Om oss
							</Link>
						</li>
						<li className="p-4">
							<Link
								to="/merch"
								className="p-4 min-w-16 text-lg hover:bg-gray-800"
							>
								Merch
							</Link>
						</li>
						<li className="p-4">
							<Link
								to="/bilder"
								className="p-4 min-w-16 text-lg hover:bg-gray-800"
							>
								Bilder
							</Link>
						</li>
					</ul>
				</nav>
			</header>
			<Welcome />
			<footer className="container mx-auto p-8 text-center">
				<a
					href="https://www.instagram.com/de_faste_ansatte/"
					target="_blank"
					rel="noopener noreferrer"
					className="hover:text-gray-300 underline"
				>
					Følg oss på Instagram
				</a>
			</footer>
		</>
	);
}
