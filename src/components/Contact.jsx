import React, { useEffect, useMemo, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Download,
  Send,
  Copy,
  Check,
  Loader2,
  Clock,
  Zap,
  Terminal as TerminalIcon,
  X,
  ArrowUpRight,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  fadeUp,
  cardReveal,
  slideIn,
  toastAnimation,
  socialHover,
  spinLoop,
  VIEWPORT_DEFAULT,
} from "../animations/motionPresets";

/* ------------------------------------------------------------------ */
/*  Content — edit these to update the section                         */
/* ------------------------------------------------------------------ */

const CONTACT_DETAILS = [
  {
    id: "email",
    label: "Email",
    value: "nashonmwendwa0@gmail.com",
    href: "mailto:nashonmwendwa0@gmail.com",
    icon: Mail,
    copyable: true,
    preferred: true,
  },
  {
    id: "phone",
    label: "Phone",
    value: "+254 748 495 724",
    href: "tel:+254748495724",
    icon: Phone,
    copyable: true,
  },
  { id: "location", label: "Location", value: "Nairobi, Kenya", icon: MapPin },
];

const SOCIAL_LINKS = [
  { name: "GitHub", href: "https://github.com/nahashon-source", icon: Github },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/Nahashon-Mwendwa",
    icon: Linkedin,
  },
  { name: "Twitter", href: "https://twitter.com/nahashon", icon: Twitter },
];

// Swap for your actual resume asset path or CMS link.
const RESUME_HREF = "/resume.pdf";

// Single source of truth for availability — change this, the dot
// color and badge text update everywhere automatically.
const AVAILABILITY = {
  status: "available", // "available" | "limited" | "unavailable"
  label: "Available for new projects",
};

const STATUS_DOT_COLOR = {
  available: "bg-emerald-400",
  limited: "bg-amber-400",
  unavailable: "bg-rose-400",
};

const RESPONSE_TIME = "< 24 hrs";
const TIME_ZONE = "Africa/Nairobi";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function useLocalTime(timeZone) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  return useMemo(() => {
    const time = now.toLocaleTimeString("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
    });
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      timeZoneName: "short",
    }).formatToParts(now);
    const zone = parts.find((p) => p.type === "timeZoneName")?.value ?? "";
    return { time, zone };
  }, [now, timeZone]);
}

function validateForm(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Tell me your name.";
  if (!EMAIL_RE.test(form.email.trim()))
    errors.email = "Enter a valid email address.";
  if (form.message.trim().length < 10)
    errors.message = "Add a little more detail (10+ characters).";
  return errors;
}

// TODO: wire this to your real email service (EmailJS, Resend, a serverless
// function, etc). Keep the endpoint in an env var rather than hardcoding it.
async function sendMessage(payload) {
  const endpoint =
    (typeof import.meta !== "undefined" &&
      import.meta.env?.VITE_CONTACT_ENDPOINT) ||
    "/api/contact";

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    /* non-JSON response — fall through to the generic error below */
  }

  if (!res.ok || !data?.success) {
    throw new Error(
      data?.message || "Message could not be delivered. Please try again.",
    );
  }
  return data;
}

/* ------------------------------------------------------------------ */
/*  Small presentational pieces                                        */
/* ------------------------------------------------------------------ */

function StatusStrip({ localTime, reduceMotion }) {
  const dotColor = STATUS_DOT_COLOR[AVAILABILITY.status];

  const tiles = [
    {
      key: "availability",
      icon: Zap,
      label: "Availability",
      value: AVAILABILITY.label,
      dot: true,
    },
    {
      key: "time",
      icon: Clock,
      label: "Local time",
      value: `${localTime.time} · ${localTime.zone}`,
    },
    {
      key: "response",
      icon: Send,
      label: "Avg. response",
      value: RESPONSE_TIME,
    },
    { key: "channel", icon: Mail, label: "Preferred channel", value: "Email" },
  ];

  return (
    <div className="flex divide-x divide-white/[0.06] overflow-x-auto rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
      {tiles.map((tile) => (
        <div key={tile.key} className="flex-1 min-w-[160px] px-5 py-4">
          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-white/35 mb-1.5">
            <tile.icon size={12} />
            {tile.label}
          </div>
          <div className="flex items-center gap-2 text-sm text-white/80">
            {tile.dot && (
              <span className="relative flex h-2 w-2 shrink-0">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full ${dotColor} opacity-60 ${
                    reduceMotion ? "" : "animate-ping"
                  }`}
                />
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${dotColor}`}
                />
              </span>
            )}
            <span className="font-medium truncate">{tile.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  as = "input",
  rows,
  disabled,
  autoComplete,
}) {
  const Comp = as;
  return (
    <div>
      <label
        htmlFor={id}
        className="flex items-baseline gap-1.5 text-xs font-mono text-white/40 mb-1.5"
      >
        <span className="text-emerald-400/70" aria-hidden="true">
          &gt;
        </span>
        {label}
      </label>
      <Comp
        id={id}
        name={id}
        type={as === "input" ? type : undefined}
        rows={rows}
        value={value}
        disabled={disabled}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-lg bg-white/[0.03] border px-3 py-2 text-sm text-white/85 font-mono
          placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-emerald-400/60
          disabled:opacity-60 transition-colors
          ${error ? "border-rose-400/50" : "border-white/[0.08]"}`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-rose-300">
          {error}
        </p>
      )}
    </div>
  );
}

function LogOutput({ log, reduceMotion }) {
  if (log.length === 0) return null;
  return (
    <div
      role="log"
      aria-live="polite"
      className="rounded-lg bg-black/30 border border-white/[0.06] px-3 py-2.5 font-mono text-xs space-y-1"
    >
      <AnimatePresence initial={false}>
        {log.map((line, i) => (
          <motion.div
            key={`${line.text}-${i}`}
            {...slideIn(reduceMotion)}
            className={line.ok ? "text-white/50" : "text-rose-300"}
          >
            <span className="text-white/25">$</span> {line.text}{" "}
            {line.ok && <span className="text-emerald-400">✓</span>}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function TerminalCard({
  form,
  setForm,
  fieldErrors,
  status,
  log,
  onSubmit,
  reduceMotion,
}) {
  const isSending = status === "sending";
  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <motion.div {...cardReveal(reduceMotion)} className="relative">
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="absolute -inset-px rounded-2xl opacity-40 blur-2xl pointer-events-none"
          style={{
            background:
              "conic-gradient(from 0deg, #6366f1, #22d3ee, #34d399, #6366f1)",
          }}
          {...spinLoop}
        />
      )}

      <div className="relative rounded-2xl border border-white/[0.08] bg-[#0b0f15]/90 backdrop-blur-xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
          <span
            className="h-2.5 w-2.5 rounded-full bg-rose-400/70"
            aria-hidden="true"
          />
          <span
            className="h-2.5 w-2.5 rounded-full bg-amber-400/70"
            aria-hidden="true"
          />
          <span
            className="h-2.5 w-2.5 rounded-full bg-emerald-400/70"
            aria-hidden="true"
          />
          <span className="ml-2 text-xs font-mono text-white/35 flex items-center gap-1.5">
            <TerminalIcon size={12} />
            send_message.sh
          </span>
        </div>

        <form
          onSubmit={onSubmit}
          aria-busy={isSending}
          className="p-5 sm:p-6 space-y-4"
        >
          <Field
            id="contact-name"
            label="name"
            value={form.name}
            onChange={(v) => setForm((f) => ({ ...f, name: v }))}
            error={fieldErrors.name}
            disabled={isSending}
            autoComplete="name"
          />
          <Field
            id="contact-email"
            label="email"
            type="email"
            value={form.email}
            onChange={(v) => setForm((f) => ({ ...f, email: v }))}
            error={fieldErrors.email}
            disabled={isSending}
            autoComplete="email"
          />
          <Field
            id="contact-message"
            label="message"
            as="textarea"
            rows={4}
            value={form.message}
            onChange={(v) => setForm((f) => ({ ...f, message: v }))}
            error={fieldErrors.message}
            disabled={isSending}
          />

          <button
            type="submit"
            disabled={isSending}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5
              text-sm font-medium font-mono bg-emerald-500 text-[#04140d] hover:bg-emerald-400
              disabled:opacity-70 disabled:cursor-not-allowed transition-colors
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
          >
            {isSending && <Loader2 size={15} className="animate-spin" />}
            {isSuccess && <Check size={15} />}
            {!isSending && !isSuccess && <Send size={15} />}
            {isSending ? "transmitting…" : isSuccess ? "sent" : "send message"}
          </button>

          <LogOutput log={log} reduceMotion={reduceMotion} />

          {isError && (
            <p className="text-xs font-mono text-white/40">
              Or reach me directly at{" "}
              <a
                href="mailto:nashonmwendwa0@gmail.com"
                className="text-rose-300 hover:text-rose-200 underline underline-offset-2 rounded-sm
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
              >
                nashonmwendwa0@gmail.com
              </a>
            </p>
          )}
        </form>
      </div>
    </motion.div>
  );
}

function ContactRail({ copiedId, onCopy }) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xs font-mono uppercase tracking-wider text-white/35 mb-4">
          Reach me directly
        </h3>
        <ul className="space-y-3">
          {CONTACT_DETAILS.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <item.icon size={16} className="text-white/35 shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/35">{item.label}</span>
                    {item.preferred && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        preferred
                      </span>
                    )}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-white/80 hover:text-emerald-400 transition-colors truncate block"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-sm text-white/80 truncate block">
                      {item.value}
                    </span>
                  )}
                </div>
              </div>
              {item.copyable && (
                <button
                  type="button"
                  onClick={() => onCopy(item.id, item.value)}
                  aria-label={`Copy ${item.label.toLowerCase()}`}
                  className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white/35
                    hover:text-emerald-400 hover:bg-white/[0.04] transition-colors
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                >
                  {copiedId === item.id ? (
                    <Check size={14} className="text-emerald-400" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <a
          href={RESUME_HREF}
          download
          className="group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3
            bg-gradient-to-r from-indigo-500 via-indigo-400 to-cyan-400 text-[#04070d] text-sm font-medium
            hover:brightness-110 transition-all
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
        >
          <Download size={16} />
          Download résumé
          <ArrowUpRight
            size={14}
            className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
          />
        </a>

        <div className="flex gap-2">
          {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
            <motion.a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              {...socialHover}
              aria-label={name}
              title={name}
              className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/[0.03] border border-white/[0.07]
                text-white/40 hover:text-cyan-400 hover:border-cyan-500/25 hover:bg-cyan-500/[0.06] transition-colors
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            >
              <Icon size={16} />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(onDismiss, 5000);
    return () => clearTimeout(id);
  }, [toast, onDismiss]);

  return (
    <div className="fixed bottom-5 right-5 z-50 pointer-events-none sm:pointer-events-auto">
      <AnimatePresence>
        {toast && (
          <motion.div
            role={toast.type === "error" ? "alert" : "status"}
            aria-live={toast.type === "error" ? "assertive" : "polite"}
            {...toastAnimation}
            className={`pointer-events-auto flex items-center gap-3 rounded-xl border px-4 py-3 backdrop-blur-xl shadow-lg
              ${
                toast.type === "error"
                  ? "bg-rose-500/10 border-rose-500/25 text-rose-200"
                  : "bg-emerald-500/10 border-emerald-500/25 text-emerald-200"
              }`}
          >
            {toast.type === "error" ? <X size={16} /> : <Check size={16} />}
            <span className="text-sm">{toast.message}</span>
            <button
              onClick={onDismiss}
              aria-label="Dismiss notification"
              className="ml-2 text-white/40 hover:text-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 rounded-sm"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                             */
/* ------------------------------------------------------------------ */

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const localTime = useLocalTime(TIME_ZONE);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [log, setLog] = useState([]);
  const [toast, setToast] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = validateForm(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length) return;

    setStatus("sending");
    setLog([{ text: "validating input", ok: true }]);

    const connectingTimer = setTimeout(() => {
      setLog((prev) => [
        ...prev,
        { text: "connecting to mail server", ok: true },
      ]);
    }, 600);

    const ensureConnecting = (lines) =>
      lines.some((l) => l.text === "connecting to mail server")
        ? lines
        : [...lines, { text: "connecting to mail server", ok: true }];

    try {
      await sendMessage(form);
      clearTimeout(connectingTimer);
      setLog((prev) => [
        ...ensureConnecting(prev),
        { text: "message delivered — I'll reply within 24 hours", ok: true },
      ]);
      setStatus("success");
      setToast({ type: "success", message: "Message sent — talk soon!" });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      clearTimeout(connectingTimer);
      setLog((prev) => [
        ...ensureConnecting(prev),
        { text: err.message || "delivery failed", ok: false },
      ]);
      setStatus("error");
      setToast({
        type: "error",
        message: "Something went wrong — email me directly instead.",
      });
    }
  }

  async function handleCopy(id, value) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      setTimeout(
        () => setCopiedId((current) => (current === id ? null : current)),
        2000,
      );
    } catch {
      setToast({
        type: "error",
        message: "Couldn't copy automatically — select the text manually.",
      });
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative isolate overflow-hidden bg-[#080c10] py-24 sm:py-32"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0
            [background-image:linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)]
            [background-size:48px_48px]
            [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]
            [-webkit-mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
        />
        <div className="absolute -top-32 left-1/4 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute top-20 right-1/4 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        <motion.div {...fadeUp(reduceMotion)} className="max-w-2xl mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1 text-xs font-mono text-emerald-300 mb-5">
            <span className="relative flex h-2 w-2">
              <span
                className={`absolute inline-flex h-full w-full rounded-full ${
                  STATUS_DOT_COLOR[AVAILABILITY.status]
                } opacity-60 ${reduceMotion ? "" : "animate-ping"}`}
              />
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${STATUS_DOT_COLOR[AVAILABILITY.status]}`}
              />
            </span>
            {AVAILABILITY.label}
          </span>

          <h2
            id="contact-heading"
            className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4"
          >
            Let's build something worth shipping.
          </h2>
          <p className="text-white/45 leading-relaxed">
            Have a project, a role, or just want to talk shop? I read every
            message myself and reply within a day.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp(reduceMotion, {
            transition: { duration: 0.6, delay: 0.1 },
          })}
          className="mb-10"
        >
          <StatusStrip localTime={localTime} reduceMotion={reduceMotion} />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <ContactRail copiedId={copiedId} onCopy={handleCopy} />
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <TerminalCard
              form={form}
              setForm={setForm}
              fieldErrors={fieldErrors}
              status={status}
              log={log}
              onSubmit={handleSubmit}
              reduceMotion={reduceMotion}
            />
          </div>
        </div>
      </div>

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </section>
  );
}
