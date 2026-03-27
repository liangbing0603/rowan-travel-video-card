# Adventure Video Card for Wanderlust Adventures

一个欧美探险风格的动态视频卡片页面，专为朋友圈分享设计。

## 功能特点

🎬 **动态视频预览**
- 自动轮播探险场景图片
- 模拟视频播放控制
- 进度条动画效果
- 响应式设计，适配所有设备

🏔️ **欧美探险风格**
- 山脉背景动画
- 探险图标浮动效果
- 极限运动配色方案
- 现代探险字体设计

🎯 **交互功能**
- 点击播放/暂停视频
- 进度条点击跳转
- 键盘控制（空格键播放，方向键快进/快退）
- 触摸屏滑动控制
- 点击特效和音效

🚀 **一键跳转**
- 点击"ENTER THE ADVENTURE"按钮
- 加载动画效果
- 彩色纸屑庆祝效果
- 直接跳转到旅游网站

## 文件结构

```
video-card/
├── index.html          # 主页面文件
├── style.css          # 样式文件
├── script.js          # 交互脚本
└── README.md          # 说明文档
```

## 如何部署到GitHub Pages

### 方法一：创建新的GitHub仓库

1. **创建新仓库**
   ```bash
   # 在GitHub上创建新仓库，例如：rowan-video-card
   ```

2. **上传文件**
   ```bash
   # 克隆仓库
   git clone https://github.com/你的用户名/rowan-video-card.git
   
   # 复制文件到仓库
   cp -r video-card/* rowan-video-card/
   
   # 提交并推送
   cd rowan-video-card
   git add .
   git commit -m "添加探险视频卡片"
   git push origin main
   ```

3. **启用GitHub Pages**
   - 进入仓库设置 → Pages
   - 选择分支：main
   - 选择文件夹：/(root)
   - 保存

### 方法二：添加到现有仓库

如果你想把视频卡片添加到现有的旅游网站仓库：

1. **创建video-card文件夹**
   ```bash
   cd rowan-travel-blog
   mkdir video-card
   cp -r path/to/video-card/* video-card/
   ```

2. **访问地址**
   ```
   https://liangbing0603.github.io/rowan-travel-blog/video-card/
   ```

## 自定义配置

### 修改跳转链接
编辑 `index.html` 第163行：
```html
<a href="https://liangbing0603.github.io/rowan-travel-blog/" class="cta-button" target="_blank">
```

### 修改探险场景图片
编辑 `index.html` 第55-75行，替换Unsplash图片URL：
```html
<div class="scene-image" style="background-image: url('你的图片URL');"></div>
```

### 修改颜色主题
编辑 `style.css` 中的CSS变量：
```css
:root {
    --primary-blue: #1E3A8A;
    --accent-orange: #F97316;
    /* 修改这些颜色值 */
}
```

## 在朋友圈分享

### 最佳实践

1. **预览链接**
   ```
   https://你的用户名.github.io/rowan-video-card/
   ```

2. **分享文案建议**
   ```
   🏔️ 探险之旅即将启程！
   
   点击这个动态视频卡片，探索我的旅游博客网站
   ↓↓↓
   [视频卡片链接]
   
   #旅游 #探险 #背包客 #极限运动 #Wanderlust
   ```

3. **分享时间**
   - 最佳时间：晚上7-9点（用户活跃时段）
   - 周末：上午10-12点，下午3-5点

## 技术特性

### 性能优化
- 懒加载图片
- 动画性能优化
- 触摸事件优化
- 滚动性能优化

### 浏览器兼容性
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+
- 移动端浏览器

### 无障碍访问
- 键盘导航支持
- 屏幕阅读器兼容
- 高对比度模式
- 减少动画选项

## 故障排除

### 常见问题

1. **动画不流畅**
   - 检查浏览器硬件加速是否启用
   - 降低动画复杂度

2. **移动端触摸无效**
   - 检查viewport设置
   - 确保触摸事件监听正确

3. **GitHub Pages不更新**
   - 清除浏览器缓存
   - 等待GitHub Pages构建完成（通常1-2分钟）

### 调试工具
打开浏览器开发者工具，查看控制台日志：
```javascript
// 查看初始化状态
console.log('Video Card initialized');

// 查看播放状态
console.log('Is playing:', isPlaying);
```

## 更新日志

### v1.0.0 (2026-03-27)
- 初始版本发布
- 欧美探险风格设计
- 动态视频预览功能
- 一键跳转到旅游网站
- 响应式设计
- 键盘和触摸控制

## 许可证

MIT License - 自由使用和修改

## 支持

如有问题，请通过以下方式联系：
- GitHub Issues
- 邮箱：你的邮箱
- 网站：https://liangbing0603.github.io/rowan-travel-blog/

---

**让每一次分享都成为一次探险！** 🏔️✨