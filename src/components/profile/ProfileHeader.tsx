"use client";

import { useState } from "react";
import { FiCheck, FiEdit3, FiMapPin, FiMoreHorizontal, FiShare2 } from "react-icons/fi";
import { profileData } from "./profile-data";

export default function ProfileHeader() {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="relative h-36 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 sm:h-48">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_0,transparent_25%),radial-gradient(circle_at_80%_70%,white_0,transparent_30%)]" />
        <button
          type="button"
          aria-label="কভার পরিবর্তন করুন"
          className="absolute right-4 top-4 grid size-9 place-items-center rounded-xl bg-black/20 text-white backdrop-blur transition hover:bg-black/35"
        >
          <FiEdit3 aria-hidden="true" className="size-4" />
        </button>
      </div>

      <div className="relative px-5 pb-5 sm:px-8 sm:pb-7">
        <div className="-mt-12 flex flex-col gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <div className="grid size-24 shrink-0 place-items-center rounded-3xl border-4 border-white bg-zinc-900 text-2xl font-black text-white shadow-lg dark:border-zinc-900 sm:size-32 sm:text-4xl">
              {profileData.initials}
            </div>
            <div className="pb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-zinc-950 dark:text-white sm:text-2xl">
                  {profileData.name}
                </h1>
                <span className="grid size-5 place-items-center rounded-full bg-emerald-500 text-white" title="Verified profile">
                  <FiCheck aria-hidden="true" className="size-3" />
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {profileData.username}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:pb-1">
            <button
              type="button"
              onClick={() => setIsFollowing((value) => !value)}
              className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 text-xs font-bold transition ${
                isFollowing
                  ? "border border-zinc-200 bg-white text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
            >
              {isFollowing ? <FiCheck aria-hidden="true" /> : null}
              {isFollowing ? "Following" : "Follow"}
            </button>
            <button type="button" aria-label="প্রোফাইল শেয়ার করুন" className="grid size-10 place-items-center rounded-xl border border-zinc-200 text-zinc-500 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">
              <FiShare2 aria-hidden="true" />
            </button>
            <button type="button" aria-label="আরও অপশন" className="grid size-10 place-items-center rounded-xl border border-zinc-200 text-zinc-500 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">
              <FiMoreHorizontal aria-hidden="true" />
            </button>
          </div>
        </div>

        <p className="mt-5 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          {profileData.bio}
        </p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="inline-flex items-center gap-1.5"><FiMapPin aria-hidden="true" />{profileData.location}</span>
          <span>{profileData.headline}</span>
          <span>{profileData.joined}</span>
        </div>

        <div className="mt-6 flex flex-wrap gap-6 border-t border-zinc-100 pt-5 dark:border-zinc-800">
          {profileData.stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-lg font-black text-zinc-950 dark:text-white">{stat.value}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
