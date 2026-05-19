module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/components/ui/tooltip.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tooltip",
    ()=>Tooltip,
    "TooltipContent",
    ()=>TooltipContent,
    "TooltipProvider",
    ()=>TooltipProvider,
    "TooltipTrigger",
    ()=>TooltipTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tooltip$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/node_modules/@base-ui/react/esm/tooltip/index.parts.js [app-ssr] (ecmascript) <export * as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function TooltipProvider({ delay = 0, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tooltip$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tooltip$3e$__["Tooltip"].Provider, {
        "data-slot": "tooltip-provider",
        delay: delay,
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/tooltip.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
function Tooltip({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tooltip$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tooltip$3e$__["Tooltip"].Root, {
        "data-slot": "tooltip",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/tooltip.tsx",
        lineNumber: 21,
        columnNumber: 10
    }, this);
}
function TooltipTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tooltip$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tooltip$3e$__["Tooltip"].Trigger, {
        "data-slot": "tooltip-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/tooltip.tsx",
        lineNumber: 25,
        columnNumber: 10
    }, this);
}
function TooltipContent({ className, side = "top", sideOffset = 4, align = "center", alignOffset = 0, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tooltip$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tooltip$3e$__["Tooltip"].Portal, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tooltip$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tooltip$3e$__["Tooltip"].Positioner, {
            align: align,
            alignOffset: alignOffset,
            side: side,
            sideOffset: sideOffset,
            className: "isolate z-50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tooltip$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tooltip$3e$__["Tooltip"].Popup, {
                "data-slot": "tooltip-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
                ...props,
                children: [
                    children,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$tooltip$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tooltip$3e$__["Tooltip"].Arrow, {
                        className: "z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/tooltip.tsx",
                        lineNumber: 59,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/tooltip.tsx",
                lineNumber: 50,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/ui/tooltip.tsx",
            lineNumber: 43,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/tooltip.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/app/types/event.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALL_DOMAINS",
    ()=>ALL_DOMAINS,
    "DEFAULT_SUGGESTION_PROMPT",
    ()=>DEFAULT_SUGGESTION_PROMPT,
    "TAG_POOL",
    ()=>TAG_POOL
]);
const ALL_DOMAINS = [
    "全部",
    "汽车",
    "AI",
    "消费电子"
];
const TAG_POOL = [
    "汽车",
    "AI",
    "消费电子",
    "新品发布",
    "战略合作",
    "资本市场"
];
const DEFAULT_SUGGESTION_PROMPT = `你是一个科技行业事件分类助手。请对每个事件进行唯一核心标签判定。

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
}),
"[project]/app/data/events.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "events",
    ()=>events
]);
const events = [
    // ========== 5月1日 ==========
    {
        id: "e-0501-01",
        title: "七彩虹2026 iGame Orion系列旗舰游戏本新品发布",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-01T10:00:00+08:00",
        isPast: true,
        locationType: "online",
        tldr: "七彩虹发布iGame Orion旗舰游戏本，主打高性能游戏体验。"
    },
    // ========== 5月2日 ==========
    {
        id: "e-0502-01",
        title: "张雪机车 WSSK 匈牙利站第一回合正赛",
        domainTags: [
            "汽车"
        ],
        startTime: "2026-05-02T20:00:00+08:00",
        isPast: true,
        locationType: "offline",
        city: "匈牙利",
        tldr: "张雪机车征战WSSK匈牙利站第一回合。"
    },
    // ========== 5月3日 ==========
    {
        id: "e-0503-01",
        title: "张雪机车 WSSK 匈牙利站第二回合正赛",
        domainTags: [
            "汽车"
        ],
        startTime: "2026-05-03T20:00:00+08:00",
        isPast: true,
        locationType: "offline",
        city: "匈牙利",
        tldr: "张雪机车征战WSSK匈牙利站第二回合。"
    },
    // ========== 5月4日 ==========
    {
        id: "e-0504-01",
        title: "SID Display Week 2026",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-04T09:00:00+08:00",
        isPast: true,
        locationType: "offline",
        city: "美国加州圣何塞",
        tldr: "全球显示技术盛会SID Display Week 2026开幕，集中展示OLED、MicroLED等前沿显示技术。"
    },
    // ========== 5月5日 ==========
    {
        id: "e-0505-01",
        title: "RingConn Gen 3 智能戒指发布",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-05T10:00:00+08:00",
        isPast: true,
        locationType: "online",
        tldr: "RingConn发布第三代智能戒指，持续深耕可穿戴健康监测赛道。"
    },
    // ========== 5月7日 ==========
    {
        id: "e-0507-01",
        title: "2026微软云大会，发布AI+SIM产品",
        domainTags: [
            "AI",
            "消费电子"
        ],
        startTime: "2026-05-07T10:00:00+08:00",
        isPast: true,
        locationType: "online",
        tldr: "微软在云大会上发布AI与SIM融合产品，探索AI终端新形态。"
    },
    // ========== 5月8日 ==========
    {
        id: "e-0508-01",
        title: "2026春季Xbox游戏开发更新直播",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-08T10:00:00+08:00",
        isPast: true,
        locationType: "online",
        tldr: "微软Xbox春季开发更新，披露新游戏阵容与开发工具进展。"
    },
    {
        id: "e-0508-02",
        title: "海信 & Vidda 全场景新品发布会",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-08T14:30:00+08:00",
        isPast: true,
        locationType: "online",
        tldr: "海信旗下Vidda品牌发布全场景新品，覆盖电视与智能家居。"
    },
    {
        id: "e-0508-03",
        title: "2026款广汽丰田铂智3X汽车上市发布会",
        domainTags: [
            "汽车",
            "新品发布"
        ],
        startTime: "2026-05-08T15:00:00+08:00",
        isPast: true,
        locationType: "offline",
        city: "广州",
        tldr: "广汽丰田铂智3X正式上市，定位智能纯电SUV市场。"
    },
    {
        id: "e-0508-04",
        title: "上汽奥迪E7X车型开启预售",
        domainTags: [
            "汽车"
        ],
        startTime: "2026-05-08T19:00:00+08:00",
        isPast: true,
        locationType: "online",
        tldr: "上汽奥迪E7X启动预售，进一步布局高端智能电动市场。"
    },
    {
        id: "e-0508-05",
        title: "华硕天选2026新品发布会",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-08T19:00:00+08:00",
        isPast: true,
        locationType: "online",
        tldr: "华硕天选系列2026新品发布，面向年轻玩家市场。"
    },
    {
        id: "e-0508-06",
        title: "飞智FS68旗舰键盘新品发布会",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-08T19:00:00+08:00",
        isPast: true,
        locationType: "online",
        tldr: "飞智发布FS68旗舰机械键盘，强化电竞外设布局。"
    },
    {
        id: "e-0508-07",
        title: "华宝S正式上市",
        domainTags: [
            "汽车"
        ],
        startTime: "2026-05-08T19:00:00+08:00",
        isPast: true,
        locationType: "offline",
        tldr: "华宝S车型正式上市。"
    },
    {
        id: "e-0508-08",
        title: "鸿蒙智选健康空气系列空调新品预售开启",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-08T20:00:00+08:00",
        isPast: true,
        locationType: "online",
        tldr: "鸿蒙智选健康空气系列空调开启预售，深化鸿蒙生态家电布局。"
    },
    // ========== 5月9日 ==========
    {
        id: "e-0509-01",
        title: "领汇e9车型上市",
        domainTags: [
            "汽车"
        ],
        startTime: "2026-05-09T10:00:00+08:00",
        isPast: true,
        locationType: "offline",
        tldr: "领汇e9车型上市。"
    },
    {
        id: "e-0509-02",
        title: "全新博越L十年冠军版上市",
        domainTags: [
            "汽车"
        ],
        startTime: "2026-05-09T18:30:00+08:00",
        isPast: true,
        locationType: "offline",
        city: "杭州",
        tldr: "吉利博越L推出十年冠军版车型，持续巩固紧凑SUV市场地位。"
    },
    // ========== 5月11日 ==========
    {
        id: "e-0511-01",
        title: "2026款比亚迪海鸥发布上市",
        domainTags: [
            "汽车",
            "新品发布"
        ],
        startTime: "2026-05-11T10:00:00+08:00",
        isPast: true,
        locationType: "offline",
        tldr: "2026款比亚迪海鸥焕新上市，继续领跑A00级纯电市场。"
    },
    {
        id: "e-0511-02",
        title: "2026世界数字教育大会",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-11T10:00:00+08:00",
        isPast: true,
        locationType: "offline",
        city: "武汉",
        tldr: "2026世界数字教育大会召开，探讨AI与教育深度融合。"
    },
    {
        id: "e-0511-03",
        title: "大疆DJI ROMO 2代扫地机器人发布",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-11T10:00:00+08:00",
        isPast: true,
        locationType: "online",
        tldr: "大疆发布第二代ROMO扫地机器人，延续机器人技术基因。"
    },
    {
        id: "e-0511-04",
        title: "天舟十号货运飞船发射（预期）",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-11T08:14:00+08:00",
        isPast: true,
        locationType: "offline",
        city: "文昌",
        venue: "文昌航天发射场",
        tldr: "天舟十号货运飞船按计划发射，为中国空间站运送补给物资。"
    },
    {
        id: "e-0511-05",
        title: "坚果投影NS5系列发布会",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-11T10:00:00+08:00",
        isPast: true,
        locationType: "online",
        tldr: "坚果投影发布NS5系列新品，持续布局家用投影市场。"
    },
    {
        id: "e-0511-06",
        title: "追觅科技智能生活家电新品发布会",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-11T20:00:00+08:00",
        isPast: true,
        locationType: "online",
        tldr: "追觅科技发布智能生活家电新品，拓展清洁电器产品线。"
    },
    // ========== 5月13日 ==========
    {
        id: "e-0513-01",
        title: "百度AI开发者大会 Create 2026",
        domainTags: [
            "AI",
            "消费电子"
        ],
        startTime: "2026-05-13T10:00:00+08:00",
        isPast: true,
        locationType: "offline",
        city: "北京",
        tldr: "百度Create 2026开发者大会召开，展示文心大模型生态与AI应用最新成果。"
    },
    {
        id: "e-0513-02",
        title: "The Android Show | I/O Edition 活动",
        domainTags: [
            "AI",
            "消费电子"
        ],
        startTime: "2026-05-13T01:00:00+08:00",
        isPast: true,
        locationType: "online",
        tldr: "Google I/O Android特别活动，展示Android 16新特性与AI能力。"
    },
    {
        id: "e-0513-03",
        title: "联发科天玑开发者大会2026",
        domainTags: [
            "AI",
            "消费电子"
        ],
        startTime: "2026-05-13T09:30:00+08:00",
        isPast: true,
        locationType: "offline",
        city: "深圳",
        tldr: "联发科天玑开发者大会聚焦AI芯片与端侧大模型能力。"
    },
    {
        id: "e-0513-04",
        title: "索尼Xperia新机发布会",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-13T10:00:00+08:00",
        isPast: true,
        locationType: "online",
        tldr: "索尼发布新一代Xperia旗舰手机，主打影像与影音体验。"
    },
    {
        id: "e-0513-05",
        title: "一加平板3 Pro正式开售",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-13T10:00:00+08:00",
        isPast: true,
        locationType: "online",
        tldr: "一加平板3 Pro正式开售，瞄准高端安卓平板市场。"
    },
    {
        id: "e-0513-06",
        title: "漫步者30周年限量典藏款音箱正式上市开售",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-13T10:00:00+08:00",
        isPast: true,
        locationType: "online",
        tldr: "漫步者30周年限量典藏款音箱上市，致敬品牌历程。"
    },
    {
        id: "e-0513-07",
        title: "比亚迪云辇-P Ultra暨方程豹豹8、豹5闪充版上市发布会",
        domainTags: [
            "汽车",
            "新品发布"
        ],
        startTime: "2026-05-13T19:00:00+08:00",
        isPast: true,
        locationType: "offline",
        city: "深圳",
        tldr: "比亚迪发布云辇-P Ultra技术，方程豹豹8及豹5闪充版同步上市。"
    },
    {
        id: "e-0513-08",
        title: "老蛙CF 4.5-10mm F2.8变焦鱼眼镜头正式亮相发布",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-13T19:30:00+08:00",
        isPast: true,
        locationType: "online",
        tldr: "老蛙发布CF 4.5-10mm F2.8变焦鱼眼镜头，填补国产超广角镜头空白。"
    },
    {
        id: "e-0513-09",
        title: "2026徕芬新品发布会美学专场",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-13T20:00:00+08:00",
        isPast: true,
        locationType: "online",
        tldr: "徕芬举办美学专场发布会，拓展个人护理电器设计边界。"
    },
    {
        id: "e-0513-10",
        title: "佳能新品发布会",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-13T21:00:00+08:00",
        isPast: true,
        locationType: "online",
        tldr: "佳能发布影像新品，巩固专业影像领域领先地位。"
    },
    {
        id: "e-0513-11",
        title: "索尼Alpha 7R VI新品发布会",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-13T21:30:00+08:00",
        isPast: true,
        locationType: "online",
        tldr: "索尼发布Alpha 7R VI高像素全画幅微单，再度刷新画质上限。"
    },
    // ========== 5月14日 ==========
    {
        id: "e-0514-01",
        title: "中国电信终端产业联盟2026年度中期交流会暨智享沙龙",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-14T10:00:00+08:00",
        isPast: true,
        locationType: "offline",
        city: "北京",
        tldr: "中国电信终端产业联盟召开中期交流会，推进终端生态协同。"
    },
    {
        id: "e-0514-02",
        title: "影石GO Ultra x Hello Kitty限定版口袋相机发布",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-14T20:00:00+08:00",
        isPast: true,
        locationType: "online",
        tldr: "影石推出GO Ultra Hello Kitty限定版，切入潮流消费电子市场。"
    },
    {
        id: "e-0514-03",
        title: "大疆Osmo Pocket 4P双摄云台相机发布会",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-14T23:00:00+08:00",
        isPast: true,
        locationType: "offline",
        city: "洛杉矶",
        tldr: "大疆发布Osmo Pocket 4P双摄云台相机，引领便携影像创新。"
    },
    // ========== 5月15日 ==========
    {
        id: "e-0515-01",
        title: "2026款广汽传祺M6 MAX MPV上市",
        domainTags: [
            "汽车",
            "新品发布"
        ],
        startTime: "2026-05-15T10:00:00+08:00",
        isPast: true,
        locationType: "offline",
        city: "广州",
        tldr: "广汽传祺M6 MAX正式上市，主打家用MPV大空间市场。"
    },
    {
        id: "e-0515-02",
        title: "2026 CHINA P&E活动",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-15T09:00:00+08:00",
        isPast: true,
        locationType: "offline",
        city: "北京",
        venue: "中国国际展览中心",
        tldr: "第26届中国国际照相机械影像器材与技术博览会（CHINA P&E）开幕。"
    },
    {
        id: "e-0515-03",
        title: "华硕ROG DAY 2026广州站活动",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-15T14:00:00+08:00",
        isPast: true,
        locationType: "offline",
        city: "广州",
        tldr: "ROG DAY 2026广州站举办，电竞玩家线下狂欢。"
    },
    {
        id: "e-0515-04",
        title: "鸿蒙智行智界V9发布会",
        domainTags: [
            "汽车",
            "消费电子",
            "新品发布"
        ],
        startTime: "2026-05-15T14:30:00+08:00",
        isPast: true,
        locationType: "offline",
        city: "上海",
        tldr: "鸿蒙智行智界V9正式发布，华为智选车生态再添重磅车型。"
    },
    {
        id: "e-0515-05",
        title: "全新理想L9焕新版上市并开启交付",
        domainTags: [
            "汽车",
            "新品发布"
        ],
        startTime: "2026-05-15T15:00:00+08:00",
        isPast: true,
        locationType: "offline",
        city: "北京",
        tldr: "理想L9焕新版上市，升级智驾与座舱体验并同步开启交付。"
    },
    {
        id: "e-0515-06",
        title: "哈弗猛龙PLUS车型上市",
        domainTags: [
            "汽车",
            "新品发布"
        ],
        startTime: "2026-05-15T17:00:00+08:00",
        isPast: true,
        locationType: "offline",
        city: "北京",
        tldr: "哈弗猛龙PLUS正式上市，强化硬派越野SUV产品矩阵。"
    },
    {
        id: "e-0515-07",
        title: "光凯金曜AI耳机正式发售",
        domainTags: [
            "AI",
            "消费电子"
        ],
        startTime: "2026-05-15T19:30:00+08:00",
        isPast: true,
        locationType: "online",
        tldr: "光凯金曜AI耳机正式发售，主打AI语音交互与降噪体验。"
    },
    {
        id: "e-0515-08",
        title: "515乐道家庭欢乐周暨乐道L80上市发布会",
        domainTags: [
            "汽车",
            "新品发布"
        ],
        startTime: "2026-05-15T19:30:00+08:00",
        isPast: true,
        locationType: "offline",
        city: "上海",
        tldr: "乐道品牌举办家庭欢乐周并发布L80车型，完善产品序列。"
    },
    // ========== 5月16日 ==========
    {
        id: "e-0516-01",
        title: "卢伟冰「Max一夏」户外露营直播，爆料小米17 Max及AIoT新品",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-16T17:00:00+08:00",
        isPast: true,
        locationType: "online",
        tldr: "卢伟冰户外直播预热小米17 Max及AIoT新品，强化高端产品线。"
    },
    // ========== 5月17日 ==========
    {
        id: "e-0517-01",
        title: "广汽昊铂S600预售发布会",
        domainTags: [
            "汽车"
        ],
        startTime: "2026-05-17T15:00:00+08:00",
        isPast: true,
        locationType: "offline",
        city: "广州",
        tldr: "广汽昊铂S600启动预售，进军高端智能纯电轿车市场。"
    },
    {
        id: "e-0517-02",
        title: "WSSK捷克站SSP组次回合正赛",
        domainTags: [
            "汽车"
        ],
        startTime: "2026-05-17T20:00:00+08:00",
        isPast: true,
        locationType: "offline",
        city: "捷克",
        tldr: "WSSK捷克站SSP组次回合正赛举行。"
    },
    // ========== 5月18日 ==========
    {
        id: "e-0518-01",
        title: "第三代英特尔酷睿处理器新品分享会",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-18T14:00:00+08:00",
        isPast: true,
        locationType: "offline",
        city: "北京",
        tldr: "英特尔分享第三代酷睿处理器新品，展示桌面与移动端性能提升。"
    },
    {
        id: "e-0518-02",
        title: "红魔11S Pro新品发布会",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-18T15:00:00+08:00",
        isPast: true,
        locationType: "online",
        tldr: "红魔发布11S Pro电竞手机，持续引领游戏手机性能极限。"
    },
    {
        id: "e-0518-03",
        title: "魏牌V9X上市发布会",
        domainTags: [
            "汽车",
            "新品发布"
        ],
        startTime: "2026-05-18T18:30:00+08:00",
        isPast: true,
        locationType: "offline",
        city: "保定",
        tldr: "魏牌V9X正式上市，定位高端智能新能源SUV。"
    },
    {
        id: "e-0518-04",
        title: "摩尔线程2026产品发布会",
        domainTags: [
            "AI",
            "消费电子"
        ],
        startTime: "2026-05-18T19:00:00+08:00",
        isPast: true,
        locationType: "online",
        tldr: "摩尔线程发布2026年GPU新品，加速国产AI算力生态建设。"
    },
    {
        id: "e-0518-05",
        title: "腾势N9闪充版上市发布会",
        domainTags: [
            "汽车",
            "新品发布"
        ],
        startTime: "2026-05-18T19:30:00+08:00",
        isPast: true,
        locationType: "offline",
        city: "深圳",
        tldr: "腾势N9闪充版上市，搭载超快充技术，提升补能体验。"
    },
    // ========== 5月19日 ==========
    {
        id: "e-0519-01",
        title: "2026 AMD AI开发者日",
        domainTags: [
            "AI",
            "消费电子"
        ],
        startTime: "2026-05-19T10:00:00+08:00",
        isPast: false,
        locationType: "offline",
        city: "北京"
    },
    {
        id: "e-0519-02",
        title: "2026年中国网络文明大会",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-19T09:00:00+08:00",
        isPast: false,
        locationType: "offline",
        city: "合肥"
    },
    {
        id: "e-0519-03",
        title: "焕新极氪009上市",
        domainTags: [
            "汽车",
            "新品发布"
        ],
        startTime: "2026-05-19T19:00:00+08:00",
        isPast: false,
        locationType: "both",
        city: "杭州"
    },
    {
        id: "e-0519-04",
        title: "联想天禧AI一体多端全场景新品超能之夜",
        domainTags: [
            "AI",
            "消费电子"
        ],
        startTime: "2026-05-19T19:00:00+08:00",
        isPast: false,
        locationType: "online"
    },
    {
        id: "e-0519-05",
        title: "影石Insta360墨水屏新品发布",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-19T21:00:00+08:00",
        isPast: false,
        locationType: "online"
    },
    // ========== 5月20日 ==========
    {
        id: "e-0520-01",
        title: "爱玛元宇宙Oi全网上架",
        domainTags: [
            "汽车",
            "消费电子"
        ],
        startTime: "2026-05-20T10:00:00+08:00",
        isPast: false,
        locationType: "online"
    },
    {
        id: "e-0520-02",
        title: "研算科技TG100显卡京东首发开售",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-20T10:00:00+08:00",
        isPast: false,
        locationType: "online"
    },
    {
        id: "e-0520-03",
        title: "索尼耳机新品发布（WH-1000XM6）",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-20T00:00:00+08:00",
        isPast: false,
        locationType: "online"
    },
    {
        id: "e-0520-04",
        title: "2026款红旗H5及红旗HQ9 PHEV上市发布会",
        domainTags: [
            "汽车",
            "新品发布"
        ],
        startTime: "2026-05-20T10:00:00+08:00",
        isPast: false,
        locationType: "offline",
        city: "北京"
    },
    {
        id: "e-0520-05",
        title: "2026谷歌I/O开发者大会",
        domainTags: [
            "AI",
            "消费电子"
        ],
        startTime: "2026-05-20T01:00:00+08:00",
        isPast: false,
        locationType: "offline",
        city: "美国加州山景城"
    },
    {
        id: "e-0520-06",
        title: "SpaceX星舰V3首飞",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-20T06:30:00+08:00",
        isPast: false,
        locationType: "offline",
        city: "美国德州博卡奇卡",
        venue: "星舰基地"
    },
    {
        id: "e-0520-07",
        title: "九号Mz1新国标电动车发布",
        domainTags: [
            "汽车",
            "消费电子"
        ],
        startTime: "2026-05-20T09:00:00+08:00",
        isPast: false,
        locationType: "online"
    },
    {
        id: "e-0520-08",
        title: "iQOO 15T新品发布会",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-20T19:00:00+08:00",
        isPast: false,
        locationType: "online"
    },
    {
        id: "e-0520-09",
        title: "2026年网易游戏520线上发布会",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-20T19:30:00+08:00",
        isPast: false,
        locationType: "online"
    },
    {
        id: "e-0520-10",
        title: "小鹏GX上市发布会",
        domainTags: [
            "汽车",
            "新品发布"
        ],
        startTime: "2026-05-20T19:30:00+08:00",
        isPast: false,
        locationType: "offline",
        city: "广州"
    },
    {
        id: "e-0520-11",
        title: "九号电动全新M3系列预约",
        domainTags: [
            "汽车",
            "消费电子"
        ],
        startTime: "2026-05-20T20:00:00+08:00",
        isPast: false,
        locationType: "online"
    },
    // ========== 5月21日 ==========
    {
        id: "e-0521-01",
        title: "北京越野BJ40增程长续航版上市发布会",
        domainTags: [
            "汽车",
            "新品发布"
        ],
        startTime: "2026-05-21T10:00:00+08:00",
        isPast: false,
        locationType: "offline",
        city: "北京"
    },
    {
        id: "e-0521-02",
        title: "比亚迪第三代元PLUS正式上市",
        domainTags: [
            "汽车",
            "新品发布"
        ],
        startTime: "2026-05-21T00:00:00+08:00",
        isPast: false,
        locationType: "offline",
        city: "深圳"
    },
    {
        id: "e-0521-03",
        title: "文石Poke7新品发布",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-21T10:00:00+08:00",
        isPast: false,
        locationType: "online"
    },
    {
        id: "e-0521-04",
        title: "BOOX文石Poke7/Pro系列墨水屏阅读器发布",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-21T10:00:00+08:00",
        isPast: false,
        locationType: "online"
    },
    {
        id: "e-0521-05",
        title: "绿联NAS私有云新品发布",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-21T10:00:00+08:00",
        isPast: false,
        locationType: "online"
    },
    {
        id: "e-0521-06",
        title: "小米人车家全生态新品发布会",
        domainTags: [
            "汽车",
            "消费电子"
        ],
        startTime: "2026-05-21T19:00:00+08:00",
        isPast: false,
        locationType: "offline",
        city: "北京"
    },
    // ========== 5月22日 ==========
    {
        id: "e-0522-01",
        title: "北汽极狐S3上市发布会",
        domainTags: [
            "汽车",
            "新品发布"
        ],
        startTime: "2026-05-22T10:00:00+08:00",
        isPast: false,
        locationType: "offline",
        city: "北京"
    },
    {
        id: "e-0522-02",
        title: "吉利银河星舰7上市发布会",
        domainTags: [
            "汽车",
            "新品发布"
        ],
        startTime: "2026-05-22T10:00:00+08:00",
        isPast: false,
        locationType: "offline",
        city: "杭州"
    },
    {
        id: "e-0522-03",
        title: "五菱缤果Pro纯电小车上市",
        domainTags: [
            "汽车",
            "新品发布"
        ],
        startTime: "2026-05-22T10:00:00+08:00",
        isPast: false,
        locationType: "offline",
        city: "柳州"
    },
    {
        id: "e-0522-04",
        title: "岚图泰山X8上市发布会",
        domainTags: [
            "汽车",
            "新品发布"
        ],
        startTime: "2026-05-22T10:00:00+08:00",
        isPast: false,
        locationType: "offline",
        city: "武汉"
    },
    {
        id: "e-0522-05",
        title: "安克首款神经网络存算一体AI音频芯片及旗舰耳机发布会",
        domainTags: [
            "AI",
            "消费电子"
        ],
        startTime: "2026-05-22T19:00:00+08:00",
        isPast: false,
        locationType: "online"
    },
    // ========== 5月23日 ==========
    {
        id: "e-0523-01",
        title: "2026雅迪摩登之夜暨全球新品发布会",
        domainTags: [
            "汽车",
            "消费电子"
        ],
        startTime: "2026-05-23T19:00:00+08:00",
        isPast: false,
        locationType: "offline",
        city: "无锡"
    },
    {
        id: "e-0523-02",
        title: "神舟二十三号载人飞船发射（预期）",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-23T22:47:00+08:00",
        isPast: false,
        locationType: "offline",
        city: "酒泉",
        venue: "酒泉卫星发射中心"
    },
    // ========== 5月25日 ==========
    {
        id: "e-0525-01",
        title: "荣耀手表6 Plus发布",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-25T10:00:00+08:00",
        isPast: false,
        locationType: "online"
    },
    {
        id: "e-0525-02",
        title: "OPPO Reno16系列新品发布会",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-25T18:00:00+08:00",
        isPast: false,
        locationType: "offline",
        city: "深圳"
    },
    {
        id: "e-0525-03",
        title: "荣耀600系列手机国行版新品发布会",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-25T19:00:00+08:00",
        isPast: false,
        locationType: "online"
    },
    {
        id: "e-0525-04",
        title: "荣耀Earbuds耳夹式耳机Pro发布",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-25T20:00:00+08:00",
        isPast: false,
        locationType: "online"
    },
    // ========== 5月27日 ==========
    {
        id: "e-0527-01",
        title: "蔚来ES9上市并开启交付",
        domainTags: [
            "汽车",
            "新品发布"
        ],
        startTime: "2026-05-27T10:00:00+08:00",
        isPast: false,
        locationType: "offline",
        city: "合肥"
    },
    {
        id: "e-0527-02",
        title: "SPARK 2026腾讯游戏发布会",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-27T20:00:00+08:00",
        isPast: false,
        locationType: "online"
    },
    // ========== 5月28日 ==========
    {
        id: "e-0528-01",
        title: "小米17T系列手机海外发布会",
        domainTags: [
            "消费电子"
        ],
        startTime: "2026-05-28T10:00:00+08:00",
        isPast: false,
        locationType: "offline",
        city: "海外"
    },
    // ========== 5月29日 ==========
    {
        id: "e-0529-01",
        title: "三星SAFE论坛2026美国场",
        domainTags: [
            "AI",
            "消费电子"
        ],
        startTime: "2026-05-29T01:00:00+08:00",
        isPast: false,
        locationType: "offline",
        city: "美国"
    },
    // ========== 5月30日 ==========
    {
        id: "e-0530-01",
        title: "2026高通 & 铠侠AI开发者日",
        domainTags: [
            "AI",
            "消费电子"
        ],
        startTime: "2026-05-30T09:00:00+08:00",
        isPast: false,
        locationType: "offline",
        city: "深圳"
    }
];
}),
"[project]/app/context/DataContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DataProvider",
    ()=>DataProvider,
    "useData",
    ()=>useData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$types$2f$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/types/event.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$events$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/data/events.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const DataContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function generateId() {
    return `e-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
function generateApiKeyId() {
    return `ak-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
/* ---------- localStorage helpers ---------- */ const EVENTS_STORAGE_KEY = "foresight_events";
const DELETED_STORAGE_KEY = "foresight_deleted_events";
const SUGGESTION_STORAGE_KEY = "foresight_suggestion_config";
const APIKEYS_STORAGE_KEY = "foresight_api_keys";
function loadFromStorage(key, fallback) {
    if ("TURBOPACK compile-time truthy", 1) return fallback;
    //TURBOPACK unreachable
    ;
}
function saveToStorage(key, value) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
/* ---------- Undo/Redo history ---------- */ const MAX_HISTORY = 50;
function DataProvider({ children }) {
    // Load persisted events on init, fallback to initialEvents
    const persistedEvents = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
    const initialData = persistedEvents ?? __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$events$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["events"];
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialData);
    const [deletedEvents, setDeletedEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>loadFromStorage(DELETED_STORAGE_KEY, []));
    const [suggestionConfig, setSuggestionConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>loadFromStorage(SUGGESTION_STORAGE_KEY, {
            prompt: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$types$2f$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_SUGGESTION_PROMPT"]
        }));
    const [apiKeys, setApiKeys] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>loadFromStorage(APIKEYS_STORAGE_KEY, []));
    // History for undo/redo — only tracks events, not deletedEvents or config
    const historyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([
        initialData
    ]);
    const indexRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const [canUndo, setCanUndo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [canRedo, setCanRedo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const syncHistoryState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setCanUndo(indexRef.current > 0);
        setCanRedo(indexRef.current < historyRef.current.length - 1);
    }, []);
    const pushHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((newEvents)=>{
        historyRef.current = historyRef.current.slice(0, indexRef.current + 1);
        historyRef.current.push(newEvents);
        if (historyRef.current.length > MAX_HISTORY) {
            historyRef.current = historyRef.current.slice(historyRef.current.length - MAX_HISTORY);
        }
        indexRef.current = historyRef.current.length - 1;
        syncHistoryState();
        saveToStorage(EVENTS_STORAGE_KEY, newEvents);
    }, [
        syncHistoryState
    ]);
    const undo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (indexRef.current > 0) {
            indexRef.current--;
            const restored = historyRef.current[indexRef.current];
            setEvents(restored);
            saveToStorage(EVENTS_STORAGE_KEY, restored);
            syncHistoryState();
        }
    }, [
        syncHistoryState
    ]);
    const redo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (indexRef.current < historyRef.current.length - 1) {
            indexRef.current++;
            const restored = historyRef.current[indexRef.current];
            setEvents(restored);
            saveToStorage(EVENTS_STORAGE_KEY, restored);
            syncHistoryState();
        }
    }, [
        syncHistoryState
    ]);
    /* ---------- Persist side effects ---------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        saveToStorage(DELETED_STORAGE_KEY, deletedEvents);
    }, [
        deletedEvents
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        saveToStorage(SUGGESTION_STORAGE_KEY, suggestionConfig);
    }, [
        suggestionConfig
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        saveToStorage(APIKEYS_STORAGE_KEY, apiKeys);
    }, [
        apiKeys
    ]);
    /* ---------- Event CRUD ---------- */ const addEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        const newEvent = {
            ...event,
            id: generateId()
        };
        setEvents((prev)=>{
            const next = [
                ...prev,
                newEvent
            ];
            pushHistory(next);
            return next;
        });
    }, [
        pushHistory
    ]);
    const updateEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        setEvents((prev)=>{
            const next = prev.map((ev)=>ev.id === event.id ? event : ev);
            pushHistory(next);
            return next;
        });
    }, [
        pushHistory
    ]);
    const updateEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((updated)=>{
        setEvents((prev)=>{
            const map = new Map(prev.map((e)=>[
                    e.id,
                    e
                ]));
            updated.forEach((u)=>map.set(u.id, u));
            const next = Array.from(map.values());
            pushHistory(next);
            return next;
        });
    }, [
        pushHistory
    ]);
    const deleteEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        setEvents((prev)=>{
            const next = prev.filter((ev)=>ev.id !== id);
            pushHistory(next);
            return next;
        });
    }, [
        pushHistory
    ]);
    const deleteEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((ids)=>{
        const idSet = new Set(ids);
        setEvents((prev)=>{
            const next = prev.filter((ev)=>!idSet.has(ev.id));
            pushHistory(next);
            return next;
        });
    }, [
        pushHistory
    ]);
    const importEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((imported)=>{
        setEvents((prev)=>{
            const map = new Map(prev.map((e)=>[
                    e.title,
                    e
                ]));
            imported.forEach((item)=>{
                const existing = map.get(item.title);
                if (existing) {
                    map.set(item.title, {
                        ...item,
                        id: existing.id
                    });
                } else {
                    map.set(item.title, {
                        ...item,
                        id: generateId()
                    });
                }
            });
            const next = Array.from(map.values());
            pushHistory(next);
            return next;
        });
    }, [
        pushHistory
    ]);
    /* ---------- Trash operations ---------- */ const moveToTrash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((ids)=>{
        const idSet = new Set(ids);
        setEvents((prev)=>{
            const toTrash = prev.filter((ev)=>idSet.has(ev.id));
            const next = prev.filter((ev)=>!idSet.has(ev.id));
            setDeletedEvents((trash)=>[
                    ...trash,
                    ...toTrash
                ]);
            pushHistory(next);
            return next;
        });
    }, [
        pushHistory
    ]);
    const restoreFromTrash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((ids)=>{
        const idSet = new Set(ids);
        setDeletedEvents((prev)=>{
            const toRestore = prev.filter((ev)=>idSet.has(ev.id));
            const nextTrash = prev.filter((ev)=>!idSet.has(ev.id));
            setEvents((evs)=>{
                // Avoid duplicates: skip if already exists in events
                const existingIds = new Set(evs.map((e)=>e.id));
                const uniqueRestored = toRestore.filter((e)=>!existingIds.has(e.id));
                const next = [
                    ...evs,
                    ...uniqueRestored
                ];
                pushHistory(next);
                return next;
            });
            return nextTrash;
        });
    }, [
        pushHistory
    ]);
    const permanentlyDeleteFromTrash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((ids)=>{
        const idSet = new Set(ids);
        setDeletedEvents((prev)=>prev.filter((ev)=>!idSet.has(ev.id)));
    }, []);
    /* ---------- Suggestion config ---------- */ const updateSuggestionPrompt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((prompt)=>{
        setSuggestionConfig((prev)=>({
                ...prev,
                prompt
            }));
    }, []);
    /* ---------- API Key management ---------- */ const addApiKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((config)=>{
        const newKey = {
            ...config,
            id: generateApiKeyId(),
            createdAt: new Date().toISOString()
        };
        setApiKeys((prev)=>[
                ...prev,
                newKey
            ]);
    }, []);
    const deleteApiKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        setApiKeys((prev)=>prev.filter((k)=>k.id !== id));
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DataContext.Provider, {
        value: {
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
            deleteApiKey
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/app/context/DataContext.tsx",
        lineNumber: 260,
        columnNumber: 5
    }, this);
}
function useData() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(DataContext);
    if (!ctx) {
        throw new Error("useData must be used within DataProvider");
    }
    return ctx;
}
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0x4baks._.js.map