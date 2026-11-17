"use client";

import { useEffect, useRef, useState } from "react";
import { FiBarChart2 } from "react-icons/fi";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { TestSummary } from "@/src/apis/user/user.api";

export default function ProfilePerformance({ summary }: { summary: TestSummary }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wasVisible = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const chartData = [
    { name: "সঠিক", value: summary.correctAnswers, color: "#10b981" },
    { name: "ভুল", value: summary.incorrectAnswers, color: "#f43f5e" },
    { name: "এড়িয়ে গেছেন", value: summary.skippedAnswers, color: "#f59e0b" },
  ];
  const chartKey = chartData.map(({ value }) => value).join("-");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !wasVisible.current) {
          wasVisible.current = true;
          setIsVisible(true);
          setAnimationKey((key) => key + 1);
        } else if (!entry.isIntersecting) {
          wasVisible.current = false;
          setIsVisible(false);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="rounded-3xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition-shadow duration-500 hover:shadow-xl hover:shadow-emerald-950/[0.05] dark:border-zinc-800 dark:bg-zinc-900/90 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">Performance</p>
          <h2 className="mt-1 text-lg font-black text-zinc-950 dark:text-white">আপনার প্রস্তুতির অগ্রগতি</h2>
        </div>
        <span className="grid size-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300"><FiBarChart2 aria-hidden="true" /></span>
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="relative min-h-56 rounded-2xl bg-zinc-50 p-2 ring-1 ring-inset ring-zinc-100 dark:bg-zinc-800/60 dark:ring-zinc-800">
          {isVisible ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  key={`${chartKey}-${animationKey}`}
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={62}
                  outerRadius={84}
                  paddingAngle={4}
                  cornerRadius={7}
                  stroke="none"
                  isAnimationActive
                  animationBegin={0}
                  animationDuration={1100}
                >
                  {chartData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "1px solid #e4e4e7", fontSize: "12px" }}
                  formatter={(value) => [Number(value).toLocaleString("bn-BD"), "উত্তর"]}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="grid h-[220px] place-items-center text-xs text-zinc-400">স্ক্রল করে chart দেখুন</div>
          )}
          <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
            <div>
              <p className="text-2xl font-black text-zinc-950 dark:text-white">{summary.averageAccuracy.toFixed(1)}%</p>
              <p className="text-[10px] font-semibold text-zinc-500">গড় accuracy</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {chartData.map(({ name, value, color }) => {
            const percentage = summary.totalQuestions > 0 ? Math.round((value / summary.totalQuestions) * 100) : 0;
            return (
              <div key={name} className="flex items-center gap-3 rounded-2xl border border-zinc-100 bg-zinc-50/80 p-3 transition-colors hover:border-emerald-200 hover:bg-emerald-50/50 dark:border-zinc-800 dark:bg-zinc-800/50 dark:hover:border-emerald-900 dark:hover:bg-emerald-950/20">
                <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                <span className="min-w-0 flex-1 text-xs font-semibold text-zinc-600 dark:text-zinc-300">{name}</span>
                <span className="text-right text-xs font-bold text-zinc-900 dark:text-white">{value.toLocaleString("bn-BD")}<span className="ml-1 font-normal text-zinc-500">({percentage}%)</span></span>
              </div>
            );
          })}
          <p className="pt-1 text-[11px] text-zinc-500">{summary.completedTests.toLocaleString("bn-BD")}টি পরীক্ষা থেকে সংগৃহীত data</p>
        </div>
      </div>
    </section>
  );
}
