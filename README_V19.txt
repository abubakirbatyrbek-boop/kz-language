V19 修复说明
============
这版不是删除原来的“零基础造句与口语”内容，而是在现有 SPEAKING_COURSES 数据上增加可见的闯关规则。

规则：
1. 第1模块可以游客体验。
2. 必须完成一个模块的全部小课。
3. 完成后参加该模块考试。
4. 答对 >= 70% 才通过。
5. 第2模块开始必须注册/登录。
6. 通过上一模块考试后才能进入下一模块。
7. 原有课程数据、模块内容、学习进度结构保持使用。
8. 学习进度沿用 learning_progress；考试结果沿用 test_results。

上传：
- 用本目录里的 speaking-course.html 覆盖原来的 speaking-course.html。
- 新增 speaking-gates-v19.js。
- 不要覆盖 supabase-config.js。
- 不需要重新执行 SQL。
