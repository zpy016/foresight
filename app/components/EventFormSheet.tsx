"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MarketEvent } from "@/app/types/event";
import { useData } from "@/app/context/DataContext";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";

const DOMAIN_OPTIONS = [
  "AI大模型", "汽车", "科技", "消费电子", "游戏",
  "新车发布", "赛事", "资本市场", "新品牌",
];

interface EventFormSheetProps {
  event: MarketEvent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function toDatetimeLocalValue(isoString: string): string {
  const d = parseISO(isoString);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function fromDatetimeLocalValue(value: string): string {
  const d = new Date(value);
  // Keep as Beijing time +08:00
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00+08:00`;
}

export default function EventFormSheet({ event, open, onOpenChange }: EventFormSheetProps) {
  const { addEvent, updateEvent } = useData();
  const isEditing = !!event;

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [startTime, setStartTime] = useState("");
  const [isPast, setIsPast] = useState(false);
  const [locationType, setLocationType] = useState<"online" | "offline" | "both">("online");
  const [city, setCity] = useState("");
  const [venue, setVenue] = useState("");
  const [onlineLink, setOnlineLink] = useState("");
  const [tldr, setTldr] = useState("");
  const [keyBreakthroughs, setKeyBreakthroughs] = useState("");
  const [industryImpact, setIndustryImpact] = useState("");
  const [actionableInsight, setActionableInsight] = useState("");

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setTags(event.domainTags);
      setStartTime(toDatetimeLocalValue(event.startTime));
      setIsPast(event.isPast);
      setLocationType(event.locationType);
      setCity(event.city ?? "");
      setVenue(event.venue ?? "");
      setOnlineLink(event.onlineLink ?? "");
      setTldr(event.tldr ?? "");
      setKeyBreakthroughs(event.keyBreakthroughs ?? "");
      setIndustryImpact(event.industryImpact ?? "");
      setActionableInsight(event.actionableInsight ?? "");
    } else {
      // Default for new event: today noon
      const now = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      setTitle("");
      setTags([]);
      setStartTime(`${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T12:00`);
      setIsPast(false);
      setLocationType("online");
      setCity("");
      setVenue("");
      setOnlineLink("");
      setTldr("");
      setKeyBreakthroughs("");
      setIndustryImpact("");
      setActionableInsight("");
    }
  }, [event, open]);

  const toggleTag = useCallback((tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const handleSubmit = useCallback(() => {
    if (!title.trim() || tags.length === 0 || !startTime) {
      alert("请填写事件名称、选择至少一个标签、并设置开始时间");
      return;
    }

    const payload: Omit<MarketEvent, "id"> = {
      title: title.trim(),
      domainTags: tags,
      startTime: fromDatetimeLocalValue(startTime),
      isPast,
      locationType,
      city: city.trim() || undefined,
      venue: venue.trim() || undefined,
      onlineLink: onlineLink.trim() || undefined,
      tldr: tldr.trim() || undefined,
      keyBreakthroughs: keyBreakthroughs.trim() || undefined,
      industryImpact: industryImpact.trim() || undefined,
      actionableInsight: actionableInsight.trim() || undefined,
    };

    if (isEditing && event) {
      updateEvent({ ...payload, id: event.id });
    } else {
      addEvent(payload);
    }
    onOpenChange(false);
  }, [title, tags, startTime, isPast, locationType, city, venue, onlineLink, tldr, keyBreakthroughs, industryImpact, actionableInsight, isEditing, event, addEvent, updateEvent, onOpenChange]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl md:max-w-2xl overflow-hidden p-0">
        <ScrollArea className="h-full">
          <div className="p-6 space-y-6">
            <SheetHeader className="space-y-2 text-left">
              <SheetTitle className="text-xl font-bold">
                {isEditing ? "编辑事件" : "新增事件"}
              </SheetTitle>
              <SheetDescription>
                {isEditing ? "修改事件信息后点击保存" : "填写事件信息并创建新事件"}
              </SheetDescription>
            </SheetHeader>

            <Separator />

            <div className="space-y-5">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-zinc-900">事件名称 <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="例如：苹果春季特别活动"
                  className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all"
                />
              </div>

              {/* Tags */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-zinc-900">领域标签 <span className="text-red-500">*</span></label>
                <div className="flex flex-wrap gap-2">
                  {DOMAIN_OPTIONS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-medium border transition-all",
                        tags.includes(tag)
                          ? "bg-zinc-900 text-white border-zinc-900"
                          : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-zinc-900">开始时间 <span className="text-red-500">*</span></label>
                  <input
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-zinc-900">事件状态</label>
                  <div className="flex items-center gap-3 h-[38px]">
                    <button
                      type="button"
                      onClick={() => setIsPast(false)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                        !isPast
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-white text-zinc-500 border-zinc-200"
                      )}
                    >
                      即将开始
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsPast(true)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                        isPast
                          ? "bg-gray-100 text-gray-700 border-gray-300"
                          : "bg-white text-zinc-500 border-zinc-200"
                      )}
                    >
                      已结束
                    </button>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-zinc-900">场地类型</label>
                <div className="flex items-center gap-3">
                  {(["online", "offline", "both"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setLocationType(type)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                        locationType === type
                          ? "bg-zinc-900 text-white border-zinc-900"
                          : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
                      )}
                    >
                      {type === "online" ? "线上" : type === "offline" ? "线下" : "线上+线下"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-zinc-900">国家/城市</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="例如：北京"
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-zinc-900">场馆</label>
                  <input
                    type="text"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="例如：国家会议中心"
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-zinc-900">直播/预约链接</label>
                <input
                  type="url"
                  value={onlineLink}
                  onChange={(e) => setOnlineLink(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all"
                />
              </div>

              <Separator />

              {/* Structured analysis (for past events) */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">过去事件</Badge>
                  一句话总结
                </label>
                <textarea
                  value={tldr}
                  onChange={(e) => setTldr(e.target.value)}
                  rows={2}
                  placeholder="一句话概括该事件对行业的核心冲击..."
                  className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-zinc-900">关键发布 / 突破</label>
                <textarea
                  value={keyBreakthroughs}
                  onChange={(e) => setKeyBreakthroughs(e.target.value)}
                  rows={2}
                  placeholder="提取最核心的数据、技术指标或产品特性..."
                  className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-zinc-900">分析研判</label>
                <textarea
                  value={industryImpact}
                  onChange={(e) => setIndustryImpact(e.target.value)}
                  rows={2}
                  placeholder="分析该事件对现有技术路线、竞争格局或供应链的影响..."
                  className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-zinc-900">行动启示</label>
                <textarea
                  value={actionableInsight}
                  onChange={(e) => setActionableInsight(e.target.value)}
                  rows={2}
                  placeholder="针对内部业务或研发策略的跟进建议..."
                  className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all resize-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 sticky bottom-0 bg-white">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="px-5 py-2.5 rounded-lg border border-zinc-200 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-5 py-2.5 rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors"
              >
                {isEditing ? "保存修改" : "创建事件"}
              </button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
