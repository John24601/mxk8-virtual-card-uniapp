# tabbar 说明

## tabbar 3种策略

`tabbar` 分为 `4 种` 情况：

- 0 `无 tabbar`，只有一个页面入口，底部无 `tabbar` 显示；常用语临时活动页。

- 1 `原生 tabbar`，使用 `switchTab` 切换 `tabbar`，`tabbar` 页面有缓存。
  - 优势：原生自带的 `tabbar`，最先渲染，有缓存。
  - 劣势：只能使用 2 组图片来切换选中和非选中状态，修改颜色只能重新换图片（或者用 iconfont）。

- 2 `有缓存自定义 tabbar`，使用 `switchTab` 切换 `tabbar`，`tabbar` 页面有缓存。使用了第三方 UI 库的 `tabbar` 组件，并隐藏了原生 `tabbar` 的显示。
  - 优势：可以随意配置自己想要的 `svg icon`，切换字体颜色方便。有缓存。可以实现各种花里胡哨的动效等。
  - 劣势：首次点击 `tabbar` 会闪烁。

## tabbar 配置说明

- 如果使用的是 `原生tabbar`，需要配置 `nativeTabbarList`，每个 `item` 需要配置 `path`、`text`、`iconPath`、`selectedIconPath` 等属性。
- 如果使用的是  `自定义tabbar`，需要配置 `customTabbarList`，每个 `item` 需要配置 `path`、`text`、`icon` 、`iconType` 等属性（如果是 `image` 图片还需要配置2种图片）。

## 文件说明

`config.ts` 专门配置 `nativeTabbarList` 和 `customTabbarList` 的相关信息，请按照文件里面的注释配置相关项。

使用 `原生tabbar` 时，不需要关心下面2个文件：

- `store.ts` ，专门给 `自定义 tabbar` 提供状态管理，代码几乎不需要修改。
- `index.vue` ，专门给 `自定义 tabbar` 提供渲染逻辑，代码可以稍微修改，以符合自己的需求。

## TabBar 占位高度（带 tabbar 的页面底部留白）

自定义 tabbar 为悬浮胶囊风格，占位总高度 = **底部安全距离**（有安全区用安全区，无则 1rem）+ **57px**（tabbar 自身）+ **1rem**（上方与内容间距）。该值由 `placeholder.ts` 动态计算，并在 `App.ku.vue` 根节点注入为 CSS 变量 `--tabbar-placeholder-height`。

**带 tabbar 的页面**可直接使用：

- **UnoCSS 类名**：`pb-tabbar`（即 `padding-bottom: var(--tabbar-placeholder-height)`）
- **或内联**：`style="padding-bottom: var(--tabbar-placeholder-height)"`

无需再单独写 `pb-safe` 或固定数值，兼容不同设备与底部安全区。

## 自定义tabbar的不同类型的配置

- uiLib 图标

 ```js
  {
    // ... 其他配置
    "iconType": "uniUi",
    "icon": "home",
  }
  ```

- unocss 图标

 ```js
  {
    // ... 其他配置
    // 注意 unocss 图标需要如下处理：（二选一）
    // 1）在fg-tabbar.vue页面上引入一下并注释掉（见tabbar/index.vue代码第2行）
    // 2）配置到 unocss.config.ts 的 safelist 中
    iconType: 'unocss',
    icon: 'i-carbon-code',
  }
  ```

- iconfont 图标

 ```js
  {
    // ... 其他配置
    // 注意 iconfont 图标需要额外加上 'iconfont'，如下
    iconType: 'iconfont',
    icon: 'iconfont icon-my',
  }
  ```

- image 本地图片

 ```js
  {
    // ... 其他配置
    // 使用 ‘image’时，需要配置 icon + iconActive 2张图片（不推荐）
    // 既然已经用了自定义tabbar了，就不建议用图片了，所以不推荐
    iconType: 'image',
    icon: '/static/tabbar/home.png',
    iconActive: '/static/tabbar/homeHL.png',
  }
  ```
