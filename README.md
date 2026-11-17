# APPP Website

Australia Premium Products Platform Pty Ltd — 官网改版项目。

B2B 澳洲产品采购与出口公司官网。当前线上站为旧版静态页（`index.html`，GitHub Pages 托管），
本分支 `feature/nextjs-redesign` 是按客户《更改网站内容》文档重做的 Next.js 版本。

---

## 一、技术栈

与姐妹项目 ecomops-ai 保持一致：目录结构、代码风格、配置文件写法、依赖版本全部对齐，
方便同一套流水线与维护习惯。

| 依赖 | 版本 | 说明 |
| --- | --- | --- |
| next | 16.3.6 | App Router + Turbopack |
| react / react-dom | 19.3.0 | |
| typescript | 6.0.3 | |
| tailwindcss / @tailwindcss/postcss | 4.3.3 | Tailwind v4，CSS-first 配置 |
| daisyui | 5.7.46 | 自定义品牌主题 appp |
| next-intl | 4.14.7 | 多语言骨架，当前只上线英文 |
| lucide-react | 1.48.0 | 图标 |
| framer-motion | 13.4.4 | 滚动入场动画 |
| clsx | 2.1.1 | |
| sharp | 0.35.5 | 图片处理管线 |
| @opennextjs/cloudflare | 1.20.17 | 部署到 Cloudflare Workers |
| wrangler | 4.163.0 | |

## 二、目录结构

```
├── script/build-images.mjs        图片调色 + 压缩管线
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── home/              各版块组件，一个文件一个版块
│   │   │   │   ├── hero.tsx
│   │   │   │   ├── about.tsx
│   │   │   │   ├── services.tsx
│   │   │   │   ├── products.tsx
│   │   │   │   ├── china-market.tsx
│   │   │   │   ├── private-label.tsx
│   │   │   │   ├── why-us.tsx
│   │   │   │   └── contact.tsx
│   │   │   ├── globals.css        品牌主题（深海军蓝 / 香槟金 / 暖米灰）
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── api/enquiry/route.ts   询价表单接口
│   │   ├── page.tsx               / → /en 重定向
│   │   └── reset.css
│   ├── components/                Logo、Figure、Reveal、Button、表单等
│   ├── hooks/use-active-section.ts 导航高亮
│   ├── i18n/                      next-intl 配置
│   ├── layouts/                   Navbar、Footer
│   ├── messages/en/               全部文案（component.json / home.json）
│   ├── proxy.ts                   next-intl 中间件
│   ├── types/
│   └── utils/images.ts            图片清单（由 script 自动生成）
├── open-next.config.ts
└── wrangler.jsonc
```

## 三、本地开发

```bash
npm install
npm run dev          # http://localhost:3000/en
npm run check        # tsc 类型检查
npm run images       # 重新生成 public/images 下的 WebP 与 src/utils/images.ts
npm run cf:build     # 生成 Cloudflare Worker 包
npm run cf:preview   # 用本地 workerd 预览 Worker（http://localhost:8787）
```

## 四、图片管线

原始照片放在 `img/`（约 78MB 手机原片）。`script/build-images.mjs` 会对入选的 13 张图做统一调色
（降饱和 + 暖色偏移 + 阴影向品牌海军蓝靠拢），导出三档 WebP 到 `public/images/`，并重写
`src/utils/images.ts`。页面通过 `<Figure>` 组件直接输出 `srcset`，不经过运行时图片优化。

改完照片后跑一次 `npm run images` 即可。

### 图片取舍说明

- 已排除：`img/warehouse/09-11`（肉类）、`warehouse/17`（羊）、`warehouse/24`（控制面板）、
  `img/oem-service/19-23`（Mica 自有品牌儿童补剂）、`oem-service/25`（编织篮纹理）
  —— 对应客户要求删除的品类与旧产品线。
- 保健品品类没有配图：客户明确要求品牌名只能以文字展示、不得使用品牌 Logo，
  所以 `products.tsx` 中该卡片用深色排版卡片代替照片。
- 待客户补充：现有素材全部是仓库、产线、装车现场；**奶粉成品图、保健品成品图缺失**，
  建议客户补拍。

## 五、部署到 Cloudflare Workers

选 Workers 而不是 Pages：Cloudflare 官方已建议新项目一律使用 Workers，OpenNext 的主线目标
也是 Workers；Pages 仍可用但后续功能投入都在 Workers 方向。Workers 还能跑 `/api/enquiry`
接口，Pages 需要另接第三方表单服务。

### 1. 创建 API Token

Cloudflare 控制台 → My Profile → API Tokens → Create Token，使用
Edit Cloudflare Workers 模板 + Account 权限，作用域限定到本账号。

### 2. 配置 GitHub Secret

仓库 → Settings → Secrets and variables → Actions → 新增 `CLOUDFLARE_API_TOKEN`。

### 3. 推送

- 推送非 main 分支 → 自动部署到 preview 环境（appp-preview），拿到预览网址给客户确认
- 推送 main → 自动部署生产环境（appp）

`.github/workflows/deploy-cloudflare.yml` 已配置好，构建前会自动跑 `npm run check`。

### 4. 邮件服务（询价表单）

表单走 Resend HTTP API，需要三个环境变量：

| 变量 | 说明 |
| --- | --- |
| `RESEND_API_KEY` | Resend API Key |
| `CONTACT_TO_EMAIL` | 询价接收邮箱，默认 sales_appp@outlook.com |
| `CONTACT_FROM_EMAIL` | 发件人地址，需在 Resend 中验证过域名 |

在 Cloudflare 控制台配置 Worker 的 Settings → Variables and Secrets（加密类型）。
本地调试可复制 `.dev.vars.example` 为 `.dev.vars`。

未配置 `RESEND_API_KEY` 时，接口返回 503，页面会提示客户直接发邮件到公司邮箱，功能不会中断。

## 六、本次改版删除的内容

已从全站彻底移除（构建产物中检索均为 0 命中）：

- Migration Services / Visa Application Services / Overseas Student Visa Applications
- Public / Private School Applications / Finance Support and IPO Portfolio / Construction Services
- 全部 Immigration、Visa、Finance、Investment、Construction 相关表述
- 旧的长保健品清单与 Kids Supplement (Own Brand) 清单
- Mission Statement / Company Profile / Our Goals
- "leading distributor"、"Australian government / Parliament support" 等无法证明的宣传
- "our factory" / "our manufacturing facilities" / "our state-of-the-art facilities" 等自有工厂表述
- 传真号码

## 七、发布前需客户确认

按客户《更改网站内容》文档要求，以下内容需客户确认后才能正式发布：

1. 公司当前地址（现用：PO Box 21471, Sydney, NSW 2002）
2. 公司当前邮箱（现用：sales_appp@outlook.com）
3. 传真号码是否仍使用（当前已移除）
4. 询价表单接收邮箱
5. 公司法定英文名称（现用：Australia Premium Products Platform Pty Ltd）
6. 品牌名称拼写（BioCeuticals / Herbs of Gold / Bioglan Medlab）
7. 全部产品照片 —— **目前缺奶粉与保健品成品图**
8. 电脑版 / 平板 / 手机版页面效果
9. 确认 Migration、Visa、Finance、Construction 内容已全部删除

## 八、后续可选项

- 中文版：i18n 骨架已就绪，`src/i18n/routing.ts` 里加 `"zh"` 并补
  `src/messages/zh/*.json` 即可。需客户确认中文文案（涉及海南、注册、商标等合规表述）。
- 保留 GitHub Pages 网址：如客户坚持继续用 `apppcorp.github.io/appp/`，
  可另加一条静态导出流水线（`output: "export"`）推送到 `gh-pages` 分支；
  但那样询价表单需要改用 Formspree 等第三方服务。
- 多语言切换器：`.trae/rules/theme-style.md` 要求的语言/主题切换器未加入，
  因为客户已固定配色与文案，切换器没有实际用途。
