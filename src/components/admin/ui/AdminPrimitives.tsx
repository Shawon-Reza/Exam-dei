import type { ReactNode } from "react";
import { FiSearch, FiX } from "react-icons/fi";

export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">{eyebrow}</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">{title}</h1>
        <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button type={type} onClick={onClick} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
      {children}
    </button>
  );
}

export function SearchBox({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="flex min-h-10 min-w-0 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-500 focus-within:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-950">
      <FiSearch aria-hidden="true" className="shrink-0" />
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full bg-transparent py-2 text-zinc-800 outline-none placeholder:text-zinc-400 dark:text-zinc-100" />
    </label>
  );
}

export function AdminDialog({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-zinc-950/50 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="admin-dialog-title" className="my-auto max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900">
        <div className="sticky top-0 flex items-center justify-between border-b border-zinc-100 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 id="admin-dialog-title" className="text-lg font-extrabold text-zinc-900 dark:text-white">{title}</h2>
          <button type="button" onClick={onClose} aria-label="বন্ধ করুন" className="grid size-9 place-items-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"><FiX aria-hidden="true" /></button>
        </div>
        <div className="p-5">{children}</div>
      </section>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode; }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white";

export function SmallStat({ label, value, icon }: { label: string; value: string; icon: ReactNode; }) {
  return (
    <Panel className="flex items-center gap-3 p-4">
      <span className="grid size-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">{icon}</span>
      <span><span className="block text-xs text-zinc-500">{label}</span><span className="mt-0.5 block text-lg font-extrabold">{value}</span></span>
    </Panel>
  );
}

export function EmptyTable({ colSpan, text }: { colSpan: number; text: string; }) {
  return <tr><td colSpan={colSpan} className="px-5 py-12 text-center text-sm text-zinc-500">{text}</td></tr>;
}

export function TableFooter({ count, label }: { count: number; label: string; }) {
  return <div className="border-t border-zinc-100 px-5 py-3 text-xs text-zinc-500 dark:border-zinc-800">মোট {count.toLocaleString("bn-BD")} {label}</div>;
}

export function ToggleSetting({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <div><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs leading-5 text-zinc-500">{description}</p></div>
      <button type="button" role="switch" aria-checked={checked} aria-label={title} onClick={() => onChange(!checked)} className={`relative h-6 w-11 shrink-0 rounded-full transition ${checked ? "bg-emerald-600" : "bg-zinc-300 dark:bg-zinc-700"}`}>
        <span className={`absolute top-1 size-4 rounded-full bg-white shadow transition ${checked ? "left-6" : "left-1"}`} />
      </button>
    </div>
  );
}

export function DialogActions({ onCancel, submitLabel }: { onCancel: () => void; submitLabel: ReactNode; }) {
  return (
    <div className="flex justify-end gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
      <button type="button" onClick={onCancel} className="rounded-xl px-4 py-2.5 text-sm font-bold text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">বাতিল</button>
      <PrimaryButton type="submit">{submitLabel}</PrimaryButton>
    </div>
  );
}
