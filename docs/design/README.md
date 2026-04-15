# 页面设计图（HTML 线框）

本目录包含基于 [PRD](../PRD.md) 与 [prototypes.md](../prototypes.md) 生成的 HTML 线框设计图，每页一个文件，便于在浏览器中查看布局与元素。

## 使用方式

- 在浏览器中打开 **[index.html](index.html)** 查看索引并跳转各页。
- 或直接打开对应 HTML 文件，例如 `01-login.html`、`02-home.html`。

## 文件列表

| 文件 | 页面 | 路由 |
|------|------|------|
| 01-login.html | 登录 | pages/auth/login |
| 02-home.html | 首页 | pages/home/index |
| 03-profile.html | 个人中心 | pages/profile/index |
| 04-password.html | 修改密码 | pages/profile/password |
| 05-second-password.html | 设置二级密码 | pages/profile/second-password |
| 06-cards-list.html | 卡片列表 | pages/cards/list |
| 07-card-detail.html | 卡片详情 | pages/cards/detail |
| 08-card-create.html | 创建卡片 | pages/cards/create |
| 09-bills-list.html | 交易记录列表 | pagesA/bills/list |
| 10-bill-detail.html | 账单详情 | pagesA/bills/detail |
| 11-funds-list.html | 资金流水 | pages/funds/list |

## 样式说明

- 使用 [common.css](common.css) 统一线框样式（灰框、标注、移动端宽度 375px）。
- 设计图仅作布局与结构参考，不包含真实交互与接口数据。
