import { useRef } from "react";
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
	const dialogRef = useRef<HTMLDialogElement>(null);

	const openMenu = () => {
		dialogRef.current?.showModal();
	};

	const closeMenu = () => {
		dialogRef.current?.close();
	};

	return (
		<header className="container mx-auto flex gap-2 items-center justify-between p-4">
			{/* Mobile menu button */}
			<button
				type="button"
				onClick={openMenu}
				className="md:hidden ml-auto p-2 hover:bg-gray-800 rounded"
				aria-label="Åpne meny"
			>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<title>Meny</title>
					<line x1="3" y1="6" x2="21" y2="6" />
					<line x1="3" y1="12" x2="21" y2="12" />
					<line x1="3" y1="18" x2="21" y2="18" />
				</svg>
			</button>

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
			<dialog
				ref={dialogRef}
				className="backdrop:bg-black backdrop:opacity-90 bg-background text-foreground w-full h-full max-w-full max-h-full m-0 p-0"
			>
				<div className="flex flex-col h-full">
					{/* Close button */}
					<div className="flex justify-end p-4">
						<button
							type="button"
							onClick={closeMenu}
							className="p-2 hover:bg-gray-800 rounded"
							aria-label="Close menu"
						>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<title>Close</title>
								<line x1="18" y1="6" x2="6" y2="18" />
								<line x1="6" y1="6" x2="18" y2="18" />
							</svg>
						</button>
					</div>

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
			</dialog>
		</header>
	);
};
