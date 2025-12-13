# ✅ 项目运行检查清单

## 1. MongoDB Atlas IP 白名单
- [ ] 同学已在 Atlas 中添加您的 IP: `216.9.31.161`
- [ ] 等待 1-2 分钟让配置生效
- [ ] 运行测试: `cd server && node test-connection.js`
- [ ] 看到 `✅ Successfully connected` 表示成功

## 2. 启动服务器
```bash
cd server
npm run dev
```
- [ ] 看到 `✅ MongoDB connected`
- [ ] 看到 `🚀 Server running on http://localhost:5050`
- [ ] 访问 http://localhost:5050/api/health 返回 `{"ok":true}`

## 3. 启动前端（新终端窗口）
```bash
npm run dev
```
- [ ] 看到 `Local: http://localhost:5173`
- [ ] 浏览器能打开页面

## 4. 功能测试
- [ ] 访问 http://localhost:5173
- [ ] 点击 "View Rules" 能正常显示
- [ ] 点击 "Play Game" 能进入游戏选择页面
- [ ] 测试注册/登录功能
- [ ] 创建新游戏（Easy 或 Normal）
- [ ] 游戏能正常加载和显示
- [ ] 完成游戏后能记录到排行榜

## 5. 常见问题排查
如果遇到问题：
- MongoDB 连接失败 → 检查 IP 白名单
- 登录失败 → 检查 cookie 设置（已修复）
- 游戏创建失败 → 检查服务器日志
- 前端无法连接后端 → 检查 CORS 设置和端口

