/**
 * 博客管理器
 * 负责加载、解析和管理博客文章
 */

class BlogManager {
    constructor() {
        this.articles = [];
        this.isLoaded = false;
        this.currentPage = 1;
        this.articlesPerPage = 6;
    }

    /**
     * 初始化博客管理器
     */
    async init() {
        try {
            await this.loadArticles();
            this.renderBlogSection();
            this.isLoaded = true;
            console.log('博客管理器初始化成功');
        } catch (error) {
            console.error('博客管理器初始化失败:', error);
        }
    }

    /**
     * 加载所有博客文章
     */
    async loadArticles() {
        // 这里列出所有博客文章文件
        const articleFiles = [
            '2025-01-27-project-launch.md',
            '2025-01-27-firebase-auth-guide.md'
        ];

        const articles = [];
        
        for (const filename of articleFiles) {
            try {
                const response = await fetch(`/blog/${filename}`);
                if (response.ok) {
                    const content = await response.text();
                    const article = this.parseMarkdown(content, filename);
                    articles.push(article);
                }
            } catch (error) {
                console.error(`加载文章 ${filename} 失败:`, error);
            }
        }

        // 按日期排序（最新的在前）
        this.articles = articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    /**
     * 解析Markdown文件
     */
    parseMarkdown(content, filename) {
        const lines = content.split('\n');
        let frontMatterEnd = -1;
        let frontMatter = {};

        // 解析Front Matter
        if (lines[0] === '---') {
            for (let i = 1; i < lines.length; i++) {
                if (lines[i] === '---') {
                    frontMatterEnd = i;
                    break;
                }
                const [key, ...valueParts] = lines[i].split(':');
                if (key && valueParts.length > 0) {
                    let value = valueParts.join(':').trim();
                    
                    // 处理特殊格式
                    if (value.startsWith('"') && value.endsWith('"')) {
                        value = value.slice(1, -1);
                    } else if (value.startsWith('[') && value.endsWith(']')) {
                        value = JSON.parse(value);
                    }
                    
                    frontMatter[key.trim()] = value;
                }
            }
        }

        // 获取正文内容
        const bodyContent = lines.slice(frontMatterEnd + 1).join('\n');
        
        // 简单的Markdown转HTML（基础功能）
        const htmlContent = this.markdownToHtml(bodyContent);

        return {
            id: filename.replace('.md', ''),
            filename,
            ...frontMatter,
            content: bodyContent,
            htmlContent,
            readingTime: this.calculateReadingTime(bodyContent)
        };
    }

    /**
     * 简单的Markdown转HTML转换器
     */
    markdownToHtml(markdown) {
        let html = markdown;

        // 代码块
        html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');
        
        // 行内代码
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        // 标题
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
        
        // 粗体和斜体
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // 链接
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
        
        // 列表
        html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
        html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');
        
        // 包装列表项
        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
        
        // 段落
        html = html.replace(/\n\n/g, '</p><p>');
        html = '<p>' + html + '</p>';
        
        // 清理空段落
        html = html.replace(/<p><\/p>/g, '');
        html = html.replace(/<p>(<h[1-6]>.*<\/h[1-6]>)<\/p>/g, '$1');
        html = html.replace(/<p>(<pre>.*<\/pre>)<\/p>/g, '$1');
        html = html.replace(/<p>(<ul>.*<\/ul>)<\/p>/g, '$1');

        return html;
    }

    /**
     * 计算阅读时间
     */
    calculateReadingTime(content) {
        const wordsPerMinute = 200; // 平均阅读速度
        const words = content.length / 2; // 中文按字符数除以2估算
        const minutes = Math.ceil(words / wordsPerMinute);
        return `约 ${minutes} 分钟阅读`;
    }

    /**
     * 渲染博客区域
     */
    renderBlogSection() {
        const blogSection = this.createBlogSection();
        
        // 在技能栈区域后插入博客区域
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            skillsSection.insertAdjacentElement('afterend', blogSection);
        } else {
            // 如果找不到技能栈区域，就插入到联系区域前
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.insertAdjacentElement('beforebegin', blogSection);
            }
        }

        // 更新导航菜单
        this.updateNavigation();
    }

    /**
     * 创建博客区域HTML
     */
    createBlogSection() {
        const section = document.createElement('section');
        section.id = 'blog';
        section.className = 'blog';
        
        section.innerHTML = `
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">技术博客</h2>
                    <p class="section-subtitle">
                        分享技术心得、项目经验和开发感悟，记录我的技术成长历程。
                    </p>
                </div>
                
                <div class="blog-filters">
                    <button class="filter-btn active" data-filter="all">全部</button>
                    <button class="filter-btn" data-filter="项目启动">项目启动</button>
                    <button class="filter-btn" data-filter="Firebase">Firebase</button>
                    <button class="filter-btn" data-filter="Web开发">Web开发</button>
                    <button class="filter-btn" data-filter="技术教程">技术教程</button>
                </div>
                
                <div class="blog-grid" id="blog-grid">
                    ${this.renderArticles()}
                </div>
                
                <div class="blog-pagination" id="blog-pagination">
                    ${this.renderPagination()}
                </div>
            </div>
        `;

        // 添加样式
        this.addBlogStyles();
        
        // 绑定事件
        setTimeout(() => {
            this.bindBlogEvents();
        }, 100);

        return section;
    }

    /**
     * 渲染文章列表
     */
    renderArticles(page = 1, filter = 'all') {
        let filteredArticles = this.articles;
        
        if (filter !== 'all') {
            filteredArticles = this.articles.filter(article => 
                article.tags && article.tags.includes(filter)
            );
        }

        const startIndex = (page - 1) * this.articlesPerPage;
        const endIndex = startIndex + this.articlesPerPage;
        const pageArticles = filteredArticles.slice(startIndex, endIndex);

        return pageArticles.map(article => `
            <article class="blog-card" data-tags="${(article.tags || []).join(',')}">
                <div class="blog-card-image">
                    <img src="${article.coverImage || '/assets/images/default-blog.jpg'}" 
                         alt="${article.title}"
                         onerror="this.src='/assets/images/default-blog.jpg'">
                    <div class="blog-card-overlay">
                        <button class="read-more-btn" onclick="blogManager.openArticle('${article.id}')">
                            阅读全文
                        </button>
                    </div>
                </div>
                <div class="blog-card-content">
                    <div class="blog-meta">
                        <span class="blog-date">
                            <i class="fas fa-calendar"></i>
                            ${this.formatDate(article.date)}
                        </span>
                        <span class="blog-reading-time">
                            <i class="fas fa-clock"></i>
                            ${article.readingTime}
                        </span>
                    </div>
                    <h3 class="blog-title">${article.title}</h3>
                    <p class="blog-excerpt">${article.excerpt || '暂无摘要'}</p>
                    <div class="blog-tags">
                        ${(article.tags || []).map(tag => 
                            `<span class="blog-tag">${tag}</span>`
                        ).join('')}
                    </div>
                    <div class="blog-footer">
                        <span class="blog-author">
                            <i class="fas fa-user"></i>
                            ${article.author || 'HUANGYING'}
                        </span>
                        <button class="blog-share-btn" onclick="blogManager.shareArticle('${article.id}')">
                            <i class="fas fa-share-alt"></i>
                        </button>
                    </div>
                </div>
            </article>
        `).join('');
    }

    /**
     * 渲染分页
     */
    renderPagination() {
        const totalPages = Math.ceil(this.articles.length / this.articlesPerPage);
        if (totalPages <= 1) return '';

        let pagination = '<div class="pagination-buttons">';
        
        for (let i = 1; i <= totalPages; i++) {
            const activeClass = i === this.currentPage ? 'active' : '';
            pagination += `
                <button class="pagination-btn ${activeClass}" 
                        onclick="blogManager.goToPage(${i})">
                    ${i}
                </button>
            `;
        }
        
        pagination += '</div>';
        return pagination;
    }

    /**
     * 添加博客样式
     */
    addBlogStyles() {
        if (document.getElementById('blog-styles')) return;

        const style = document.createElement('style');
        style.id = 'blog-styles';
        style.textContent = `
            .blog {
                padding: 6rem 0;
                background: linear-gradient(180deg, #16213e 0%, #1a1a2e 100%);
            }

            .blog-filters {
                display: flex;
                justify-content: center;
                gap: 1rem;
                margin-bottom: 3rem;
                flex-wrap: wrap;
            }

            .filter-btn {
                padding: 0.5rem 1rem;
                background: transparent;
                color: rgba(255, 255, 255, 0.7);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.9rem;
            }

            .filter-btn:hover,
            .filter-btn.active {
                background: var(--primary-gradient);
                color: white;
                border-color: transparent;
            }

            .blog-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 2rem;
                margin-bottom: 3rem;
            }

            .blog-card {
                background: var(--bg-glass);
                border-radius: var(--border-radius);
                overflow: hidden;
                border: 1px solid rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(20px);
                transition: all 0.4s ease;
                opacity: 0;
                transform: translateY(30px);
                animation: slideInUp 0.6s ease forwards;
            }

            .blog-card:hover {
                transform: translateY(-10px);
                box-shadow: var(--shadow-bold);
                border-color: rgba(102, 126, 234, 0.3);
            }

            .blog-card-image {
                position: relative;
                height: 200px;
                overflow: hidden;
            }

            .blog-card-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.3s ease;
            }

            .blog-card:hover .blog-card-image img {
                transform: scale(1.05);
            }

            .blog-card-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            }

            .blog-card:hover .blog-card-overlay {
                opacity: 1;
            }

            .read-more-btn {
                padding: 0.5rem 1rem;
                background: var(--primary-gradient);
                color: white;
                border: none;
                border-radius: 20px;
                cursor: pointer;
                font-weight: 500;
                transition: transform 0.3s ease;
            }

            .read-more-btn:hover {
                transform: scale(1.05);
            }

            .blog-card-content {
                padding: 1.5rem;
            }

            .blog-meta {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
                font-size: 0.8rem;
                color: rgba(255, 255, 255, 0.6);
            }

            .blog-meta span {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .blog-title {
                font-size: 1.2rem;
                font-weight: 600;
                color: white;
                margin-bottom: 0.75rem;
                line-height: 1.4;
            }

            .blog-excerpt {
                color: rgba(255, 255, 255, 0.7);
                font-size: 0.9rem;
                line-height: 1.6;
                margin-bottom: 1rem;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            .blog-tags {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 1rem;
                flex-wrap: wrap;
            }

            .blog-tag {
                background: rgba(102, 126, 234, 0.2);
                color: #667eea;
                padding: 0.2rem 0.6rem;
                border-radius: 12px;
                font-size: 0.7rem;
                font-weight: 500;
                border: 1px solid rgba(102, 126, 234, 0.3);
            }

            .blog-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 1rem;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }

            .blog-author {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.8rem;
                color: rgba(255, 255, 255, 0.6);
            }

            .blog-share-btn {
                background: none;
                border: none;
                color: rgba(255, 255, 255, 0.6);
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 50%;
                transition: all 0.3s ease;
            }

            .blog-share-btn:hover {
                background: rgba(255, 255, 255, 0.1);
                color: white;
            }

            .blog-pagination {
                display: flex;
                justify-content: center;
                margin-top: 2rem;
            }

            .pagination-buttons {
                display: flex;
                gap: 0.5rem;
            }

            .pagination-btn {
                padding: 0.5rem 1rem;
                background: transparent;
                color: rgba(255, 255, 255, 0.7);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .pagination-btn:hover,
            .pagination-btn.active {
                background: var(--primary-gradient);
                color: white;
                border-color: transparent;
            }

            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @media (max-width: 768px) {
                .blog-grid {
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                }

                .blog-filters {
                    gap: 0.5rem;
                }

                .filter-btn {
                    padding: 0.4rem 0.8rem;
                    font-size: 0.8rem;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    /**
     * 绑定博客事件
     */
    bindBlogEvents() {
        // 过滤按钮事件
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                const filter = e.target.dataset.filter;
                this.filterArticles(filter);
            });
        });
    }

    /**
     * 过滤文章
     */
    filterArticles(filter) {
        const blogGrid = document.getElementById('blog-grid');
        if (blogGrid) {
            blogGrid.innerHTML = this.renderArticles(1, filter);
        }
    }

    /**
     * 跳转到指定页面
     */
    goToPage(page) {
        this.currentPage = page;
        const blogGrid = document.getElementById('blog-grid');
        const pagination = document.getElementById('blog-pagination');
        
        if (blogGrid) {
            blogGrid.innerHTML = this.renderArticles(page);
        }
        if (pagination) {
            pagination.innerHTML = this.renderPagination();
        }
    }

    /**
     * 打开文章详情
     */
    openArticle(articleId) {
        const article = this.articles.find(a => a.id === articleId);
        if (!article) return;

        // 创建文章详情模态框
        const modal = this.createArticleModal(article);
        document.body.appendChild(modal);
        
        // 显示模态框
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    /**
     * 创建文章详情模态框
     */
    createArticleModal(article) {
        const modal = document.createElement('div');
        modal.className = 'article-modal';
        modal.innerHTML = `
            <div class="article-modal-content">
                <button class="article-close" onclick="this.closest('.article-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
                <div class="article-header">
                    <h1>${article.title}</h1>
                    <div class="article-meta">
                        <span><i class="fas fa-calendar"></i> ${this.formatDate(article.date)}</span>
                        <span><i class="fas fa-user"></i> ${article.author}</span>
                        <span><i class="fas fa-clock"></i> ${article.readingTime}</span>
                    </div>
                </div>
                <div class="article-content">
                    ${article.htmlContent}
                </div>
            </div>
        `;

        // 添加模态框样式
        this.addArticleModalStyles();

        return modal;
    }

    /**
     * 添加文章模态框样式
     */
    addArticleModalStyles() {
        if (document.getElementById('article-modal-styles')) return;

        const style = document.createElement('style');
        style.id = 'article-modal-styles';
        style.textContent = `
            .article-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 3000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }

            .article-modal.show {
                opacity: 1;
                visibility: visible;
            }

            .article-modal-content {
                background: white;
                border-radius: 20px;
                max-width: 800px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }

            .article-modal.show .article-modal-content {
                transform: scale(1);
            }

            .article-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: rgba(0, 0, 0, 0.1);
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                cursor: pointer;
                z-index: 10;
                transition: background 0.3s ease;
            }

            .article-close:hover {
                background: rgba(0, 0, 0, 0.2);
            }

            .article-header {
                padding: 2rem 2rem 1rem;
                border-bottom: 1px solid #eee;
            }

            .article-header h1 {
                font-size: 2rem;
                margin-bottom: 1rem;
                color: #2d3748;
            }

            .article-meta {
                display: flex;
                gap: 1rem;
                font-size: 0.9rem;
                color: #718096;
                flex-wrap: wrap;
            }

            .article-meta span {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .article-content {
                padding: 2rem;
                line-height: 1.8;
                color: #2d3748;
            }

            .article-content h1,
            .article-content h2,
            .article-content h3 {
                margin: 2rem 0 1rem;
                color: #2d3748;
            }

            .article-content p {
                margin-bottom: 1rem;
            }

            .article-content pre {
                background: #f7fafc;
                padding: 1rem;
                border-radius: 8px;
                overflow-x: auto;
                margin: 1rem 0;
            }

            .article-content code {
                background: #edf2f7;
                padding: 0.2rem 0.4rem;
                border-radius: 4px;
                font-size: 0.9em;
            }

            .article-content ul,
            .article-content ol {
                margin: 1rem 0;
                padding-left: 2rem;
            }

            .article-content blockquote {
                border-left: 4px solid #667eea;
                padding-left: 1rem;
                margin: 1rem 0;
                color: #718096;
                font-style: italic;
            }

            @media (max-width: 768px) {
                .article-modal-content {
                    width: 95%;
                    margin: 1rem;
                }

                .article-header {
                    padding: 1.5rem 1rem 1rem;
                }

                .article-header h1 {
                    font-size: 1.5rem;
                }

                .article-content {
                    padding: 1rem;
                }
            }
        `;

        document.head.appendChild(style);
    }

    /**
     * 分享文章
     */
    shareArticle(articleId) {
        const article = this.articles.find(a => a.id === articleId);
        if (!article) return;

        if (navigator.share) {
            navigator.share({
                title: article.title,
                text: article.excerpt,
                url: window.location.href + '#blog'
            });
        } else {
            // 复制链接到剪贴板
            const url = window.location.href + '#blog';
            navigator.clipboard.writeText(url).then(() => {
                alert('链接已复制到剪贴板！');
            });
        }
    }

    /**
     * 格式化日期
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    /**
     * 更新导航菜单
     */
    updateNavigation() {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && !navMenu.querySelector('a[href="#blog"]')) {
            const contactLink = navMenu.querySelector('a[href="#contact"]');
            if (contactLink) {
                const blogItem = document.createElement('li');
                blogItem.innerHTML = '<a href="#blog">博客</a>';
                contactLink.parentElement.insertAdjacentElement('beforebegin', blogItem);
            }
        }
    }
}

// 创建全局博客管理器实例
const blogManager = new BlogManager();

// 当DOM加载完成后初始化博客管理器
document.addEventListener('DOMContentLoaded', () => {
    // 延迟初始化，确保其他内容先加载
    setTimeout(() => {
        blogManager.init();
    }, 1000);
}); 