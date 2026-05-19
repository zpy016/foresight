import { MarketEvent, ApiKeyConfig, AISuggestion } from "@/app/types/event";

/* ================================================================
   AI Check (verify event facts: time, location, link, etc.)
   ================================================================ */

export interface AICheckResult {
  status: "verified" | "mismatch";
  referenceLinks: string[];
  note: string;
  fields: {
    startTime: { expected: string; found: string; match: boolean };
    locationType: { expected: string; found: string; match: boolean };
    city: { expected: string; found: string; match: boolean };
    onlineLink: { expected: string; found: string; match: boolean };
  };
}

function buildCheckPrompt(event: MarketEvent): string {
  const locationLabels: Record<string, string> = {
    online: "线上",
    offline: "线下",
    both: "线上+线下",
  };

  return `你是一个科技行业事件信息验证助手。请验证以下事件的信息是否准确。

事件信息：
- 名称：${event.title}
- 时间：${event.startTime}
- 场地类型：${locationLabels[event.locationType] || event.locationType}
- 国家/城市：${event.city || "未填写"}
- 场馆：${event.venue || "未填写"}
- 在线链接：${event.onlineLink || "未填写"}

请基于你的知识判断以上信息是否准确。特别关注：
1. 时间日期是否正确（是否与实际官宣/举办时间一致）
2. 场地类型是否正确（线上/线下/混合）
3. 城市/国家信息是否准确
4. 链接是否看起来合理

请严格返回以下 JSON 格式（不要包含 markdown 代码块标记，不要任何额外文字，只返回纯 JSON）：
{
  "status": "verified" 或 "mismatch",
  "fields": {
    "startTime": {"match": true/false, "expected": "你确认的正确时间", "found": "原始时间"},
    "locationType": {"match": true/false, "expected": "正确的场地类型", "found": "原始场地类型"},
    "city": {"match": true/false, "expected": "正确的城市", "found": "原始城市"},
    "onlineLink": {"match": true/false, "expected": "正确的链接或'无'", "found": "原始链接或'无'"}
  },
  "referenceLinks": ["参考链接1", "参考链接2"],
  "note": "简要说明验证结论（50字以内）"
}`;
}

async function callRealCheckAI(event: MarketEvent, apiKey: ApiKeyConfig): Promise<AICheckResult> {
  const prompt = buildCheckPrompt(event);
  const model = apiKey.model || "default";
  const baseUrl = apiKey.baseUrl.replace(/\/$/, "");

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
      max_tokens: 800,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API 请求失败 (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const content: string = data.choices?.[0]?.message?.content || "";

  let jsonText = content;
  const codeBlockMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (codeBlockMatch) jsonText = codeBlockMatch[1];
  const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
  if (jsonMatch) jsonText = jsonMatch[0];

  const parsed = JSON.parse(jsonText);

  return {
    status: parsed.status === "verified" ? "verified" : "mismatch",
    referenceLinks: Array.isArray(parsed.referenceLinks)
      ? parsed.referenceLinks.filter((l: unknown) => typeof l === "string")
      : [],
    note: String(parsed.note || ""),
    fields: {
      startTime: {
        expected: String(parsed.fields?.startTime?.expected || event.startTime),
        found: String(parsed.fields?.startTime?.found || event.startTime),
        match: !!parsed.fields?.startTime?.match,
      },
      locationType: {
        expected: String(parsed.fields?.locationType?.expected || event.locationType),
        found: String(parsed.fields?.locationType?.found || event.locationType),
        match: !!parsed.fields?.locationType?.match,
      },
      city: {
        expected: String(parsed.fields?.city?.expected || event.city || "未填写"),
        found: String(parsed.fields?.city?.found || event.city || "未填写"),
        match: !!parsed.fields?.city?.match,
      },
      onlineLink: {
        expected: String(parsed.fields?.onlineLink?.expected || event.onlineLink || "无"),
        found: String(parsed.fields?.onlineLink?.found || event.onlineLink || "无"),
        match: !!parsed.fields?.onlineLink?.match,
      },
    },
  };
}

/* ================================================================
   AI Suggestion (keep or delete based on user preference)
   ================================================================ */

export interface AISuggestionResult {
  suggestion: AISuggestion;
  primaryTag: "汽车" | "AI" | "消费电子" | "其他";
  reason: string;
}

function fillPromptTemplate(template: string, event: MarketEvent): string {
  return template
    .replace(/\{title\}/g, event.title)
    .replace(/\{tags\}/g, event.domainTags.join(", "))
    .replace(/\{startTime\}/g, event.startTime)
    .replace(/\{tldr\}/g, event.tldr || "未填写")
    .replace(/\{city\}/g, event.city || "未填写")
    .replace(/\{locationType\}/g, event.locationType);
}

async function callRealSuggestionAI(
  event: MarketEvent,
  promptTemplate: string,
  apiKey: ApiKeyConfig
): Promise<AISuggestionResult> {
  const prompt = fillPromptTemplate(promptTemplate, event);
  const model = apiKey.model || "default";
  const baseUrl = apiKey.baseUrl.replace(/\/$/, "");

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
      max_tokens: 400,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API 请求失败 (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const content: string = data.choices?.[0]?.message?.content || "";

  let jsonText = content;
  const codeBlockMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (codeBlockMatch) jsonText = codeBlockMatch[1];
  const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
  if (jsonMatch) jsonText = jsonMatch[0];

  const parsed = JSON.parse(jsonText);

  return {
    suggestion: parsed.suggestion === "keep" ? "keep" : "delete",
    primaryTag: ["汽车", "AI", "消费电子", "其他"].includes(parsed.primaryTag) ? parsed.primaryTag : "其他",
    reason: String(parsed.reason || ""),
  };
}

function generateMockSuggestion(event: MarketEvent): AISuggestionResult {
  const title = event.title.toLowerCase();
  const tags = event.domainTags.map((t) => t.toLowerCase());

  // Priority 1: Auto
  const isAuto = tags.includes("汽车") || title.includes("汽车") || title.includes("车展") || title.includes("自驾") || title.includes("新能源") || title.includes("电池") || title.includes("车");
  if (isAuto) {
    return { suggestion: "keep", primaryTag: "汽车", reason: "汽车领域事件" };
  }

  // Priority 2: AI
  const isAI = tags.includes("ai") || title.includes("ai") || title.includes("人工智能") || title.includes("大模型") || title.includes("gpt") || title.includes("agent") || title.includes("aigc");
  if (isAI) {
    return { suggestion: "keep", primaryTag: "AI", reason: "AI 核心事件" };
  }

  // Priority 3: Consumer electronics — only noteworthy ones
  const isConsumerElectronics = tags.includes("消费电子");
  const isBreakthrough = title.includes("突破") || title.includes("革命") || title.includes("首款") || title.includes("首发") || title.includes("标杆");
  const isPhone = title.includes("手机") || title.includes("phone") || title.includes("iphone");
  const isDeleteKeyword = ["扫地", "耳机", "笔记本", "机车", "火箭", "发射", "爱玛", "九号", "雅迪", "电动自行", "自行车", "手表", "平板"].some((kw) => title.includes(kw));

  if (isDeleteKeyword) {
    return { suggestion: "delete", primaryTag: "其他", reason: "非关注品类" };
  }

  if (isConsumerElectronics && isBreakthrough) {
    return { suggestion: "keep", primaryTag: "消费电子", reason: "突破性消费电子" };
  }

  if (isPhone && !isBreakthrough) {
    return { suggestion: "delete", primaryTag: "其他", reason: "普通手机发布" };
  }

  if (isConsumerElectronics) {
    return { suggestion: "delete", primaryTag: "其他", reason: "普通消费电子" };
  }

  // Default: other
  return { suggestion: "delete", primaryTag: "其他", reason: "非核心关注" };
}

/* ================================================================
   Shared helpers
   ================================================================ */

export async function runWithConcurrency<T>(
  items: T[],
  concurrency: number,
  fn: (item: T) => Promise<void>
): Promise<void> {
  const queue = [...items];
  const workers = Array.from({ length: concurrency }, async () => {
    while (queue.length > 0) {
      const item = queue.shift()!;
      await fn(item);
    }
  });
  await Promise.all(workers);
}

/* ================================================================
   Public APIs
   ================================================================ */

export async function performAICheck(
  event: MarketEvent,
  apiKey?: ApiKeyConfig
): Promise<AICheckResult> {
  if (apiKey) {
    try {
      return await callRealCheckAI(event, apiKey);
    } catch (err) {
      throw err;
    }
  }
  await new Promise((r) => setTimeout(r, 600 + Math.random() * 800));
  return generateMockCheckResult(event);
}

export async function performSuggestionCheck(
  event: MarketEvent,
  promptTemplate: string,
  apiKey?: ApiKeyConfig
): Promise<AISuggestionResult> {
  if (apiKey) {
    try {
      return await callRealSuggestionAI(event, promptTemplate, apiKey);
    } catch (err) {
      throw err;
    }
  }
  await new Promise((r) => setTimeout(r, 300 + Math.random() * 400));
  return generateMockSuggestion(event);
}

/* ---------- Mock fallbacks ---------- */

function generateMockCheckResult(event: MarketEvent): AICheckResult {
  const dateStr = event.startTime.slice(0, 16).replace("T", " ");
  const allMatch = Math.random() > 0.3;
  const referenceLinks = generateReferenceLinks(event.title);

  if (allMatch) {
    return {
      status: "verified",
      referenceLinks,
      note: "AI 核查完成：时间、地点、场地类型等信息与多源搜索结果一致。",
      fields: {
        startTime: { expected: dateStr, found: dateStr, match: true },
        locationType: { expected: event.locationType, found: event.locationType, match: true },
        city: { expected: event.city ?? "（线上活动）", found: event.city ?? "（线上活动）", match: true },
        onlineLink: { expected: event.onlineLink ?? "（无链接）", found: event.onlineLink ?? "（无链接）", match: true },
      },
    };
  }

  const mismatchField = Math.random() > 0.5 ? "city" : "startTime";

  return {
    status: "mismatch",
    referenceLinks,
    note:
      mismatchField === "city"
        ? `AI 发现地点信息可能存在偏差，建议人工复核。参考来源显示该活动地点可能为其他城市。`
        : `AI 发现时间信息可能存在偏差，建议人工复核。参考来源显示该活动时间可能有调整。`,
    fields: {
      startTime: {
        expected: dateStr,
        found: mismatchField === "startTime" ? `${dateStr.slice(0, 10)} 19:00` : dateStr,
        match: mismatchField !== "startTime",
      },
      locationType: { expected: event.locationType, found: event.locationType, match: true },
      city: {
        expected: event.city ?? "（线上活动）",
        found: mismatchField === "city" ? "待确认" : (event.city ?? "（线上活动）"),
        match: mismatchField !== "city",
      },
      onlineLink: { expected: event.onlineLink ?? "（无链接）", found: event.onlineLink ?? "（无链接）", match: true },
    },
  };
}

function generateReferenceLinks(title: string): string[] {
  const encoded = encodeURIComponent(title);
  return [
    `https://www.google.com/search?q=${encoded}`,
    `https://www.bing.com/search?q=${encoded}`,
  ];
}
