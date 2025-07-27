# 博客文章添加 - 快速参考

## 🚀 快速添加流程

### 1. 创建文章文件
```bash
# 在 public/blog/ 目录下创建
2025-01-27-your-article-title.md
```

### 2. 文章模板
```markdown
---
title: "文章标题"
date: "2025-01-27"
author: "HUANGYING"
tags: ["标签1", "标签2"]
excerpt: "文章摘要描述"
---

# 文章标题

文章正文内容...
```

### 3. 更新索引
在 `public/blog/articles.json` 中添加：
```json
{
  "articles": [
    "2025-01-27-your-article-title.md",  ← 新文章
    "2025-01-27-firebase-auth-guide.md",
    "2025-01-27-project-launch.md"
  ]
}
```

### 4. 提交发布
```bash
git add .
git commit -m "feat: 添加新博客文章 - 文章标题"
git push origin main
```

## ⚠️ 注意事项

- ✅ 文件名格式：`YYYY-MM-DD-article-slug.md`
- ✅ Front Matter 必须使用双引号
- ✅ 新文章添加在 articles.json 最前面
- ✅ 所有字段都是必填的（除了 coverImage）

## 📋 常用标签

```yaml
# 技术类
["React", "JavaScript", "技术教程"]
["Vue", "前端开发", "组件设计"]
["Firebase", "部署", "云服务"]

# 项目类  
["项目启动", "开发日志", "产品设计"]
["开源项目", "代码分享", "GitHub"]

# 学习类
["学习笔记", "技术总结", "最佳实践"]
```

---

📖 **完整指导**: 参考 [BLOG_GUIDE.md](./BLOG_GUIDE.md) 