# HUANGYING - 项目作品集网站

基于 Firebase Hosting 构建的现代化个人项目展示网站，集成了 CI/CD 自动部署和用户认证系统。

## 🌟 项目特色

- **现代化设计** - 深色主题，玻璃拟态效果，流畅动画
- **响应式布局** - 完美适配桌面端和移动端
- **项目展示** - 专业的项目作品集展示
- **博客系统** - 支持 Markdown 的动态博客系统
- **用户认证** - 完整的 Firebase Authentication 系统
- **自动部署** - GitHub Actions CI/CD 自动化部署
- **高性能** - 基于 Firebase Hosting 的全球 CDN

## 🚀 在线访问

- **网站地址**: [您的 Firebase Hosting URL]
- **Astro 项目演示**: https://astro.cflp.ai

## 📋 工作过程记录

### 第一阶段：项目初始化与部署配置

#### 1. Firebase 项目创建与配置
```bash
# 创建 Firebase 项目目录
mkdir huangying-webhosting
cd huangying-webhosting

# 初始化 Firebase 项目
firebase init hosting
```

**配置文件**:
- `firebase.json` - Firebase Hosting 配置
- `.firebaserc` - Firebase 项目配置
- `package.json` - 项目依赖和构建脚本

#### 2. GitHub Actions CI/CD 配置
设置了两个自动化工作流：

**主分支部署** (`.github/workflows/firebase-hosting-merge.yml`)
- 触发条件：推送到 main 分支
- 流程：安装依赖 → 构建项目 → 部署到生产环境

**PR 预览部署** (`.github/workflows/firebase-hosting-pull-request.yml`)
- 触发条件：创建 Pull Request
- 流程：安装依赖 → 构建项目 → 部署到预览环境

#### 3. 构建配置优化
解决了初始部署问题：
- 添加了缺失的 `build` 脚本到 `package.json`
- 升级 Node.js 版本从 18 到 20（兼容最新 Firebase CLI）
- 配置了正确的依赖安装步骤

### 第二阶段：页面设计与开发

#### 1. 个人信息中心页面
最初创建了传统的个人信息展示页面：
- 个人简介、技能展示
- 项目作品、工作经验
- 联系方式、教育背景
- 卡片式布局，现代化设计

#### 2. 现代化着陆页重构
为了更好地展示项目作品集，完全重构为着陆页：

**页面结构**:
- **英雄区域** - 引人注目的标题和统计数据
- **项目展示** - 网格布局的项目卡片
- **技能栈** - 分类展示的技术技能
- **联系区域** - 多种联系方式

**设计特色**:
- 深色渐变背景
- 玻璃拟态效果（glassmorphism）
- CSS 动画和交互效果
- 完全响应式设计

### 第三阶段：项目内容完善

#### 1. Astro 项目集成
添加了 Astro 技术栈的项目展示：
- 项目卡片：Astro 现代化网站
- 演示地址：https://astro.cflp.ai
- 技术栈：Astro, TypeScript, React, Tailwind CSS
- 在技能栈中添加了 Astro 技能标签

#### 2. 项目展示模板化
创建了可复用的项目卡片模板：
```html
<div class="project-card">
    <div class="project-image">
        <i class="fas fa-your-icon"></i>
    </div>
    <div class="project-content">
        <h3 class="project-title">项目名称</h3>
        <p class="project-description">项目描述</p>
        <div class="project-tech">
            <span class="tech-tag">技术标签</span>
        </div>
        <div class="project-links">
            <a href="#" class="project-link">查看代码</a>
            <a href="#" class="project-link">在线演示</a>
        </div>
    </div>
</div>
```

### 第四阶段：用户认证系统

#### 1. Firebase Authentication 集成
实现了完整的用户认证功能：

**认证方式**:
- 邮箱密码登录/注册
- Google 第三方登录
- 自动状态管理

**UI 组件**:
- 导航栏登录/注册按钮
- 现代化认证模态框
- 用户头像下拉菜单
- 受保护内容区域

#### 2. 用户体验优化
- 友好的中文错误提示
- 加载状态和成功提示
- 表单验证和安全处理
- 键盘快捷键支持（ESC 关闭）

## 🛠️ 技术栈

### 前端技术
- **HTML5** - 语义化标记
- **CSS3** - 现代样式和动画
- **JavaScript (ES6+)** - 交互逻辑
- **Font Awesome** - 图标库
- **Google Fonts** - 字体资源

### 后端服务
- **Firebase Hosting** - 静态网站托管
- **Firebase Authentication** - 用户认证
- **Firebase SDK** - 前端集成

### 开发工具
- **GitHub Actions** - CI/CD 自动化
- **Git** - 版本控制
- **Node.js** - 构建环境

### 设计理念
- **响应式设计** - 移动优先
- **现代化UI** - 深色主题，玻璃拟态
- **用户体验** - 流畅动画，直观交互
- **性能优化** - 懒加载，代码分割

## 📁 项目结构

```
huangying-webhosting/
├── .github/
│   └── workflows/
│       ├── firebase-hosting-merge.yml      # 主分支部署
│       └── firebase-hosting-pull-request.yml # PR预览
├── public/
│   └── index.html                          # 主页面
├── .firebaserc                             # Firebase项目配置
├── .gitignore                              # Git忽略文件
├── firebase.json                           # Firebase配置
├── package.json                            # 项目依赖
├── package-lock.json                       # 依赖锁定
└── README.md                              # 项目文档
```

## 🚀 部署说明

### 自动部署
项目配置了 GitHub Actions 自动部署：
1. 推送代码到 `main` 分支
2. GitHub Actions 自动触发构建
3. 部署到 Firebase Hosting 生产环境

### 手动部署
```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 部署到 Firebase
npm run deploy
```

## 🔧 本地开发

### 环境要求
- Node.js 20+
- npm 或 yarn
- Firebase CLI

### 启动步骤
```bash
# 克隆项目
git clone https://github.com/huangying-just/firebase-repo.git
cd firebase-repo

# 安装依赖
npm install

# 启动本地服务器
npm start
# 或
firebase serve
```

## 🔐 Firebase 配置

### Authentication 设置
1. 访问 [Firebase 控制台](https://console.firebase.google.com/)
2. 选择项目 `huangying-webhosting`
3. 启用 Authentication 服务
4. 配置登录方式：
   - Email/Password
   - Google（可选）

### Hosting 配置
```json
{
  "hosting": {
    "public": "public",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

## 📝 开发日志

### 2025-01-27
- ✅ 创建 Firebase 项目和初始配置
- ✅ 设置 GitHub Actions CI/CD 流水线
- ✅ 解决构建脚本和 Node.js 版本兼容性问题
- ✅ 设计并实现现代化着陆页
- ✅ 集成 Astro 项目展示
- ✅ 实现完整的 Firebase Authentication 系统
- ✅ 优化用户体验和界面设计

## 🎯 未来规划

### 功能增强
- [ ] 用户个人设置页面
- [ ] 项目详情页面
- [ ] 博客文章系统
- [ ] 评论和互动功能
- [ ] 数据分析统计

### 技术优化
- [ ] PWA 支持
- [ ] 服务端渲染 (SSR)
- [ ] 图片懒加载优化
- [ ] SEO 优化
- [ ] 性能监控

### 内容扩展
- [ ] 更多项目案例
- [ ] 技术博客
- [ ] 在线简历
- [ ] 联系表单
- [ ] 订阅功能

## 📞 联系方式

- **邮箱**: huangying.just@gmail.com
- **GitHub**: [huangying-just](https://github.com/huangying-just)
- **项目仓库**: [firebase-repo](https://github.com/huangying-just/firebase-repo)

## 📝 博客文章管理

本网站集成了基于 Markdown 的博客系统，支持动态加载文章内容。

### 添加新文章
详细的操作指导请参考：[**博客文章添加操作指导 (BLOG_GUIDE.md)**](./BLOG_GUIDE.md)

### 快速流程
1. 在 `public/blog/` 目录创建 `.md` 文件
2. 添加正确的 Front Matter 头部信息
3. 更新 `public/blog/articles.json` 文件索引
4. Git 提交并推送到 GitHub

**支持功能：**
- ✅ Markdown 语法支持
- ✅ 代码高亮显示
- ✅ 表格和列表
- ✅ 图片和链接
- ✅ 标签分类过滤
- ✅ 时间倒序排列
- ✅ 响应式阅读体验

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

**构建时间**: 2025年1月  
**作者**: HUANGYING  
**版本**: 1.0.0
