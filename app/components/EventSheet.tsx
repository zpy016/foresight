"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MarketEvent } from "@/app/types/event";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { zhCN } from "date-fns/locale";
import {
  Globe,
  MapPin,
  CalendarDays,
  Clock,
  Lightbulb,
  Zap,
  TrendingUp,
  FileText,
  Link as LinkIcon,
  ArrowRight,
  Bot,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

interface EventSheetProps {
  event: MarketEvent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DomainBadge({ tag }: { tag: string }) {
  const colorMap: Record<string, string> = {
    AI: "bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200",
    汽车: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200",
    消费电子: "bg-sky-100 text-sky-700 hover:bg-sky-100 border-sky-200",
    新品发布: "bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200",
    战略合作: "bg-pink-100 text-pink-700 hover:bg-pink-100 border-pink-200",
    资本市场: "bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-indigo-200",
  };

  return (
    <Badge
      variant="outline"
      className={`text-xs font-medium px-2 py-0.5 rounded-md ${colorMap[tag] ?? "bg-gray-100 text-gray-700 border-gray-200"}`}
    >
      {tag}
    </Badge>
  );
}

function LocationInfo({ event }: { event: MarketEvent }) {
  if (event.locationType === "online") {
    return (
      <div className="flex items-start gap-3 p-4 rounded-xl bg-sky-50 border border-sky-100">
        <div className="mt-0.5">
          <Globe className="w-5 h-5 text-sky-600" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-sky-900">线上活动</div>
          <div className="text-xs text-sky-700 mt-1">
            {event.onlineLink ? (
              <a
                href={event.onlineLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sky-600 hover:underline"
              >
                进入直播/预约入口 <ArrowRight className="w-3 h-3" />
              </a>
            ) : (
              "直播链接待更新"
            )}
          </div>
        </div>
      </div>
    );
  }

  if (event.locationType === "offline") {
    return (
      <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-100">
        <div className="mt-0.5">
          <MapPin className="w-5 h-5 text-emerald-600" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-emerald-900">线下活动</div>
          <div className="text-xs text-emerald-700 mt-1">
            {event.city ? (
              <span>
                中国 - {event.city}
                {event.venue ? ` - ${event.venue}` : ""}
              </span>
            ) : (
              "地点待确认"
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-violet-50 border border-violet-100">
      <div className="mt-0.5">
        <Globe className="w-5 h-5 text-violet-600" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-violet-900">线上 + 线下</div>
        <div className="text-xs text-violet-700 mt-1">
          {event.city ? `线下地点：中国 - ${event.city}` : "线下地点待确认"}
          {event.onlineLink && (
            <div className="mt-1">
              <a
                href={event.onlineLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-violet-600 hover:underline"
              >
                进入直播/预约入口 <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AICheckCard({ event }: { event: MarketEvent }) {
  if (!event.aiCheckStatus || event.aiCheckStatus === "none") return null;

  const isVerified = event.aiCheckStatus === "verified";
  return (
    <div className={cn(
      "p-4 rounded-xl border",
      isVerified ? "bg-emerald-50 border-emerald-100" : "bg-red-50 border-red-100"
    )}>
      <div className="flex items-center gap-2 mb-2">
        <Bot className={cn("w-4 h-4", isVerified ? "text-emerald-600" : "text-red-600")} />
        <span className={cn("text-sm font-semibold", isVerified ? "text-emerald-900" : "text-red-900")}>
          AI 智能核查
        </span>
        {isVerified ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
        ) : (
          <AlertCircle className="w-4 h-4 text-red-600" />
        )}
      </div>
      {event.aiCheckNote && (
        <p className={cn("text-sm leading-relaxed mb-3", isVerified ? "text-emerald-800" : "text-red-800")}>
          {event.aiCheckNote}
        </p>
      )}
      {event.aiReferenceLinks && event.aiReferenceLinks.length > 0 && (
        <div className="space-y-1">
          <span className="text-xs font-medium text-zinc-500">参考来源：</span>
          <div className="flex flex-wrap gap-2">
            {event.aiReferenceLinks.map((link, i) => (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-sky-600 hover:underline bg-white px-2 py-1 rounded border border-zinc-100"
              >
                <ExternalLink className="w-3 h-3" />
                参考链接 {i + 1}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PastEventCard({ event }: { event: MarketEvent }) {
  return (
    <div className="space-y-5">
      <AICheckCard event={event} />

      {event.tldr && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-semibold text-amber-900">一句话总结</span>
          </div>
          <p className="text-sm text-amber-800 leading-relaxed">{event.tldr}</p>
        </div>
      )}

      {event.keyBreakthroughs && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-sky-600" />
            <span className="text-sm font-semibold text-sky-900">关键发布 / 突破</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed pl-6">
            {event.keyBreakthroughs}
          </p>
        </div>
      )}

      {event.industryImpact && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-900">分析研判</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed pl-6">
            {event.industryImpact}
          </p>
        </div>
      )}

      {event.actionableInsight && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-semibold text-violet-900">行动启示</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed pl-6">
            {event.actionableInsight}
          </p>
        </div>
      )}

      {(event.pdfUrl || event.htmlUrl) && (
        <div className="flex flex-wrap gap-3 pt-2">
          {event.pdfUrl && (
            <a
              href={event.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors"
            >
              <FileText className="w-4 h-4" />
              下载研报 PDF
            </a>
          )}
          {event.htmlUrl && (
            <a
              href={event.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 text-sm font-medium hover:bg-zinc-50 transition-colors"
            >
              <LinkIcon className="w-4 h-4" />
              深度分析页
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default function EventSheet({ event, open, onOpenChange }: EventSheetProps) {
  if (!event) return null;

  const date = parseISO(event.startTime);
  const dateStr = format(date, "M月d日", { locale: zhCN });
  const weekStr = format(date, "EEEE", { locale: zhCN });
  const timeStr = format(date, "HH:mm", { locale: zhCN });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl md:max-w-2xl overflow-hidden p-0">
        <ScrollArea className="h-full">
          <div className="p-6 space-y-6">
            <SheetHeader className="space-y-4 text-left">
              <div className="flex flex-wrap gap-2">
                {event.domainTags.map((tag) => (
                  <DomainBadge key={tag} tag={tag} />
                ))}
                {event.isPast ? (
                  <Badge variant="outline" className="text-xs font-medium px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 border-gray-200">
                    已结束
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs font-medium px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 border-blue-200">
                    即将开始
                  </Badge>
                )}
              </div>

              <SheetTitle className="text-xl sm:text-2xl font-bold leading-snug tracking-tight">
                {event.title}
              </SheetTitle>

              <SheetDescription className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4" />
                  <span>{dateStr}</span>
                  <span className="text-xs">({weekStr})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{timeStr}</span>
                </div>
              </SheetDescription>
            </SheetHeader>

            <LocationInfo event={event} />

            <Separator />

            {event.isPast ? (
              <PastEventCard event={event} />
            ) : (
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                <div className="text-sm font-semibold text-blue-900 mb-1">未来事件</div>
                <p className="text-sm text-blue-700 leading-relaxed">
                  该事件尚未发生。事件结束后，系统将自动生成结构化深度复盘卡片（一句话总结、关键突破、分析研判、行动启示）。
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
