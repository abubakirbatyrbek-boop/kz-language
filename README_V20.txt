V20 说明
=========
这版保留现有 speaking.js 的全部 SPEAKING_COURSES 数据与课程内容，只替换 speaking-course.html 的页面渲染层。

已实现：
- 第 1 模块可免费体验
- 每个模块必须完成全部小课
- 每个模块完成后出现模块考试
- 模块考试 >= 70% 才通过
- 第 2 模块开始必须注册 / 登录
- 未登录点击第 2 模块会进入登录页
- 登录后学习进度和考试成绩继续使用现有 Supabase 结构
- 原来的 10 个口语模块、全部小课、说明、发音按钮、自己说、参考答案均保留
- 哈萨克语和俄语分别运行
- 进度实时刷新

上传：
1. 用本文件 speaking-course.html 覆盖 GitHub 原来的 speaking-course.html。
2. 不需要改 speaking.js。
3. 不要覆盖 supabase-config.js。
4. 不需要重新跑 SQL。
