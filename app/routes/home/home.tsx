import { parseWithZod } from "@conform-to/zod/v4";
import { Resend } from "resend";
import type { Route } from "./+types/home";
import { Gigs } from "./components/gigs";
import { Welcome } from "./components/welcome";
import { ContactForm, ContactFormSchema } from "./contact-form/contact-form";
import { Music } from "./music/music";
import Pictures from "./pictures/pictures";

const escapeHtml = (value: string) =>
	value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");

// Time check: bots tend to submit forms near-instantly.
const MIN_FORM_FILL_TIME_MS = 3_000;

function getSpamReason(formData: FormData): string | null {
	// Honeypot: bots tend to fill every field, real users never see this one.
	const honeypot = formData.get("website");
	if (honeypot !== "") {
		return "Honeypot-feltet ble fylt ut";
	}

	// Time check: real users need at least a few seconds to fill the form.
	// Fails closed (treated as spam) if the field is missing or malformed.
	const formRenderedAt = Number(formData.get("formRenderedAt") || NaN);
	if (!Number.isFinite(formRenderedAt)) {
		return "Tidsstempel for skjemavisning mangler eller er ugyldig";
	}
	const fillTimeMs = Date.now() - formRenderedAt;
	if (fillTimeMs < MIN_FORM_FILL_TIME_MS) {
		return `Skjemaet ble sendt inn for raskt (${fillTimeMs} ms, grense ${MIN_FORM_FILL_TIME_MS} ms)`;
	}

	return null;
}

async function sendSpamAlertEmail({
	context,
	bookingRecipients,
	reason,
	submission,
}: {
	context: Route.ActionArgs["context"];
	bookingRecipients: string[];
	reason: string;
	submission: {
		fullName: string;
		email: string;
		phone?: string;
		description: string;
	};
}) {
	try {
		const { fullName, email, phone = "", description } = submission;
		const formattedDescription = escapeHtml(description).replaceAll(
			"\n",
			"<br />",
		);
		const html = `
			<h2>Mistenkt spam-innsending</h2>
			<p><strong>Årsak:</strong> ${escapeHtml(reason)}</p>
			<p><strong>Fullt navn:</strong> ${escapeHtml(fullName)}</p>
			<p><strong>E-post:</strong> ${escapeHtml(email)}</p>
			<p><strong>Telefonnummer:</strong> ${escapeHtml(phone)}</p>
			<p><strong>Beskrivelse:</strong></p>
			<p>${formattedDescription}</p>
		`;
		const resend = new Resend(context.cloudflare.env.RESEND_API_KEY);
		await resend.emails.send({
			from: "Fast Ansatt <noreply@fastansatt.no>",
			to: bookingRecipients,
			replyTo: email,
			subject: `[Mulig spam] ${reason}`,
			html,
		});
	} catch {
		// Alert delivery must never affect the response given to the submitter.
	}
}

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
	const submission = parseWithZod(formData, { schema: ContactFormSchema });

	if (submission.status !== "success") {
		return submission.reply();
	}

	const bookingRecipients =
		context.cloudflare.env.BOOKING_NOTIFICATION_EMAILS.split(",")
			.map((recipient) => recipient.trim())
			.filter(Boolean);

	const spamReason = getSpamReason(formData);
	if (spamReason) {
		const shouldSendSpam = false;
		const spamRecipient = bookingRecipients.filter((br) =>
			br.includes("lasse"),
		);
		// Never reveal the spam verdict, config state, or send errors to whoever/
		// whatever submitted this — the response must look identical to a real success.
		if (spamRecipient.length > 0 && shouldSendSpam) {
			await sendSpamAlertEmail({
				context,
				bookingRecipients: spamRecipient,
				reason: spamReason,
				submission: submission.value,
			});
		}
		return submission.reply();
	}

	if (bookingRecipients.length === 0) {
		return submission.reply({
			formErrors: ["Mottakere for booking er ikke konfigurert."],
		});
	}

	const resend = new Resend(context.cloudflare.env.RESEND_API_KEY);
	const { fullName, email, phone = "", description } = submission.value;
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
		return submission.reply({
			formErrors: ["Kunne ikke sende bookingforesporsel akkurat nå."],
		});
	}

	return submission.reply();
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
