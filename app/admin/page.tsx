"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { useData } from "@/app/context/DataContext";
import { MarketEvent, TAG_POOL, DEFAULT_SUGGESTION_PROMPT } from "@/app/types/event";
import EventFormSheet from "@/app/components/EventFormSheet";
import { performAICheck, performSuggestionCheck, AICheckResult, AISuggestionResult, runWithConcurrency } from "@/app/lib/ai-check";
import { format, parseISO } from "date-fns";
import { zhCN } from "date-fns/locale";
import { cn } from "@/lib/utils";
import * as XLSX from "xlsx";
import {
  Telescope,
  Plus,
  ArrowLeft,
  Trash2,
  Search,
  X,
  Table2,
  Edit3,
  Filter,
  CheckSquare,
  Square,
  Loader2,
  Bot,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  ChevronUp,
  ChevronDown,
  Undo2,
  Redo2,
  FileSpreadsheet,
  Upload,
  Download,
  Key,
  EyeOff,
  Settings,
  RotateCcw,
  Archive,
  Trash,
  Sparkles,
  StickyNote,
} from "lucide-react";

/* ---------- tag color helper ---------- */
function tagColorClass(tag: string): string {
  const map: Record<string, string> = {
    汽车: "bg-emerald-100 text-emerald-700",
    AI: "bg-orange-100 text-orange-700",
    消费电子: "bg-sky-100 text-sky-700",
    新品发布: "bg-amber-100 text-amber-700",
    战略合作: "bg-pink-100 text-pink-700",
    资本市场: "bg-indigo-100 text-indigo-700",
  };
  return map[tag] ?? "bg-zinc-100 text-zinc-600";
}

/* ---------- helpers ---------- */
function toDatetimeLocalValue(isoString: string): string {
  const d = parseISO(isoString);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function fromDatetimeLocalValue(value: string): string {
  const d = new Date(value);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00+08:00`;
}

function ellipsis(text: string | undefined, maxLen: number) {
  if (!text) return "—";
  return text.length > maxLen ? text.slice(0, maxLen) + "…" : text;
}

type SortConfig = { key: string; dir: "asc" | "desc" } | null;

/* ---------- Tag editor ---------- */
function TagEditor({ tags, onChange }: { tags: string[]; onChange: (tags: string[]) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = (tag: string) => {
    if (tags.includes(tag)) onChange(tags.filter((t) => t !== tag));
    else onChange([...tags, tag]);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left flex flex-wrap gap-1 px-2 py-1.5 rounded-md border border-zinc-200 bg-white min-h-[32px]"
      >
        {tags.length === 0 ? (
          <span className="text-xs text-zinc-400">选择标签…</span>
        ) : (
          tags.map((t) => (
            <span key={t} className={cn("text-[10px] px-1.5 py-0.5 rounded font-medium", tagColorClass(t))}>
              {t}
            </span>
          ))
        )}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 mt-1 w-56 bg-white border border-zinc-200 rounded-xl shadow-lg p-2 max-h-64 overflow-y-auto">
            <div className="flex flex-wrap gap-1">
              {TAG_POOL.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggle(tag)}
                  className={cn(
                    "text-[10px] px-2 py-1 rounded-full border transition-all",
                    tags.includes(tag)
                      ? "bg-zinc-900 text-white border-zinc-900"
                      : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ---------- AI Status Badge ---------- */
function AICheckBadge({
  status,
  onVerify,
}: {
  status?: MarketEvent["aiCheckStatus"];
  onVerify?: () => void;
}) {
  const config: Record<string, { label: string; classes: string; icon: React.ReactNode }> = {
    verified: {
      label: "已验证",
      classes: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: <CheckCircle2 className="w-3 h-3" />,
    },
    mismatch: {
      label: "待复核",
      classes: "bg-red-50 text-red-700 border-red-200",
      icon: <AlertCircle className="w-3 h-3" />,
    },
    pending: {
      label: "检查中",
      classes: "bg-amber-50 text-amber-700 border-amber-200",
      icon: <Loader2 className="w-3 h-3 animate-spin" />,
    },
    none: {
      label: "未检查",
      classes: "bg-gray-50 text-gray-500 border-gray-200",
      icon: <Square className="w-3 h-3" />,
    },
  };
  const c = config[status ?? "none"];
  const isMismatch = status === "mismatch";

  return (
    <button
      onClick={isMismatch ? onVerify : undefined}
      disabled={!isMismatch}
      title={isMismatch ? "点击标记为已验证" : undefined}
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border transition-opacity",
        isMismatch ? "cursor-pointer hover:opacity-70" : "cursor-default",
        c.classes
      )}
    >
      {c.icon}
      {c.label}
    </button>
  );
}

/* ---------- AI Suggestion Badge ---------- */
function AISuggestionBadge({
  suggestion,
  reason,
}: {
  suggestion?: MarketEvent["aiSuggestion"];
  reason?: string;
}) {
  const config: Record<string, { label: string; classes: string; icon: React.ReactNode }> = {
    keep: {
      label: "建议保留",
      classes: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: <CheckCircle2 className="w-3 h-3" />,
    },
    delete: {
      label: "建议删除",
      classes: "bg-orange-50 text-orange-700 border-orange-200",
      icon: <Trash className="w-3 h-3" />,
    },
    pending: {
      label: "分析中",
      classes: "bg-amber-50 text-amber-700 border-amber-200",
      icon: <Loader2 className="w-3 h-3 animate-spin" />,
    },
  };
  const c = config[suggestion ?? "keep"];
  return (
    <div className="space-y-0.5">
      <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border", c.classes)}>
        {c.icon}
        {c.label}
      </span>
      {reason && <p className="text-[10px] text-zinc-400">{ellipsis(reason, 20)}</p>}
    </div>
  );
}

/* ---------- Main Page ---------- */
export default function AdminPage() {
  const {
    events, updateEvents, deleteEvents, importEvents,
    undo, redo, canUndo, canRedo,
    deletedEvents, moveToTrash, restoreFromTrash, permanentlyDeleteFromTrash,
    suggestionConfig, updateSuggestionPrompt,
    apiKeys, addApiKey, deleteApiKey,
  } = useData();

  /* UI states */
  const [bulkEdit, setBulkEdit] = useState(false);
  const [showApiKeyManager, setShowApiKeyManager] = useState(false);
  const [apiKeyForm, setApiKeyForm] = useState({
    name: "",
    baseUrl: "https://api.kimi.com/coding/v1",
    protocol: "openai" as "openai" | "anthropic",
    model: "",
    apiKey: "",
  });

  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "startTime", dir: "asc" });
  const [globalFilter, setGlobalFilter] = useState("");
  const [colFilters, setColFilters] = useState<Record<string, string>>({});
  const [showFilters, setShowFilters] = useState(false);

  /* selection */
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  /* AI check states */
  const [aiCheckingIds, setAiCheckingIds] = useState<Set<string>>(new Set());
  const [aiResults, setAiResults] = useState<Record<string, AICheckResult>>({});

  /* form sheet */
  const [formEvent, setFormEvent] = useState<MarketEvent | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  /* auto-save toast */
  const [saveToast, setSaveToast] = useState<string | null>(null);

  /* trash & suggestion */
  const [showTrash, setShowTrash] = useState(false);
  const [showSuggestionEditor, setShowSuggestionEditor] = useState(false);
  const [suggestionRunningIds, setSuggestionRunningIds] = useState<Set<string>>(new Set());
  const [pendingSuggestions, setPendingSuggestions] = useState<Record<string, AISuggestionResult>>({});

  /* ---------- filtering & sorting ---------- */
  const filteredEvents = useMemo(() => {
    let list = events.filter((e) => {
      if (globalFilter) {
        const s = globalFilter.toLowerCase();
        const match =
          e.title.toLowerCase().includes(s) ||
          e.domainTags.some((t) => t.toLowerCase().includes(s)) ||
          (e.city ?? "").toLowerCase().includes(s) ||
          (e.tldr ?? "").toLowerCase().includes(s);
        if (!match) return false;
      }
      for (const [key, val] of Object.entries(colFilters)) {
        if (!val) continue;
        const cellVal = String((e as any)[key] ?? "").toLowerCase();
        if (!cellVal.includes(val.toLowerCase())) return false;
      }
      return true;
    });

    if (sortConfig) {
      list = [...list].sort((a, b) => {
        let av: any = (a as any)[sortConfig.key] ?? "";
        let bv: any = (b as any)[sortConfig.key] ?? "";
        if (sortConfig.key === "startTime") {
          av = new Date(av).getTime();
          bv = new Date(bv).getTime();
        }
        if (av < bv) return sortConfig.dir === "asc" ? -1 : 1;
        if (av > bv) return sortConfig.dir === "asc" ? 1 : -1;
        return 0;
      });
    }
    return list;
  }, [events, globalFilter, colFilters, sortConfig]);

  /* ---------- keyboard: Ctrl+Z / Ctrl+Y ---------- */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo]);

  /* ---------- selection ---------- */
  const allSelected = filteredEvents.length > 0 && filteredEvents.every((e) => selectedIds.has(e.id));
  const someSelected = filteredEvents.some((e) => selectedIds.has(e.id)) && !allSelected;

  const toggleSelectAll = useCallback(() => {
    if (allSelected) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        filteredEvents.forEach((e) => next.delete(e.id));
        return next;
      });
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        filteredEvents.forEach((e) => next.add(e.id));
        return next;
      });
    }
  }, [allSelected, filteredEvents]);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  /* ---------- auto-save helper ---------- */
  const autoSave = useCallback((updated: MarketEvent) => {
    updateEvents([updated]);
    setSaveToast("已自动保存");
    setTimeout(() => setSaveToast(null), 1200);
  }, [updateEvents]);

  /* ---------- bulk actions ---------- */
  const handleBulkDelete = useCallback(() => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;
    if (!confirm(`确定将选中的 ${ids.length} 条事件移入回收站吗？\n\n你可以在回收站中恢复或彻底删除。`)) return;
    moveToTrash(ids);
    setSelectedIds(new Set());
  }, [selectedIds, moveToTrash]);

  // Pick first available API key for AI check
  const activeApiKey = apiKeys.length > 0 ? apiKeys[0] : undefined;
  const isUsingRealAI = !!activeApiKey;

  const handleBulkAICheck = useCallback(async () => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;

    if (!isUsingRealAI) {
      const ok = confirm("当前未配置 API Key，将使用模拟模式进行 AI 检查。\n\n如需真实 AI 检查，请先在下方「API Key 管理」中添加配置。\n\n是否继续？");
      if (!ok) return;
    }

    setAiCheckingIds(new Set(ids));
    const results: Record<string, AICheckResult> = {};
    const updatedEvents: MarketEvent[] = [];
    const errors: string[] = [];

    await runWithConcurrency(
      ids,
      3, // max 3 concurrent requests
      async (id) => {
        const event = events.find((e) => e.id === id);
        if (!event) return;
        try {
          const result = await performAICheck(event, activeApiKey);
          results[id] = result;
          updatedEvents.push({
            ...event,
            aiCheckStatus: result.status,
            aiReferenceLinks: result.referenceLinks,
            aiCheckNote: result.note,
          });
        } catch (err: any) {
          errors.push(`「${event.title.slice(0, 20)}」: ${err.message || "检查失败"}`);
          // Mark as mismatch on error
          updatedEvents.push({
            ...event,
            aiCheckStatus: "mismatch" as const,
            aiCheckNote: `AI 检查出错: ${err.message || "未知错误"}`,
          });
        }
      }
    );

    setAiResults((prev) => ({ ...prev, ...results }));
    updateEvents(updatedEvents);
    setAiCheckingIds(new Set());

    if (errors.length > 0) {
      alert(`以下 ${errors.length} 条事件检查失败：\n\n${errors.slice(0, 5).join("\n")}${errors.length > 5 ? "\n..." : ""}`);
    }
  }, [selectedIds, events, updateEvents, activeApiKey, isUsingRealAI]);

  /* ---------- AI Suggestion batch ---------- */
  const handleBulkSuggestion = useCallback(async () => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;

    if (!isUsingRealAI) {
      const ok = confirm("当前未配置 API Key，将使用模拟模式运行 AI 建议。\n\n如需真实 AI 建议，请先在下方「API Key 管理」中添加配置。\n\n是否继续？");
      if (!ok) return;
    }

    setSuggestionRunningIds(new Set(ids));
    const results: Record<string, AISuggestionResult> = {};
    const updatedEvents: MarketEvent[] = [];
    const errors: string[] = [];

    await runWithConcurrency(
      ids,
      3,
      async (id) => {
        const event = events.find((e) => e.id === id);
        if (!event) return;
        try {
          const result = await performSuggestionCheck(event, suggestionConfig.prompt, activeApiKey);
          results[id] = result;
          updatedEvents.push({
            ...event,
            aiSuggestion: result.suggestion,
            aiSuggestionReason: result.reason,
          });
        } catch (err: any) {
          errors.push(`「${event.title.slice(0, 20)}」: ${err.message || "分析失败"}`);
        }
      }
    );

    setPendingSuggestions(results);
    updateEvents(updatedEvents);
    setSuggestionRunningIds(new Set());

    if (errors.length > 0) {
      alert(`以下 ${errors.length} 条事件分析失败：\n\n${errors.slice(0, 5).join("\n")}${errors.length > 5 ? "\n..." : ""}`);
    }
  }, [selectedIds, events, updateEvents, activeApiKey, isUsingRealAI, suggestionConfig.prompt]);

  /* ---------- Apply AI Suggestions ---------- */
  const handleApplySuggestions = useCallback(() => {
    const ids = Object.keys(pendingSuggestions);
    if (ids.length === 0) return;

    const toKeep: MarketEvent[] = [];
    const toDelete: string[] = [];
    let keepAuto = 0;
    let keepAI = 0;
    let keepConsumer = 0;
    let deleteOther = 0;

    for (const [id, result] of Object.entries(pendingSuggestions)) {
      const event = events.find((e) => e.id === id);
      if (!event) continue;

      if (result.suggestion === "keep" && result.primaryTag !== "其他") {
        toKeep.push({ ...event, domainTags: [result.primaryTag] });
        if (result.primaryTag === "汽车") keepAuto++;
        else if (result.primaryTag === "AI") keepAI++;
        else if (result.primaryTag === "消费电子") keepConsumer++;
      } else {
        toDelete.push(id);
        deleteOther++;
      }
    }

    const summary = `AI 建议处理结果：

保留 ${toKeep.length} 条：
  · 汽车：${keepAuto} 条
  · AI：${keepAI} 条  
  · 消费电子：${keepConsumer} 条

移入回收站 ${toDelete.length} 条

确定应用吗？`;

    if (!confirm(summary)) return;

    if (toKeep.length > 0) {
      updateEvents(toKeep);
    }
    if (toDelete.length > 0) {
      moveToTrash(toDelete);
    }
    setPendingSuggestions({});
    setSelectedIds(new Set());
  }, [pendingSuggestions, events, updateEvents, moveToTrash]);

  /* ---------- trash actions ---------- */
  const handleTrashRestore = useCallback((ids: string[]) => {
    restoreFromTrash(ids);
  }, [restoreFromTrash]);

  const handleTrashPermanentDelete = useCallback((ids: string[]) => {
    if (!confirm(`确定要彻底删除选中的 ${ids.length} 条事件吗？此操作不可撤销。`)) return;
    permanentlyDeleteFromTrash(ids);
  }, [permanentlyDeleteFromTrash]);

  /* ---------- row actions ---------- */
  const handleCancelBulkEdit = useCallback(() => {
    setBulkEdit(false);
  }, []);

  const handleAdd = useCallback(() => {
    setFormEvent(null);
    setFormOpen(true);
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      if (confirm("确定将这条事件移入回收站吗？")) moveToTrash([id]);
    },
    [moveToTrash]
  );

  /* ---------- sorting helper ---------- */
  const toggleSort = (key: string) => {
    setSortConfig((prev) => {
      if (!prev || prev.key !== key) return { key, dir: "asc" };
      if (prev.dir === "asc") return { key, dir: "desc" };
      return null;
    });
  };

  const SortIcon = ({ colKey }: { colKey: string }) => {
    if (!sortConfig || sortConfig.key !== colKey) return <ChevronUp className="w-3 h-3 text-zinc-300" />;
    return sortConfig.dir === "asc" ? (
      <ChevronUp className="w-3 h-3 text-zinc-700" />
    ) : (
      <ChevronDown className="w-3 h-3 text-zinc-700" />
    );
  };

  /* ---------- Excel export ---------- */
  const handleExportExcel = useCallback(() => {
    const exportList = selectedIds.size > 0
      ? filteredEvents.filter((e) => selectedIds.has(e.id))
      : filteredEvents;

    const rows = exportList.map((e) => ({
      "事件名称": e.title,
      "标签": e.domainTags.join(", "),
      "开始时间": format(parseISO(e.startTime), "yyyy-MM-dd HH:mm"),
      "状态": e.isPast ? "已结束" : "即将开始",
      "场地": e.locationType === "online" ? "线上" : e.locationType === "offline" ? "线下" : "线上+线下",
      "国家/城市": e.city ?? "",
      "场馆": e.venue ?? "",
      "链接": e.onlineLink ?? "",
      "一句话总结": e.tldr ?? "",
      "关键发布/突破": e.keyBreakthroughs ?? "",
      "分析研判": e.industryImpact ?? "",
      "行动启示": e.actionableInsight ?? "",
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "事件数据");
    XLSX.writeFile(wb, `foresight_events_${format(new Date(), "yyyyMMdd_HHmm")}.xlsx`);
  }, [filteredEvents, selectedIds]);

  /* ---------- Excel import ---------- */
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportExcel = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet) as any[];

        const imported: MarketEvent[] = json.map((row: any) => ({
          id: "",
          title: String(row["事件名称"] ?? ""),
          domainTags: String(row["标签"] ?? "")
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t.length > 0),
          startTime: String(row["开始时间"] ?? "").includes("T")
            ? String(row["开始时间"])
            : `${String(row["开始时间"] ?? "")}:00+08:00`,
          isPast: String(row["状态"] ?? "") === "已结束",
          locationType:
            String(row["场地"] ?? "") === "线上"
              ? "online"
              : String(row["场地"] ?? "") === "线下"
              ? "offline"
              : "both",
          city: String(row["国家/城市"] ?? "") || undefined,
          venue: String(row["场馆"] ?? "") || undefined,
          onlineLink: String(row["链接"] ?? "") || undefined,
          tldr: String(row["一句话总结"] ?? "") || undefined,
          keyBreakthroughs: String(row["关键发布/突破"] ?? "") || undefined,
          industryImpact: String(row["分析研判"] ?? "") || undefined,
          actionableInsight: String(row["行动启示"] ?? "") || undefined,
        }));

        importEvents(imported);
        alert(`已加载 ${imported.length} 条事件。与现有事件名称一致的已替换，不一致的已新增，原有数据已保留。`);
      } catch (err) {
        alert("导入失败，请检查 Excel 格式是否正确");
        console.error(err);
      }
    };
    reader.readAsArrayBuffer(file);
  }, [importEvents]);

  /* ---------- column definitions ---------- */
  const columnsMeta = [
    { key: "title", label: "事件名称", width: 260 },
    { key: "domainTags", label: "标签", width: 160 },
    { key: "startTime", label: "开始时间", width: 150 },
    { key: "isPast", label: "状态", width: 90 },
    { key: "locationType", label: "场地", width: 100 },
    { key: "city", label: "国家/城市", width: 110 },
    { key: "venue", label: "场馆", width: 110 },
    { key: "onlineLink", label: "链接", width: 140 },
    { key: "tldr", label: "一句话总结", width: 180 },
    { key: "keyBreakthroughs", label: "关键发布/突破", width: 180 },
    { key: "industryImpact", label: "分析研判", width: 180 },
    { key: "actionableInsight", label: "行动启示", width: 180 },
    { key: "aiCheck", label: "AI 检查", width: 140 },
    { key: "aiSuggestion", label: "AI 建议", width: 120 },
  ];

  /* ---------- render cell content ---------- */
  const renderCell = (event: MarketEvent, colKey: string) => {
    if (bulkEdit) {
      switch (colKey) {
        case "title":
          return (
            <textarea
              defaultValue={event.title}
              onBlur={(e) => {
                if (e.target.value !== event.title) autoSave({ ...event, title: e.target.value });
              }}
              rows={2}
              className="w-full px-2 py-1.5 rounded-md border border-zinc-200 text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 resize-none bg-white"
            />
          );
        case "domainTags":
          return (
            <TagEditor
              tags={event.domainTags}
              onChange={(tags) => autoSave({ ...event, domainTags: tags })}
            />
          );
        case "startTime":
          return (
            <input
              type="datetime-local"
              defaultValue={toDatetimeLocalValue(event.startTime)}
              onBlur={(e) => {
                const newTime = fromDatetimeLocalValue(e.target.value);
                if (newTime !== event.startTime) autoSave({ ...event, startTime: newTime });
              }}
              className="w-40 px-2 py-1.5 rounded-md border border-zinc-200 text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 bg-white"
            />
          );
        case "isPast":
          return (
            <select
              defaultValue={String(event.isPast)}
              onChange={(e) => autoSave({ ...event, isPast: e.target.value === "true" })}
              className="px-2 py-1.5 rounded-md border border-zinc-200 text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 bg-white"
            >
              <option value="false">即将开始</option>
              <option value="true">已结束</option>
            </select>
          );
        case "locationType":
          return (
            <select
              defaultValue={event.locationType}
              onChange={(e) => autoSave({ ...event, locationType: e.target.value as any })}
              className="px-2 py-1.5 rounded-md border border-zinc-200 text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 bg-white"
            >
              <option value="online">线上</option>
              <option value="offline">线下</option>
              <option value="both">线上+线下</option>
            </select>
          );
        case "city":
          return (
            <input
              type="text"
              defaultValue={event.city ?? ""}
              onBlur={(e) => autoSave({ ...event, city: e.target.value })}
              placeholder="国家/城市"
              className="w-full px-2 py-1.5 rounded-md border border-zinc-200 text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 bg-white"
            />
          );
        case "venue":
          return (
            <input
              type="text"
              defaultValue={event.venue ?? ""}
              onBlur={(e) => autoSave({ ...event, venue: e.target.value })}
              placeholder="场馆"
              className="w-full px-2 py-1.5 rounded-md border border-zinc-200 text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 bg-white"
            />
          );
        case "onlineLink":
          return (
            <input
              type="text"
              defaultValue={event.onlineLink ?? ""}
              onBlur={(e) => autoSave({ ...event, onlineLink: e.target.value })}
              placeholder="https://..."
              className="w-full px-2 py-1.5 rounded-md border border-zinc-200 text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 bg-white"
            />
          );
        case "tldr":
          return (
            <textarea
              defaultValue={event.tldr ?? ""}
              onBlur={(e) => autoSave({ ...event, tldr: e.target.value })}
              rows={2}
              placeholder="一句话总结"
              className="w-full px-2 py-1.5 rounded-md border border-zinc-200 text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 resize-none bg-white"
            />
          );
        case "keyBreakthroughs":
          return (
            <textarea
              defaultValue={event.keyBreakthroughs ?? ""}
              onBlur={(e) => autoSave({ ...event, keyBreakthroughs: e.target.value })}
              rows={2}
              placeholder="关键发布/突破"
              className="w-full px-2 py-1.5 rounded-md border border-zinc-200 text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 resize-none bg-white"
            />
          );
        case "industryImpact":
          return (
            <textarea
              defaultValue={event.industryImpact ?? ""}
              onBlur={(e) => autoSave({ ...event, industryImpact: e.target.value })}
              rows={2}
              placeholder="分析研判"
              className="w-full px-2 py-1.5 rounded-md border border-zinc-200 text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 resize-none bg-white"
            />
          );
        case "actionableInsight":
          return (
            <textarea
              defaultValue={event.actionableInsight ?? ""}
              onBlur={(e) => autoSave({ ...event, actionableInsight: e.target.value })}
              rows={2}
              placeholder="行动启示"
              className="w-full px-2 py-1.5 rounded-md border border-zinc-200 text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 resize-none bg-white"
            />
          );
        case "aiCheck":
          return (
            <div className="space-y-1">
              <AICheckBadge
                status={event.aiCheckStatus}
                onVerify={() => {
                  updateEvents([{
                    ...event,
                    aiCheckStatus: "verified",
                    aiCheckNote: (event.aiCheckNote ? event.aiCheckNote + " " : "") + "[人工确认]",
                  }]);
                }}
              />
              {event.aiReferenceLinks && event.aiReferenceLinks.length > 0 && (
                <div className="flex flex-col gap-0.5">
                  {event.aiReferenceLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-0.5 text-[10px] text-sky-600 hover:underline"
                    >
                      <ExternalLink className="w-2.5 h-2.5" />
                      参考{i + 1}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        case "aiSuggestion":
          return (
            <AISuggestionBadge
              suggestion={event.aiSuggestion}
              reason={event.aiSuggestionReason}
            />
          );
        default:
          return null;
      }
    }

    // view mode
    switch (colKey) {
      case "title":
        return (
          <div className="min-w-[200px] max-w-xs">
            <div className="text-sm font-medium text-zinc-900 break-words">{event.title}</div>
            <div className="flex flex-wrap gap-1 mt-1">
              {event.domainTags.map((tag) => (
                <span key={tag} className={cn("text-[10px] px-1.5 py-0.5 rounded font-medium", tagColorClass(tag))}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        );
      case "domainTags":
        return (
          <div className="flex flex-wrap gap-1">
            {event.domainTags.map((tag) => (
              <span key={tag} className={cn("text-[10px] px-1.5 py-0.5 rounded font-medium", tagColorClass(tag))}>
                {tag}
              </span>
            ))}
          </div>
        );
      case "startTime":
        return (
          <span className="text-sm text-zinc-700 whitespace-nowrap">
            {format(parseISO(event.startTime), "yyyy-MM-dd HH:mm", { locale: zhCN })}
          </span>
        );
      case "isPast":
        return event.isPast ? (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-600">已结束</span>
        ) : (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-600">即将开始</span>
        );
      case "locationType": {
        const labels: Record<string, string> = { online: "线上", offline: "线下", both: "线上+线下" };
        const colors: Record<string, string> = {
          online: "bg-sky-50 text-sky-600",
          offline: "bg-emerald-50 text-emerald-600",
          both: "bg-violet-50 text-violet-600",
        };
        return (
          <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium", colors[event.locationType])}>
            {labels[event.locationType]}
          </span>
        );
      }
      case "city":
        return <span className="text-sm text-zinc-600">{event.city ?? "—"}</span>;
      case "venue":
        return <span className="text-sm text-zinc-600">{event.venue ?? "—"}</span>;
      case "onlineLink":
        return event.onlineLink ? (
          <a href={event.onlineLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-sky-600 hover:underline">
            <ExternalLink className="w-3 h-3" />
            打开链接
          </a>
        ) : (
          <span className="text-xs text-zinc-400">—</span>
        );
      case "tldr":
        return <p className="text-xs text-zinc-500 break-words">{ellipsis(event.tldr, 40)}</p>;
      case "keyBreakthroughs":
        return <p className="text-xs text-zinc-500 break-words">{ellipsis(event.keyBreakthroughs, 40)}</p>;
      case "industryImpact":
        return <p className="text-xs text-zinc-500 break-words">{ellipsis(event.industryImpact, 40)}</p>;
      case "actionableInsight":
        return <p className="text-xs text-zinc-500 break-words">{ellipsis(event.actionableInsight, 40)}</p>;
      case "aiCheck":
        return (
          <div className="space-y-1">
            <AICheckBadge
              status={event.aiCheckStatus}
              onVerify={() => {
                updateEvents([{
                  ...event,
                  aiCheckStatus: "verified",
                  aiCheckNote: (event.aiCheckNote ? event.aiCheckNote + " " : "") + "[人工确认]",
                }]);
              }}
            />
            {event.aiReferenceLinks && event.aiReferenceLinks.length > 0 && (
              <div className="flex flex-col gap-0.5">
                {event.aiReferenceLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-[10px] text-sky-600 hover:underline"
                  >
                    <ExternalLink className="w-2.5 h-2.5" />
                    参考{i + 1}
                  </a>
                ))}
              </div>
            )}
            {event.aiCheckNote && <p className="text-[10px] text-zinc-400">{ellipsis(event.aiCheckNote, 30)}</p>}
          </div>
        );
      case "aiSuggestion":
        return (
          <AISuggestionBadge
            suggestion={event.aiSuggestion}
            reason={event.aiSuggestionReason}
          />
        );
      default:
        return null;
    }
  };

  const selectedCount = selectedIds.size;
  const isAiChecking = aiCheckingIds.size > 0;

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-zinc-100 px-4 md:px-8 py-4 sticky top-0 z-20">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              返回前台
            </Link>
            <div className="w-px h-6 bg-zinc-200 hidden sm:block" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center">
                <Telescope className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold tracking-tight leading-none">后台管理</h1>
                <p className="text-[10px] text-zinc-400 mt-0.5">事件数据管理</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Undo / Redo */}
            <div className="flex items-center bg-zinc-100 rounded-lg p-0.5 mr-2">
              <button
                onClick={undo}
                disabled={!canUndo}
                className={cn("p-1.5 rounded-md transition-colors", canUndo ? "hover:bg-white text-zinc-700" : "text-zinc-400 cursor-not-allowed")}
                title="撤销 (Ctrl+Z)"
              >
                <Undo2 className="w-4 h-4" />
              </button>
              <button
                onClick={redo}
                disabled={!canRedo}
                className={cn("p-1.5 rounded-md transition-colors", canRedo ? "hover:bg-white text-zinc-700" : "text-zinc-400 cursor-not-allowed")}
                title="重做 (Ctrl+Y)"
              >
                <Redo2 className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              新增事件
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 md:px-8 py-6">
        {/* Stats + Controls */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="bg-white border border-zinc-200 rounded-xl px-4 py-3">
              <div className="text-2xl font-bold text-zinc-900">{events.length}</div>
              <div className="text-xs text-zinc-400 mt-0.5">总事件数</div>
            </div>
            <div className="bg-white border border-zinc-200 rounded-xl px-4 py-3">
              <div className="text-2xl font-bold text-blue-600">{events.filter((e) => !e.isPast).length}</div>
              <div className="text-xs text-zinc-400 mt-0.5">即将开始</div>
            </div>
            <div className="bg-white border border-zinc-200 rounded-xl px-4 py-3">
              <div className="text-2xl font-bold text-gray-600">{events.filter((e) => e.isPast).length}</div>
              <div className="text-xs text-zinc-400 mt-0.5">已结束</div>
            </div>
            {selectedCount > 0 && (
              <div className="bg-sky-50 border border-sky-200 rounded-xl px-4 py-3">
                <div className="text-2xl font-bold text-sky-700">{selectedCount}</div>
                <div className="text-xs text-sky-500 mt-0.5">已选中</div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Bulk Edit Toggle */}
            <div className="flex items-center bg-zinc-100 rounded-lg p-0.5">
              <button
                onClick={() => setBulkEdit(false)}
                className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all", !bulkEdit ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700")}
              >
                <Table2 className="w-3.5 h-3.5" /> 表格浏览
              </button>
              <button
                onClick={() => setBulkEdit(true)}
                className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all", bulkEdit ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700")}
              >
                <Edit3 className="w-3.5 h-3.5" /> 批量编辑
              </button>
            </div>

            {bulkEdit && (
              <button
                onClick={handleCancelBulkEdit}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 text-zinc-700 text-xs font-medium hover:bg-zinc-50 transition-colors"
              >
                <X className="w-3.5 h-3.5" /> 退出
              </button>
            )}

            <button
              onClick={() => setShowFilters((v) => !v)}
              className={cn("flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors border", showFilters ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50")}
            >
              <Filter className="w-3.5 h-3.5" /> 列筛选
            </button>

            {/* Excel Export */}
            <button
              onClick={handleExportExcel}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              导出 Excel
            </button>

            {/* Excel Import */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 text-zinc-700 text-xs font-medium hover:bg-zinc-50 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              加载 Excel
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImportExcel(file);
                e.target.value = "";
              }}
            />

            {/* AI Suggestion Prompt */}
            <button
              onClick={() => setShowSuggestionEditor(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 text-zinc-700 text-xs font-medium hover:bg-zinc-50 transition-colors"
            >
              <StickyNote className="w-3.5 h-3.5" />
              建议规则
            </button>

            {/* Trash */}
            <button
              onClick={() => setShowTrash(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 text-zinc-700 text-xs font-medium hover:bg-zinc-50 transition-colors"
            >
              <Archive className="w-3.5 h-3.5" />
              回收站
              {deletedEvents.length > 0 && (
                <span className="text-[10px] px-1 py-0.5 rounded-full bg-zinc-100 text-zinc-600 font-bold">{deletedEvents.length}</span>
              )}
            </button>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="全局搜索…"
                className="w-full sm:w-48 pl-9 pr-4 py-2.5 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all bg-white"
              />
            </div>
          </div>
        </div>

        {/* Auto-save toast */}
        {saveToast && (
          <div className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-lg bg-zinc-900 text-white text-sm font-medium shadow-lg animate-in fade-in slide-in-from-bottom-2">
            {saveToast}
          </div>
        )}

        {/* Bulk Actions Bar */}
        {selectedCount > 0 && (
          <div className="flex items-center gap-3 mb-4 p-3 bg-sky-50 border border-sky-200 rounded-xl">
            <span className="text-sm font-medium text-sky-800">
              已选中 {selectedCount} 条事件
            </span>
            <div className="flex-1" />
            <button
              onClick={handleBulkAICheck}
              disabled={isAiChecking}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-violet-600 text-white text-xs font-medium hover:bg-violet-700 transition-colors disabled:opacity-50"
            >
              {isAiChecking ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Bot className="w-3.5 h-3.5" />}
              批量 AI 检查
            </button>
            <button
              onClick={handleBulkSuggestion}
              disabled={suggestionRunningIds.size > 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-500 text-white text-xs font-medium hover:bg-orange-600 transition-colors disabled:opacity-50"
            >
              {suggestionRunningIds.size > 0 ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              批量 AI 建议
            </button>
            {Object.keys(pendingSuggestions).length > 0 && (
              <button
                onClick={handleApplySuggestions}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 transition-colors animate-in fade-in"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                应用建议
              </button>
            )}
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-medium hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              移入回收站
            </button>
          </div>
        )}

        {/* Table */}
        <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50/50">
                  {/* Checkbox header - frozen */}
                  <th className="px-3 py-3 w-10 sticky left-0 z-20 bg-zinc-50/95 backdrop-blur-sm">
                    <button
                      onClick={toggleSelectAll}
                      className="p-1 rounded hover:bg-zinc-200 transition-colors"
                    >
                      {allSelected ? (
                        <CheckSquare className="w-4 h-4 text-zinc-900" />
                      ) : someSelected ? (
                        <div className="w-4 h-4 rounded bg-zinc-900 flex items-center justify-center">
                          <div className="w-2 h-0.5 bg-white" />
                        </div>
                      ) : (
                        <Square className="w-4 h-4 text-zinc-400" />
                      )}
                    </button>
                  </th>
                  {columnsMeta.map((col, idx) => (
                    <th
                      key={col.key}
                      className={cn(
                        "px-3 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap align-top",
                        idx === 0 && "sticky left-[40px] z-20 bg-zinc-50/95 backdrop-blur-sm"
                      )}
                      style={{ minWidth: col.width }}
                    >
                      <div className="space-y-1.5">
                        <div
                          className="flex items-center gap-1 select-none cursor-pointer hover:text-zinc-700"
                          onClick={() => toggleSort(col.key)}
                        >
                          {col.label}
                          <SortIcon colKey={col.key} />
                        </div>
                        {showFilters && (
                          <input
                            type="text"
                            value={colFilters[col.key] ?? ""}
                            onChange={(e) => {
                              const val = e.target.value;
                              setColFilters((prev) => {
                                const next = { ...prev };
                                if (val) next[col.key] = val;
                                else delete next[col.key];
                                return next;
                              });
                            }}
                            placeholder="筛选…"
                            className="w-full px-2 py-1 rounded border border-zinc-200 text-[10px] focus:outline-none focus:border-zinc-400 bg-white"
                          />
                        )}
                      </div>
                    </th>
                  ))}
                  <th className="px-3 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap">删除</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.length === 0 ? (
                  <tr>
                    <td colSpan={columnsMeta.length + 3} className="px-4 py-16 text-center text-sm text-zinc-400">
                      没有找到匹配的事件
                    </td>
                  </tr>
                ) : (
                  filteredEvents.map((event) => {
                    const isSelected = selectedIds.has(event.id);

                    return (
                      <tr
                        key={event.id}
                        className={cn(
                          "border-b border-zinc-50 transition-colors",
                          isSelected ? "bg-sky-50/40" : "hover:bg-zinc-50/60"
                        )}
                      >
                        {/* Checkbox - frozen */}
                        <td className={cn(
                          "px-3 py-3 align-top sticky left-0 z-10 backdrop-blur-sm",
                          isSelected ? "bg-sky-50/95" : "bg-white/95"
                        )}>
                          <button
                            onClick={() => toggleSelect(event.id)}
                            className="p-1 rounded hover:bg-zinc-200 transition-colors"
                          >
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-sky-600" />
                            ) : (
                              <Square className="w-4 h-4 text-zinc-400" />
                            )}
                          </button>
                        </td>

                        {/* Data cells */}
                        {columnsMeta.map((col, idx) => (
                          <td
                            key={col.key}
                            className={cn(
                              "px-3 py-3 align-top",
                              idx === 0 && cn(
                                "sticky left-[40px] z-10 backdrop-blur-sm",
                                isSelected ? "bg-sky-50/95" : "bg-white/95"
                              )
                            )}
                          >
                            {renderCell(event, col.key)}
                          </td>
                        ))}

                        {/* Delete */}
                        <td className="px-3 py-3 align-top">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(event.id)}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-zinc-500 hover:text-red-600 transition-colors"
                              title="删除"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-zinc-100 flex items-center justify-between">
            <div className="text-xs text-zinc-400">
              显示 {filteredEvents.length} 条，共 {events.length} 条
              {bulkEdit && <span className="ml-2 text-amber-600 font-medium">· 批量编辑模式：修改后自动保存，支持 Ctrl+Z 撤销</span>}
            </div>
          </div>
        </div>

        {/* API Key Manager */}
        <div className="mt-8">
          <button
            onClick={() => setShowApiKeyManager((v) => !v)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border",
              showApiKeyManager
                ? "bg-zinc-900 text-white border-zinc-900"
                : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50"
            )}
          >
            <Settings className="w-4 h-4" />
            API Key 管理
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-zinc-100 text-zinc-500">{apiKeys.length}</span>
          </button>

          {showApiKeyManager && (
            <div className="mt-4 bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm p-6 space-y-6">
              {/* Add Form */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-zinc-900">添加 API Key</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-700">API 名称</label>
                    <input
                      type="text"
                      value={apiKeyForm.name}
                      onChange={(e) => setApiKeyForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="例如：KimiCode 生产环境"
                      className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-700">协议类型</label>
                    <select
                      value={apiKeyForm.protocol}
                      onChange={(e) => setApiKeyForm((p) => ({ ...p, protocol: e.target.value as "openai" | "anthropic" }))}
                      className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 bg-white"
                    >
                      <option value="openai">OpenAI 兼容</option>
                      <option value="anthropic">Anthropic 兼容</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-700">Base URL</label>
                    <input
                      type="text"
                      value={apiKeyForm.baseUrl}
                      onChange={(e) => setApiKeyForm((p) => ({ ...p, baseUrl: e.target.value }))}
                      placeholder="https://api.kimi.com/coding/v1"
                      className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-700">模型名称</label>
                    <input
                      type="text"
                      value={apiKeyForm.model}
                      onChange={(e) => setApiKeyForm((p) => ({ ...p, model: e.target.value }))}
                      placeholder="如 kimi-coding / gpt-4 / claude-3-sonnet"
                      className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-700">API Key</label>
                    <div className="relative">
                      <input
                        type="password"
                        value={apiKeyForm.apiKey}
                        onChange={(e) => setApiKeyForm((p) => ({ ...p, apiKey: e.target.value }))}
                        placeholder="sk-..."
                        className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 bg-white pr-10"
                      />
                      <EyeOff className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (!apiKeyForm.name.trim() || !apiKeyForm.apiKey.trim()) {
                        alert("请填写 API 名称和 API Key");
                        return;
                      }
                      addApiKey({
                        name: apiKeyForm.name.trim(),
                        baseUrl: apiKeyForm.baseUrl.trim(),
                        protocol: apiKeyForm.protocol,
                        model: apiKeyForm.model.trim() || undefined,
                        apiKey: apiKeyForm.apiKey.trim(),
                      });
                      setApiKeyForm({ name: "", baseUrl: "https://api.kimi.com/coding/v1", protocol: "openai", model: "", apiKey: "" });
                    }}
                    className="px-4 py-2 rounded-lg bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 inline mr-1" />
                    添加
                  </button>
                  <p className="text-[11px] text-zinc-400">API Key 添加后仅支持删除，不可查看，防止泄露</p>
                </div>
              </div>

              {/* List */}
              {apiKeys.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-zinc-900">已配置的 API Key</h3>
                  <div className="border border-zinc-100 rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-zinc-50/50">
                        <tr className="border-b border-zinc-100">
                          <th className="px-4 py-2.5 text-xs font-semibold text-zinc-500">名称</th>
                          <th className="px-4 py-2.5 text-xs font-semibold text-zinc-500">协议</th>
                          <th className="px-4 py-2.5 text-xs font-semibold text-zinc-500">Base URL</th>
                          <th className="px-4 py-2.5 text-xs font-semibold text-zinc-500">模型</th>
                          <th className="px-4 py-2.5 text-xs font-semibold text-zinc-500">API Key</th>
                          <th className="px-4 py-2.5 text-xs font-semibold text-zinc-500 w-20">操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        {apiKeys.map((key) => (
                          <tr key={key.id} className="border-b border-zinc-50 hover:bg-zinc-50/60">
                            <td className="px-4 py-2.5 text-sm font-medium text-zinc-900">{key.name}</td>
                            <td className="px-4 py-2.5">
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 font-medium">
                                {key.protocol === "openai" ? "OpenAI" : "Anthropic"}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 text-xs text-zinc-600 font-mono">{key.baseUrl}</td>
                            <td className="px-4 py-2.5 text-xs text-zinc-600">{key.model || <span className="text-zinc-400">—</span>}</td>
                            <td className="px-4 py-2.5">
                              <div className="flex items-center gap-1.5">
                                <Key className="w-3.5 h-3.5 text-zinc-400" />
                                <span className="text-xs text-zinc-400">••••••••</span>
                              </div>
                            </td>
                            <td className="px-4 py-2.5">
                              <button
                                onClick={() => {
                                  if (confirm(`确定要删除「${key.name}」吗？`)) deleteApiKey(key.id);
                                }}
                                className="p-1.5 rounded-lg hover:bg-red-50 text-zinc-500 hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Trash Modal */}
      {showTrash && (
        <div className="fixed inset-0 z-40 bg-black/30 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[80vh] flex flex-col">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Archive className="w-5 h-5 text-zinc-600" />
                <h2 className="text-base font-bold">回收站</h2>
                <span className="text-xs text-zinc-400">{deletedEvents.length} 条</span>
              </div>
              <button
                onClick={() => setShowTrash(false)}
                className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {deletedEvents.length === 0 ? (
                <div className="text-center py-16 text-sm text-zinc-400">
                  <Archive className="w-10 h-10 mx-auto mb-3 text-zinc-300" />
                  <p>回收站为空</p>
                  <p className="text-xs mt-1">删除的事件会出现在这里</p>
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-zinc-100">
                      <th className="px-3 py-2 text-xs font-semibold text-zinc-500">事件名称</th>
                      <th className="px-3 py-2 text-xs font-semibold text-zinc-500">标签</th>
                      <th className="px-3 py-2 text-xs font-semibold text-zinc-500">时间</th>
                      <th className="px-3 py-2 text-xs font-semibold text-zinc-500 w-32">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deletedEvents.map((event) => (
                      <tr key={event.id} className="border-b border-zinc-50 hover:bg-zinc-50/60">
                        <td className="px-3 py-2.5 text-sm text-zinc-900">{event.title}</td>
                        <td className="px-3 py-2.5">
                          <div className="flex flex-wrap gap-1">
                            {event.domainTags.map((tag) => (
                              <span key={tag} className={cn("text-[10px] px-1.5 py-0.5 rounded font-medium", tagColorClass(tag))}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-3 py-2.5 text-xs text-zinc-500 whitespace-nowrap">
                          {format(parseISO(event.startTime), "yyyy-MM-dd HH:mm", { locale: zhCN })}
                        </td>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleTrashRestore([event.id])}
                              className="flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-medium hover:bg-emerald-100 transition-colors"
                            >
                              <RotateCcw className="w-3 h-3" />
                              恢复
                            </button>
                            <button
                              onClick={() => handleTrashPermanentDelete([event.id])}
                              className="flex items-center gap-1 px-2 py-1 rounded-md bg-red-50 text-red-700 text-[10px] font-medium hover:bg-red-100 transition-colors"
                            >
                              <Trash className="w-3 h-3" />
                              彻底删除
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            {deletedEvents.length > 0 && (
              <div className="px-6 py-3 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-xs text-zinc-400">共 {deletedEvents.length} 条</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTrashRestore(deletedEvents.map((e) => e.id))}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 transition-colors"
                  >
                    全部恢复
                  </button>
                  <button
                    onClick={() => handleTrashPermanentDelete(deletedEvents.map((e) => e.id))}
                    className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-medium hover:bg-red-700 transition-colors"
                  >
                    清空回收站
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Suggestion Prompt Editor Modal */}
      {showSuggestionEditor && (
        <div className="fixed inset-0 z-40 bg-black/30 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-500" />
                <h2 className="text-base font-bold">AI 建议规则</h2>
              </div>
              <button
                onClick={() => setShowSuggestionEditor(false)}
                className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                <p className="text-sm text-amber-800">
                  系统会将每条事件的信息填充到下方提示词中，发送给 AI 模型进行保留/删除判断。
                  你可以调整规则，让 AI 更贴合你的关注偏好。
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-700 mb-1.5 block">提示词模板</label>
                <textarea
                  value={suggestionConfig.prompt}
                  onChange={(e) => updateSuggestionPrompt(e.target.value)}
                  rows={18}
                  className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 text-sm font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 bg-white resize-none"
                />
              </div>
              <div className="text-xs text-zinc-400 space-y-1">
                <p className="font-medium text-zinc-600">可用变量（会被自动替换为事件信息）：</p>
                <div className="flex flex-wrap gap-2">
                  {["{title}", "{tags}", "{startTime}", "{tldr}", "{city}", "{locationType}"].map((v) => (
                    <code key={v} className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700 text-[10px]">{v}</code>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-zinc-100 flex items-center justify-between">
              <button
                onClick={() => {
                  if (confirm("确定恢复为默认提示词吗？当前自定义内容将丢失。")) {
                    updateSuggestionPrompt(DEFAULT_SUGGESTION_PROMPT);
                  }
                }}
                className="px-4 py-2 rounded-lg border border-zinc-200 text-zinc-700 text-xs font-medium hover:bg-zinc-50 transition-colors"
              >
                恢复默认
              </button>
              <button
                onClick={() => setShowSuggestionEditor(false)}
                className="px-4 py-2 rounded-lg bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition-colors"
              >
                完成
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Event Form Sheet */}
      <EventFormSheet event={formEvent} open={formOpen} onOpenChange={setFormOpen} />
    </div>
  );
}
