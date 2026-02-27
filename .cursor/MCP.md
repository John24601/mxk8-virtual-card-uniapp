# 本项目 MCP 配置说明

MCP（Model Context Protocol）让 Cursor 的 AI 能调用外部工具（如 Figma、浏览器、数据库等）。可按下面两种方式配置。

---

## 方式一：在 Cursor 里用界面配置（推荐先试）

1. 打开 **Cursor 设置**：`Cmd + ,`（Mac）或 `File → Preferences → Cursor Settings`。
2. 左侧找到 **Tools & MCP**（或搜索 “MCP”）。
3. 点击 **Add new MCP server**。
4. 填写：
   - **Name**：服务器标识，如 `playwright`、`figma`。
   - **Type**：
     - `command`：本机用命令启动的服务器（如 npx、node、python）。
     - `streamableHttp`：通过 HTTP 访问的远程 MCP 服务。
   - **Command**（type 为 command 时）：例如 `npx`。
   - **Args**：例如 `["-y", "@modelcontextprotocol/server-filesystem", "/path"]`。
   - **URL**（type 为 streamableHttp 时）：MCP 服务地址。
   - **Headers**：需要鉴权时填，如 `{ "Authorization": "Bearer xxx" }`。
5. 保存后 **完全退出并重新打开 Cursor**，配置才会生效。

这样配置的是「当前账号的全局 MCP」，对所有项目生效。

---

## 方式二：用项目里的 JSON 配置（适合团队共享）

项目下已有 **`.cursor/mcp.json`**，可只在本项目启用某些 MCP 服务器，并提交到 Git 与团队一致。

### 1. 编辑 `.cursor/mcp.json`

结构如下：

```json
{
  "mcpServers": {
    "服务器名称": {
      "command": "npx",
      "args": ["-y", "包名或脚本"],
      "env": {
        "环境变量名": "值"
      }
    }
  }
}
```

- **command**：启动命令，如 `npx`、`node`、`python3`。
- **args**：传给该命令的参数数组。
- **env**：可选，给该 MCP 进程用的环境变量（如 API Key、Token）。

若是 **HTTP 类 MCP**，用：

```json
"服务器名称": {
  "type": "streamableHttp",
  "url": "https://xxx/mcp",
  "headers": {
    "Authorization": "Api-Key your_key"
  }
}
```

### 2. 本仓库示例（按需取消注释并改路径/密钥）

在 `.cursor/mcp.json` 的 `mcpServers` 里添加，例如：

**文件系统（只读当前项目）：**

```json
"filesystem": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/wage/Documents/CompanyProjects/MXK8/mxk8-virtual-card-uniapp"]
}
```

**Playwright（浏览器自动化，H5 调试）：**

```json
"playwright": {
  "command": "npx",
  "args": ["-y", "@playwright/mcp-server-playwright"]
}
```

**Figma（需先在 Cursor 安装 Figma MCP 或使用官方 MCP）：**

- 若通过 Cursor 的 “Add new MCP server” 已配置，一般无需在 `mcp.json` 重复写。
- 若要用项目级配置，把你在界面里看到的 command/args/env 照抄到 `mcpServers` 即可。

### 3. 修改后必做的一步

保存 `mcp.json` 后，**完全退出 Cursor 再重新打开**，MCP 才会重新加载。

---

## 常见问题

| 问题 | 处理 |
|------|------|
| 加了配置但工具列表里没有 | 完全重启 Cursor（Quit 再打开）。 |
| 项目级和全局都配置了同一名称 | 项目级 `.cursor/mcp.json` 会覆盖同名的全局配置（仅在本项目）。 |
| 需要 API Key / Token | 在对应服务器的 `env` 里配置，不要提交真实密钥到 Git，可用 `.env` 或 Cursor 的 Secrets。 |
| 想只在当前项目用某 MCP | 在项目里维护 `.cursor/mcp.json`，并提交；其他人拉代码后重启 Cursor 即可。 |

---

## 与本项目相关的推荐 MCP

- **Figma**：对设计稿做设计到代码、标注查看。
- **Playwright / cursor-ide-browser**：对 H5 页面做自动化测试或录屏。
- **filesystem**：限定在项目目录的只读文件访问（注意路径要写对）。

当前 `.cursor/mcp.json` 中 `mcpServers` 为空对象，可按上面示例添加需要的服务器。
