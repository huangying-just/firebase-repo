# 博客系统使用指南

## 📝 如何添加新文章

### 1. 创建Markdown文件
在 `public/blog/` 目录下创建新的 `.md` 文件，文件名格式：
```
YYYY-MM-DD-article-slug.md
```

例如：`2025-01-28-my-new-article.md`

### 2. 文章格式

每篇文章需要包含以下结构：

```markdown
---
title: "文章标题"
date: "2025-01-28"
author: "HUANGYING"
tags: ["标签1", "标签2", "标签3"]
excerpt: "文章摘要，会显示在文章列表中"
coverImage: "/assets/images/article-cover.jpg"
---

# 文章正文标题

这里是文章的正文内容...

## 二级标题

### 三级标题

**粗体文本**

*斜体文本*

`行内代码`

```javascript
// 代码块
function example() {
    console.log('Hello World');
}
```

- 列表项1
- 列表项2
- 列表项3

1. 有序列表项1
2. 有序列表项2

[链接文本](https://example.com)
```

### 3. Front Matter 字段说明

- `title`: 文章标题（必需）
- `date`: 发布日期，格式：YYYY-MM-DD（必需）
- `author`: 作者名称（可选，默认为 HUANGYING）
- `tags`: 标签数组，用于分类筛选（可选）
- `excerpt`: 文章摘要（可选，建议提供）
- `coverImage`: 封面图片路径（可选，默认使用 default-blog.jpg）

### 4. 更新文章列表

在 `blog-manager.js` 中的 `loadArticles()` 方法中添加新文章文件名：

```javascript
const articleFiles = [
    '2025-01-27-project-launch.md',
    '2025-01-27-firebase-auth-guide.md',
    '2025-01-28-my-new-article.md'  // 新增这行
];
```

## 🖼️ 图片和资源管理

### 资源目录结构
```
public/assets/
├── images/          # 图片资源
│   ├── blog/       # 博客相关图片
│   └── projects/   # 项目相关图片
├── videos/         # 视频资源
├── documents/      # 文档资源
└── icons/          # 图标资源
```

### 在文章中使用图片
```markdown
![图片描述](/assets/images/blog/my-image.jpg)
```

### 封面图片
推荐尺寸：800x400px
支持格式：JPG, PNG, WebP

## 🏷️ 标签系统

当前支持的标签（可在 `blog-manager.js` 中添加新标签）：
- 项目启动
- Firebase
- Web开发
- 技术教程
- React
- Node.js
- 云服务
- 用户体验
- 性能优化

## ✨ Markdown支持的语法

当前博客系统支持以下Markdown语法：

### 基础语法
- **标题** (H1-H3)
- **粗体** (`**文本**`)
- **斜体** (`*文本*`)
- **行内代码** (`代码`)
- **代码块** (```语言)
- **链接** (`[文本](URL)`)
- **无序列表** (`- 项目`)
- **有序列表** (`1. 项目`)

### 扩展功能
- **语法高亮** (代码块指定语言)
- **响应式图片**
- **文章分享**
- **阅读时间估算**
- **标签过滤**

## 🎨 自定义样式

如果需要为特定文章添加自定义样式，可以在文章中使用HTML：

```html
<div class="custom-box" style="background: #f0f0f0; padding: 1rem; border-radius: 8px;">
    自定义内容区域
</div>
```

## 📱 移动端优化

博客系统已经针对移动端进行了优化：
- 响应式卡片布局
- 触摸友好的按钮
- 优化的字体大小
- 流畅的动画效果

## 🔧 技术实现

博客系统技术栈：
- **前端**: 原生JavaScript
- **样式**: CSS3 + 动画
- **内容**: Markdown + Front Matter
- **部署**: Firebase Hosting
- **自动化**: GitHub Actions

## 📊 性能优化

- **懒加载**: 博客组件按需加载
- **图片优化**: 自动错误处理和占位符
- **动画性能**: 使用CSS3硬件加速
- **缓存策略**: 利用浏览器缓存

## 🚀 未来计划

- [ ] 搜索功能
- [ ] 评论系统
- [ ] RSS订阅
- [ ] 社交分享优化
- [ ] 深色/浅色主题切换
- [ ] 文章目录导航
- [ ] 相关文章推荐
- [ ] 全文搜索
- [ ] 文章统计

## 💡 最佳实践

1. **文件命名**: 使用日期前缀，便于排序
2. **图片优化**: 压缩图片，提升加载速度
3. **标签一致性**: 使用统一的标签命名规范
4. **摘要质量**: 提供有吸引力的文章摘要
5. **内容结构**: 使用清晰的标题层级
6. **代码示例**: 提供完整可运行的代码
7. **定期更新**: 保持内容的新鲜度

---

开始写作您的技术博客吧！🎉 