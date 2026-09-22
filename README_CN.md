# 中亚语言通 V3

多页面公开网站原型，当前包含：

- 首页、课程、场景、独立学习页
- 每个场景 5 题选择题考试
- 场景考试百分制成绩与通过提示
- 浏览器语音朗读
- 邮箱注册 / 登录（Supabase Auth）
- 客服与意见反馈页面（Supabase Database）
- 所有主要页面显示登录状态与客服入口

## 需要你配置的 Supabase

### 1. 创建项目
在 Supabase 创建一个 Project。

### 2. 配置邮箱登录
在 Authentication 中启用 Email / Password。

### 3. 填写 supabase-config.js
把：

```js
window.SUPABASE_CONFIG = {
  url: 'https://YOUR-PROJECT.supabase.co',
  publishableKey: 'YOUR_SUPABASE_PUBLISHABLE_KEY'
};
```

换成你自己的 Project URL 和 Publishable Key（或旧版 anon key）。不要把 service_role key 放进前端。

### 4. 创建反馈表
打开 Supabase 的 SQL Editor，执行 `supabase-schema.sql`。

执行后，用户可以在 `feedback.html` 提交：
- 反馈类型
- 主题
- 详细内容
- 联系邮箱
- 体验评分

已登录用户会自动记录 user_id；未登录用户可以提交匿名反馈。

## 部署

把这些文件上传到现有 GitHub 仓库的 `main` 分支，Vercel 会自动重新部署。

