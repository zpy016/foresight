"use client";

import { useMemo } from "react";
import { format, parseISO, isSameDay } from "date-fns";
import { zhCN } from "date-fns/locale";
import { MarketEvent } from "@/app/types/event";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";

interface MobileTimelineProps {
  viewDate: Date;
  events: MarketEvent[];
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  onSelectEvent: (event: MarketEvent) => void;
  today: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  adminMode?: boolean;
  onEdit?: (event: MarketEvent, e?: React.MouseEvent) => void;
  onDelete?: (id: string, e?: React.MouseEvent) => void;
  fontSize?: "sm" | "md" | "lg";
}

function TagDot({ tag }: { tag: string }) {
  const colorMap: Record<string, string> = {
    AI: "bg-orange-500",
    汽车: "bg-emerald-500",
    消费电子: "bg-sky-500",
    新品发布: "bg-amber-500",
    战略合作: "bg-pink-500",
    资本市场: "bg-indigo-500",
  };
  return (
    <span
      className={cn(
        "inline-block rounded-full flex-shrink-0",
        colorMap[tag] ?? "bg-gray-400"
      )}
      style={{ width: 5, height: 5 }}
    />
  );
}

const sizeConfig = {
  sm: {
    cardPad: "p-2.5",
    cardRadius: "rounded-lg",
    cardGap: "gap-2",
    dateStripH: "h-11",
    dateNum: "text-base",
    title: "text-[13px]",
    tag: "text-[9px]",
    meta: "text-[10px]",
    timeLabel: "text-xs",
  },
  md: {
    cardPad: "p-3",
    cardRadius: "rounded-xl",
    cardGap: "gap-2.5",
    dateStripH: "h-12",
    dateNum: "text-lg",
    title: "text-sm",
    tag: "text-[10px]",
    meta: "text-[11px]",
    timeLabel: "text-sm",
  },
  lg: {
    cardPad: "p-3.5",
    cardRadius: "rounded-xl",
    cardGap: "gap-3",
    dateStripH: "h-14",
    dateNum: "text-xl",
    title: "text-[15px]",
    tag: "text-[11px]",
    meta: "text-xs",
    timeLabel: "text-sm",
  },
};

export default function MobileTimeline({
  viewDate,
  events,
  selectedDate,
  onSelectDate,
  onSelectEvent,
  today,
  onPrevMonth,
  onNextMonth,
  adminMode = false,
  onEdit,
  onDelete,
  fontSize = "md",
}: MobileTimelineProps) {
  const monthLabel = format(viewDate, "yyyy年 M月", { locale: zhCN });
  const sc = sizeConfig[fontSize];

  const daysInMonth = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const count = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: count }, (_, i) => new Date(year, month, i + 1));
  }, [viewDate]);

  const eventsByDay = useMemo(() => {
    const map = new Map<string, MarketEvent[]>();
    events.forEach((ev) => {
      const d = parseISO(ev.startTime);
      const key = format(d, "yyyy-MM-dd");
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(ev);
    });
    return map;
  }, [events]);

  return (
    <div className="md:hidden flex flex-col h-full">
      {/* Month Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-zinc-100 sticky top-0 z-10 flex-shrink-0">
        <button
          onClick={onPrevMonth}
          className="p-1.5 rounded-full hover:bg-zinc-100 active:bg-zinc-200 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-zinc-600" />
        </button>
        <h2 className="text-sm font-bold tracking-tight">{monthLabel}</h2>
        <button
          onClick={onNextMonth}
          className="p-1.5 rounded-full hover:bg-zinc-100 active:bg-zinc-200 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-zinc-600" />
        </button>
      </div>

      {/* Date Strip */}
      <div className="flex overflow-x-auto px-2 py-2 bg-white border-b border-zinc-100 gap-1 scrollbar-hide flex-shrink-0">
        {daysInMonth.map((day) => {
          const key = format(day, "yyyy-MM-dd");
          const hasEvents = eventsByDay.has(key);
          const isToday = isSameDay(day, today);
          const isSelected = selectedDate && isSameDay(day, selectedDate);

          return (
            <button
              key={key}
              onClick={() => onSelectDate(day)}
              className={cn(
                "flex flex-col items-center justify-center min-w-[44px] rounded-lg transition-all",
                sc.dateStripH,
                isSelected
                  ? "bg-zinc-900 text-white shadow-md"
                  : isToday
                    ? "bg-sky-50 text-sky-700 border border-sky-200"
                    : "bg-zinc-50 text-zinc-700 hover:bg-zinc-100"
              )}
            >
              <span className="text-[10px] font-medium opacity-80">
                {format(day, "EEE", { locale: zhCN })}
              </span>
              <span className={cn("font-bold leading-tight mt-0.5", sc.dateNum)}>
                {format(day, "d")}
              </span>
              {hasEvents && (
                <span
                  className={cn(
                    "w-1 h-1 rounded-full mt-0.5",
                    isSelected ? "bg-white/60" : "bg-zinc-400"
                  )}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Timeline List */}
      <div className={cn("flex-1 overflow-y-auto px-3 py-3", sc.cardGap)}>
        {selectedDate && (
          <div className="flex items-center gap-2 mb-2 flex-shrink-0">
            <span className="text-sm font-semibold text-zinc-900">
              {format(selectedDate, "M月d日", { locale: zhCN })}
            </span>
            <span className="text-xs text-zinc-400">
              {format(selectedDate, "EEEE", { locale: zhCN })}
            </span>
            <button
              onClick={() => onSelectDate(viewDate)}
              className="text-xs text-sky-600 ml-auto"
            >
              查看全月
            </button>
          </div>
        )}

        {events.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-zinc-400">
            <p className="text-sm">暂无行业大事件</p>
          </div>
        )}

        {events.map((ev, idx) => {
          const date = parseISO(ev.startTime);
          const isFirstOfDay =
            idx === 0 || !isSameDay(date, parseISO(events[idx - 1].startTime));

          return (
            <div key={ev.id} className="relative">
              {!selectedDate && isFirstOfDay && (
                <div className="sticky top-0 z-0 mb-1.5 mt-3 first:mt-0">
                  <div className="inline-flex items-center gap-2 bg-zinc-100 rounded-full px-3 py-1">
                    <span className="text-xs font-bold text-zinc-700">
                      {format(date, "M月d日", { locale: zhCN })}
                    </span>
                    <span className="text-[10px] text-zinc-400">
                      {format(date, "EEE", { locale: zhCN })}
                    </span>
                  </div>
                </div>
              )}

              <div
                className={cn(
                  "w-full text-left bg-white border border-zinc-100 shadow-sm",
                  sc.cardPad,
                  sc.cardRadius,
                  adminMode ? "" : "active:scale-[0.98] transition-transform"
                )}
              >
                <div className="flex items-start gap-2.5">
                  <div className="flex flex-col items-center pt-0.5 min-w-[40px]">
                    <span className={cn("font-bold text-zinc-900", sc.timeLabel)}>
                      {format(date, "HH:mm")}
                    </span>
                    <div className="mt-1">
                      <TagDot tag={ev.domainTags[0]} />
                    </div>
                  </div>

                  <div
                    className="flex-1 min-w-0"
                    onClick={() => onSelectEvent(ev)}
                  >
                    <h3 className={cn("font-semibold text-zinc-900 leading-snug", sc.title)}>
                      {ev.title}
                    </h3>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {ev.domainTags.map((tag) => (
                        <span
                          key={tag}
                          className={cn("px-1.5 py-0 rounded-full bg-zinc-100 text-zinc-600 font-medium", sc.tag)}
                        >
                          {tag}
                        </span>
                      ))}
                      {ev.isPast ? (
                        <span className={cn("px-1.5 py-0 rounded-full bg-gray-100 text-gray-500 font-medium", sc.tag)}>
                          已结束
                        </span>
                      ) : (
                        <span className={cn("px-1.5 py-0 rounded-full bg-blue-50 text-blue-600 font-medium", sc.tag)}>
                          即将开始
                        </span>
                      )}
                    </div>
                    <div className={cn("flex items-center gap-1 mt-1 text-zinc-400", sc.meta)}>
                      {ev.locationType === "online" ? (
                        <>
                          <span className="w-1 h-1 rounded-full bg-sky-400" />
                          线上
                        </>
                      ) : ev.locationType === "offline" ? (
                        <>
                          <span className="w-1 h-1 rounded-full bg-emerald-400" />
                          {ev.city ?? "线下"}
                        </>
                      ) : (
                        <>
                          <span className="w-1 h-1 rounded-full bg-violet-400" />
                          线上+线下
                        </>
                      )}
                    </div>
                  </div>

                  {adminMode && (
                    <div className="flex flex-col gap-0.5 pt-0.5">
                      <button
                        onClick={(e) => onEdit?.(ev, e)}
                        className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-500 active:bg-zinc-200"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => onDelete?.(ev.id, e)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-zinc-500 hover:text-red-600 active:bg-red-100"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
