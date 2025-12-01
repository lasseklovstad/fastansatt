import { href, NavLink } from "react-router";
import { cn } from "~/lib/utils";

const links = [
	{ to: href("/"), label: "Hjem" },
	{ to: "/musikk", label: "Musikk" },
	{ to: href("/bilder"), label: "Bilder" },
	{ to: "/om-oss", label: "Om oss" },
	{ to: "/merch", label: "Merch" },
];

export const Header = () => {
	return (
		<header className="container mx-auto flex gap-2 items-center justify-center">
			<nav>
				<ul className="p-8 flex flex-wrap">
					{links.map((link) => (
						<li key={link.label} className="p-4">
							<NavLink
								to={link.to}
								className={({ isActive }) =>
									cn(
										"p-4 min-w-16 text-lg hover:bg-gray-800",
										isActive && "text-primary",
									)
								}
							>
								{link.label}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
};
