# MXK8 虚拟卡管理小程序 - 产品需求文档（PRD）

> 本文档面向 Cursor / AI 辅助开发：包含明确的功能边界、页面路径、接口契约与数据枚举，便于生成与修改代码时保持一致性。本文档为项目产品需求与开发的唯一依据。

---

## 1. 文档信息


| 项目         | 说明                                                               |
| ---------- | ---------------------------------------------------------------- |
| 文档版本       | v1.1                                                             |
| 项目名称       | mxk8-virtual-card-uniapp（MXK8 虚拟卡管理）                             |
| 项目类型       | 虚拟卡管理小程序（跨端）                                                     |
| 技术栈        | Vue 3 + Uni-app + TypeScript + Vite 5 + UnoCSS + TDesign + Alova |
| 目标平台       | H5、微信小程序、APP                                                     |
| 基础 URL（开发） | `https://api.mxk8.com`                                           |
| 平台 Header  | `1001`，功能 Header `1`，功能码 `3`                                     |


---

## 2. 项目概述与目标

### 2.1 项目背景与产品定位

**mxk8-virtual-card-uniapp**（MXK8 虚拟卡管理）是基于 Vue.js + Uni-app 开发的虚拟卡管理跨端应用，主要为用户提供虚拟卡管理、资金管理、交易记录查询等核心功能。

**项目目标**：为用户提供便捷的虚拟卡管理服务；实现资金余额的实时监控和管理；提供完整的交易记录查询功能；确保用户数据安全和隐私保护。

### 2.2 目标用户

- 需要使用虚拟卡进行在线支付的用户
- 需要管理多张虚拟卡的用户
- 需要实时监控资金流动的用户

### 2.3 功能范围概览

- 用户认证与个人中心（登录、修改密码、二级密码）
- **虚拟卡全生命周期管理**（列表、详情、创建、充值、激活/禁用）
- 资金与账户（余额、收支统计、资金流水）
- 账单与交易记录（交易列表、账单详情）
- 首页汇总（余额、收支统计、快捷入口、最近交易）

### 2.4 与当前代码库的对应关系（框架约定）


| 能力         | 位置与说明                                                                                                            |
| ---------- | ---------------------------------------------------------------------------------------------------------------- |
| 路由与页面      | `pages.config.ts`、约定式路由；TabBar：`src/tabbar/config.ts`（`customTabbarList` / `nativeTabbarList`）                   |
| 请求与域名      | `src/http/alova.ts`，`API_DOMAINS.DEFAULT` = `import.meta.env.VITE_SERVER_BASEURL`，开发环境配置为 `https://api.mxk8.com` |
| API 层      | `src/api/`，按模块拆分：auth、user、pay/cards、pay/funds、pay/bills                                                         |
| 多语言        | `src/locale/`（zh-Hans.json、en.json），文案 key 建议与页面/功能对应（如 `tabbar.home`、`pages.cards.title`）                       |
| 登录页路径      | `src/router/config.ts`：`LOGIN_PAGE = '/pages/auth/login'`，`REGISTER_PAGE = '/pages/auth/register'`               |
| 登录策略       | `src/router/config.ts`：`LOGIN_STRATEGY`（黑名单/白名单）、`EXCLUDE_LOGIN_PATH_LIST`；说明见 `src/router/README.md`            |
| 未登录/401 跳转 | `src/utils/toLoginPage.ts` 的 `toLoginPage()`，在 `src/http/alova.ts`、`src/http/http.ts` 中调用                        |
| 状态管理       | `src/store/`（Pinia），可按模块建 store（如 user、cards、funds）                                                              |


---

## 3. 用户与使用场景


| 角色    | 场景简述                                   |
| ----- | -------------------------------------- |
| 未登录用户 | 仅可访问登录页，登录后进入首页                        |
| 已登录用户 | 查看余额与卡片、创建/充值/禁用卡片、查看交易与资金流水、修改密码与二级密码 |


---

## 4. 功能模块与页面路由

以下页面路径为**目标路由**，与需求文档一致；实现时需在 `pages.config.ts` 或约定式路由中注册。

### 4.1 模块总览


| 序号  | 模块       | 说明             | 页面路径                                               |
| --- | -------- | -------------- | -------------------------------------------------- |
| 1   | 用户认证     | 登录、图形验证码       | `pages/login/index` 或 `pages/auth/login`           |
| 2   | 用户管理     | 个人中心、修改密码、二级密码 | `pages/profile/index`、`password`、`second-password` |
| 3   | 卡片管理（核心） | 列表、详情、创建       | `pages/cards/list`、`detail`、`create`               |
| 4   | 账单交易     | 交易记录、账单详情      | `pages/bills/list`、`detail`                        |
| 5   | 资金管理     | 资金流水           | `pages/funds/list`                                 |
| 6   | 首页       | 汇总与入口          | `pages/home/index`                                 |


### 4.2 页面与路由规范（供 Cursor 生成页面时使用）

- **认证**：`src/pages/auth/login.vue` — 账号密码登录 + 图形验证码；登录成功后获取 access_token，退出时清除本地 token 与用户信息。
- **个人中心**：`src/pages/profile/index.vue` — 展示用户头像、昵称、ID 等；子页 `password.vue`（修改密码，需校验当前密码）、`second-password.vue`（设置二级密码，用于查看完整卡号等敏感操作）。
- **卡片**：`src/pages/cards/list.vue`、`detail.vue`、`create.vue`。
- **账单**：`src/pages/bills/list.vue`、`detail.vue`。
- **资金**：`src/pages/funds/list.vue`。
- **首页**：`src/pages/home/index.vue`（可与现有 `pages/index/index.vue` 对齐或重命名）。

TabBar 建议与业务对齐，例如：首页、卡片、我的。当前 tabbar 配置在 `src/tabbar/config.ts`（`customTabbarList` / `nativeTabbarList`）。

### 4.3 功能需求细节（界面与交互）

- **首页**
  - 余额展示：可用余额、卡片总余额；支持金额隐藏/显示。
  - 收支统计：近 7 天、30 天、90 天；收入金额、支出金额。
  - 快捷入口：我的卡片、交易记录、资金流水、个人中心。
  - 最近交易：最近 5 条，展示交易类型、金额、时间、状态。
- **卡片列表**
  - 展示：卡片号（掩码）、卡片类型、可用额度/总额度、卡片状态。
  - 操作：激活/禁用、充值、查看详情。
- **卡片详情**
  - 展示：卡片基本信息、交易记录、卡号安全掩码；查看完整卡号需二级密码验证（完整卡号、CVV 等）。
- **创建卡片**
  - 输入：卡段信息（来自卡段权限列表）、持卡人信息（姓名、地址等）、卡片额度、有效期等。
- **卡片充值**
  - 最低 50 美元；**快捷金额**：50 / 100 / 200 / 500 美元；充值后实时更新卡片余额。
- **账单/交易列表**
  - 筛选：交易类型（收入/支出）、交易状态、时间范围；显示交易详情、金额、时间、状态。
- **资金流水**
  - 显示：交易类型、金额、可用余额、状态。

---

## 5. 接口规范（API 契约）

**约定**：除登录等匿名接口外，请求需携带认证（如 Bearer Token）。基础 URL 使用环境变量 `VITE_SERVER_BASEURL`（开发环境 `https://api.mxk8.com`）。

### 5.1 认证模块


| 接口说明 | 方法   | 路径                      | 请求/响应要点                                                                                                                                                                                                                                |
| ---- | ---- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 登录   | POST | `/api-uaa/oauth/token`  | Headers: `Authorization: Basic d2ViQXBwOndlYkFwcA==`。Body: `username`, `password`, `client_id`, `client_secret`, `grant_type: 'password'`, `scope: 'server'`。返回: `access_token`, `token_type`, `refresh_token`, `expires_in`, `scope`。 |
| 退出登录 | POST | `/api-uaa/oauth/logout` | 无特殊 Body。                                                                                                                                                                                                                              |


### 5.2 用户模块


| 接口说明   | 方法   | 路径                                                  | 请求/响应要点                                                     |
| ------ | ---- | --------------------------------------------------- | ----------------------------------------------------------- |
| 获取当前用户 | GET  | `/api-pay/sys_business/getSysBusinessByCurrentUser` | 返回: `id`, `username`, `phone`, `email`, `status`, `avatar`。 |
| 修改密码   | PUT  | `/api-user/sys/user/changPassword`                  | Body: `id`, `currentPassword`, `password`。                  |
| 设置二级密码 | POST | `/api-user/sys/user/setSecondPassword`              | Body: `secondPassword`。                                     |


### 5.3 资金管理模块


| 接口说明   | 方法  | 路径                                         | 请求/响应要点                                                                                                                                                                                                                              |
| ------ | --- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 用户账户余额 | GET | `/api-pay/sys_user_account/getUserAccount` | 返回: `Amount`, `AvailableAmount`, `CardBalance`。                                                                                                                                                                                      |
| 收支统计   | GET | `/api-pay/sys_funds/totalFundAmount`       | Params: `level: 2`, `type: 1`, `day`（7/30/90）。返回: `mxk_pay_money_in`, `mxk_pay_money_out`。                                                                                                                                           |
| 资金流水列表 | GET | `/api-pay/sys_funds/list`                  | Params: `field: 'id,initiated,fundsAvailable,description,type,amount,availableBalance,status'`, `current`, `pageSize`。返回: `records[]`（含 `id`, `type`, `amount`, `availableBalance`, `status`, `description`, `createTime`）, `total`。 |
| 充值记录   | GET | `/api-pay/sys_funds/getFundsActivityData`  | Params: `current`, `pageSize`。返回: `records[]`（`id`, `amount`, `type`, `status`, `createTime`）, `total`。                                                                                                                              |
| 最新资金数据 | GET | `/api-pay/sys_funds/getFundsLatestData`    | Params: `level`, `type`。返回: 最新资金数据。                                                                                                                                                                                                  |


### 5.4 卡片管理模块（核心）


| 接口说明        | 方法   | 路径                                                       | 请求/响应要点                                                                                                                                                                                   |
| ----------- | ---- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 卡片列表        | GET  | `/api-pay/sys_business_card/list`                        | Params: `current`, `pageSize`, `column: 'createTime'`, `order: 'desc'`。返回: `records[]`（见下表）, `total`, `cardAll.availableAmount`。                                                          |
| 卡片总余额       | GET  | `/api-pay/sys_business_card/totalCardSurplusLimitAmount` | 返回: number。                                                                                                                                                                               |
| 创建卡片        | POST | `/api-pay/sys_business_card/create`                      | Body: `cardBin`, `cardType: 'Virtual Card'`, `firstName`, `lastName`, `billingAddress`, `amount`, `expiryDate`, `email`, `phone`, `city`, `state`, `zipCode`, `birthDate`。                |
| 卡片充值        | PUT  | `/api-pay/sys_business_card/updateSurplusLimitAmount`    | Body: `id`（卡片ID）, `surplusLimitAmount`（充值金额）。**业务规则**：最低充值 50 美元。                                                                                                                         |
| 切换卡片状态      | PUT  | `/api-card/sys_business_card/changeCardStauts`           | Body: `id`, `status`（0: 激活, 1: 禁用）。                                                                                                                                                       |
| 卡片详情（匿名）    | GET  | `/api-pay/business-card-anon/getByCardToken/{cardToken}` | 返回: `id`, `cardNumber`, `cardType`, `availableAmount`, `limitAmount`, `status`, `firstName`, `lastName`, `cardToken`, `expireDate`, `cvv`, `billingAddress`, `createTime`。                |
| 完整卡号（需二级密码） | GET  | `/api-pay/selectCardDetail`                              | Params: `cardToken`, `secondPassword`。返回: `number`（完整卡号）, `cvc`/`cvv`, `cardNumber`。                                                                                                      |
| 卡片交易记录      | GET  | `/api-pay/sys_business_bill/cardTransactionActivity`     | Params: `cardToken`, `current`, `pageSize`。返回: `records[]`（`id`, `merchantName`, `transactionType`, `transactionAmount`, `transactionTime`, `transactionStatus`, `description`）, `total`。 |
| 卡段权限列表      | GET  | `/api-pay/sys_business_card/cardPermissions`             | 返回: `records[]`（`id`, `cardBin`, `cardName`, `isApply`）。`isApply: true` 可申请，`false` 置灰不可选。                                                                                                |


### 5.5 账单模块


| 接口说明   | 方法  | 路径                                       | 请求/响应要点                                                                                                                                                                                                                         |
| ------ | --- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 交易记录列表 | GET | `/api-pay/sys_business_bill/list`        | Params: `current`, `pageSize`, `transactionType`（可选）。返回: `records[]`（`id`, `transactionAmount`, `transactionType`, `transactionTypeName`, `transactionStatus`, `transactionStatusName`, `merchantName`, `createTime`）, `total`。 |
| 账单详情   | GET | `/api-pay/sys_business_bill/getTransactionDetailedInfo` | Params: `id`。返回: 账单详细信息。                                                                                                                                                                                                                     |


### 5.6 首页模块


| 接口说明 | 方法  | 路径                                | 请求/响应要点                                             |
| ---- | --- | --------------------------------- | --------------------------------------------------- |
| 最近交易 | GET | `/api-pay/sys_business_bill/list` | Params: `current: 1`, `pageSize: 5`。返回: 最近 5 条交易记录。 |


---

## 6. 数据模型与枚举（供 Cursor 生成 types 与常量）

### 6.1 卡片状态（Card Status）


| 值   | 常量名           | 说明    |
| --- | ------------- | ----- |
| 0   | Normal        | 正常    |
| 1   | Freeze        | 冻结/禁用 |
| -   | Closed        | 已关闭   |
| -   | Pending       | 待激活   |
| -   | PendingCharge | 待扣费   |


### 6.2 交易类型（Transaction Type）


| 值      | 常量名    | 说明  |
| ------ | ------ | --- |
| Credit | Credit | 收入  |
| Debit  | Debit  | 支出  |


### 6.3 交易状态（Transaction Status）


| 值         | 常量名       | 说明  |
| --------- | --------- | --- |
| SUCCESS   | SUCCESS   | 成功  |
| FAILED    | FAILED    | 失败  |
| PENDING   | PENDING   | 处理中 |
| CANCELLED | CANCELLED | 已取消 |
| Completed | Completed | 已完成 |


### 6.4 资金流水类型

与交易类型一致：`Credit` / `Debit`。流水状态：`Completed`、`Pending`、`Failed`。

### 6.5 余额与统计字段说明

- **AvailableAmount / availableBalance**：可用余额。
- **CardBalance / cardTotalAmount**：卡片总余额。
- **totalBalance**：总余额（可用 + 卡片）。
- **frozenBalance**：冻结余额。
- **mxk_pay_money_in**：收入金额（统计）。
- **mxk_pay_money_out**：支出金额（统计）。
- **卡片**：`availableAmount` 可用额度，`limitAmount` 总额度，`surplusLimitAmount` 剩余/充值额度。

建议在 `src/api/types/` 或 `src/http/types.ts` 中集中定义上述枚举与接口响应类型，便于请求层与页面复用。

---

## 7. 关键业务逻辑与交互

### 7.1 余额与资金

- **余额展示**：支持金额隐藏/显示（隐私保护）；支持下拉刷新。
- **收支统计**：支持近 7 天、30 天、90 天维度。
- **余额概念**：可用余额（账户）、卡片余额（所有虚拟卡总余额）、总余额 = 可用 + 卡片。

### 7.2 卡片

- **状态**：支持激活/禁用切换（调用 `changeCardStauts`）。
- **充值**：最低 50 美元，建议提供快捷金额选择。
- **完整卡号**：查看完整卡号需校验二级密码（调用 `selectCardDetail`）。
- **卡段**：创建卡片时卡段列表以 `cardPermissions` 的 `isApply` 控制可选/置灰。

### 7.3 交易与账单

- **筛选**：按交易类型（收入/支出）、交易状态、时间范围筛选。
- **列表**：分页参数 `current`、`pageSize` 统一使用。

### 7.4 安全与权限

- 登录后 Token 用于除匿名接口外的所有请求（与当前 `src/http/alova.ts` 中 `ignoreAuth` 逻辑一致）。
- 修改密码、设置二级密码需在个人中心内完成；敏感操作（如查看完整卡号）需二次验证。

### 7.5 业务规则汇总（安全 / 交易 / 数据）

- **安全规则**：查看完整卡号等敏感操作需二级密码验证；支持余额金额隐藏（隐私保护）；登录状态过期后需重新登录。
- **交易规则**：最低充值金额 50 美元；快捷金额 50/100/200/500 美元；卡片状态可实时切换（激活/禁用）。
- **数据规则**：所有列表接口支持分页（`current`、`pageSize`）；支持按时间范围、状态筛选。

---

## 8. 非功能需求

- **多端一致**：H5、微信小程序、APP 行为与数据一致，仅适配导航栏、安全区等；支持 iOS/Android、主流浏览器，响应式适配不同屏幕。
- **多语言**：沿用现有 `src/locale`（zh-Hans、en），新文案需同时维护中英文 key。
- **错误与登录态**：未登录或 401 时跳转登录页（`toLoginPage()`，路由见 `src/router/config.ts`）。
- **性能**：列表分页、下拉刷新，避免一次性拉取大量数据；参考指标：页面加载 < 3s，接口响应 < 2s。
- **安全**：数据传输 HTTPS；敏感信息加密存储；防护 SQL 注入与 XSS。

---

## 9. Cursor 使用说明（如何用本 PRD）

1. **页面布局与原型**：各页面的区块结构、布局说明与元素清单以 [docs/prototypes.md](docs/prototypes.md) 为准；可浏览器查看的 HTML 线框设计图见 [docs/design/](docs/design/)（[index.html](docs/design/index.html) 为索引）。实现页面时请先对齐该原型再写代码。
2. **新建页面**：按 §4.1–§4.2 的路径在 `src/pages/` 下创建对应 `.vue` 文件，界面与交互参考 §4.3 与 [docs/prototypes.md](docs/prototypes.md)；在 `pages.config.ts` 或约定式路由中注册；TabBar 修改 `src/tabbar/config.ts`。登录页路径、登录策略见 §2.4。
3. **对接接口**：在 `src/api/` 下按模块建文件（如 `auth.ts`、`user.ts`、`pay/cards.ts`、`pay/funds.ts`、`pay/bills.ts`），路径与请求体/响应体以 §5 为准；BaseURL 使用 `import.meta.env.VITE_SERVER_BASEURL` 或 `API_DOMAINS.DEFAULT`。
4. **类型与枚举**：在 `src/api/types/` 中定义接口 DTO 及 §6 中的状态、类型枚举，并在请求与页面中引用。
5. **业务规则**：实现充值、二级密码、卡段可选等逻辑时，以 §7、§7.5 为准；余额展示与统计以 §6.5、§7.1 为准。
6. **环境**：开发环境 API 基础地址为 `https://api.mxk8.com`，平台/功能 Header 见 §1。

---

## 10. 项目排期与风险（参考）

### 10.1 排期建议


| 阶段  | 周期  | 内容                   |
| --- | --- | -------------------- |
| 一   | 2 周 | 项目框架搭建、用户认证模块、基础页面结构 |
| 二   | 3 周 | 首页模块、资金管理、卡片列表       |
| 三   | 3 周 | 卡片详情、交易记录、卡片创建与充值    |
| 四   | 2 周 | 测试与优化、安全加固、部署上线      |


### 10.2 风险与应对

- **技术风险**：接口兼容性、性能瓶颈、安全漏洞 — 通过代码审查、测试覆盖、安全审计与监控缓解。
- **业务风险**：用户数据与支付安全、合规 — 严格遵循安全规则与数据规则（见 §7.5）。

---

## 11. 附录：与需求文档的映射

- 功能模块、接口、数据字典、业务规则见本文 §2–§8。
- 当前仓库已有页面（如 `pages/index`、`pages/me/me`、`pages/auth/login`）可在迭代中逐步与目标路由对齐，以本 PRD 为单一事实来源。

---

## 文档更新记录


| 版本   | 更新内容                                                                                                  | 更新日期       |
| ---- | ----------------------------------------------------------------------------------------------------- | ---------- |
| v1.0 | 初始版本创建                                                                                                | 2026-02-28 |
| v1.1 | 补充项目背景与目标用户、功能需求细节（首页快捷入口、卡片 UI/快捷金额）、业务规则汇总、非功能指标、排期与风险、框架约定（登录页/登录策略/toLoginPage/i18n/store）、文档更新记录 | 2026-02-28 |


*修改本 PRD 时请同步更新上表与 §1 文档版本。*