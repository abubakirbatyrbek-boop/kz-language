V17 基础语法闯关规则

1. 哈萨克语、俄语基础语法课都拆成模块。
2. 每个模块必须先完成全部小课，才能参加该模块考试。
3. 模块考试通过线为 70%。
4. 通过模块 1 后，模块 2 才能解锁；模块 2 起必须注册/登录。
5. 后续模块依次要求通过前一模块考试，且已登录。
6. 登录后学习进度与模块考试成绩继续使用现有 Supabase。
7. 不需要重新建立 learning_progress / test_results 表。

本版额外修复：课程页原来由 app.js 的通用渲染逻辑覆盖了模块闯关页面。现在 sentence-kz / sentence-ru 会优先交给 GrammarFlow 渲染，所以模块锁定、考试入口和登录门槛会真正显示。

保留 supabase-config.js，不要覆盖其中的 Project URL 和 Publishable key。
