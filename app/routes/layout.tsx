import { Outlet } from "react-router";
import { Footer } from "~/components/footer";

export default function Layout() {
	return (
		<>
			<Outlet />
			<Footer />
		</>
	);
}
