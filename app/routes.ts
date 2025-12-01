import {
	index,
	layout,
	type RouteConfig,
	route,
} from "@react-router/dev/routes";

export default [
	layout("routes/layout.tsx", [
		index("routes/home/home.tsx"),
		route("bilder", "routes/pictures/pictures.tsx"),
	]),
] satisfies RouteConfig;
