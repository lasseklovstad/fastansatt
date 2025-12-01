import { useState } from "react";
import { href, NavLink } from "react-router";
import { Dialog } from "~/components/dialog";
import { cn } from "~/lib/utils";
import { IconButton } from "./icon-button";
import { SvgMenu } from "./icons";

const links = [
	{ to: href("/"), label: "Hjem" },
	{ to: href("/musikk"), label: "Musikk" },
	{ to: href("/bilder"), label: "Bilder" },
	{ to: href("/om-oss"), label: "Om oss" },
	{ to: href("/merch"), label: "Merch" },
];

export const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const openMenu = () => {
		setIsMenuOpen(true);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	return (
		<header className="container mx-auto flex gap-2 items-center justify-between p-4">
			{/* Mobile menu button */}
			<IconButton
				onClick={openMenu}
				className="md:hidden ml-auto"
				aria-label="Åpne meny"
			>
				<SvgMenu />
			</IconButton>

			{/* Desktop navigation */}
			<nav className="hidden md:flex flex-1 justify-center">
				<ul className="p-2 flex flex-wrap">
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

			{/* Mobile dialog */}
			<Dialog isOpen={isMenuOpen} onClose={closeMenu}>
				<div className="flex flex-col h-full pt-16">
					{/* Mobile navigation */}
					<nav className="flex-1 flex items-center justify-center">
						<ul className="flex flex-col gap-4 text-center">
							{links.map((link) => (
								<li key={link.label}>
									<NavLink
										to={link.to}
										onClick={closeMenu}
										className={({ isActive }) =>
											cn(
												"block p-4 text-2xl hover:bg-gray-800",
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
				</div>
			</Dialog>
		</header>
	);
};
