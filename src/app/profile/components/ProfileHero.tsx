import Image from "next/image";
import { FiCheck, FiMail, FiShield, FiTrendingUp } from "react-icons/fi";
import type { UserProfile } from "@/src/apis/user/user.api";

const fallbackAvatar =
  "https://res.cloudinary.com/dbmdhxmtx/image/upload/v1792349936/wired-lineal-21-avatar_dm77ip.gif";

function formatMemberSince(value: string) {
  return new Intl.DateTimeFormat("bn-BD", {
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default function ProfileHero({ profile }: { profile: UserProfile }) {
  const avatar = profile.image || fallbackAvatar;
  const accuracy = Math.round(profile.testSummary.averageAccuracy);

  return (
    <section className="profile-hero-background group relative overflow-hidden rounded-[2rem] text-white shadow-xl shadow-emerald-950/10 transition duration-500 hover:shadow-2xl hover:shadow-emerald-950/20">
      <div className="absolute -right-20 -top-32 size-96 rounded-full border-[3rem] border-emerald-300/10" />
      <div className="absolute bottom-0 right-1/3 size-48 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="relative grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="relative w-fit">
            <Image
              src={avatar}
              alt={`${profile.name} profile`}
              width={128}
              height={128}
              className="size-24 rounded-[1.75rem] border-4 border-white/20 object-cover shadow-2xl sm:size-28"
            />
            {profile.emailVerified && (
              <span className="profile-hero-foreground absolute -bottom-2 -right-2 grid size-8 place-items-center rounded-full border-4 bg-emerald-400" title="Verified email">
                <FiCheck aria-hidden="true" className="size-3.5" />
              </span>
            )}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-black sm:text-3xl">{profile.name}</h2>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                <FiShield aria-hidden="true" /> {profile.role}
              </span>
            </div>
            <p className="mt-1 text-sm text-emerald-100/70">{profile.email}</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-emerald-100/65">
              <span className="inline-flex items-center gap-1.5"><FiMail aria-hidden="true" />{profile.userStatus}</span>
              <span>সদস্য হয়েছেন {formatMemberSince(profile.createdAt)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.07] p-4 sm:min-w-64">
          <div className="relative grid size-20 shrink-0 place-items-center rounded-full" style={{ background: `conic-gradient(var(--palette-blue) ${accuracy}%, rgba(255,255,255,.12) ${accuracy}% 100%)` }}>
            <div className="profile-hero-background grid size-[4.25rem] place-items-center rounded-full">
              <span className="text-xl font-black">{accuracy}%</span>
            </div>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-xs font-bold text-emerald-200"><FiTrendingUp aria-hidden="true" /> প্রস্তুতির স্কোর</p>
            <p className="mt-1 text-xs leading-5 text-emerald-100/60">আপনার গড় সঠিক উত্তরের হার</p>
          </div>
        </div>
      </div>
      <div className="relative flex flex-wrap items-center gap-2 border-t border-white/10 px-5 py-3 text-xs text-emerald-100/70 sm:px-8">
        <span className="font-bold text-white">{profile.testSummary.completedTests.toLocaleString("bn-BD")}টি</span> পরীক্ষা সম্পন্ন
        <span className="text-white/25">•</span>
        <span className="font-bold text-white">{profile.points.toLocaleString("bn-BD")}</span> পয়েন্ট অর্জিত
        <span className="ml-auto hidden text-emerald-200/70 sm:inline">চালিয়ে যান, আপনার লক্ষ্য খুব কাছে</span>
      </div>
    </section>
  );
}
