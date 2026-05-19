"use client";

import { ALL_DOMAINS } from "@/app/types/event";
import { cn } from "@/lib/utils";

interface TagFilterProps {
  activeTag: string;
  onTagChange: (tag: string) => void;
}

const tagStyles: Record<string, { inactive: string; active: string }> = {
  全部: {
    inactive: "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50",
    active: "bg-zinc-900 text-white border-zinc-900 shadow-sm",
  },
  汽车: {
    inactive: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-100",
    active: "bg-emerald-600 text-white border-emerald-600 shadow-sm",
  },
  AI: {
    inactive: "bg-orange-50 text-orange-700 border-orange-200 hover:border-orange-300 hover:bg-orange-100",
    active: "bg-orange-500 text-white border-orange-500 shadow-sm",
  },
  消费电子: {
    inactive: "bg-sky-50 text-sky-700 border-sky-200 hover:border-sky-300 hover:bg-sky-100",
    active: "bg-sky-500 text-white border-sky-500 shadow-sm",
  },
};

export default function TagFilter({ activeTag, onTagChange }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {ALL_DOMAINS.map((tag) => {
        const styles = tagStyles[tag] ?? tagStyles["全部"];
        const isActive = activeTag === tag;
        return (
          <button
            key={tag}
            onClick={() => onTagChange(tag)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
              isActive ? styles.active : styles.inactive
            )}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
