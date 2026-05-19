export type AISuggestion = "keep" | "delete" | "pending";

export interface MarketEvent {
  id: string;
  title: string;
  domainTags: string[];
  startTime: string; // ISO 8601 with timezone
  isPast: boolean;
  locationType: "online" | "offline" | "both";
  city?: string;
  venue?: string;
  onlineLink?: string;

  // AI 自动化工作流
  aiCheckStatus?: "none" | "pending" | "verified" | "mismatch";
  aiReferenceLinks?: string[];
  aiCheckNote?: string; // AI 检查后的备注/差异说明

  // AI 建议（保留/删除）
  aiSuggestion?: AISuggestion;
  aiSuggestionReason?: string;

  // 过去事件结构化深度分析
  tldr?: string;
  keyBreakthroughs?: string;
  industryImpact?: string;
  actionableInsight?: string;
  pdfUrl?: string;
  htmlUrl?: string;
}

export const ALL_DOMAINS = ["全部", "汽车", "AI", "消费电子"] as const;
export type DomainTag = (typeof ALL_DOMAINS)[number];

/** 后台编辑可选标签池（核心类别 + 其他维度） */
export const TAG_POOL = [
  "汽车",
  "AI",
  "消费电子",
  "新品发布",
  "战略合作",
  "资本市场",
] as const;

/** API Key 配置 */
export interface ApiKeyConfig {
  id: string;
  name: string;
  baseUrl: string;
  apiKey: string;
  protocol: "openai" | "anthropic";
  model?: string; // 可选，如 kimi-coding, gpt-4, claude-3-sonnet 等
  createdAt: string;
}

/** AI 建议配置 */
export interface AISuggestionConfig {
  prompt: string;
  lastRunAt?: string;
}

/** 默认 AI 建议提示词 */
export const DEFAULT_SUGGESTION_PROMPT = `你是一个科技行业事件分类助手。请对每个事件进行唯一核心标签判定。

【分类规则】（每个事件只能有一个核心标签，按优先级判定）
1. 汽车 — 只要是关于汽车的事件（车展、新车发布、自动驾驶、电池技术等），无论是否涉及 AI，都标为"汽车"
2. AI — 不是汽车，但与 AI 强相关的事件（大模型发布、AI 芯片、AI 应用、AIGC、Agent 等）
3. 消费电子 — 不是汽车也不是 AI，但属于值得关注的消费电子领域（突破性新品、行业标杆产品、重大技术迭代）
4. 其他 — 不属于以上三类的事件

【处理规则】
- 属于"汽车"、"AI"、"消费电子"的事件 → suggestion: "keep"
- 属于"其他"的事件 → suggestion: "delete"，直接移入回收站

【事件信息】
- 名称：{title}
- 标签：{tags}
- 时间：{startTime}
- 一句话总结：{tldr}

请严格返回以下 JSON（不要包含 markdown 代码块标记，不要任何额外文字，只返回纯 JSON）：
{
  "suggestion": "keep" 或 "delete",
  "primaryTag": "汽车" 或 "AI" 或 "消费电子" 或 "其他",
  "reason": "简要理由（15字以内）"
}`;
