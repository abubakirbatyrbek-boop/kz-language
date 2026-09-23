中亚语言通 FINAL REPLACE

这次把 V13—V21 的零散修改统一成一个最终替换包。

需要保留：
- app.js（现在已经包含哈语/俄语基础语法内容、商店、药店、销售、办公室、安保、工程等场景）
- speaking.js（保留全部零基础造句与口语课程数据）
- supabase-config.js（你的 Project URL 和 Publishable key，绝对不要覆盖）

本包替换：
1. speaking-course.html
2. speaking-final.js
3. grammar-flow.js

功能：
- 哈语和俄语各自有：字母与发音 / 基础语法 / 零基础造句与口语
- 基础语法：8 个正式模块；一个词/结构一课；模块完成后考试；>=70% 才能进入下一模块；模块 2 起要求注册/登录
- 零基础造句与口语：4 个大模块；保留原有全部小课；模块完成后考试；>=70% 才能进入下一模块；模块 2 起要求注册/登录
- 登录用户的学习进度和考试成绩继续保存到 Supabase
- 第 1 模块游客可体验；登录后继续
- 场景、国家机关继续由现有 access.js 保护

建议从 GitHub 删除旧版本文件，避免以后误加载：
README_V13.txt
README_V14.txt
README_V15_grammar_pronouns.txt
README_V16.txt
README_V16_grammar_modules.txt
README_V17.txt
README_V18.txt
README_V19.txt
README_V20.txt
README_V21.txt
speaking-gated-v21.js
speaking-gates-v19.js
speaking-v18.css
speaking-v18.js

不要删除：
app.js
speaking.js
auth.js
access.js
supabase-config.js
supabase-schema.sql
supabase-v6-schema.sql
