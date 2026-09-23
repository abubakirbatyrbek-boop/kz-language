V13：零基础造句与口语课

这次不是复制任何第三方课程文字，而是采用原创的“台阶式搭句”教学结构：
词 → 短语 → 完整句 → 替换词 → 提问/否定 → 自己说。

使用方法：
1. 用本包中的 courses.html 覆盖 GitHub 里的原 courses.html。
2. 将 speaking-course.html 和 speaking.js 上传到仓库根目录。
3. 不要删除或修改现有的 styles.css、supabase-config.js、auth.js。
4. Commit changes，Vercel 会自动部署。
5. Supabase 不需要新建表。本课程把完成记录写入已有 learning_progress，node_id 格式为 v13:speaking:kk:01-1 / v13:speaking:ru:01-1。

说明：浏览器发音使用 SpeechSynthesis，不同浏览器和设备的哈萨克语语音质量可能不同。


V13.1 修复：修正口语课程数据结构，哈萨克语课只显示哈萨克语，俄语课只显示俄语；解决课程目标语言显示 undefined 的问题。
