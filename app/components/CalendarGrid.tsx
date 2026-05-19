"use client";

import { useMemo } from "react";
import { format, isSameDay, isSameMonth, parseISO, getDay, startOfMonth, endOfMonth, addDays, subDays } from "date-fns";
import { zhCN } from "date-fns/locale";
import { MarketEvent } from "@/app/types/event";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";

interface CalendarGridProps {
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

const WEEK_DAYS = ["日", "一", "二", "三", "四", "五", "六"];

function getCalendarDays(viewDate: Date): Date[] {
  const start = startOfMonth(viewDate);
  const end = endOfMonth(viewDate);
  const startDayOfWeek = getDay(start);
  const days: Date[] = [];

  for (let i = startDayOfWeek; i > 0; i--) {
    days.push(subDays(start, i));
  }
  for (let d = new Date(start); d <= end; d = addDays(d, 1)) {
    days.push(new Date(d));
  }
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push(addDays(end, i));
  }
  return days;
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
    dayNum: "text-[11px]",
    dayNumSize: { w: 18, h: 18 },
    eventTitle: "text-[10px]",
    eventTime: "text-[9px]",
    eventPad: "px-1 py-[2px]",
    eventGap: "gap-0",
    moreText: "text-[9px]",
    headerPad: "py-2",
    cellPad: "p-1.5",
    countText: "text-[9px]",
  },
  md: {
    dayNum: "text-xs",
    dayNumSize: { w: 22, h: 22 },
    eventTitle: "text-[11px]",
    eventTime: "text-[10px]",
    eventPad: "px-1 py-[2px]",
    eventGap: "gap-0",
    moreText: "text-[10px]",
    headerPad: "py-2.5",
    cellPad: "p-2",
    countText: "text-[10px]",
  },
  lg: {
    dayNum: "text-sm",
    dayNumSize: { w: 26, h: 26 },
    eventTitle: "text-xs",
    eventTime: "text-[11px]",
    eventPad: "px-1.5 py-[3px]",
    eventGap: "gap-0",
    moreText: "text-[11px]",
    headerPad: "py-3",
    cellPad: "p-2.5",
    countText: "text-[11px]",
  },
};

export default function CalendarGrid({
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
}: CalendarGridProps) {
  const days = useMemo(() => getCalendarDays(viewDate), [viewDate]);
  const sc = sizeConfig[fontSize];

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

  const monthLabel = format(viewDate, "yyyy年 M月", { locale: zhCN });

  const MAX_EVENTS_PER_CELL = fontSize === "sm" ? 4 : fontSize === "md" ? 3 : 2;

  return (
    <div className="hidden md:flex flex-col h-[calc(100vh-96px)]">
      {/* Month Header */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold tracking-tight">{monthLabel}</h2>
          <div className="flex items-center gap-1">
            <button
              onClick={onPrevMonth}
              className="p-1 rounded-lg hover:bg-zinc-100 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-zinc-500" />
            </button>
            <button
              onClick={onNextMonth}
              className="p-1 rounded-lg hover:bg-zinc-100 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </button>
          </div>
        </div>
        <div className="text-xs text-zinc-400">
          共 {events.length} 个事件
        </div>
      </div>

      {/* Calendar Grid — fixed 6 rows, equal height */}
      <div className="flex-1 grid grid-cols-7 grid-rows-[auto_1fr_1fr_1fr_1fr_1fr_1fr] gap-px bg-zinc-200 rounded-xl overflow-hidden border border-zinc-200">
        {/* Weekday Header */}
        {WEEK_DAYS.map((d) => (
          <div
            key={d}
            className={cn(
              "bg-zinc-50 text-center text-xs font-semibold text-zinc-500 uppercase tracking-wider flex items-center justify-center",
              sc.headerPad
            )}
          >
            星期{d}
          </div>
        ))}

        {/* Days */}
        {days.map((day, idx) => {
          const key = format(day, "yyyy-MM-dd");
          const dayEvents = eventsByDay.get(key) ?? [];
          const isToday = isSameDay(day, today);
          const isCurrentMonth = isSameMonth(day, viewDate);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const visibleEvents = dayEvents.slice(0, MAX_EVENTS_PER_CELL);
          const hiddenCount = dayEvents.length - visibleEvents.length;

          return (
            <div
              key={idx}
              onClick={() => onSelectDate(day)}
              className={cn(
                "bg-white transition-colors cursor-pointer hover:bg-zinc-50 flex flex-col overflow-hidden",
                !isCurrentMonth && "bg-zinc-50/60 text-zinc-400",
                isSelected && "bg-sky-50/60 ring-1 ring-inset ring-sky-200"
              )}
            >
              {/* Date number row */}
              <div className={cn("flex items-center justify-between flex-shrink-0", sc.cellPad)}>
                <span
                  className={cn(
                    "font-medium flex items-center justify-center rounded-full",
                    sc.dayNum
                  )}
                  style={{
                    width: sc.dayNumSize.w,
                    height: sc.dayNumSize.h,
                    backgroundColor: isToday ? "#18181b" : "transparent",
                    color: isToday ? "#fff" : isCurrentMonth ? "#18181b" : "#a1a1aa",
                  }}
                >
                  {format(day, "d")}
                </span>
                {dayEvents.length > 0 && (
                  <span className={cn("font-medium text-zinc-400", sc.countText)}>
                    {dayEvents.length}
                  </span>
                )}
              </div>

              {/* Events list */}
              <div className={cn("flex-1 flex flex-col overflow-hidden", sc.cellPad, "pt-0")}>
                <div className={cn("flex flex-col", sc.eventGap)}>
                  {visibleEvents.map((ev) => (
                    <div
                      key={ev.id}
                      className={cn(
                        "group flex items-center gap-1 rounded hover:bg-zinc-100 transition-colors cursor-pointer",
                        sc.eventPad
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectEvent(ev);
                      }}
                      title={ev.title}
                    >
                      <TagDot tag={ev.domainTags[0]} />
                      <span className={cn("flex-1 min-w-0 truncate leading-tight text-zinc-700 group-hover:text-zinc-900", sc.eventTitle)}>
                        {ev.title}
                      </span>
                      <span className={cn("text-zinc-400 flex-shrink-0", sc.eventTime)}>
                        {format(parseISO(ev.startTime), "HH:mm")}
                      </span>
                      {adminMode && (
                        <div className="flex items-center gap-0 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                          <button
                            onClick={(e) => { e.stopPropagation(); onEdit?.(ev, e); }}
                            className="p-0.5 rounded hover:bg-zinc-200 text-zinc-500"
                          >
                            <Pencil className="w-2.5 h-2.5" />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); onDelete?.(ev.id, e); }}
                            className="p-0.5 rounded hover:bg-red-100 text-zinc-500 hover:text-red-600"
                          >
                            <Trash2 className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  {hiddenCount > 0 && (
                    <div
                      className={cn("text-zinc-400 font-medium cursor-pointer hover:text-zinc-600", sc.moreText, sc.eventPad)}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDate(day);
                      }}
                    >
                      +{hiddenCount} 更多
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
