import { useFetcher } from "react-router";
import { Button } from "~/components/button";
import { H2 } from "~/components/headings";
import { Input } from "~/components/input";
import { Label } from "~/components/label";
import { Textarea } from "~/components/textarea";

export const ContactForm = () => {
	const fetcher = useFetcher<{ ok: boolean; error?: string }>();
	const isSubmitting = fetcher.state === "submitting";
	const isSuccess = fetcher.state === "idle" && fetcher.data?.ok;
	const errorMessage =
		fetcher.state === "idle" && fetcher.data?.ok === false
			? (fetcher.data.error ?? "Noe gikk galt. Prøv igjen.")
			: null;

	return (
		<article className="w-full max-w-2xl px-4">
			<H2>Kontakt oss</H2>
			<p className="mt-3 text-lg text-muted-foreground">
				Send en bookingforespørsel for konsert, så kontakter vi deg så raskt vi
				kan.
			</p>
			<fetcher.Form method="POST" className="mt-6 space-y-5">
				<div className="space-y-2">
					<Label htmlFor="fullName">Fullt navn</Label>
					<Input
						id="fullName"
						name="fullName"
						type="text"
						required
						autoComplete="name"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="email">E-post</Label>
					<Input
						id="email"
						name="email"
						type="email"
						required
						autoComplete="email"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="phone">Telefonnummer</Label>
					<Input id="phone" name="phone" type="tel" autoComplete="tel" />
				</div>

				<div className="space-y-2">
					<Label htmlFor="description">Beskrivelse</Label>
					<Textarea id="description" name="description" required rows={6} />
				</div>

				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? (
						<span className="inline-flex items-center gap-2">
							<svg
								className="size-4 animate-spin"
								viewBox="0 0 24 24"
								fill="none"
								aria-hidden="true"
							>
								<circle
									className="opacity-30"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								/>
								<path
									className="opacity-90"
									d="M22 12a10 10 0 00-10-10"
									stroke="currentColor"
									strokeWidth="4"
									strokeLinecap="round"
								/>
							</svg>
							Sender...
						</span>
					) : (
						"Send bookingforespørsel"
					)}
				</Button>
				{isSuccess ? (
					<p
						className="rounded-sm border border-primary/40 bg-primary/10 px-3 py-2"
						aria-live="polite"
					>
						Takk! Bookingforespørselen din er sendt. Du får en bekreftelse sendt
						på e-post.
					</p>
				) : null}

				{errorMessage ? (
					<p
						className="rounded-sm border border-red-500/50 bg-red-500/10 px-3 py-2"
						aria-live="assertive"
					>
						{errorMessage}
					</p>
				) : null}
			</fetcher.Form>
		</article>
	);
};
