# Supabase Heartbeat

[English](./README_EN.md)


🔄 自动定期 ping Supabase 数据库，保持免费版数据库活跃状态

## 功能

- 每周一和周四 UTC 9:00（北京时间 17:00）自动执行
- 支持手动触发
- 查询 `user` 表以保持数据库活跃
- 防止免费版 Supabase 数据库因 7 天无活动而暂停

## 快速开始

1. **Fork 此仓库**
   - 点击页面右上角的 "Fork" 按钮
   - 这会在您的 GitHub 账户下创建一个副本

2. **配置 GitHub Secrets**（在您 fork 的仓库中）
   
   进入 `Settings` → `Secrets and variables` → `Actions`，添加：
   
   - `SUPABASE_URL`: 您的 Supabase 项目 URL
   - `SUPABASE_KEY`: 您的 Supabase API Key
   - `TABLE_NAME` (可选): 需要 Ping 的表名（默认为 `user`）
   
   > 💡 在 Supabase 控制台获取：
   > - **SUPABASE_URL**: `Project Settings` → `Data API` → `Project URL` → `URL`
   > - **SUPABASE_KEY**: `Project Settings` → `API Keys` → `Publishable key` "anon" "public"

3. **启用 GitHub Actions**
   
   - 进入 fork 仓库的 "Actions" 标签
   - 点击 "I understand my workflows, go ahead and enable them"

4. **测试运行**
   
   - 在 Actions 页面点击 "Ping Supabase Database" 工作流
   - 点击 "Run workflow" → "Run workflow" 按钮
   - 查看运行日志确认成功 ✅

## 工作流说明

- **触发时间**: 
  - 自动：每周一和周四 UTC 9:00（北京时间 17:00）
  - 手动：随时可在 GitHub Actions 页面手动触发
  
- **运行内容**:
  1. 安装依赖 (`npm install @supabase/supabase-js`)
  2. 执行 `node index.js`
  3. 查询指定的表（默认 `user`）以保持连接活跃

## 注意事项

⚠️ **重要**: 
- 确保您的 Supabase 项目中有 `user` 表，或者配置 `TABLE_NAME` Secret 指定其他表
- 如果表名不同，推荐使用 Secret 配置，无需修改代码
- 免费版 Supabase 数据库在 7 天无活动后会暂停

## License

MIT
