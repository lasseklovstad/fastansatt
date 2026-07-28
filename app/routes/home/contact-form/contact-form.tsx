import {
	getFormProps,
	getInputProps,
	getTextareaProps,
	useForm,
} from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import z from "zod";
import { Button } from "~/components/button";
import { ErrorMessage } from "~/components/error-message";
import { H2 } from "~/components/headings";
import { Input } from "~/components/input";
import { Label } from "~/components/label";
import { Textarea } from "~/components/textarea";
import type { action } from "../home";

export const ContactFormSchema = z.object({
	fullName: z.string({ error: "Dette feltet er påkrevd" }),
	email: z.email({ error: "Dette feltet er påkrevd" }),
	phone: z.string().optional(),
	description: z.string({ error: "Dette feltet er påkrevd" }),
});

export const ContactForm = () => {
	const fetcher = useFetcher<typeof action>();
	const [form, fields] = useForm({
		lastResult: fetcher.data,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: ContactFormSchema });
		},
	});

	// Time check: pairs with the honeypot below. Real users need at least a
	// few seconds to fill the form; bots tend to submit instantly. Set once
	// on mount (never re-synced by loader/fetcher revalidation) — start at
	// null so SSR and the first client render match, then populate
	// post-hydration.
	const [formRenderedAt, setFormRenderedAt] = useState<number | null>(null);
	useEffect(() => {
		setFormRenderedAt(Date.now());
	}, []);

	return (
		<article className="w-full max-w-2xl px-4">
			<H2>Kontakt oss</H2>
			<p className="mt-3 text-lg text-muted-foreground">
				Send en bookingforespørsel for konsert, så kontakter vi deg så raskt vi
				kan.
			</p>
			<fetcher.Form
				method="POST"
				className="mt-6 space-y-5"
				{...getFormProps(form)}
			>
				{/* Honeypot: hidden from real users, bots tend to fill it in. */}
				<input
					type="text"
					name="website"
					tabIndex={-1}
					autoComplete="off"
					aria-hidden="true"
					className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
				/>
				{/* Time check: see comment above `formRenderedAt`. */}
				<input
					type="hidden"
					name="formRenderedAt"
					value={formRenderedAt ?? ""}
				/>

				<div className="space-y-2">
					<Label htmlFor={fields.fullName.id}>Fullt navn</Label>
					<Input
						{...getInputProps(fields.fullName, { type: "text" })}
						autoComplete="name"
					/>
					<ErrorMessage
						id={fields.fullName.errorId}
						errors={fields.fullName.errors}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor={fields.email.id}>E-post</Label>
					<Input
						{...getInputProps(fields.email, { type: "email" })}
						autoComplete="email"
					/>
					<ErrorMessage
						id={fields.email.errorId}
						errors={fields.email.errors}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor={fields.phone.id}>Telefonnummer</Label>
					<Input
						{...getInputProps(fields.phone, { type: "tel" })}
						autoComplete="tel"
					/>
					<ErrorMessage
						id={fields.phone.errorId}
						errors={fields.phone.errors}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor={fields.description.id}>Beskrivelse</Label>
					<Textarea {...getTextareaProps(fields.description)} rows={6} />
					<ErrorMessage
						id={fields.description.errorId}
						errors={fields.description.errors}
					/>
				</div>

				<ErrorMessage
					id={form.errorId}
					errors={form.errors}
					className="rounded-sm border bg-red-500/10 px-3 py-2"
					aria-live="assertive"
				/>

				<Button type="submit" disabled={fetcher.state !== "idle"}>
					{fetcher.state !== "idle" ? (
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
				{fetcher.data?.status === "success" ? (
					<p
						className="rounded-sm border border-primary/40 bg-primary/10 px-3 py-2"
						aria-live="polite"
					>
						Takk! Bookingforespørselen din er sendt. Du får en bekreftelse sendt
						på e-post.
					</p>
				) : null}
			</fetcher.Form>
		</article>
	);
};
