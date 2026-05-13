import { useState } from "react";
import { sendContactMessage } from "../hooks/useApi";
import type { ContactForm } from "../types";

// ── Field component ───────────────────────────────────────
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-400 font-mono mt-1">{error}</p>
      )}
    </div>
  );
}

const inputClass =
  "w-full bg-zinc-900 border border-zinc-700 rounded-sm px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors duration-200";

// ── Main page ─────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // ── Validation ─────────────────────────────────────────
  function validate(): boolean {
    const e: Partial<ContactForm> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 20)
      e.message = "Message must be at least 20 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // ── Submit ─────────────────────────────────────────────
  async function handleSubmit() {
    if (!validate()) return;
    setStatus("sending");
    try {
      await sendContactMessage(form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // clear error on change
    if (errors[name as keyof ContactForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  return (
    <div className="max-w-2xl">

      {/* Header */}
      <div className="mb-12">
        <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">
          Contact
        </p>
        <h1 className="text-3xl font-bold text-zinc-100 mb-4">
          Let's work together
        </h1>
        <p className="text-zinc-400 leading-relaxed text-sm">
          Whether you have a project in mind, need a technical consultation, or
          just want to connect — send a message and I'll get back to you.
        </p>
      </div>

      {/* What I can help with */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {[
          { title: "Data & BI", desc: "Pipelines, dashboards, reporting systems" },
          { title: "Web & ERP", desc: "Django, React, D365BC implementations" },
          { title: "IoT & Infra", desc: "LoRaWAN networks, server architecture" },
        ].map(({ title, desc }) => (
          <div
            key={title}
            className="border border-zinc-800 rounded-sm p-4 hover:border-zinc-700 transition-colors"
          >
            <p className="text-sm font-semibold text-zinc-100 mb-1">{title}</p>
            <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-zinc-800 mb-12" />

      {/* Success state */}
      {status === "success" ? (
        <div className="border border-emerald-800 bg-emerald-950/30 rounded-sm p-8 text-center">
          <p className="text-emerald-400 text-2xl mb-2">✓</p>
          <h2 className="text-zinc-100 font-semibold mb-2">Message sent</h2>
          <p className="text-zinc-400 text-sm">
            Thanks for reaching out. I'll get back to you as soon as possible.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-6 text-xs font-mono text-zinc-500 hover:text-emerald-400 transition-colors"
          >
            Send another message
          </button>
        </div>
      ) : (
        /* Form */
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field label="Name" error={errors.name}>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className={inputClass}
              />
            </Field>

            <Field label="Email" error={errors.email}>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Subject" error={errors.subject}>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="What's this about?"
              className={inputClass}
            />
          </Field>

          <Field label="Message" error={errors.message}>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about your project or what you need help with..."
              rows={6}
              className={inputClass}
            />
          </Field>

          {/* Error banner */}
          {status === "error" && (
            <div className="border border-red-800 bg-red-950/30 rounded-sm px-4 py-3">
              <p className="text-red-400 text-sm font-mono">
                Something went wrong. Please try again or email directly.
              </p>
            </div>
          )}

          {/* Submit */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleSubmit}
              disabled={status === "sending"}
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-900 disabled:text-emerald-600 text-zinc-950 font-semibold text-sm rounded-sm transition-colors duration-200"
            >
              {status === "sending" ? "Sending..." : "Send message"}
            </button>
            <p className="text-xs text-zinc-600 font-mono">
              Usually responds within 24h
            </p>
          </div>
        </div>
      )}

      {/* Alternate contact */}
      <div className="mt-12 pt-8 border-t border-zinc-800">
        <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-4">
          Also find me on
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://github.com/kiyaka-motende"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-500 hover:text-emerald-400 font-mono transition-colors"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/haroldgetenga-742352101"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-500 hover:text-emerald-400 font-mono transition-colors"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>

    </div>
  );
}