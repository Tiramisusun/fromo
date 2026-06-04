# FROMO - 学生活动发现平台

一个为曼哈顿学生（18-25岁）设计的移动端活动发现应用，包含学生端和合作伙伴端。

## 功能特性

### 学生端
- 🗺️ 交互式地图 + 活动列表分屏布局
- 🔍 多维度筛选（价格、距离、兴趣、无障碍）
- 🎫 活动详情页面，包含AI生成摘要
- 🚌 交通方案对比（公交、步行、骑行、打车）
- 👤 个人资料和偏好设置
- 💬 功能反馈系统

### 合作伙伴端
- 📊 数据分析面板（销量、浏览量、转化率）
- 📝 活动列表管理
- ➕ 创建新活动
- 📈 可视化图表

## 技术栈

- **React** 18.3.1
- **TypeScript**
- **Tailwind CSS** v4
- **Leaflet** (地图)
- **Motion** (动画)
- **Radix UI** (组件库)
- **Vite** (构建工具)

## 本地运行

### 前置要求
- Node.js 16+
- pnpm (推荐) 或 npm

### 安装步骤

```bash
# 1. 安装依赖
pnpm install
# 或使用 npm
npm install

# 2. 启动开发服务器
pnpm vite
# 或
npx vite

# 3. 在浏览器中打开
# 通常是 http://localhost:5173
```

## 项目结构

```
src/
├── app/
│   ├── App.tsx                 # 主应用入口
│   └── components/
│       ├── ActivityCard.tsx    # 活动卡片
│       ├── ActivityDetail.tsx  # 活动详情页
│       ├── FilterPanel.tsx     # 筛选面板
│       ├── MapView.tsx         # 地图组件
│       ├── TransportOptions.tsx # 交通选项
│       ├── Profile.tsx         # 用户资料
│       ├── PurchaseConfirmation.tsx # 购买确认
│       ├── PurchaseSuccess.tsx # 购买成功
│       └── partner/            # 合作伙伴端组件
│           ├── Sidebar.tsx
│           ├── MyListings.tsx
│           ├── CreateListing.tsx
│           └── Analytics.tsx
└── styles/
    ├── theme.css              # 主题变量
    ├── fonts.css              # 字体导入
    └── leaflet.css            # 地图样式
```

## 使用说明

### 视图切换
- 点击右上角按钮可以在"学生视图"和"合作伙伴视图"之间切换

### 学生端操作
- 拖动分隔条调整地图和列表的高度
- 点击地图上的价格标记查看活动
- 使用顶部分类和右上角筛选按钮过滤活动
- 点击活动卡片查看详情
- 在详情页点击"Get Tickets"购买门票
- 点击"See all options"查看所有交通方案

### 合作伙伴端操作
- 使用左侧导航栏切换不同页面
- 在"My Listings"中管理活动
- 在"Create Listing"中创建新活动
- 在"Analytics"中查看数据分析

## 地图数据源
- 底图：CARTO Light (免费)
- 坐标：真实的曼哈顿地标位置

## 注意事项
- 这是一个演示项目，支付功能为模拟实现
- "Open in Maps"会在新标签页打开Google Maps
- 所有活动数据均为示例数据

## 开发
```bash
# 构建生产版本（注意：在 Figma Make 环境中可能不可用）
pnpm build
```

---
由 Claude Code 生成 | Figma Make
