"use client";

import { useState, useMemo, useCallback } from "react";
import { addMonths, subMonths, parseISO, isSameDay } from "date-fns";
import { useData } from "@/app/context/DataContext";
import { MarketEvent } from "@/app/types/event";
import CalendarGrid from "@/app/components/CalendarGrid";
import MobileTimeline from "@/app/components/MobileTimeline";
import EventSheet from "@/app/components/EventSheet";
import TagFilter from "@/app/components/TagFilter";
import EventFormSheet from "@/app/components/EventFormSheet";
import { Telescope, Shield, User, Plus, LayoutDashboard } from "lucide-react";
import Link from "next/link";

// 获取当前北京时间（东八区），确保日历"今天"标记始终准确
const getBeijingDate = () => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 8 * 60 * 60 * 1000);
};
const TODAY = getBeijingDate();

type ViewMode = "viewer" | "admin";

export default function Home() {
  const { events, deleteEvent } = useData();
  const [viewDate, setViewDate] = useState(new Date("2026-05-01T00:00:00+08:00"));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [activeTag, setActiveTag] = useState("全部");
  const [sheetEvent, setSheetEvent] = useState<MarketEvent | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [formEvent, setFormEvent] = useState<MarketEvent | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("viewer");
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");

  const filteredEvents = useMemo(() => {
    let list = activeTag === "全部" ? events : events.filter((ev) => ev.domainTags.includes(activeTag));
    if (selectedDate) {
      list = list.filter((ev) => isSameDay(parseISO(ev.startTime), selectedDate));
    }
    return list;
  }, [events, activeTag, selectedDate]);

  const handleSelectEvent = useCallback((event: MarketEvent) => {
    setSheetEvent(event);
    setSheetOpen(true);
  }, []);

  const handleSelectDate = useCallback((date: Date) => {
    setSelectedDate((prev) => (prev && isSameDay(prev, date) ? null : date));
  }, []);

  const handlePrevMonth = useCallback(() => {
    setViewDate((prev) => subMonths(prev, 1));
    setSelectedDate(null);
  }, []);

  const handleNextMonth = useCallback(() => {
    setViewDate((prev) => addMonths(prev, 1));
    setSelectedDate(null);
  }, []);

  const handleEdit = useCallback((event: MarketEvent, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFormEvent(event);
    setFormOpen(true);
  }, []);

  const handleAdd = useCallback(() => {
    setFormEvent(null);
    setFormOpen(true);
  }, []);

  const handleDelete = useCallback((id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (confirm("确定要删除这条事件吗？")) {
      deleteEvent(id);
    }
  }, [deleteEvent]);

  return (
    <div className="flex flex-col h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-100 px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 flex items-center justify-center">
              <Telescope className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight leading-none">
                Foresight <span className="text-zinc-400 font-normal">视界线</span>
              </h1>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                汽车+AI 行业大事件智能日历
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <TagFilter activeTag={activeTag} onTagChange={setActiveTag} />

            {/* Mode Switcher */}
            <div className="flex items-center bg-zinc-100 rounded-lg p-0.5 ml-auto md:ml-0">
              <button
                onClick={() => setViewMode("viewer")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  viewMode === "viewer"
                    ? "bg-white text-zinc-900 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700"
                }`}
              >
                <User className="w-3.5 h-3.5" />
                浏览
              </button>
              <button
                onClick={() => setViewMode("admin")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  viewMode === "admin"
                    ? "bg-white text-zinc-900 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700"
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                管理
              </button>
            </div>

            {/* Font Size Toggle */}
            <div className="flex items-center bg-zinc-100 rounded-lg p-0.5">
              {(["sm", "md", "lg"] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all ${
                    fontSize === size
                      ? "bg-white text-zinc-900 shadow-sm"
                      : "text-zinc-500 hover:text-zinc-700"
                  }`}
                  title={size === "sm" ? "小字号" : size === "md" ? "中字号" : "大字号"}
                >
                  {size === "sm" ? "小" : size === "md" ? "中" : "大"}
                </button>
              ))}
            </div>

            {viewMode === "admin" && (
              <>
                <button
                  onClick={handleAdd}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  新增事件
                </button>
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 text-zinc-700 text-xs font-medium hover:bg-zinc-50 transition-colors"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  后台管理
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full md:max-w-7xl md:mx-auto md:px-8 md:py-3 md:overflow-y-auto">
          {/* PC Calendar */}
          <CalendarGrid
            viewDate={viewDate}
            events={filteredEvents}
            selectedDate={selectedDate}
            onSelectDate={handleSelectDate}
            onSelectEvent={handleSelectEvent}
            today={TODAY}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            adminMode={viewMode === "admin"}
            onEdit={handleEdit}
            onDelete={handleDelete}
            fontSize={fontSize}
          />

          {/* Mobile Timeline */}
          <MobileTimeline
            viewDate={viewDate}
            events={filteredEvents}
            selectedDate={selectedDate}
            onSelectDate={handleSelectDate}
            onSelectEvent={handleSelectEvent}
            today={TODAY}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            adminMode={viewMode === "admin"}
            onEdit={handleEdit}
            onDelete={handleDelete}
            fontSize={fontSize}
          />
        </div>
      </main>

      {/* Event Detail Sheet */}
      <EventSheet
        event={sheetEvent}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />

      {/* Event Form Sheet (Add/Edit) */}
      <EventFormSheet
        event={formEvent}
        open={formOpen}
        onOpenChange={setFormOpen}
      />
    </div>
  );
}
