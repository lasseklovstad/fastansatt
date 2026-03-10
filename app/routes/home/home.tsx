import { Resend } from "resend";
import type { Route } from "./+types/home";
import { Gigs } from "./components/gigs";
import { Welcome } from "./components/welcome";
import { ContactForm } from "./contact-form/contact-form";
import { Music } from "./music/music";
import Pictures from "./pictures/pictures";

const escapeHtml = (value: string) =>
	value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");

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

export async function action({ context, request }: Route.ActionArgs) {
	const formData = await request.formData();
	const fullName = String(formData.get("fullName") ?? "").trim();
	const email = String(formData.get("email") ?? "").trim();
	const phone = String(formData.get("phone") ?? "").trim();
	const description = String(formData.get("description") ?? "").trim();
	const bookingRecipients =
		context.cloudflare.env.BOOKING_NOTIFICATION_EMAILS.split(",")
			.map((recipient) => recipient.trim())
			.filter(Boolean);

	if (!fullName || !email || !description) {
		return {
			ok: false,
			error: "Alle felter må fylles ut.",
		};
	}

	if (bookingRecipients.length === 0) {
		return {
			ok: false,
			error: "Mottakere for booking er ikke konfigurert.",
		};
	}

	const resend = new Resend(context.cloudflare.env.RESEND_API_KEY);
	const formattedDescription = escapeHtml(description).replaceAll(
		"\n",
		"<br />",
	);
	const html = `
		<h2>Ny bookingforespørsel</h2>
		<p><strong>Fullt navn:</strong> ${escapeHtml(fullName)}</p>
		<p><strong>E-post:</strong> ${escapeHtml(email)}</p>
		<p><strong>Telefonnummer:</strong> ${escapeHtml(phone)}</p>
		<p><strong>Beskrivelse:</strong></p>
		<p>${formattedDescription}</p>
	`;
	const confirmationHtml = `
		<h2>Takk for bookingforespørselen din!</h2>
		<p>Hei ${escapeHtml(fullName)},</p>
		<p>Vi har mottatt forespørselen din og tar kontakt med deg så snart vi kan.</p>
		<p><strong>Det vi mottok:</strong></p>
		<p><strong>Telefonnummer:</strong> ${escapeHtml(phone)}</p>
		<p><strong>Beskrivelse:</strong></p>
		<p>${formattedDescription}</p>
		<p>Hilsen Fast Ansatt</p>
	`;

	try {
		const [bookingEmailResult, confirmationEmailResult] = await Promise.all([
			resend.emails.send({
				from: "Fast Ansatt <noreply@fastansatt.no>",
				to: bookingRecipients,
				replyTo: email,
				subject: "Bookingforespørsel",
				html,
			}),
			resend.emails.send({
				from: "Fast Ansatt <noreply@fastansatt.no>",
				to: [email],
				replyTo: "band.fast.ansatt@gmail.com",
				subject: "Vi har mottatt bookingforespørselen din",
				html: confirmationHtml,
			}),
		]);

		if (bookingEmailResult.error || confirmationEmailResult.error) {
			return {
				ok: false,
				error: "Kunne ikke sende bookingforesporsel akkurat nå.",
			};
		}
	} catch {
		return {
			ok: false,
			error: "Kunne ikke sende bookingforesporsel akkurat nå.",
		};
	}

	return { ok: true };
}

export default function Home() {
	return (
		<main className="container mx-auto space-y-8">
			<Welcome />
			<ContactForm />
			<Gigs />
			<Music />
			<Pictures />
		</main>
	);
}
