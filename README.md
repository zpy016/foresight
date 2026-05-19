# Foresight 视界线 · 行业大事件智能日历系统

一款面向公司全员的行业高信噪比信息共识工具。系统核心聚焦于 **AI 领域** 与 **汽车/智能座舱领域** 的关键大事件，通过前台优雅的月历视图和移动端即时触达，帮助全员保持行业前沿敏锐度。

---

## 技术栈

- **框架**: Next.js 16 (App Router, React 19, TypeScript)
- **样式**: Tailwind CSS 4 + shadcn/ui
- **日期处理**: date-fns
- **图标**: Lucide React

---

## 项目结构

```
foresight/
├── app/
│   ├── components/          # 业务组件
│   │   ├── CalendarGrid.tsx     # PC端月历网格
│   │   ├── MobileTimeline.tsx   # 移动端时间轴
│   │   ├── EventSheet.tsx       # 事件详情抽屉
│   │   └── TagFilter.tsx        # 领域标签筛选
│   ├── data/
│   │   └── events.ts            # 2026年5月真实事件数据
│   ├── types/
│   │   └── event.ts             # 数据类型定义
│   ├── page.tsx                 # 主页面
│   ├── layout.tsx               # 根布局
│   └── globals.css              # 全局样式
├── components/ui/           # shadcn/ui 基础组件
├── public/                  # 静态资源
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 本地运行步骤

### 1. 进入项目目录

```bash
cd foresight
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

---

## 生产构建

```bash
npm run build
```

构建产物将输出到 `dist/` 目录，可直接部署到任何静态托管服务（Vercel、Cloudflare Pages、GitHub Pages 等）。

---

## 功能特性

### 前台用户端

- **完全响应式月历视图**
  - PC 大屏：宽大月历网格，默认高亮当前日期，点击日期筛选当天事件
  - 移动端：精简滑动日历条 + 垂直事件时间轴列表，适配企业微信 H5
- **领域标签过滤**：一键筛选 AI大模型 / 汽车 / 科技 / 游戏 / 消费电子 等标签
- **结构化事件详情抽屉（Sheet）**
  - 未来事件：展示日期、时间、场地状态（线上/线下）、直播链接
  - 过去事件：深度复盘卡片（TL;DR、关键突破、行业映射、行动启示）

### 数据

- 初始数据全部来源于 **IT之家 2026年5月大事记** 真实行业事件
- 覆盖 5月1日 ~ 5月30日 共 **60+** 个科技/汽车行业大事件
- 包含苹果、微软、谷歌、百度、字节、索尼、大疆、比亚迪、极氪、蔚来、理想等品牌

---

## 后续扩展方向

1. **后台管理端**：TanStack Table 数据表格 + 富文本表单抽屉 + Excel/CSV 批量导入导出
2. **AI 智能录入**：视觉大模型解析行业大事记长图 → 结构化数据 → 待确认导入列表
3. **AI 智能增强**：搜索引擎 API 自动补全事件时间/地点/链接，管理员审批后同步前台
4. **企业微信集成**：SSO 单点登录适配、企微群机器人 Webhook 每日晨报推送
5. **数据库持久化**：Prisma ORM + PostgreSQL 替代静态数据

---

## License

Internal Use Only
