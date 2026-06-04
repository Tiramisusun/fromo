# FROMO 学生端 - Figma 设计规范

## 📱 画板尺寸
- **设备**: iPhone 14 Pro
- **宽度**: 375px
- **高度**: 812px
- **方向**: 竖屏

---

## 🎨 设计系统

### 颜色
```
主色调（Primary）:
- Teal 500: #14B8A6
- Teal 600: #0D9488

强调色（Accent）:
- Amber 500: #F59E0B (限时优惠)
- Green 600: #059669 (折扣价格)

中性色（Neutral）:
- Gray 50: #F9FAFB (背景)
- Gray 100: #F3F4F6
- Gray 200: #E5E7EB (边框)
- Gray 500: #6B7280 (次要文字)
- Gray 700: #374151 (图标)
- Gray 900: #111827 (主要文字)
- White: #FFFFFF (卡片)

状态色:
- Red 500: #EF4444 (繁忙区域)
- Orange 500: #F97316 (较忙)
- Yellow 500: #EAB308 (适中)
- Green 500: #84CC16 (空闲)
```

### 字体
```
字体家族: System Font (SF Pro / Roboto)

标题层级:
- H1: 24px, Semi-bold (页面标题)
- H2: 20px, Semi-bold (区域标题)
- H3: 18px, Medium (卡片标题)

正文:
- Body: 14px, Regular (正文内容)
- Body Small: 12px, Regular (辅助信息)
- Caption: 10px, Regular (标签)

按钮:
- Button: 16px, Semi-bold
```

### 间距系统
```
- 4px: 最小间距
- 8px: 元素内部间距
- 12px: 小组件间距
- 16px: 标准间距（卡片内边距）
- 20px: 页面边距
- 24px: 大间距
- 32px: 区域间距
```

### 圆角
```
- 8px: 按钮、小标签
- 12px: 卡片、输入框
- 16px: 底部弹窗
- 20px: 大卡片
- 全圆: 头像、图标按钮
```

### 阴影
```
卡片阴影:
- X: 0px
- Y: 1px
- Blur: 3px
- Spread: 0px
- Color: #00000014 (10% opacity)

底部导航:
- X: 0px
- Y: -2px
- Blur: 8px
- Color: #00000014
```

---

## 📄 页面结构

### 1. 主页（Home - Map + Feed）

**布局**:
```
┌─────────────────────────┐
│ Top Bar (60px)          │ 
├─────────────────────────┤
│                         │
│   Map Section (45%)     │
│   - Leaflet Map         │
│   - Price Pins          │
│   - Heatmap Circles     │
│                         │
├─────────────────────────┤ ← Draggable Divider
│ Filter Chips (48px)     │
├─────────────────────────┤
│                         │
│   Activity Cards        │
│   - Scrollable List     │
│                         │
│                         │
├─────────────────────────┤
│ Bottom Nav (64px)       │
└─────────────────────────┘
```

**组件细节**:

**Top Bar**:
- 高度: 60px
- 背景: White
- 边框: 1px Gray 200 (底部)
- 内容: Location (MapPin icon + "Manhattan, NY") | Search icon | Filter icon

**Map Section**:
- 背景: Leaflet 地图
- 包含: 
  - 价格标记（蓝色/琥珀色圆角矩形）
  - 热力图圆圈（红/橙/黄/绿）
  - 5km 半径圈（Teal 虚线边框）
  - 图例（左下角，白色背景卡片）

**Drag Divider**:
- 高度: 24px
- 背景: White
- 包含: 居中的灰色小药丸（48px × 4px, Gray 300）

**Filter Chips**:
- 高度: 48px
- 背景: White
- 边框: 1px Gray 200 (底部)
- 内容: 横向滚动的标签
  - 未选中: Gray 100 背景, Gray 700 文字
  - 选中: Teal 500 背景, White 文字
  - 圆角: 20px
  - 内边距: 8px 16px

**Activity Card**:
- 宽度: 335px (屏幕宽 - 40px 边距)
- 高度: 自适应
- 背景: White
- 圆角: 12px
- 阴影: 标准卡片阴影
- 内边距: 0 (图片) + 12px (内容区)
- 组成:
  - 图片: 宽 335px × 高 180px, 顶部圆角 12px
  - 标题: H3, Gray 900
  - 摘要: Body Small, Gray 600
  - 距离/时间: 12px, Gray 500
  - 价格区: 
    - 原价: 14px, Gray 400, 删除线
    - 现价: 16px, Green 600, Semi-bold
  - 徽章: "Last-minute deal" (Amber 100 bg, Amber 700 text)
  - 无障碍图标: 右下角

**Bottom Navigation**:
- 高度: 64px
- 背景: White
- 阴影: 顶部阴影
- 图标: 24px × 24px
- 4个标签: Home, Search, Saved, Profile
- 选中状态: Teal 500, 描边加粗
- 未选中: Gray 500

---

### 2. 活动详情页（Activity Detail）

**布局**:
```
┌─────────────────────────┐
│                         │
│   Hero Image            │
│   - Back Button         │
│   - Bookmark Button     │
│                         │
├─────────────────────────┤
│ Scrollable Content:     │
│ - Title + Category      │
│ - Price Card            │
│ - AI Summary            │
│ - Accessibility Info    │
│ - Getting There         │
│   (2 transport options) │
│ - Warning Banner        │
├─────────────────────────┤
│ Sticky Button (60px)    │
└─────────────────────────┘
```

**组件细节**:

**Hero Image**:
- 宽高比: 16:9
- 覆盖层: 黑色渐变（从顶部 30% 透明度到透明）
- Back Button: 左上角, 黑色半透明背景, 白色图标
- Bookmark Button: 右上角, 同上

**Price Card**:
- 背景: White
- 圆角: 16px
- 内边距: 16px
- 内容:
  - 现价: 20px, Green 600, Semi-bold
  - 原价: 16px, Gray 400, 删除线
  - 折扣标签: Amber 100 bg, Amber 700 text, "60% off"
  - 倒计时: 14px, Clock icon + "Offer ends in 1h 45m"

**AI Summary Card**:
- 背景: White
- 圆角: 16px
- 内边距: 16px
- 头部: Sparkle icon (Purple 500) + "AI SUMMARY" (Gray 500, 10px, uppercase)
- 内容: 14px, Gray 600, leading-relaxed

**Transport Options**:
- 标题: "Getting There" + "See all options →" (Teal 600)
- 每个选项:
  - 背景: White
  - 圆角: 12px
  - 高度: 72px
  - 左侧: 图标 (Gray 100 背景圆圈)
  - 中间: 标签名称 + 时间
  - 右侧: 价格

**Warning Banner**:
- 背景: Amber 50
- 边框: 1px Amber 200
- 圆角: 12px
- 内边距: 12px
- 图标: AlertTriangle (Amber 600)
- 文字: 14px, Amber 800

**Sticky Button**:
- 高度: 60px (含 padding)
- 背景: White
- 边框: 1px Gray 200 (顶部)
- 按钮: Teal 500, 宽度 100%, 高度 48px, 圆角 12px

---

### 3. 交通选项页（Transport Options）

**布局**:
```
┌─────────────────────────┐
│ Top Bar                 │
│ - Back + Title          │
├─────────────────────────┤
│ Origin/Destination      │
├─────────────────────────┤
│ Mode Tabs (Bus/Walk...) │
├─────────────────────────┤
│ Warning Banner (if any) │
│                         │
│ Route Cards (scrollable)│
│ - Route 1               │
│ - Route 2               │
│ - Route 3               │
│                         │
├─────────────────────────┤
│ Sticky Button           │
└─────────────────────────┘
```

**Mode Tabs**:
- 高度: 64px
- 背景: White
- 边框: 1px Gray 200 (底部)
- 每个标签: 图标 (20px) + 文字 (14px)
- 选中: Teal 500 底部边框 (2px), Teal 600 文字
- 未选中: Gray 500

**Route Card**:
- 背景: White
- 圆角: 12px
- 边框: 1px Gray 100
- 内边距: 16px
- 内容:
  - 路线名称: 16px, Gray 900, Semi-bold
  - 换乘信息: 12px, Gray 500
  - 价格: 16px, Gray 900, Semi-bold (右上)
  - 时长: 12px, Gray 500 (右上)
  - 时间轴: "Departs 7:14 PM" → "Arrives 7:36 PM"

---

### 4. 用户资料页（Profile）

**组件**:

**User Card**:
- 背景: White
- 圆角: 16px
- 内边距: 20px
- 头像: 64px 圆形, Teal 渐变背景, 白色首字母缩写
- 名字: 18px, Gray 900, Semi-bold
- 邮箱: 14px, Gray 600

**Interests Section**:
- 标题: "My Interests" (16px, Gray 900, Semi-bold)
- Chips: 
  - 选中: Teal 100 bg, Teal 700 text
  - 未选中: Gray 100 bg, Gray 700 text
  - 圆角: 20px
  - 内边距: 8px 16px

**Budget Slider**:
- Track: Gray 200, 高度 4px
- Fill: Teal 500
- Thumb: 20px 圆形, White, Teal 500 边框
- 数值显示: 左侧 $0, 右侧 $50

**Settings List**:
- 每项高度: 56px
- 边框: 1px Gray 200 (底部)
- 图标: 20px, Gray 700
- 文字: 16px, Gray 900
- 箭头: ChevronRight, Gray 400

---

### 5. 筛选面板（Filter Panel - Bottom Sheet）

**容器**:
- 背景: White
- 圆角: 16px (仅顶部)
- 最大高度: 85vh
- 从底部滑入动画

**Header**:
- 高度: 60px
- 内容: "Filters" 标题 + Close 按钮
- 边框: 1px Gray 200 (底部)

**Content Sections**:

1. **Budget**:
   - 标题: "Budget" (16px, Gray 900, Semi-bold)
   - Slider: 同用户资料页

2. **Distance**:
   - 标题: "Distance"
   - Segmented Control:
     - 选项: 0.5km | 1km | 2km | 5km+
     - 选中: Teal 500 bg, White text
     - 未选中: White bg, Gray 700 text, Gray 300 边框

3. **Interests**:
   - 标题: "Interests"
   - Multi-select chips (同用户资料)

4. **Accessibility**:
   - Toggle Switch:
     - Track: Gray 200 (off), Teal 500 (on)
     - Thumb: White, 有阴影

**Footer**:
- 高度: 80px
- 两个按钮并排:
  - Reset: Gray 300 边框, Gray 700 text, 透明背景
  - Apply: Teal 500 bg, White text

---

## 🎭 状态和交互

### 按钮状态
```
Primary Button (Teal):
- Normal: bg-teal-500
- Hover: bg-teal-600
- Active: bg-teal-700
- Disabled: bg-gray-200, text-gray-400

Secondary Button (Outline):
- Normal: border-gray-300, text-gray-700
- Hover: bg-gray-50
- Active: bg-gray-100
```

### 卡片交互
```
Activity Card:
- Normal: shadow-sm
- Hover: shadow-md, scale(1.01)
- Active: scale(0.99)
```

### 地图标记
```
Price Pin:
- Normal: scale(1)
- Selected: scale(1.15), white border (2px)
- Hover: slight shadow increase
```

---

## 📐 Figma 创建步骤

1. **创建画板**
   - 新建文件 "FROMO - Student App"
   - 创建 5 个画板 (375 × 812px)
   - 命名: Home, Activity Detail, Transport, Profile, Filter Panel

2. **创建样式**
   - Colors: 创建所有颜色变量
   - Text Styles: 创建字体层级
   - Effects: 创建阴影效果

3. **创建组件**
   - Button (Primary, Secondary)
   - Filter Chip (Active, Inactive)
   - Nav Tab (Active, Inactive)
   - Activity Card
   - Transport Card
   - Input Field
   - Toggle Switch
   - Bottom Sheet

4. **搭建页面**
   - 使用自动布局 (Auto Layout)
   - 设置约束 (Constraints)
   - 添加交互原型 (Prototype)

5. **添加原型流程**
   - Home → Activity Detail (点击卡片)
   - Activity Detail → Transport (点击 "See all options")
   - Home → Filter Panel (点击筛选图标)
   - Home → Profile (点击底部导航)

---

## 🎨 设计资源

### 图标
使用 Lucide Icons 插件:
- MapPin
- Search
- SlidersHorizontal
- ArrowLeft
- Bookmark
- Clock
- Sparkles
- Accessibility
- Bus
- Footprints
- Bike
- Car
- ChevronRight
- X

### 图片
使用 Unsplash 插件搜索:
- "live music concert"
- "outdoor sports"
- "food event"
- "student activities"

---

## ✅ 导出检查清单

- [ ] 所有颜色使用颜色变量
- [ ] 所有文本使用文本样式
- [ ] 按钮创建为可复用组件
- [ ] 使用自动布局确保响应式
- [ ] 添加交互原型连接
- [ ] 命名清晰规范
- [ ] 整理图层结构
- [ ] 添加页面说明注释

---

生成时间: 2026-06-03
版本: 1.0
