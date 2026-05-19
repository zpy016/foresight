"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { MarketEvent, ApiKeyConfig, AISuggestionConfig, DEFAULT_SUGGESTION_PROMPT } from "@/app/types/event";
import { events as initialEvents } from "@/app/data/events";

interface DataContextValue {
  events: MarketEvent[];
  addEvent: (event: Omit<MarketEvent, "id">) => void;
  updateEvent: (event: MarketEvent) => void;
  updateEvents: (events: MarketEvent[]) => void;
  deleteEvent: (id: string) => void;
  deleteEvents: (ids: string[]) => void;
  importEvents: (imported: MarketEvent[]) => void;

  // Undo / Redo
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;

  // Trash / Recycle bin
  deletedEvents: MarketEvent[];
  moveToTrash: (ids: string[]) => void;
  restoreFromTrash: (ids: string[]) => void;
  permanentlyDeleteFromTrash: (ids: string[]) => void;

  // AI Suggestion
  suggestionConfig: AISuggestionConfig;
  updateSuggestionPrompt: (prompt: string) => void;

  // API Key 管理
  apiKeys: ApiKeyConfig[];
  addApiKey: (config: Omit<ApiKeyConfig, "id" | "createdAt">) => void;
  deleteApiKey: (id: string) => void;
}

const DataContext = createContext<DataContextValue | null>(null);

function generateId(): string {
  return `e-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function generateApiKeyId(): string {
  return `ak-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

/* ---------- localStorage helpers ---------- */
const EVENTS_STORAGE_KEY = "foresight_events";
const DELETED_STORAGE_KEY = "foresight_deleted_events";
const SUGGESTION_STORAGE_KEY = "foresight_suggestion_config";
const APIKEYS_STORAGE_KEY = "foresight_api_keys";

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return fallback;
}

function saveToStorage(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch { /* ignore */ }
}

/* ---------- Undo/Redo history ---------- */
const MAX_HISTORY = 50;

export function DataProvider({ children }: { children: React.ReactNode }) {
  // Load persisted events on init, fallback to initialEvents
  const persistedEvents = typeof window !== "undefined" ? loadFromStorage<MarketEvent[] | null>(EVENTS_STORAGE_KEY, null) : null;
  const initialData = persistedEvents ?? initialEvents;

  const [events, setEvents] = useState<MarketEvent[]>(initialData);
  const [deletedEvents, setDeletedEvents] = useState<MarketEvent[]>(
    () => loadFromStorage<MarketEvent[]>(DELETED_STORAGE_KEY, [])
  );
  const [suggestionConfig, setSuggestionConfig] = useState<AISuggestionConfig>(
    () => loadFromStorage<AISuggestionConfig>(SUGGESTION_STORAGE_KEY, { prompt: DEFAULT_SUGGESTION_PROMPT })
  );
  const [apiKeys, setApiKeys] = useState<ApiKeyConfig[]>(
    () => loadFromStorage<ApiKeyConfig[]>(APIKEYS_STORAGE_KEY, [])
  );

  // History for undo/redo — only tracks events, not deletedEvents or config
  const historyRef = useRef<MarketEvent[][]>([initialData]);
  const indexRef = useRef(0);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const syncHistoryState = useCallback(() => {
    setCanUndo(indexRef.current > 0);
    setCanRedo(indexRef.current < historyRef.current.length - 1);
  }, []);

  const pushHistory = useCallback((newEvents: MarketEvent[]) => {
    historyRef.current = historyRef.current.slice(0, indexRef.current + 1);
    historyRef.current.push(newEvents);
    if (historyRef.current.length > MAX_HISTORY) {
      historyRef.current = historyRef.current.slice(historyRef.current.length - MAX_HISTORY);
    }
    indexRef.current = historyRef.current.length - 1;
    syncHistoryState();
    saveToStorage(EVENTS_STORAGE_KEY, newEvents);
  }, [syncHistoryState]);

  const undo = useCallback(() => {
    if (indexRef.current > 0) {
      indexRef.current--;
      const restored = historyRef.current[indexRef.current];
      setEvents(restored);
      saveToStorage(EVENTS_STORAGE_KEY, restored);
      syncHistoryState();
    }
  }, [syncHistoryState]);

  const redo = useCallback(() => {
    if (indexRef.current < historyRef.current.length - 1) {
      indexRef.current++;
      const restored = historyRef.current[indexRef.current];
      setEvents(restored);
      saveToStorage(EVENTS_STORAGE_KEY, restored);
      syncHistoryState();
    }
  }, [syncHistoryState]);

  /* ---------- Persist side effects ---------- */
  useEffect(() => {
    saveToStorage(DELETED_STORAGE_KEY, deletedEvents);
  }, [deletedEvents]);

  useEffect(() => {
    saveToStorage(SUGGESTION_STORAGE_KEY, suggestionConfig);
  }, [suggestionConfig]);

  useEffect(() => {
    saveToStorage(APIKEYS_STORAGE_KEY, apiKeys);
  }, [apiKeys]);

  /* ---------- Event CRUD ---------- */
  const addEvent = useCallback((event: Omit<MarketEvent, "id">) => {
    const newEvent: MarketEvent = { ...event, id: generateId() };
    setEvents((prev) => {
      const next = [...prev, newEvent];
      pushHistory(next);
      return next;
    });
  }, [pushHistory]);

  const updateEvent = useCallback((event: MarketEvent) => {
    setEvents((prev) => {
      const next = prev.map((ev) => (ev.id === event.id ? event : ev));
      pushHistory(next);
      return next;
    });
  }, [pushHistory]);

  const updateEvents = useCallback((updated: MarketEvent[]) => {
    setEvents((prev) => {
      const map = new Map(prev.map((e) => [e.id, e]));
      updated.forEach((u) => map.set(u.id, u));
      const next = Array.from(map.values());
      pushHistory(next);
      return next;
    });
  }, [pushHistory]);

  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => {
      const next = prev.filter((ev) => ev.id !== id);
      pushHistory(next);
      return next;
    });
  }, [pushHistory]);

  const deleteEvents = useCallback((ids: string[]) => {
    const idSet = new Set(ids);
    setEvents((prev) => {
      const next = prev.filter((ev) => !idSet.has(ev.id));
      pushHistory(next);
      return next;
    });
  }, [pushHistory]);

  const importEvents = useCallback((imported: MarketEvent[]) => {
    setEvents((prev) => {
      const map = new Map(prev.map((e) => [e.title, e]));
      imported.forEach((item) => {
        const existing = map.get(item.title);
        if (existing) {
          map.set(item.title, { ...item, id: existing.id });
        } else {
          map.set(item.title, { ...item, id: generateId() });
        }
      });
      const next = Array.from(map.values());
      pushHistory(next);
      return next;
    });
  }, [pushHistory]);

  /* ---------- Trash operations ---------- */
  const moveToTrash = useCallback((ids: string[]) => {
    const idSet = new Set(ids);
    setEvents((prev) => {
      const toTrash = prev.filter((ev) => idSet.has(ev.id));
      const next = prev.filter((ev) => !idSet.has(ev.id));
      setDeletedEvents((trash) => [...trash, ...toTrash]);
      pushHistory(next);
      return next;
    });
  }, [pushHistory]);

  const restoreFromTrash = useCallback((ids: string[]) => {
    const idSet = new Set(ids);
    setDeletedEvents((prev) => {
      const toRestore = prev.filter((ev) => idSet.has(ev.id));
      const nextTrash = prev.filter((ev) => !idSet.has(ev.id));
      setEvents((evs) => {
        // Avoid duplicates: skip if already exists in events
        const existingIds = new Set(evs.map((e) => e.id));
        const uniqueRestored = toRestore.filter((e) => !existingIds.has(e.id));
        const next = [...evs, ...uniqueRestored];
        pushHistory(next);
        return next;
      });
      return nextTrash;
    });
  }, [pushHistory]);

  const permanentlyDeleteFromTrash = useCallback((ids: string[]) => {
    const idSet = new Set(ids);
    setDeletedEvents((prev) => prev.filter((ev) => !idSet.has(ev.id)));
  }, []);

  /* ---------- Suggestion config ---------- */
  const updateSuggestionPrompt = useCallback((prompt: string) => {
    setSuggestionConfig((prev) => ({ ...prev, prompt }));
  }, []);

  /* ---------- API Key management ---------- */
  const addApiKey = useCallback((config: Omit<ApiKeyConfig, "id" | "createdAt">) => {
    const newKey: ApiKeyConfig = {
      ...config,
      id: generateApiKeyId(),
      createdAt: new Date().toISOString(),
    };
    setApiKeys((prev) => [...prev, newKey]);
  }, []);

  const deleteApiKey = useCallback((id: string) => {
    setApiKeys((prev) => prev.filter((k) => k.id !== id));
  }, []);

  return (
    <DataContext.Provider
      value={{
        events,
        addEvent,
        updateEvent,
        updateEvents,
        deleteEvent,
        deleteEvents,
        importEvents,
        canUndo,
        canRedo,
        undo,
        redo,
        deletedEvents,
        moveToTrash,
        restoreFromTrash,
        permanentlyDeleteFromTrash,
        suggestionConfig,
        updateSuggestionPrompt,
        apiKeys,
        addApiKey,
        deleteApiKey,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error("useData must be used within DataProvider");
  }
  return ctx;
}
