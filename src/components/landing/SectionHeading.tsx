type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto mb-12 max-w-2xl text-center" : "mb-10 max-w-2xl"}>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 sm:text-sm">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
        {description}
      </p>
    </div>
  );
}
