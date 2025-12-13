# 部署到 Render 指南

## 项目结构

项目已配置为 monorepo 结构：
```
.
├── frontend/          # React + Vite 前端
├── backend/          # Node.js + Express 后端
├── server.js         # 生产环境服务器入口
└── package.json      # 根目录配置 (workspaces)
```

## 部署步骤

### 1. 准备 MongoDB Atlas

1. 登录 MongoDB Atlas: https://cloud.mongodb.com/
2. 获取连接字符串，格式类似：
   ```
   mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
   ```

### 2. 检查 Node.js 版本

运行 `node -v` 记录版本号（例如：16.20.2）

### 3. 在 Render 上部署

1. **登录 Render**
   - 访问 https://render.com
   - 使用 GitHub 账户登录

2. **创建新服务**
   - 点击 "New +" → "Web Service"
   - 连接 GitHub 账户（如需要）
   - 选择您的仓库

3. **配置服务**
   - **Name**: `wanyu-li-hui-zhou-project3` (或您的唯一名称)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run prod`

4. **环境变量**
   点击 "Advanced" → "Add Environment Variable"：
   - **Key**: `MONGO` (或 `MONGODB_URI`)
   - **Value**: 您的 MongoDB 连接字符串
   
   - **Key**: `NODE_VERSION`
   - **Value**: `16.20.2` (您的 Node.js 版本)
   
   - **Key**: `COOKIE_SECRET`
   - **Value**: 一个随机字符串（用于 cookie 签名）
   
   - **Key**: `PORT`
   - **Value**: Render 会自动设置，但可以留空

5. **创建服务**
   - 点击 "Create Web Service"
   - 等待部署完成（可能需要几分钟）

### 4. 验证部署

部署成功后：
- 点击服务页面顶部的 URL
- 测试应用功能
- 检查日志确认没有错误

## 本地测试部署配置

在根目录运行：
```bash
npm install && npm run build && npm run dev
```

然后访问 http://localhost:5050 (或您设置的端口)

## 注意事项

- ✅ 确保 `.env` 文件在 `.gitignore` 中
- ✅ 确保 `node_modules` 不被提交
- ✅ 确保所有路径引用正确
- ✅ 生产环境使用相对 API 路径

## 故障排查

如果部署失败：
1. 检查 Render 日志
2. 确认环境变量设置正确
3. 确认 MongoDB IP 白名单包含 Render 的 IP
4. 确认 Node.js 版本匹配

