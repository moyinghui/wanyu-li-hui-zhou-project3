# Render 部署配置清单

## ✅ 已完成的配置

1. ✅ Monorepo 结构已设置
   - `frontend/` - React + Vite 前端
   - `backend/` - Node.js + Express 后端
   - `server.js` - 生产环境服务器入口

2. ✅ Package.json 配置
   - 根目录：workspaces 配置
   - 所有 scripts 已统一

3. ✅ 服务器配置
   - `server.js` 使用 `process.env.PORT`
   - CORS 支持生产环境
   - 静态文件服务配置

4. ✅ 环境变量支持
   - 支持 `MONGO` (Render) 和 `MONGODB_URI` (本地)

## 📋 Render 部署步骤

### 1. 在 Render 上创建服务

1. 访问 https://render.com
2. 点击 "New +" → "Web Service"
3. 连接 GitHub 账户
4. 选择您的仓库

### 2. 配置服务

**基本信息：**
- **Name**: `wanyu-li-hui-zhou-project3`
- **Environment**: `Node`
- **Region**: 选择最近的区域

**构建和启动：**
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run prod`

### 3. 环境变量

点击 "Advanced" → "Add Environment Variable"，添加：

| Key | Value | 说明 |
|-----|-------|------|
| `MONGO` | `mongodb+srv://...` | MongoDB 连接字符串 |
| `NODE_VERSION` | `20.19.6` | Node.js 版本（必须 >= 20，因为 Vite 7 需要） |
| `COOKIE_SECRET` | `随机字符串` | Cookie 签名密钥 |
| `NODE_ENV` | `production` | 环境模式 |

**重要**: 
- Render 会自动设置 `PORT`，不需要手动添加
- MongoDB 连接字符串格式：`mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority`

### 4. MongoDB Atlas IP 白名单

在 Render 部署后：
1. 获取 Render 服务的 IP 地址（在服务日志中查看）
2. 在 MongoDB Atlas 的 Network Access 中添加该 IP
3. 或者临时使用 `0.0.0.0/0` 允许所有 IP（仅用于开发）

### 5. 部署

点击 "Create Web Service" 并等待部署完成。

## 🔍 验证部署

部署成功后：
1. 访问 Render 提供的 URL
2. 测试应用功能
3. 检查日志确认没有错误

## 🐛 常见问题

### 构建失败
- 检查 Node.js 版本是否匹配
- 确认所有依赖已安装
- 查看构建日志

### MongoDB 连接失败
- 检查 `MONGO` 环境变量是否正确
- 确认 IP 白名单已配置
- 检查连接字符串格式

### 前端无法加载
- 确认 `npm run build` 成功生成 `frontend/dist`
- 检查静态文件路径配置

### API 请求失败
- 确认 CORS 配置正确
- 检查 API 路径（生产环境使用相对路径）

## 📝 本地测试部署配置

在根目录运行：
```bash
npm install
npm run build
npm run start
```

然后访问 http://localhost:5050

## 🔗 相关文件

- `server.js` - 生产服务器入口
- `package.json` - 根配置
- `frontend/package.json` - 前端配置
- `backend/package.json` - 后端配置
- `.gitignore` - Git 忽略配置

