# 博客文章添加操作指导

本文档提供了在个人作品集网站中添加新博客文章的标准操作流程，确保每篇文章都能正确显示和访问。

## 📋 操作清单

### 步骤一：准备工作
- [ ] 确保本地开发环境已搭建
- [ ] 确保有 Git 和 Firebase CLI 访问权限
- [ ] 准备好文章内容和相关资源（图片等）

### 步骤二：创建文章文件
- [ ] 在 `public/blog/` 目录下创建新的 `.md` 文件
- [ ] 文件命名遵循格式：`YYYY-MM-DD-article-slug.md`
- [ ] 添加正确的 Front Matter 头部信息
- [ ] 编写文章正文内容

### 步骤三：更新文章索引
- [ ] 修改 `public/blog/articles.json` 文件
- [ ] 将新文件名添加到文章列表中
- [ ] 确保按时间倒序排列

### 步骤四：测试和部署
- [ ] 本地测试文章显示效果
- [ ] Git 提交所有更改
- [ ] 推送到 GitHub 触发自动部署

---

## 📝 详细操作步骤

### 1. 文件命名规范

**格式：** `YYYY-MM-DD-article-slug.md`

**示例：**
```
2025-01-27-react-hooks-guide.md
2025-01-28-css-grid-layout.md
2025-02-01-firebase-deployment.md
```

**命名规则：**
- 日期使用 YYYY-MM-DD 格式
- 文章标识用小写字母和连字符
- 避免使用中文、空格和特殊符号
- 保持简洁且具有描述性

### 2. Front Matter 头部信息

每篇文章必须以 YAML Front Matter 开头，包含以下必填和可选字段：

```yaml
---
title: "文章标题"                    # 必填：文章显示标题
date: "YYYY-MM-DD"                  # 必填：发布日期，格式严格
author: "HUANGYING"                 # 必填：作者名称
tags: ["标签1", "标签2", "标签3"]    # 必填：文章标签数组
excerpt: "文章简介摘要"              # 必填：显示在文章列表的摘要
coverImage: "/assets/images/xxx.jpg" # 可选：文章封面图片
---
```

**字段说明：**

- **title**: 文章标题，用双引号包围，支持中英文
- **date**: 发布日期，必须使用 YYYY-MM-DD 格式
- **author**: 作者名称，通常为 "HUANGYING"
- **tags**: 标签数组，用于文章分类和过滤
- **excerpt**: 文章摘要，1-2句话概括文章内容
- **coverImage**: 封面图片路径（可选）

**常用标签参考：**
```yaml
# 技术类
["React", "JavaScript", "技术教程"]
["Vue", "前端开发", "组件设计"]
["Node.js", "后端开发", "API设计"]
["Firebase", "部署", "云服务"]

# 项目类
["项目启动", "开发日志", "产品设计"]
["开源项目", "代码分享", "GitHub"]

# 学习类
["学习笔记", "技术总结", "最佳实践"]
["性能优化", "代码重构", "架构设计"]
```

### 3. Markdown 语法支持

系统支持以下 Markdown 语法：

#### 标题
```markdown
# 一级标题
## 二级标题
### 三级标题
```

#### 文本格式
```markdown
**粗体文本**
*斜体文本*
`行内代码`
```

#### 代码块
````markdown
```javascript
function example() {
    console.log('Hello World');
}
```
````

#### 链接
```markdown
[链接文本](https://example.com)
```

#### 列表
```markdown
- 无序列表项1
- 无序列表项2

1. 有序列表项1
2. 有序列表项2
```

#### 表格
```markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 内容1 | 内容2 | 内容3 |
| 内容4 | 内容5 | 内容6 |
```

### 4. 完整示例

**文件名：** `2025-01-27-react-hooks-tutorial.md`

```markdown
---
title: "React Hooks 完全指南"
date: "2025-01-27"
author: "HUANGYING"
tags: ["React", "JavaScript", "技术教程", "前端开发"]
excerpt: "深入解析 React Hooks 的使用方法和最佳实践，从基础的 useState 到自定义 Hook 的高级应用。"
coverImage: "/assets/images/react-hooks-cover.jpg"
---

# React Hooks 完全指南

React Hooks 是 React 16.8 引入的重要特性，它让函数组件也能使用状态和其他 React 特性。

## 基础 Hooks

### useState Hook

`useState` 是最常用的 Hook，用于在函数组件中添加状态。

```javascript
import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    );
}
```

### useEffect Hook

`useEffect` 用于处理副作用，如数据获取、订阅等。

```javascript
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        fetchUser(userId).then(setUser);
    }, [userId]);
    
    return user ? <div>{user.name}</div> : <div>Loading...</div>;
}
```

## 最佳实践

1. **依赖数组的正确使用**
2. **自定义 Hook 的抽象**
3. **性能优化技巧**

## 总结

React Hooks 提供了一种更简洁、更强大的方式来编写 React 组件...
```

### 5. 更新文章索引

修改 `public/blog/articles.json` 文件：

```json
{
  "articles": [
    "2025-01-27-react-hooks-tutorial.md",  // 新文章添加在最前面
    "2025-01-27-firebase-auth-guide.md",
    "2025-01-27-project-launch.md"
  ]
}
```

**重要提醒：**
- 新文章必须添加在数组的最前面（时间倒序）
- 文件名必须与实际创建的 `.md` 文件名完全一致
- JSON 格式必须正确，注意逗号和引号

### 6. 资源文件管理

如果文章需要使用图片或其他资源：

#### 图片存放路径
```
public/assets/images/
├── blog/
│   ├── react-hooks-cover.jpg
│   ├── firebase-guide-01.png
│   └── project-screenshot.jpg
├── projects/
└── icons/
```

#### 在文章中引用
```markdown
![图片描述](/assets/images/blog/react-hooks-cover.jpg)
```

### 7. Git 操作流程

```bash
# 1. 添加所有更改
git add .

# 2. 提交更改
git commit -m "feat: 添加新博客文章 - React Hooks 完全指南

- 新增 React Hooks 技术教程文章
- 包含基础和高级用法示例
- 更新文章索引列表"

# 3. 推送到远程仓库
git push origin main
```

### 8. 本地测试

在推送前，建议先在本地测试：

```bash
# 启动本地开发服务器
firebase serve

# 或者使用 Python 简单服务器
cd public
python -m http.server 8000
```

访问 `http://localhost:5000` 或 `http://localhost:8000` 检查：
- [ ] 文章是否出现在博客列表中
- [ ] 文章内容是否正确显示
- [ ] 标签过滤是否正常工作
- [ ] 移动端显示是否正常

---

## ⚠️ 常见错误和注意事项

### 1. Front Matter 格式错误
```yaml
# ❌ 错误示例
---
title: React Hooks 指南  # 缺少引号
date: 2025-01-27        # 缺少引号
tags: React, JavaScript # 不是数组格式
---

# ✅ 正确示例
---
title: "React Hooks 指南"
date: "2025-01-27"
tags: ["React", "JavaScript"]
---
```

### 2. 文件名不一致
```json
// ❌ 错误：articles.json 中的文件名与实际文件名不匹配
{
  "articles": [
    "2025-01-27-react-hooks.md"  // 实际文件名是 react-hooks-tutorial.md
  ]
}
```

### 3. 日期格式错误
```yaml
# ❌ 错误格式
date: "2025/1/27"
date: "27-01-2025"
date: "Jan 27, 2025"

# ✅ 正确格式
date: "2025-01-27"
```

### 4. 标签数组格式错误
```yaml
# ❌ 错误格式
tags: "React, JavaScript, 教程"
tags: React
tags: [React, JavaScript]  # 缺少引号

# ✅ 正确格式
tags: ["React", "JavaScript", "教程"]
```

---

## 🔧 故障排除

### 问题：文章不显示在列表中
**检查项：**
1. 文件名是否添加到 `articles.json`
2. JSON 格式是否正确
3. Front Matter 是否完整
4. 浏览器是否有缓存

### 问题：文章内容显示异常
**检查项：**
1. Front Matter 的 `---` 分隔符是否正确
2. Markdown 语法是否有误
3. 特殊字符是否需要转义

### 问题：图片不显示
**检查项：**
1. 图片路径是否正确
2. 图片文件是否存在
3. 路径是否以 `/` 开头

---

## 📚 参考资源

- [Markdown 语法指南](https://www.markdownguide.org/)
- [YAML Front Matter 规范](https://jekyllrb.com/docs/front-matter/)
- [Firebase Hosting 文档](https://firebase.google.com/docs/hosting)

---

**最后更新：** 2025-01-27  
**维护者：** HUANGYING 