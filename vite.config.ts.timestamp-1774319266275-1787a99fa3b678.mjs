// vite.config.ts
import path4 from "node:path";
import process4 from "node:process";
import Uni from "file:///Users/wage/Documents/CompanyProjects/MXK8/mxk8-virtual-card-uniapp/node_modules/.pnpm/@uni-helper+plugin-uni@0.1.0_@dcloudio+vite-plugin-uni@3.0.0-4070620250821001_postcss@8_fe03c02a1160deabfb3d9f02af170b74/node_modules/@uni-helper/plugin-uni/src/index.js";
import UniComponents from "file:///Users/wage/Documents/CompanyProjects/MXK8/mxk8-virtual-card-uniapp/node_modules/.pnpm/@uni-helper+vite-plugin-uni-components@0.2.3_rollup@4.50.0/node_modules/@uni-helper/vite-plugin-uni-components/dist/index.mjs";
import UniLayouts from "file:///Users/wage/Documents/CompanyProjects/MXK8/mxk8-virtual-card-uniapp/node_modules/.pnpm/@uni-helper+vite-plugin-uni-layouts@0.1.11_rollup@4.50.0/node_modules/@uni-helper/vite-plugin-uni-layouts/dist/index.mjs";
import UniManifest from "file:///Users/wage/Documents/CompanyProjects/MXK8/mxk8-virtual-card-uniapp/node_modules/.pnpm/@uni-helper+vite-plugin-uni-manifest@0.2.12_vite@5.2.8_@types+node@20.19.11_less@4.5.1_sass@1.77.8_terser@5.43.1_/node_modules/@uni-helper/vite-plugin-uni-manifest/dist/index.mjs";
import UniPages from "file:///Users/wage/Documents/CompanyProjects/MXK8/mxk8-virtual-card-uniapp/node_modules/.pnpm/@uni-helper+vite-plugin-uni-pages@0.3.23_vite@5.2.8_@types+node@20.19.11_less@4.5.1_sass@1.77.8_terser@5.43.1_/node_modules/@uni-helper/vite-plugin-uni-pages/dist/index.mjs";
import UniPlatform from "file:///Users/wage/Documents/CompanyProjects/MXK8/mxk8-virtual-card-uniapp/node_modules/.pnpm/@uni-helper+vite-plugin-uni-platform@0.0.5/node_modules/@uni-helper/vite-plugin-uni-platform/dist/index.mjs";
import UniOptimization from "file:///Users/wage/Documents/CompanyProjects/MXK8/mxk8-virtual-card-uniapp/node_modules/.pnpm/@uni-ku+bundle-optimizer@1.3.15-beta.2_postcss@8.5.6_rollup@4.50.0_vite@5.2.8_@types+no_29287b8402e2986acd9ba4043cc3e4ff/node_modules/@uni-ku/bundle-optimizer/dist/index.mjs";
import UniKuRoot from "file:///Users/wage/Documents/CompanyProjects/MXK8/mxk8-virtual-card-uniapp/node_modules/.pnpm/@uni-ku+root@1.4.1_vite@5.2.8_@types+node@20.19.11_less@4.5.1_sass@1.77.8_terser@5.43.1_/node_modules/@uni-ku/root/dist/index.mjs";
import dayjs from "file:///Users/wage/Documents/CompanyProjects/MXK8/mxk8-virtual-card-uniapp/node_modules/.pnpm/dayjs@1.11.10/node_modules/dayjs/dayjs.min.js";
import { visualizer } from "file:///Users/wage/Documents/CompanyProjects/MXK8/mxk8-virtual-card-uniapp/node_modules/.pnpm/rollup-plugin-visualizer@6.0.3_rollup@4.50.0/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import UnoCSS from "file:///Users/wage/Documents/CompanyProjects/MXK8/mxk8-virtual-card-uniapp/node_modules/.pnpm/unocss@66.0.0_postcss@8.5.6_vite@5.2.8_@types+node@20.19.11_less@4.5.1_sass@1.77.8_ters_af9bf1e4400dcfd6fd9128b4178fe385/node_modules/unocss/dist/vite.mjs";
import AutoImport from "file:///Users/wage/Documents/CompanyProjects/MXK8/mxk8-virtual-card-uniapp/node_modules/.pnpm/unplugin-auto-import@20.1.0/node_modules/unplugin-auto-import/dist/vite.js";
import { defineConfig, loadEnv } from "file:///Users/wage/Documents/CompanyProjects/MXK8/mxk8-virtual-card-uniapp/node_modules/.pnpm/vite@5.2.8_@types+node@20.19.11_less@4.5.1_sass@1.77.8_terser@5.43.1/node_modules/vite/dist/node/index.js";
import ViteRestart from "file:///Users/wage/Documents/CompanyProjects/MXK8/mxk8-virtual-card-uniapp/node_modules/.pnpm/vite-plugin-restart@1.0.0_vite@5.2.8_@types+node@20.19.11_less@4.5.1_sass@1.77.8_terser@5.43.1_/node_modules/vite-plugin-restart/dist/index.js";

// scripts/open-dev-tools.js
import { exec } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
function _openDevTools(env = "dev") {
  const platform = process.platform;
  const { UNI_PLATFORM } = process.env;
  const uniPlatformText = UNI_PLATFORM === "mp-weixin" ? "\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F" : UNI_PLATFORM === "mp-alipay" ? "\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F" : UNI_PLATFORM === "mp-lark" ? "\u6296\u97F3\u5C0F\u7A0B\u5E8F" : "\u5C0F\u7A0B\u5E8F";
  const outputDir = env === "build" ? `dist/build/${UNI_PLATFORM}` : `dist/dev/${UNI_PLATFORM}`;
  const projectPath = path.resolve(process.cwd(), outputDir);
  if (!fs.existsSync(projectPath)) {
    console.log(`\u274C ${uniPlatformText}\u6784\u5EFA\u76EE\u5F55\u4E0D\u5B58\u5728:`, projectPath);
    return;
  }
  console.log(`\u{1F680} \u6B63\u5728\u6253\u5F00${uniPlatformText}\u5F00\u53D1\u8005\u5DE5\u5177...`);
  let command = "";
  if (platform === "darwin") {
    if (UNI_PLATFORM === "mp-weixin") {
      command = `/Applications/wechatwebdevtools.app/Contents/MacOS/cli -o "${projectPath}"`;
    } else if (UNI_PLATFORM === "mp-alipay") {
      command = `/Applications/\u5C0F\u7A0B\u5E8F\u5F00\u53D1\u8005\u5DE5\u5177.app/Contents/MacOS/\u5C0F\u7A0B\u5E8F\u5F00\u53D1\u8005\u5DE5\u5177 --p "${projectPath}"`;
    } else if (UNI_PLATFORM === "mp-lark") {
      command = `/Applications/\u6296\u97F3\u5F00\u53D1\u8005\u5DE5\u5177.app/Contents/MacOS/\u6296\u97F3\u5F00\u53D1\u8005\u5DE5\u5177 --p "${projectPath}"`;
    }
  } else if (platform === "win32" || platform === "win64") {
    if (UNI_PLATFORM === "mp-weixin") {
      command = `"C:\\Program Files (x86)\\Tencent\\\u5FAE\u4FE1web\u5F00\u53D1\u8005\u5DE5\u5177\\cli.bat" -o "${projectPath}"`;
    }
  } else {
    console.log("\u274C \u5F53\u524D\u7CFB\u7EDF\u4E0D\u652F\u6301\u81EA\u52A8\u6253\u5F00\u5FAE\u4FE1\u5F00\u53D1\u8005\u5DE5\u5177");
    return;
  }
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`\u274C \u6253\u5F00${uniPlatformText}\u5F00\u53D1\u8005\u5DE5\u5177\u5931\u8D25:`, error.message);
      console.log(`\u{1F4A1} \u8BF7\u786E\u4FDD${uniPlatformText}\u5F00\u53D1\u8005\u5DE5\u5177\u670D\u52A1\u7AEF\u53E3\u5DF2\u542F\u7528`);
      console.log(`\u{1F4A1} \u53EF\u4EE5\u624B\u52A8\u6253\u5F00${uniPlatformText}\u5F00\u53D1\u8005\u5DE5\u5177\u5E76\u5BFC\u5165\u9879\u76EE:`, projectPath);
      return;
    }
    if (stderr) {
      console.log("\u26A0\uFE0F \u8B66\u544A:", stderr);
    }
    console.log(`\u2705 ${uniPlatformText}\u5F00\u53D1\u8005\u5DE5\u5177\u5DF2\u6253\u5F00`);
    if (stdout) {
      console.log(stdout);
    }
  });
}
function openDevTools(options = {}) {
  const { mode = "development" } = options;
  const env = mode === "production" ? "build" : "dev";
  let isFirstBuild = true;
  return {
    name: "uni-devtools",
    writeBundle() {
      if (isFirstBuild && process.env.UNI_PLATFORM?.includes("mp")) {
        isFirstBuild = false;
        _openDevTools(env);
      }
    }
  };
}

// vite-plugins/copy-native-resources.ts
import path2 from "node:path";
import process2 from "node:process";
import fs2 from "file:///Users/wage/Documents/CompanyProjects/MXK8/mxk8-virtual-card-uniapp/node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/index.js";
var DEFAULT_OPTIONS = {
  enable: true,
  sourceDir: "nativeplugins",
  targetDirName: "nativeplugins",
  verbose: true,
  logPrefix: "[copy-native-resources]"
};
function copyNativeResources(options = {}) {
  const config = { ...DEFAULT_OPTIONS, ...options };
  if (!config.enable) {
    return {
      name: "copy-native-resources-disabled",
      apply: "build",
      writeBundle() {
      }
    };
  }
  return {
    name: "copy-native-resources",
    apply: "build",
    // 只在构建时应用
    enforce: "post",
    // 在其他插件执行完毕后执行
    async writeBundle() {
      const { sourceDir, targetDirName, verbose, logPrefix } = config;
      try {
        const projectRoot = process2.cwd();
        const sourcePath = path2.resolve(projectRoot, sourceDir);
        const buildMode = process2.env.NODE_ENV === "production" ? "build" : "dev";
        const platform = process2.env.UNI_PLATFORM || "app";
        const targetPath = path2.resolve(
          projectRoot,
          "dist",
          buildMode,
          platform,
          targetDirName
        );
        const sourceExists = await fs2.pathExists(sourcePath);
        if (!sourceExists) {
          if (verbose) {
            console.warn(`${logPrefix} \u6E90\u76EE\u5F55\u4E0D\u5B58\u5728\uFF0C\u8DF3\u8FC7\u590D\u5236\u64CD\u4F5C`);
            console.warn(`${logPrefix} \u6E90\u76EE\u5F55\u8DEF\u5F84: ${sourcePath}`);
            console.warn(`${logPrefix} \u5982\u9700\u4F7F\u7528\u672C\u5730\u539F\u751F\u63D2\u4EF6\uFF0C\u8BF7\u5728\u9879\u76EE\u6839\u76EE\u5F55\u521B\u5EFA nativeplugins \u76EE\u5F55`);
            console.warn(`${logPrefix} \u5E76\u6309\u7167\u5B98\u65B9\u6587\u6863\u653E\u5165\u539F\u751F\u63D2\u4EF6\u6587\u4EF6`);
            console.warn(`${logPrefix} \u53C2\u8003: https://uniapp.dcloud.net.cn/plugin/native-plugin.html`);
          }
          return;
        }
        const sourceFiles = await fs2.readdir(sourcePath);
        if (sourceFiles.length === 0) {
          if (verbose) {
            console.warn(`${logPrefix} \u6E90\u76EE\u5F55\u4E3A\u7A7A\uFF0C\u8DF3\u8FC7\u590D\u5236\u64CD\u4F5C`);
            console.warn(`${logPrefix} \u6E90\u76EE\u5F55\u8DEF\u5F84: ${sourcePath}`);
            console.warn(`${logPrefix} \u8BF7\u5728 nativeplugins \u76EE\u5F55\u4E2D\u653E\u5165\u539F\u751F\u63D2\u4EF6\u6587\u4EF6`);
          }
          return;
        }
        await fs2.ensureDir(targetPath);
        if (verbose) {
          console.log(`${logPrefix} \u5F00\u59CB\u590D\u5236 UniApp \u672C\u5730\u539F\u751F\u63D2\u4EF6...`);
          console.log(`${logPrefix} \u6E90\u76EE\u5F55: ${sourcePath}`);
          console.log(`${logPrefix} \u76EE\u6807\u76EE\u5F55: ${targetPath}`);
          console.log(`${logPrefix} \u6784\u5EFA\u6A21\u5F0F: ${buildMode}`);
          console.log(`${logPrefix} \u76EE\u6807\u5E73\u53F0: ${platform}`);
          console.log(`${logPrefix} \u53D1\u73B0 ${sourceFiles.length} \u4E2A\u539F\u751F\u63D2\u4EF6\u6587\u4EF6/\u76EE\u5F55`);
        }
        await fs2.copy(sourcePath, targetPath, {
          overwrite: true,
          // 覆盖已存在的文件，确保使用最新版本
          errorOnExist: false,
          // 如果目标文件存在不报错
          preserveTimestamps: true
          // 保持文件的时间戳
        });
        if (verbose) {
          console.log(`${logPrefix} \u2705 UniApp \u672C\u5730\u539F\u751F\u63D2\u4EF6\u590D\u5236\u5B8C\u6210`);
          console.log(`${logPrefix} \u5DF2\u6210\u529F\u590D\u5236 ${sourceFiles.length} \u4E2A\u6587\u4EF6/\u76EE\u5F55\u5230\u6784\u5EFA\u76EE\u5F55`);
          console.log(`${logPrefix} \u539F\u751F\u63D2\u4EF6\u73B0\u5728\u53EF\u4EE5\u5728 App \u4E2D\u6B63\u5E38\u4F7F\u7528`);
        }
      } catch (error) {
        console.error(`${config.logPrefix} \u274C \u590D\u5236 UniApp \u672C\u5730\u539F\u751F\u63D2\u4EF6\u5931\u8D25:`, error);
        console.error(`${config.logPrefix} \u9519\u8BEF\u8BE6\u60C5:`, error instanceof Error ? error.message : String(error));
        console.error(`${config.logPrefix} \u8BF7\u68C0\u67E5\u6E90\u76EE\u5F55\u6743\u9650\u548C\u78C1\u76D8\u7A7A\u95F4`);
      }
    }
  };
}
function createCopyNativeResourcesPlugin(enable = true, options = {}) {
  return copyNativeResources({ enable, ...options });
}

// vite-plugins/sync-manifest-plugins.ts
import fs3 from "node:fs";
import path3 from "node:path";
import process3 from "node:process";
function syncManifestPlugin() {
  return {
    name: "sync-manifest",
    apply: "build",
    enforce: "post",
    writeBundle: {
      order: "post",
      handler() {
        const srcManifestPath = path3.resolve(process3.cwd(), "./src/manifest.json");
        const distAppPath = path3.resolve(process3.cwd(), "./dist/dev/app/manifest.json");
        try {
          const srcManifest = JSON.parse(fs3.readFileSync(srcManifestPath, "utf8"));
          const distAppDir = path3.dirname(distAppPath);
          if (!fs3.existsSync(distAppDir)) {
            fs3.mkdirSync(distAppDir, { recursive: true });
          }
          let distManifest = {};
          if (fs3.existsSync(distAppPath)) {
            distManifest = JSON.parse(fs3.readFileSync(distAppPath, "utf8"));
          }
          if (srcManifest["app-plus"]?.distribute?.plugins) {
            if (!distManifest.plus)
              distManifest.plus = {};
            if (!distManifest.plus.distribute)
              distManifest.plus.distribute = {};
            distManifest.plus.distribute.plugins = srcManifest["app-plus"].distribute.plugins;
            fs3.writeFileSync(distAppPath, JSON.stringify(distManifest, null, 2));
            console.log("\u2705 Manifest plugins \u540C\u6B65\u6210\u529F");
          }
        } catch (error) {
          console.error("\u274C \u540C\u6B65 manifest plugins \u5931\u8D25:", error);
        }
      }
    }
  };
}

// vite.config.ts
var vite_config_default = defineConfig(({ command, mode }) => {
  console.log("command, mode -> ", command, mode);
  const { UNI_PLATFORM, SKIP_OPEN_DEVTOOLS } = process4.env;
  console.log("UNI_PLATFORM -> ", UNI_PLATFORM);
  const env = loadEnv(mode, path4.resolve(process4.cwd(), "env"));
  const {
    VITE_APP_PORT,
    VITE_SERVER_BASEURL,
    VITE_APP_TITLE,
    VITE_DELETE_CONSOLE,
    VITE_APP_PUBLIC_BASE,
    VITE_APP_PROXY_ENABLE,
    VITE_APP_PROXY_PREFIX,
    VITE_COPY_NATIVE_RES_ENABLE
  } = env;
  console.log("\u73AF\u5883\u53D8\u91CF env -> ", env);
  return defineConfig({
    envDir: "./env",
    // 自定义env目录
    base: VITE_APP_PUBLIC_BASE,
    plugins: [
      // UniXXX 需要在 Uni 之前引入
      UniLayouts(),
      UniPlatform(),
      UniManifest(),
      UniComponents({
        extensions: ["vue"],
        deep: true,
        // 是否递归扫描子目录，
        directoryAsNamespace: false,
        // 是否把目录名作为命名空间前缀，true 时组件名为 目录名+组件名，
        dts: "src/types/components.d.ts"
        // 自动生成的组件类型声明文件路径（用于 TypeScript 支持）
      }),
      UniPages({
        exclude: ["**/components/**/**.*", "**/sections/**/**.*"],
        // pages 目录为 src/pages，分包目录不能配置在pages目录下！！
        // 是个数组，可以配置多个，但是不能为pages里面的目录！！
        // "src/pages-demo" 是unibest demo 预留的，方便后续插入demo示例
        subPackages: ["src/pages-demo"],
        dts: "src/types/uni-pages.d.ts"
      }),
      // UniOptimization 插件需要 page.json 文件，故应在 UniPages 插件之后执行
      UniOptimization({
        enable: {
          "optimization": true,
          "async-import": true,
          "async-component": true
        },
        dts: {
          base: "src/types"
        },
        logger: false
      }),
      // 若存在改变 pages.json 的插件，请将 UniKuRoot 放置其后
      UniKuRoot({
        excludePages: ["**/components/**/**.*", "**/sections/**/**.*"]
      }),
      Uni(),
      {
        // 临时解决 dcloudio 官方的 @dcloudio/uni-mp-compiler 出现的编译 BUG
        // 参考 github issue: https://github.com/dcloudio/uni-app/issues/4952
        // 自定义插件禁用 vite:vue 插件的 devToolsEnabled，强制编译 vue 模板时 inline 为 true
        name: "fix-vite-plugin-vue",
        configResolved(config) {
          const plugin = config.plugins.find((p) => p.name === "vite:vue");
          if (plugin && plugin.api && plugin.api.options) {
            plugin.api.options.devToolsEnabled = false;
          }
        }
      },
      UnoCSS(),
      AutoImport({
        imports: ["vue", "uni-app"],
        dts: "src/types/auto-import.d.ts",
        dirs: ["src/hooks"],
        // 自动导入 hooks
        vueTemplate: true
        // default false
      }),
      ViteRestart({
        // 通过这个插件，在修改vite.config.js文件则不需要重新运行也生效配置
        restart: ["vite.config.js"]
      }),
      // h5环境增加 BUILD_TIME 和 BUILD_BRANCH
      UNI_PLATFORM === "h5" && {
        name: "html-transform",
        transformIndexHtml(html) {
          return html.replace("%BUILD_TIME%", dayjs().format("YYYY-MM-DD HH:mm:ss")).replace("%VITE_APP_TITLE%", VITE_APP_TITLE);
        }
      },
      // 打包分析插件，h5 + 生产环境才弹出
      UNI_PLATFORM === "h5" && mode === "production" && visualizer({
        filename: "./node_modules/.cache/visualizer/stats.html",
        open: true,
        gzipSize: true,
        brotliSize: true
      }),
      // 原生插件资源复制插件 - 仅在 app 平台且启用时生效
      createCopyNativeResourcesPlugin(
        UNI_PLATFORM === "app" && VITE_COPY_NATIVE_RES_ENABLE === "true",
        {
          verbose: mode === "development"
          // 开发模式显示详细日志
        }
      ),
      syncManifestPlugin(),
      // 自动打开开发者工具插件 (必须修改 .env 文件中的 VITE_WX_APPID)
      // 上传时通过 SKIP_OPEN_DEVTOOLS=true 跳过
      SKIP_OPEN_DEVTOOLS !== "true" && openDevTools({ mode })
    ],
    define: {
      __VITE_APP_PROXY__: JSON.stringify(VITE_APP_PROXY_ENABLE)
    },
    css: {
      postcss: {
        plugins: [
          // autoprefixer({
          //   // 指定目标浏览器
          //   overrideBrowserslist: ['> 1%', 'last 2 versions'],
          // }),
        ]
      }
    },
    resolve: {
      alias: {
        "@": path4.join(process4.cwd(), "./src"),
        "@img": path4.join(process4.cwd(), "./src/static/images")
      }
    },
    server: {
      host: "0.0.0.0",
      hmr: true,
      port: Number.parseInt(VITE_APP_PORT, 10),
      // 仅 H5 端生效，其他端不生效（其他端走build，不走devServer)
      proxy: JSON.parse(VITE_APP_PROXY_ENABLE) ? {
        [VITE_APP_PROXY_PREFIX]: {
          target: VITE_SERVER_BASEURL,
          changeOrigin: true,
          // 后端有/api前缀则不做处理，没有则需要去掉
          rewrite: (path5) => path5.replace(new RegExp(`^${VITE_APP_PROXY_PREFIX}`), "")
        }
      } : void 0
    },
    esbuild: {
      drop: VITE_DELETE_CONSOLE === "true" ? ["console", "debugger"] : []
    },
    build: {
      sourcemap: false,
      // 方便非h5端调试
      // sourcemap: VITE_SHOW_SOURCEMAP === 'true', // 默认是false
      target: "es6",
      // 开发环境不用压缩
      minify: mode === "development" ? false : "esbuild"
    }
  });
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic2NyaXB0cy9vcGVuLWRldi10b29scy5qcyIsICJ2aXRlLXBsdWdpbnMvY29weS1uYXRpdmUtcmVzb3VyY2VzLnRzIiwgInZpdGUtcGx1Z2lucy9zeW5jLW1hbmlmZXN0LXBsdWdpbnMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvd2FnZS9Eb2N1bWVudHMvQ29tcGFueVByb2plY3RzL01YSzgvbXhrOC12aXJ0dWFsLWNhcmQtdW5pYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvd2FnZS9Eb2N1bWVudHMvQ29tcGFueVByb2plY3RzL01YSzgvbXhrOC12aXJ0dWFsLWNhcmQtdW5pYXBwL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy93YWdlL0RvY3VtZW50cy9Db21wYW55UHJvamVjdHMvTVhLOC9teGs4LXZpcnR1YWwtY2FyZC11bmlhcHAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnXG5pbXBvcnQgVW5pIGZyb20gJ0B1bmktaGVscGVyL3BsdWdpbi11bmknXG5pbXBvcnQgVW5pQ29tcG9uZW50cyBmcm9tICdAdW5pLWhlbHBlci92aXRlLXBsdWdpbi11bmktY29tcG9uZW50cydcbi8vIEBzZWUgaHR0cHM6Ly91bmktaGVscGVyLmpzLm9yZy92aXRlLXBsdWdpbi11bmktbGF5b3V0c1xuaW1wb3J0IFVuaUxheW91dHMgZnJvbSAnQHVuaS1oZWxwZXIvdml0ZS1wbHVnaW4tdW5pLWxheW91dHMnXG4vLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91bmktaGVscGVyL3ZpdGUtcGx1Z2luLXVuaS1tYW5pZmVzdFxuaW1wb3J0IFVuaU1hbmlmZXN0IGZyb20gJ0B1bmktaGVscGVyL3ZpdGUtcGx1Z2luLXVuaS1tYW5pZmVzdCdcbi8vIEBzZWUgaHR0cHM6Ly91bmktaGVscGVyLmpzLm9yZy92aXRlLXBsdWdpbi11bmktcGFnZXNcbmltcG9ydCBVbmlQYWdlcyBmcm9tICdAdW5pLWhlbHBlci92aXRlLXBsdWdpbi11bmktcGFnZXMnXG4vLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91bmktaGVscGVyL3ZpdGUtcGx1Z2luLXVuaS1wbGF0Zm9ybVxuLy8gXHU5NzAwXHU4OTgxXHU0RTBFIEB1bmktaGVscGVyL3ZpdGUtcGx1Z2luLXVuaS1wYWdlcyBcdTYzRDJcdTRFRjZcdTRFMDBcdThENzdcdTRGN0ZcdTc1MjhcbmltcG9ydCBVbmlQbGF0Zm9ybSBmcm9tICdAdW5pLWhlbHBlci92aXRlLXBsdWdpbi11bmktcGxhdGZvcm0nXG4vKipcbiAqIFx1NTIwNlx1NTMwNVx1NEYxOFx1NTMxNlx1MzAwMVx1NkEyMVx1NTc1N1x1NUYwMlx1NkI2NVx1OERFOFx1NTMwNVx1OEMwM1x1NzUyOFx1MzAwMVx1N0VDNFx1NEVGNlx1NUYwMlx1NkI2NVx1OERFOFx1NTMwNVx1NUYxNVx1NzUyOFxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vdW5pLWt1L2J1bmRsZS1vcHRpbWl6ZXJcbiAqL1xuaW1wb3J0IFVuaU9wdGltaXphdGlvbiBmcm9tICdAdW5pLWt1L2J1bmRsZS1vcHRpbWl6ZXInXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdW5pLWt1L3Jvb3RcbmltcG9ydCBVbmlLdVJvb3QgZnJvbSAnQHVuaS1rdS9yb290J1xuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJ1xuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcidcbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcbmltcG9ydCBWaXRlUmVzdGFydCBmcm9tICd2aXRlLXBsdWdpbi1yZXN0YXJ0J1xuaW1wb3J0IG9wZW5EZXZUb29scyBmcm9tICcuL3NjcmlwdHMvb3Blbi1kZXYtdG9vbHMnXG5pbXBvcnQgeyBjcmVhdGVDb3B5TmF0aXZlUmVzb3VyY2VzUGx1Z2luIH0gZnJvbSAnLi92aXRlLXBsdWdpbnMvY29weS1uYXRpdmUtcmVzb3VyY2VzJ1xuaW1wb3J0IHN5bmNNYW5pZmVzdFBsdWdpbiBmcm9tICcuL3ZpdGUtcGx1Z2lucy9zeW5jLW1hbmlmZXN0LXBsdWdpbnMnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KSA9PiB7XG4gICAgLy8gQHNlZSBodHRwczovL3Vub2Nzcy5kZXYvXG4gICAgLy8gY29uc3QgVW5vQ1NTID0gKGF3YWl0IGltcG9ydCgndW5vY3NzL3ZpdGUnKSkuZGVmYXVsdFxuICAgIC8vIGNvbnNvbGUubG9nKG1vZGUgPT09IHByb2Nlc3MuZW52Lk5PREVfRU5WKSAvLyB0cnVlXG5cbiAgICAvLyBtb2RlOiBcdTUzM0FcdTUyMDZcdTc1MUZcdTRFQTdcdTczQUZcdTU4ODNcdThGRDhcdTY2MkZcdTVGMDBcdTUzRDFcdTczQUZcdTU4ODNcbiAgICBjb25zb2xlLmxvZygnY29tbWFuZCwgbW9kZSAtPiAnLCBjb21tYW5kLCBtb2RlKVxuICAgIC8vIHBucG0gZGV2Omg1IFx1NjVGNlx1NUY5N1x1NTIzMCA9PiBzZXJ2ZSBkZXZlbG9wbWVudFxuICAgIC8vIHBucG0gYnVpbGQ6aDUgXHU2NUY2XHU1Rjk3XHU1MjMwID0+IGJ1aWxkIHByb2R1Y3Rpb25cbiAgICAvLyBwbnBtIGRldjptcC13ZWl4aW4gXHU2NUY2XHU1Rjk3XHU1MjMwID0+IGJ1aWxkIGRldmVsb3BtZW50IChcdTZDRThcdTYxMEZcdTUzM0FcdTUyMkJcdUZGMENjb21tYW5kXHU0RTNBYnVpbGQpXG4gICAgLy8gcG5wbSBidWlsZDptcC13ZWl4aW4gXHU2NUY2XHU1Rjk3XHU1MjMwID0+IGJ1aWxkIHByb2R1Y3Rpb25cbiAgICAvLyBwbnBtIGRldjphcHAgXHU2NUY2XHU1Rjk3XHU1MjMwID0+IGJ1aWxkIGRldmVsb3BtZW50IChcdTZDRThcdTYxMEZcdTUzM0FcdTUyMkJcdUZGMENjb21tYW5kXHU0RTNBYnVpbGQpXG4gICAgLy8gcG5wbSBidWlsZDphcHAgXHU2NUY2XHU1Rjk3XHU1MjMwID0+IGJ1aWxkIHByb2R1Y3Rpb25cbiAgICAvLyBkZXYgXHU1NDhDIGJ1aWxkIFx1NTQ3RFx1NEVFNFx1NTNFRlx1NEVFNVx1NTIwNlx1NTIyQlx1NEY3Rlx1NzUyOCAuZW52LmRldmVsb3BtZW50IFx1NTQ4QyAuZW52LnByb2R1Y3Rpb24gXHU3Njg0XHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXG5cbiAgICBjb25zdCB7IFVOSV9QTEFURk9STSwgU0tJUF9PUEVOX0RFVlRPT0xTIH0gPSBwcm9jZXNzLmVudlxuICAgIGNvbnNvbGUubG9nKCdVTklfUExBVEZPUk0gLT4gJywgVU5JX1BMQVRGT1JNKSAvLyBcdTVGOTdcdTUyMzAgbXAtd2VpeGluLCBoNSwgYXBwIFx1N0I0OVxuXG4gICAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ2VudicpKVxuICAgIGNvbnN0IHtcbiAgICAgICAgVklURV9BUFBfUE9SVCxcbiAgICAgICAgVklURV9TRVJWRVJfQkFTRVVSTCxcbiAgICAgICAgVklURV9BUFBfVElUTEUsXG4gICAgICAgIFZJVEVfREVMRVRFX0NPTlNPTEUsXG4gICAgICAgIFZJVEVfQVBQX1BVQkxJQ19CQVNFLFxuICAgICAgICBWSVRFX0FQUF9QUk9YWV9FTkFCTEUsXG4gICAgICAgIFZJVEVfQVBQX1BST1hZX1BSRUZJWCxcbiAgICAgICAgVklURV9DT1BZX05BVElWRV9SRVNfRU5BQkxFLFxuICAgIH0gPSBlbnZcbiAgICBjb25zb2xlLmxvZygnXHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGIGVudiAtPiAnLCBlbnYpXG5cbiAgICByZXR1cm4gZGVmaW5lQ29uZmlnKHtcbiAgICAgICAgZW52RGlyOiAnLi9lbnYnLCAvLyBcdTgxRUFcdTVCOUFcdTRFNDllbnZcdTc2RUVcdTVGNTVcbiAgICAgICAgYmFzZTogVklURV9BUFBfUFVCTElDX0JBU0UsXG4gICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAgIC8vIFVuaVhYWCBcdTk3MDBcdTg5ODFcdTU3MjggVW5pIFx1NEU0Qlx1NTI0RFx1NUYxNVx1NTE2NVxuICAgICAgICAgICAgVW5pTGF5b3V0cygpLFxuICAgICAgICAgICAgVW5pUGxhdGZvcm0oKSxcbiAgICAgICAgICAgIFVuaU1hbmlmZXN0KCksXG4gICAgICAgICAgICBVbmlDb21wb25lbnRzKHtcbiAgICAgICAgICAgICAgICBleHRlbnNpb25zOiBbJ3Z1ZSddLFxuICAgICAgICAgICAgICAgIGRlZXA6IHRydWUsIC8vIFx1NjYyRlx1NTQyNlx1OTAxMlx1NUY1Mlx1NjI2Qlx1NjNDRlx1NUI1MFx1NzZFRVx1NUY1NVx1RkYwQ1xuICAgICAgICAgICAgICAgIGRpcmVjdG9yeUFzTmFtZXNwYWNlOiBmYWxzZSwgLy8gXHU2NjJGXHU1NDI2XHU2MjhBXHU3NkVFXHU1RjU1XHU1NDBEXHU0RjVDXHU0RTNBXHU1NDdEXHU1NDBEXHU3QTdBXHU5NUY0XHU1MjREXHU3RjAwXHVGRjBDdHJ1ZSBcdTY1RjZcdTdFQzRcdTRFRjZcdTU0MERcdTRFM0EgXHU3NkVFXHU1RjU1XHU1NDBEK1x1N0VDNFx1NEVGNlx1NTQwRFx1RkYwQ1xuICAgICAgICAgICAgICAgIGR0czogJ3NyYy90eXBlcy9jb21wb25lbnRzLmQudHMnLCAvLyBcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTBcdTc2ODRcdTdFQzRcdTRFRjZcdTdDN0JcdTU3OEJcdTU4RjBcdTY2MEVcdTY1ODdcdTRFRjZcdThERUZcdTVGODRcdUZGMDhcdTc1MjhcdTRFOEUgVHlwZVNjcmlwdCBcdTY1MkZcdTYzMDFcdUZGMDlcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgVW5pUGFnZXMoe1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGU6IFsnKiovY29tcG9uZW50cy8qKi8qKi4qJywgJyoqL3NlY3Rpb25zLyoqLyoqLionXSxcbiAgICAgICAgICAgICAgICAvLyBwYWdlcyBcdTc2RUVcdTVGNTVcdTRFM0Egc3JjL3BhZ2VzXHVGRjBDXHU1MjA2XHU1MzA1XHU3NkVFXHU1RjU1XHU0RTBEXHU4MEZEXHU5MTREXHU3RjZFXHU1NzI4cGFnZXNcdTc2RUVcdTVGNTVcdTRFMEJcdUZGMDFcdUZGMDFcbiAgICAgICAgICAgICAgICAvLyBcdTY2MkZcdTRFMkFcdTY1NzBcdTdFQzRcdUZGMENcdTUzRUZcdTRFRTVcdTkxNERcdTdGNkVcdTU5MUFcdTRFMkFcdUZGMENcdTRGNDZcdTY2MkZcdTRFMERcdTgwRkRcdTRFM0FwYWdlc1x1OTFDQ1x1OTc2Mlx1NzY4NFx1NzZFRVx1NUY1NVx1RkYwMVx1RkYwMVxuICAgICAgICAgICAgICAgIC8vIFwic3JjL3BhZ2VzLWRlbW9cIiBcdTY2MkZ1bmliZXN0IGRlbW8gXHU5ODg0XHU3NTU5XHU3Njg0XHVGRjBDXHU2NUI5XHU0RkJGXHU1NDBFXHU3RUVEXHU2M0QyXHU1MTY1ZGVtb1x1NzkzQVx1NEY4QlxuICAgICAgICAgICAgICAgIHN1YlBhY2thZ2VzOiBbJ3NyYy9wYWdlcy1kZW1vJ10sXG4gICAgICAgICAgICAgICAgZHRzOiAnc3JjL3R5cGVzL3VuaS1wYWdlcy5kLnRzJyxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgLy8gVW5pT3B0aW1pemF0aW9uIFx1NjNEMlx1NEVGNlx1OTcwMFx1ODk4MSBwYWdlLmpzb24gXHU2NTg3XHU0RUY2XHVGRjBDXHU2NTQ1XHU1RTk0XHU1NzI4IFVuaVBhZ2VzIFx1NjNEMlx1NEVGNlx1NEU0Qlx1NTQwRVx1NjI2N1x1ODg0Q1xuICAgICAgICAgICAgVW5pT3B0aW1pemF0aW9uKHtcbiAgICAgICAgICAgICAgICBlbmFibGU6IHtcbiAgICAgICAgICAgICAgICAgICAgJ29wdGltaXphdGlvbic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICdhc3luYy1pbXBvcnQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAnYXN5bmMtY29tcG9uZW50JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGR0czoge1xuICAgICAgICAgICAgICAgICAgICBiYXNlOiAnc3JjL3R5cGVzJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGxvZ2dlcjogZmFsc2UsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIC8vIFx1ODJFNVx1NUI1OFx1NTcyOFx1NjUzOVx1NTNEOCBwYWdlcy5qc29uIFx1NzY4NFx1NjNEMlx1NEVGNlx1RkYwQ1x1OEJGN1x1NUMwNiBVbmlLdVJvb3QgXHU2NTNFXHU3RjZFXHU1MTc2XHU1NDBFXG4gICAgICAgICAgICBVbmlLdVJvb3Qoe1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVQYWdlczogWycqKi9jb21wb25lbnRzLyoqLyoqLionLCAnKiovc2VjdGlvbnMvKiovKiouKiddLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBVbmkoKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBcdTRFMzRcdTY1RjZcdTg5RTNcdTUxQjMgZGNsb3VkaW8gXHU1Qjk4XHU2NUI5XHU3Njg0IEBkY2xvdWRpby91bmktbXAtY29tcGlsZXIgXHU1MUZBXHU3M0IwXHU3Njg0XHU3RjE2XHU4QkQxIEJVR1xuICAgICAgICAgICAgICAgIC8vIFx1NTNDMlx1ODAwMyBnaXRodWIgaXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kY2xvdWRpby91bmktYXBwL2lzc3Vlcy80OTUyXG4gICAgICAgICAgICAgICAgLy8gXHU4MUVBXHU1QjlBXHU0RTQ5XHU2M0QyXHU0RUY2XHU3OTgxXHU3NTI4IHZpdGU6dnVlIFx1NjNEMlx1NEVGNlx1NzY4NCBkZXZUb29sc0VuYWJsZWRcdUZGMENcdTVGM0FcdTUyMzZcdTdGMTZcdThCRDEgdnVlIFx1NkEyMVx1Njc3Rlx1NjVGNiBpbmxpbmUgXHU0RTNBIHRydWVcbiAgICAgICAgICAgICAgICBuYW1lOiAnZml4LXZpdGUtcGx1Z2luLXZ1ZScsXG4gICAgICAgICAgICAgICAgY29uZmlnUmVzb2x2ZWQoY29uZmlnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBsdWdpbiA9IGNvbmZpZy5wbHVnaW5zLmZpbmQocCA9PiBwLm5hbWUgPT09ICd2aXRlOnZ1ZScpXG4gICAgICAgICAgICAgICAgICAgIGlmIChwbHVnaW4gJiYgcGx1Z2luLmFwaSAmJiBwbHVnaW4uYXBpLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpbi5hcGkub3B0aW9ucy5kZXZUb29sc0VuYWJsZWQgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBVbm9DU1MoKSxcbiAgICAgICAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICAgICAgICAgIGltcG9ydHM6IFsndnVlJywgJ3VuaS1hcHAnXSxcbiAgICAgICAgICAgICAgICBkdHM6ICdzcmMvdHlwZXMvYXV0by1pbXBvcnQuZC50cycsXG4gICAgICAgICAgICAgICAgZGlyczogWydzcmMvaG9va3MnXSwgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IGhvb2tzXG4gICAgICAgICAgICAgICAgdnVlVGVtcGxhdGU6IHRydWUsIC8vIGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgVml0ZVJlc3RhcnQoe1xuICAgICAgICAgICAgICAgIC8vIFx1OTAxQVx1OEZDN1x1OEZEOVx1NEUyQVx1NjNEMlx1NEVGNlx1RkYwQ1x1NTcyOFx1NEZFRVx1NjUzOXZpdGUuY29uZmlnLmpzXHU2NTg3XHU0RUY2XHU1MjE5XHU0RTBEXHU5NzAwXHU4OTgxXHU5MUNEXHU2NUIwXHU4RkQwXHU4ODRDXHU0RTVGXHU3NTFGXHU2NTQ4XHU5MTREXHU3RjZFXG4gICAgICAgICAgICAgICAgcmVzdGFydDogWyd2aXRlLmNvbmZpZy5qcyddLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAvLyBoNVx1NzNBRlx1NTg4M1x1NTg5RVx1NTJBMCBCVUlMRF9USU1FIFx1NTQ4QyBCVUlMRF9CUkFOQ0hcbiAgICAgICAgICAgIFVOSV9QTEFURk9STSA9PT0gJ2g1JyAmJiB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2h0bWwtdHJhbnNmb3JtJyxcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1JbmRleEh0bWwoaHRtbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaHRtbFxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoJyVCVUlMRF9USU1FJScsIGRheWpzKCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJykpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgnJVZJVEVfQVBQX1RJVExFJScsIFZJVEVfQVBQX1RJVExFKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gXHU2MjUzXHU1MzA1XHU1MjA2XHU2NzkwXHU2M0QyXHU0RUY2XHVGRjBDaDUgKyBcdTc1MUZcdTRFQTdcdTczQUZcdTU4ODNcdTYyNERcdTVGMzlcdTUxRkFcbiAgICAgICAgICAgIFVOSV9QTEFURk9STSA9PT0gJ2g1J1xuICAgICAgICAgICAgJiYgbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nXG4gICAgICAgICAgICAmJiB2aXN1YWxpemVyKHtcbiAgICAgICAgICAgICAgICBmaWxlbmFtZTogJy4vbm9kZV9tb2R1bGVzLy5jYWNoZS92aXN1YWxpemVyL3N0YXRzLmh0bWwnLFxuICAgICAgICAgICAgICAgIG9wZW46IHRydWUsXG4gICAgICAgICAgICAgICAgZ3ppcFNpemU6IHRydWUsXG4gICAgICAgICAgICAgICAgYnJvdGxpU2l6ZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgLy8gXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHU4RDQ0XHU2RTkwXHU1OTBEXHU1MjM2XHU2M0QyXHU0RUY2IC0gXHU0RUM1XHU1NzI4IGFwcCBcdTVFNzNcdTUzRjBcdTRFMTRcdTU0MkZcdTc1MjhcdTY1RjZcdTc1MUZcdTY1NDhcbiAgICAgICAgICAgIGNyZWF0ZUNvcHlOYXRpdmVSZXNvdXJjZXNQbHVnaW4oXG4gICAgICAgICAgICAgICAgVU5JX1BMQVRGT1JNID09PSAnYXBwJyAmJiBWSVRFX0NPUFlfTkFUSVZFX1JFU19FTkFCTEUgPT09ICd0cnVlJyxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZlcmJvc2U6IG1vZGUgPT09ICdkZXZlbG9wbWVudCcsIC8vIFx1NUYwMFx1NTNEMVx1NkEyMVx1NUYwRlx1NjYzRVx1NzkzQVx1OEJFNlx1N0VDNlx1NjVFNVx1NUZEN1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgc3luY01hbmlmZXN0UGx1Z2luKCksXG4gICAgICAgICAgICAvLyBcdTgxRUFcdTUyQThcdTYyNTNcdTVGMDBcdTVGMDBcdTUzRDFcdTgwMDVcdTVERTVcdTUxNzdcdTYzRDJcdTRFRjYgKFx1NUZDNVx1OTg3Qlx1NEZFRVx1NjUzOSAuZW52IFx1NjU4N1x1NEVGNlx1NEUyRFx1NzY4NCBWSVRFX1dYX0FQUElEKVxuICAgICAgICAgICAgLy8gXHU0RTBBXHU0RjIwXHU2NUY2XHU5MDFBXHU4RkM3IFNLSVBfT1BFTl9ERVZUT09MUz10cnVlIFx1OERGM1x1OEZDN1xuICAgICAgICAgICAgU0tJUF9PUEVOX0RFVlRPT0xTICE9PSAndHJ1ZScgJiYgb3BlbkRldlRvb2xzKHsgbW9kZSB9KSxcbiAgICAgICAgXSxcbiAgICAgICAgZGVmaW5lOiB7XG4gICAgICAgICAgICBfX1ZJVEVfQVBQX1BST1hZX186IEpTT04uc3RyaW5naWZ5KFZJVEVfQVBQX1BST1hZX0VOQUJMRSksXG4gICAgICAgIH0sXG4gICAgICAgIGNzczoge1xuICAgICAgICAgICAgcG9zdGNzczoge1xuICAgICAgICAgICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgLy8gYXV0b3ByZWZpeGVyKHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAvLyBcdTYzMDdcdTVCOUFcdTc2RUVcdTY4MDdcdTZENEZcdTg5QzhcdTU2NjhcbiAgICAgICAgICAgICAgICAgICAgLy8gICBvdmVycmlkZUJyb3dzZXJzbGlzdDogWyc+IDElJywgJ2xhc3QgMiB2ZXJzaW9ucyddLFxuICAgICAgICAgICAgICAgICAgICAvLyB9KSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcblxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgICAgICdAJzogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICcuL3NyYycpLFxuICAgICAgICAgICAgICAgICdAaW1nJzogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICcuL3NyYy9zdGF0aWMvaW1hZ2VzJyksXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBzZXJ2ZXI6IHtcbiAgICAgICAgICAgIGhvc3Q6ICcwLjAuMC4wJyxcbiAgICAgICAgICAgIGhtcjogdHJ1ZSxcbiAgICAgICAgICAgIHBvcnQ6IE51bWJlci5wYXJzZUludChWSVRFX0FQUF9QT1JULCAxMCksXG4gICAgICAgICAgICAvLyBcdTRFQzUgSDUgXHU3QUVGXHU3NTFGXHU2NTQ4XHVGRjBDXHU1MTc2XHU0RUQ2XHU3QUVGXHU0RTBEXHU3NTFGXHU2NTQ4XHVGRjA4XHU1MTc2XHU0RUQ2XHU3QUVGXHU4RDcwYnVpbGRcdUZGMENcdTRFMERcdThENzBkZXZTZXJ2ZXIpXG4gICAgICAgICAgICBwcm94eTogSlNPTi5wYXJzZShWSVRFX0FQUF9QUk9YWV9FTkFCTEUpXG4gICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgICAgICBbVklURV9BUFBfUFJPWFlfUFJFRklYXToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDogVklURV9TRVJWRVJfQkFTRVVSTCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gXHU1NDBFXHU3QUVGXHU2NzA5L2FwaVx1NTI0RFx1N0YwMFx1NTIxOVx1NEUwRFx1NTA1QVx1NTkwNFx1NzQwNlx1RkYwQ1x1NkNBMVx1NjcwOVx1NTIxOVx1OTcwMFx1ODk4MVx1NTNCQlx1NjM4OVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJld3JpdGU6IHBhdGggPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4ke1ZJVEVfQVBQX1BST1hZX1BSRUZJWH1gKSwgJycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICB9LFxuICAgICAgICBlc2J1aWxkOiB7XG4gICAgICAgICAgICBkcm9wOiBWSVRFX0RFTEVURV9DT05TT0xFID09PSAndHJ1ZScgPyBbJ2NvbnNvbGUnLCAnZGVidWdnZXInXSA6IFtdLFxuICAgICAgICB9LFxuICAgICAgICBidWlsZDoge1xuICAgICAgICAgICAgc291cmNlbWFwOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIFx1NjVCOVx1NEZCRlx1OTc1RWg1XHU3QUVGXHU4QzAzXHU4QkQ1XG4gICAgICAgICAgICAvLyBzb3VyY2VtYXA6IFZJVEVfU0hPV19TT1VSQ0VNQVAgPT09ICd0cnVlJywgLy8gXHU5RUQ4XHU4QkE0XHU2NjJGZmFsc2VcbiAgICAgICAgICAgIHRhcmdldDogJ2VzNicsXG4gICAgICAgICAgICAvLyBcdTVGMDBcdTUzRDFcdTczQUZcdTU4ODNcdTRFMERcdTc1MjhcdTUzOEJcdTdGMjlcbiAgICAgICAgICAgIG1pbmlmeTogbW9kZSA9PT0gJ2RldmVsb3BtZW50JyA/IGZhbHNlIDogJ2VzYnVpbGQnLFxuICAgICAgICB9LFxuICAgIH0pXG59KVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvd2FnZS9Eb2N1bWVudHMvQ29tcGFueVByb2plY3RzL01YSzgvbXhrOC12aXJ0dWFsLWNhcmQtdW5pYXBwL3NjcmlwdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy93YWdlL0RvY3VtZW50cy9Db21wYW55UHJvamVjdHMvTVhLOC9teGs4LXZpcnR1YWwtY2FyZC11bmlhcHAvc2NyaXB0cy9vcGVuLWRldi10b29scy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvd2FnZS9Eb2N1bWVudHMvQ29tcGFueVByb2plY3RzL01YSzgvbXhrOC12aXJ0dWFsLWNhcmQtdW5pYXBwL3NjcmlwdHMvb3Blbi1kZXYtdG9vbHMuanNcIjtpbXBvcnQgeyBleGVjIH0gZnJvbSAnbm9kZTpjaGlsZF9wcm9jZXNzJ1xuaW1wb3J0IGZzIGZyb20gJ25vZGU6ZnMnXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnXG5cbi8qKlxuICogXHU2MjUzXHU1RjAwXHU1RjAwXHU1M0QxXHU4MDA1XHU1REU1XHU1MTc3XG4gKiBAcGFyYW0ge3N0cmluZ30gZW52IC0gXHU3M0FGXHU1ODgzXHVGRjBDJ2RldicgXHU2MjE2ICdidWlsZCdcbiAqL1xuZnVuY3Rpb24gX29wZW5EZXZUb29scyhlbnYgPSAnZGV2Jykge1xuICAgIGNvbnN0IHBsYXRmb3JtID0gcHJvY2Vzcy5wbGF0Zm9ybSAvLyBkYXJ3aW4sIHdpbjMyLCBsaW51eFxuICAgIGNvbnN0IHsgVU5JX1BMQVRGT1JNIH0gPSBwcm9jZXNzLmVudiAvLyAgbXAtd2VpeGluLCBtcC1hbGlwYXksIG1wLWxhcmtcblxuICAgIGNvbnN0IHVuaVBsYXRmb3JtVGV4dCA9IFVOSV9QTEFURk9STSA9PT0gJ21wLXdlaXhpbicgPyAnXHU1RkFFXHU0RkUxXHU1QzBGXHU3QTBCXHU1RThGJyA6IFVOSV9QTEFURk9STSA9PT0gJ21wLWFsaXBheScgPyAnXHU2NTJGXHU0RUQ4XHU1QjlEXHU1QzBGXHU3QTBCXHU1RThGJyA6IFVOSV9QTEFURk9STSA9PT0gJ21wLWxhcmsnID8gJ1x1NjI5Nlx1OTdGM1x1NUMwRlx1N0EwQlx1NUU4RicgOiAnXHU1QzBGXHU3QTBCXHU1RThGJ1xuXG4gICAgLy8gXHU5ODc5XHU3NkVFXHU4REVGXHU1Rjg0XHVGRjA4XHU2Nzg0XHU1RUZBXHU4RjkzXHU1MUZBXHU3NkVFXHU1RjU1XHVGRjA5XHVGRjBDXHU2ODM5XHU2MzZFXHU3M0FGXHU1ODgzXHU5MDA5XHU2MkU5XHU0RTBEXHU1NDBDXHU3NkVFXHU1RjU1XG4gICAgY29uc3Qgb3V0cHV0RGlyID0gZW52ID09PSAnYnVpbGQnID8gYGRpc3QvYnVpbGQvJHtVTklfUExBVEZPUk19YCA6IGBkaXN0L2Rldi8ke1VOSV9QTEFURk9STX1gXG4gICAgY29uc3QgcHJvamVjdFBhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgb3V0cHV0RGlyKVxuXG4gICAgLy8gXHU2OEMwXHU2N0U1XHU2Nzg0XHU1RUZBXHU4RjkzXHU1MUZBXHU3NkVFXHU1RjU1XHU2NjJGXHU1NDI2XHU1QjU4XHU1NzI4XG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKHByb2plY3RQYXRoKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgXHUyNzRDICR7dW5pUGxhdGZvcm1UZXh0fVx1Njc4NFx1NUVGQVx1NzZFRVx1NUY1NVx1NEUwRFx1NUI1OFx1NTcyODpgLCBwcm9qZWN0UGF0aClcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coYFx1RDgzRFx1REU4MCBcdTZCNjNcdTU3MjhcdTYyNTNcdTVGMDAke3VuaVBsYXRmb3JtVGV4dH1cdTVGMDBcdTUzRDFcdTgwMDVcdTVERTVcdTUxNzcuLi5gKVxuXG4gICAgLy8gXHU2ODM5XHU2MzZFXHU0RTBEXHU1NDBDXHU2NENEXHU0RjVDXHU3Q0ZCXHU3RURGXHU2MjY3XHU4ODRDXHU0RTBEXHU1NDBDXHU1NDdEXHU0RUU0XG4gICAgbGV0IGNvbW1hbmQgPSAnJ1xuXG4gICAgaWYgKHBsYXRmb3JtID09PSAnZGFyd2luJykge1xuICAgIC8vIG1hY09TXG4gICAgICAgIGlmIChVTklfUExBVEZPUk0gPT09ICdtcC13ZWl4aW4nKSB7XG4gICAgICAgICAgICBjb21tYW5kID0gYC9BcHBsaWNhdGlvbnMvd2VjaGF0d2ViZGV2dG9vbHMuYXBwL0NvbnRlbnRzL01hY09TL2NsaSAtbyBcIiR7cHJvamVjdFBhdGh9XCJgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoVU5JX1BMQVRGT1JNID09PSAnbXAtYWxpcGF5Jykge1xuICAgICAgICAgICAgY29tbWFuZCA9IGAvQXBwbGljYXRpb25zL1x1NUMwRlx1N0EwQlx1NUU4Rlx1NUYwMFx1NTNEMVx1ODAwNVx1NURFNVx1NTE3Ny5hcHAvQ29udGVudHMvTWFjT1MvXHU1QzBGXHU3QTBCXHU1RThGXHU1RjAwXHU1M0QxXHU4MDA1XHU1REU1XHU1MTc3IC0tcCBcIiR7cHJvamVjdFBhdGh9XCJgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoVU5JX1BMQVRGT1JNID09PSAnbXAtbGFyaycpIHtcbiAgICAgICAgICAgIGNvbW1hbmQgPSBgL0FwcGxpY2F0aW9ucy9cdTYyOTZcdTk3RjNcdTVGMDBcdTUzRDFcdTgwMDVcdTVERTVcdTUxNzcuYXBwL0NvbnRlbnRzL01hY09TL1x1NjI5Nlx1OTdGM1x1NUYwMFx1NTNEMVx1ODAwNVx1NURFNVx1NTE3NyAtLXAgXCIke3Byb2plY3RQYXRofVwiYFxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHBsYXRmb3JtID09PSAnd2luMzInIHx8IHBsYXRmb3JtID09PSAnd2luNjQnKSB7XG4gICAgLy8gV2luZG93c1xuICAgICAgICBpZiAoVU5JX1BMQVRGT1JNID09PSAnbXAtd2VpeGluJykge1xuICAgICAgICAgICAgY29tbWFuZCA9IGBcIkM6XFxcXFByb2dyYW0gRmlsZXMgKHg4NilcXFxcVGVuY2VudFxcXFxcdTVGQUVcdTRGRTF3ZWJcdTVGMDBcdTUzRDFcdTgwMDVcdTVERTVcdTUxNzdcXFxcY2xpLmJhdFwiIC1vIFwiJHtwcm9qZWN0UGF0aH1cImBcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAvLyBMaW51eCBcdTYyMTZcdTUxNzZcdTRFRDZcdTdDRkJcdTdFREZcbiAgICAgICAgY29uc29sZS5sb2coJ1x1Mjc0QyBcdTVGNTNcdTUyNERcdTdDRkJcdTdFREZcdTRFMERcdTY1MkZcdTYzMDFcdTgxRUFcdTUyQThcdTYyNTNcdTVGMDBcdTVGQUVcdTRGRTFcdTVGMDBcdTUzRDFcdTgwMDVcdTVERTVcdTUxNzcnKVxuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBleGVjKGNvbW1hbmQsIChlcnJvciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgXHUyNzRDIFx1NjI1M1x1NUYwMCR7dW5pUGxhdGZvcm1UZXh0fVx1NUYwMFx1NTNEMVx1ODAwNVx1NURFNVx1NTE3N1x1NTkzMVx1OEQyNTpgLCBlcnJvci5tZXNzYWdlKVxuICAgICAgICAgICAgY29uc29sZS5sb2coYFx1RDgzRFx1RENBMSBcdThCRjdcdTc4NkVcdTRGREQke3VuaVBsYXRmb3JtVGV4dH1cdTVGMDBcdTUzRDFcdTgwMDVcdTVERTVcdTUxNzdcdTY3MERcdTUyQTFcdTdBRUZcdTUzRTNcdTVERjJcdTU0MkZcdTc1MjhgKVxuICAgICAgICAgICAgY29uc29sZS5sb2coYFx1RDgzRFx1RENBMSBcdTUzRUZcdTRFRTVcdTYyNEJcdTUyQThcdTYyNTNcdTVGMDAke3VuaVBsYXRmb3JtVGV4dH1cdTVGMDBcdTUzRDFcdTgwMDVcdTVERTVcdTUxNzdcdTVFNzZcdTVCRkNcdTUxNjVcdTk4NzlcdTc2RUU6YCwgcHJvamVjdFBhdGgpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGRlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdcdTI2QTBcdUZFMEYgXHU4QjY2XHU1NDRBOicsIHN0ZGVycilcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKGBcdTI3MDUgJHt1bmlQbGF0Zm9ybVRleHR9XHU1RjAwXHU1M0QxXHU4MDA1XHU1REU1XHU1MTc3XHU1REYyXHU2MjUzXHU1RjAwYClcblxuICAgICAgICBpZiAoc3Rkb3V0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzdGRvdXQpXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG4vKipcbiAqIFx1NTIxQlx1NUVGQSBWaXRlIFx1NjNEMlx1NEVGNlx1RkYwQ1x1NzUyOFx1NEU4RVx1ODFFQVx1NTJBOFx1NjI1M1x1NUYwMFx1NUYwMFx1NTNEMVx1ODAwNVx1NURFNVx1NTE3N1xuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBcdTkxNERcdTdGNkVcdTkwMDlcdTk4NzlcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm1vZGUgLSBcdTY3ODRcdTVFRkFcdTZBMjFcdTVGMEZcdUZGMEMnZGV2ZWxvcG1lbnQnIFx1NjIxNiAncHJvZHVjdGlvbidcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3BlbkRldlRvb2xzKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHsgbW9kZSA9ICdkZXZlbG9wbWVudCcgfSA9IG9wdGlvbnNcbiAgICAvLyBcdTY4MzlcdTYzNkUgbW9kZSBcdTc4NkVcdTVCOUFcdTczQUZcdTU4ODNcdUZGMUFkZXZlbG9wbWVudCAtPiBkZXYsIHByb2R1Y3Rpb24gLT4gYnVpbGRcbiAgICBjb25zdCBlbnYgPSBtb2RlID09PSAncHJvZHVjdGlvbicgPyAnYnVpbGQnIDogJ2RldidcblxuICAgIC8vIFx1OTk5Nlx1NkIyMVx1Njc4NFx1NUVGQVx1NjgwN1x1OEJCMFxuICAgIGxldCBpc0ZpcnN0QnVpbGQgPSB0cnVlXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiAndW5pLWRldnRvb2xzJyxcbiAgICAgICAgd3JpdGVCdW5kbGUoKSB7XG4gICAgICAgICAgICBpZiAoaXNGaXJzdEJ1aWxkICYmIHByb2Nlc3MuZW52LlVOSV9QTEFURk9STT8uaW5jbHVkZXMoJ21wJykpIHtcbiAgICAgICAgICAgICAgICBpc0ZpcnN0QnVpbGQgPSBmYWxzZVxuICAgICAgICAgICAgICAgIF9vcGVuRGV2VG9vbHMoZW52KVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH1cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3dhZ2UvRG9jdW1lbnRzL0NvbXBhbnlQcm9qZWN0cy9NWEs4L214azgtdmlydHVhbC1jYXJkLXVuaWFwcC92aXRlLXBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy93YWdlL0RvY3VtZW50cy9Db21wYW55UHJvamVjdHMvTVhLOC9teGs4LXZpcnR1YWwtY2FyZC11bmlhcHAvdml0ZS1wbHVnaW5zL2NvcHktbmF0aXZlLXJlc291cmNlcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvd2FnZS9Eb2N1bWVudHMvQ29tcGFueVByb2plY3RzL01YSzgvbXhrOC12aXJ0dWFsLWNhcmQtdW5pYXBwL3ZpdGUtcGx1Z2lucy9jb3B5LW5hdGl2ZS1yZXNvdXJjZXMudHNcIjtpbXBvcnQgdHlwZSB7IFBsdWdpbiB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnXG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnXG5cbi8qKlxuICogXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHU4RDQ0XHU2RTkwXHU1OTBEXHU1MjM2XHU5MTREXHU3RjZFXHU2M0E1XHU1M0UzXG4gKlxuICogXHU2ODM5XHU2MzZFIFVuaUFwcCBcdTVCOThcdTY1QjlcdTY1ODdcdTY4NjNcdUZGMUFodHRwczovL3VuaWFwcC5kY2xvdWQubmV0LmNuL3BsdWdpbi9uYXRpdmUtcGx1Z2luLmh0bWwjJUU2JTlDJUFDJUU1JTlDJUIwJUU2JThGJTkyJUU0JUJCJUI2LSVFOSU5RCU5RSVFNSU4NiU4NSVFNyVCRCVBRSVFNSU4RSU5RiVFNyU5NCU5RiVFNiU4RiU5MiVFNCVCQiVCNlxuICogXHU2NzJDXHU1NzMwXHU2M0QyXHU0RUY2XHU1RTk0XHU4QkU1XHU1QjU4XHU1MEE4XHU1NzI4XHU5ODc5XHU3NkVFXHU2ODM5XHU3NkVFXHU1RjU1XHU3Njg0IG5hdGl2ZXBsdWdpbnMgXHU3NkVFXHU1RjU1XHU0RTBCXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29weU5hdGl2ZVJlc291cmNlc09wdGlvbnMge1xuICAgIC8qKiBcdTY2MkZcdTU0MjZcdTU0MkZcdTc1MjhcdTYzRDJcdTRFRjYgKi9cbiAgICBlbmFibGU/OiBib29sZWFuXG4gICAgLyoqXG4gICAgICogXHU2RTkwXHU3NkVFXHU1RjU1XHU4REVGXHU1Rjg0XHVGRjBDXHU3NkY4XHU1QkY5XHU0RThFXHU5ODc5XHU3NkVFXHU2ODM5XHU3NkVFXHU1RjU1XG4gICAgICogXHU5RUQ4XHU4QkE0XHU0RTNBICduYXRpdmVwbHVnaW5zJ1x1RkYwQ1x1N0IyNlx1NTQwOCBVbmlBcHAgXHU1Qjk4XHU2NUI5XHU4OUM0XHU4MzAzXG4gICAgICogQHNlZSBodHRwczovL3VuaWFwcC5kY2xvdWQubmV0LmNuL3BsdWdpbi9uYXRpdmUtcGx1Z2luLmh0bWwjJUU2JTlDJUFDJUU1JTlDJUIwJUU2JThGJTkyJUU0JUJCJUI2LSVFOSU5RCU5RSVFNSU4NiU4NSVFNyVCRCVBRSVFNSU4RSU5RiVFNyU5NCU5RiVFNiU4RiU5MiVFNCVCQiVCNlxuICAgICAqL1xuICAgIHNvdXJjZURpcj86IHN0cmluZ1xuICAgIC8qKlxuICAgICAqIFx1NzZFRVx1NjgwN1x1NzZFRVx1NUY1NVx1NTQwRFx1NzlGMFx1RkYwQ1x1Njc4NFx1NUVGQVx1NTQwRVx1NTcyOCBkaXN0IFx1NzZFRVx1NUY1NVx1NEUyRFx1NzY4NFx1NjU4N1x1NEVGNlx1NTkzOVx1NTQwRFxuICAgICAqIFx1OUVEOFx1OEJBNFx1NEUzQSAnbmF0aXZlcGx1Z2lucydcdUZGMENcdTRFMEVcdTZFOTBcdTc2RUVcdTVGNTVcdTRGRERcdTYzMDFcdTRFMDBcdTgxRjRcbiAgICAgKi9cbiAgICB0YXJnZXREaXJOYW1lPzogc3RyaW5nXG4gICAgLyoqIFx1NjYyRlx1NTQyNlx1NjYzRVx1NzkzQVx1OEJFNlx1N0VDNlx1NjVFNVx1NUZEN1x1RkYwQ1x1NEZCRlx1NEU4RVx1OEMwM1x1OEJENVx1NTQ4Q1x1NzZEMVx1NjNBN1x1NTkwRFx1NTIzNlx1OEZDN1x1N0EwQiAqL1xuICAgIHZlcmJvc2U/OiBib29sZWFuXG4gICAgLyoqIFx1ODFFQVx1NUI5QVx1NEU0OVx1NjVFNVx1NUZEN1x1NTI0RFx1N0YwMFx1RkYwQ1x1NzUyOFx1NEU4RVx1NTMzQVx1NTIwNlx1NEUwRFx1NTQwQ1x1NjNEMlx1NEVGNlx1NzY4NFx1NjVFNVx1NUZEN1x1OEY5M1x1NTFGQSAqL1xuICAgIGxvZ1ByZWZpeD86IHN0cmluZ1xufVxuXG4vKipcbiAqIFx1OUVEOFx1OEJBNFx1OTE0RFx1N0Y2RVxuICpcbiAqIFx1NjgzOVx1NjM2RSBVbmlBcHAgXHU1Qjk4XHU2NUI5XHU2NTg3XHU2ODYzXHU4OUM0XHU4MzAzXHU4QkJFXHU3RjZFXHU5RUQ4XHU4QkE0XHU1MDNDXHVGRjFBXG4gKiAtIHNvdXJjZURpcjogJ25hdGl2ZXBsdWdpbnMnIC0gXHU3QjI2XHU1NDA4XHU1Qjk4XHU2NUI5XHU2NzJDXHU1NzMwXHU2M0QyXHU0RUY2XHU1QjU4XHU1MEE4XHU4OUM0XHU4MzAzXG4gKiAtIHRhcmdldERpck5hbWU6ICduYXRpdmVwbHVnaW5zJyAtIFx1Njc4NFx1NUVGQVx1NTQwRVx1NEZERFx1NjMwMVx1NzZGOFx1NTQwQ1x1NzY4NFx1NzZFRVx1NUY1NVx1N0VEM1x1Njc4NFxuICovXG5jb25zdCBERUZBVUxUX09QVElPTlM6IFJlcXVpcmVkPENvcHlOYXRpdmVSZXNvdXJjZXNPcHRpb25zPiA9IHtcbiAgICBlbmFibGU6IHRydWUsXG4gICAgc291cmNlRGlyOiAnbmF0aXZlcGx1Z2lucycsXG4gICAgdGFyZ2V0RGlyTmFtZTogJ25hdGl2ZXBsdWdpbnMnLFxuICAgIHZlcmJvc2U6IHRydWUsXG4gICAgbG9nUHJlZml4OiAnW2NvcHktbmF0aXZlLXJlc291cmNlc10nLFxufVxuXG4vKipcbiAqIFVuaUFwcCBcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcdThENDRcdTZFOTBcdTU5MERcdTUyMzZcdTYzRDJcdTRFRjZcbiAqXG4gKiBcdTUyOUZcdTgwRkRcdThCRjRcdTY2MEVcdUZGMUFcbiAqIDEuIFx1ODlFM1x1NTFCMyBVbmlBcHAgXHU0RjdGXHU3NTI4XHU2NzJDXHU1NzMwXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHU2NUY2XHVGRjBDXHU2MjUzXHU1MzA1XHU1NDBFXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHU4RDQ0XHU2RTkwXHU2MjdFXHU0RTBEXHU1MjMwXHU3Njg0XHU5NUVFXHU5ODk4XG4gKiAyLiBcdTVDMDZcdTk4NzlcdTc2RUVcdTY4MzlcdTc2RUVcdTVGNTVcdTRFMEJcdTc2ODQgbmF0aXZlcGx1Z2lucyBcdTc2RUVcdTVGNTVcdTU5MERcdTUyMzZcdTUyMzBcdTY3ODRcdTVFRkFcdThGOTNcdTUxRkFcdTc2RUVcdTVGNTVcdTRFMkRcbiAqIDMuIFx1NjUyRlx1NjMwMSBBbmRyb2lkIFx1NTQ4QyBpT1MgXHU1RTczXHU1M0YwXHU3Njg0XHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHU4RDQ0XHU2RTkwXHU1OTBEXHU1MjM2XG4gKiA0LiBcdTRFQzVcdTU3MjggYXBwIFx1NUU3M1x1NTNGMFx1Njc4NFx1NUVGQVx1NjVGNlx1NzUxRlx1NjU0OFx1RkYwQ1x1NTE3Nlx1NEVENlx1NUU3M1x1NTNGMFx1RkYwOEg1XHUzMDAxXHU1QzBGXHU3QTBCXHU1RThGXHVGRjA5XHU0RTBEXHU2MjY3XHU4ODRDXG4gKlxuICogXHU0RjdGXHU3NTI4XHU1NzNBXHU2NjZGXHVGRjFBXG4gKiAtIFx1NEY3Rlx1NzUyOFx1NEU4NiBVbmlBcHAgXHU2NzJDXHU1NzMwXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHVGRjA4XHU5NzVFXHU0RTkxXHU3QUVGXHU2M0QyXHU0RUY2XHVGRjA5XG4gKiAtIFx1NTM5Rlx1NzUxRlx1NjNEMlx1NEVGNlx1NTMwNVx1NTQyQlx1OTg5RFx1NTkxNlx1NzY4NFx1OEQ0NFx1NkU5MFx1NjU4N1x1NEVGNlx1RkYwOFx1NTk4MiAuc28gXHU1RTkzXHU2NTg3XHU0RUY2XHUzMDAxXHU5MTREXHU3RjZFXHU2NTg3XHU0RUY2XHU3QjQ5XHVGRjA5XG4gKiAtIFx1OTcwMFx1ODk4MVx1NTcyOFx1NjI1M1x1NTMwNVx1NTQwRVx1NEZERFx1NjMwMVx1NTM5Rlx1NzUxRlx1NjNEMlx1NEVGNlx1NzY4NFx1NUI4Q1x1NjU3NFx1NzZFRVx1NUY1NVx1N0VEM1x1Njc4NFxuICpcbiAqIFx1NUI5OFx1NjVCOVx1NjU4N1x1Njg2M1x1NTNDMlx1ODAwM1x1RkYxQVxuICogQHNlZSBodHRwczovL3VuaWFwcC5kY2xvdWQubmV0LmNuL3BsdWdpbi9uYXRpdmUtcGx1Z2luLmh0bWwjJUU2JTlDJUFDJUU1JTlDJUIwJUU2JThGJTkyJUU0JUJCJUI2LSVFOSU5RCU5RSVFNSU4NiU4NSVFNyVCRCVBRSVFNSU4RSU5RiVFNyU5NCU5RiVFNiU4RiU5MiVFNCVCQiVCNlxuICogQHNlZSBodHRwczovL3VuaWFwcC5kY2xvdWQubmV0LmNuL3R1dG9yaWFsL252dWUtYXBpLmh0bWwjZG9tXG4gKlxuICogQHBhcmFtIG9wdGlvbnMgXHU2M0QyXHU0RUY2XHU5MTREXHU3RjZFXHU5MDA5XHU5ODc5XG4gKiBAcmV0dXJucyBWaXRlIFx1NjNEMlx1NEVGNlx1NUJGOVx1OEM2MVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29weU5hdGl2ZVJlc291cmNlcyhvcHRpb25zOiBDb3B5TmF0aXZlUmVzb3VyY2VzT3B0aW9ucyA9IHt9KTogUGx1Z2luIHtcbiAgICBjb25zdCBjb25maWcgPSB7IC4uLkRFRkFVTFRfT1BUSU9OUywgLi4ub3B0aW9ucyB9XG5cbiAgICAvLyBcdTU5ODJcdTY3OUNcdTYzRDJcdTRFRjZcdTg4QUJcdTc5ODFcdTc1MjhcdUZGMENcdThGRDRcdTU2REVcdTRFMDBcdTRFMkFcdTdBN0FcdTYzRDJcdTRFRjZcbiAgICBpZiAoIWNvbmZpZy5lbmFibGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6ICdjb3B5LW5hdGl2ZS1yZXNvdXJjZXMtZGlzYWJsZWQnLFxuICAgICAgICAgICAgYXBwbHk6ICdidWlsZCcsXG4gICAgICAgICAgICB3cml0ZUJ1bmRsZSgpIHtcbiAgICAgICAgICAgICAgICAvLyBcdTYzRDJcdTRFRjZcdTVERjJcdTc5ODFcdTc1MjhcdUZGMENcdTRFMERcdTYyNjdcdTg4NENcdTRFRkJcdTRGNTVcdTY0Q0RcdTRGNUNcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiAnY29weS1uYXRpdmUtcmVzb3VyY2VzJyxcbiAgICAgICAgYXBwbHk6ICdidWlsZCcsIC8vIFx1NTNFQVx1NTcyOFx1Njc4NFx1NUVGQVx1NjVGNlx1NUU5NFx1NzUyOFxuICAgICAgICBlbmZvcmNlOiAncG9zdCcsIC8vIFx1NTcyOFx1NTE3Nlx1NEVENlx1NjNEMlx1NEVGNlx1NjI2N1x1ODg0Q1x1NUI4Q1x1NkJENVx1NTQwRVx1NjI2N1x1ODg0Q1xuXG4gICAgICAgIGFzeW5jIHdyaXRlQnVuZGxlKCkge1xuICAgICAgICAgICAgY29uc3QgeyBzb3VyY2VEaXIsIHRhcmdldERpck5hbWUsIHZlcmJvc2UsIGxvZ1ByZWZpeCB9ID0gY29uZmlnXG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgLy8gXHU4M0I3XHU1M0Q2XHU5ODc5XHU3NkVFXHU2ODM5XHU3NkVFXHU1RjU1XHU4REVGXHU1Rjg0XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvamVjdFJvb3QgPSBwcm9jZXNzLmN3ZCgpXG5cbiAgICAgICAgICAgICAgICAvLyBcdTY3ODRcdTVFRkFcdTZFOTBcdTc2RUVcdTVGNTVcdTdFRERcdTVCRjlcdThERUZcdTVGODRcdUZGMDhcdTk4NzlcdTc2RUVcdTY4MzlcdTc2RUVcdTVGNTVcdTRFMEJcdTc2ODQgbmF0aXZlcGx1Z2lucyBcdTc2RUVcdTVGNTVcdUZGMDlcbiAgICAgICAgICAgICAgICBjb25zdCBzb3VyY2VQYXRoID0gcGF0aC5yZXNvbHZlKHByb2plY3RSb290LCBzb3VyY2VEaXIpXG5cbiAgICAgICAgICAgICAgICAvLyBcdTY3ODRcdTVFRkFcdTc2RUVcdTY4MDdcdThERUZcdTVGODRcdUZGMUFkaXN0L1tidWlsZHxkZXZdL1twbGF0Zm9ybV0vbmF0aXZlcGx1Z2luc1xuICAgICAgICAgICAgICAgIC8vIGJ1aWxkTW9kZTogJ2J1aWxkJyAoXHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzKSBcdTYyMTYgJ2RldicgKFx1NUYwMFx1NTNEMVx1NzNBRlx1NTg4MylcbiAgICAgICAgICAgICAgICAvLyBwbGF0Zm9ybTogJ2FwcCcgKEFwcFx1NUU3M1x1NTNGMCkgXHU2MjE2XHU1MTc2XHU0RUQ2XHU1RTczXHU1M0YwXHU2ODA3XHU4QkM2XG4gICAgICAgICAgICAgICAgY29uc3QgYnVpbGRNb2RlID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyA/ICdidWlsZCcgOiAnZGV2J1xuICAgICAgICAgICAgICAgIGNvbnN0IHBsYXRmb3JtID0gcHJvY2Vzcy5lbnYuVU5JX1BMQVRGT1JNIHx8ICdhcHAnXG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0UGF0aCA9IHBhdGgucmVzb2x2ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdFJvb3QsXG4gICAgICAgICAgICAgICAgICAgICdkaXN0JyxcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRNb2RlLFxuICAgICAgICAgICAgICAgICAgICBwbGF0Zm9ybSxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RGlyTmFtZSxcbiAgICAgICAgICAgICAgICApXG5cbiAgICAgICAgICAgICAgICAvLyBcdTY4QzBcdTY3RTVcdTZFOTBcdTc2RUVcdTVGNTVcdTY2MkZcdTU0MjZcdTVCNThcdTU3MjhcbiAgICAgICAgICAgICAgICAvLyBcdTU5ODJcdTY3OUNcdTRFMERcdTVCNThcdTU3MjggbmF0aXZlcGx1Z2lucyBcdTc2RUVcdTVGNTVcdUZGMENcdThCRjRcdTY2MEVcdTk4NzlcdTc2RUVcdTZDQTFcdTY3MDlcdTRGN0ZcdTc1MjhcdTY3MkNcdTU3MzBcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcbiAgICAgICAgICAgICAgICBjb25zdCBzb3VyY2VFeGlzdHMgPSBhd2FpdCBmcy5wYXRoRXhpc3RzKHNvdXJjZVBhdGgpXG4gICAgICAgICAgICAgICAgaWYgKCFzb3VyY2VFeGlzdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZlcmJvc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHtsb2dQcmVmaXh9IFx1NkU5MFx1NzZFRVx1NUY1NVx1NEUwRFx1NUI1OFx1NTcyOFx1RkYwQ1x1OERGM1x1OEZDN1x1NTkwRFx1NTIzNlx1NjRDRFx1NEY1Q2ApXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7bG9nUHJlZml4fSBcdTZFOTBcdTc2RUVcdTVGNTVcdThERUZcdTVGODQ6ICR7c291cmNlUGF0aH1gKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGAke2xvZ1ByZWZpeH0gXHU1OTgyXHU5NzAwXHU0RjdGXHU3NTI4XHU2NzJDXHU1NzMwXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHVGRjBDXHU4QkY3XHU1NzI4XHU5ODc5XHU3NkVFXHU2ODM5XHU3NkVFXHU1RjU1XHU1MjFCXHU1RUZBIG5hdGl2ZXBsdWdpbnMgXHU3NkVFXHU1RjU1YClcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHtsb2dQcmVmaXh9IFx1NUU3Nlx1NjMwOVx1NzE2N1x1NUI5OFx1NjVCOVx1NjU4N1x1Njg2M1x1NjUzRVx1NTE2NVx1NTM5Rlx1NzUxRlx1NjNEMlx1NEVGNlx1NjU4N1x1NEVGNmApXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7bG9nUHJlZml4fSBcdTUzQzJcdTgwMDM6IGh0dHBzOi8vdW5pYXBwLmRjbG91ZC5uZXQuY24vcGx1Z2luL25hdGl2ZS1wbHVnaW4uaHRtbGApXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gXHU2OEMwXHU2N0U1XHU2RTkwXHU3NkVFXHU1RjU1XHU2NjJGXHU1NDI2XHU0RTNBXHU3QTdBXG4gICAgICAgICAgICAgICAgLy8gXHU1OTgyXHU2NzlDXHU3NkVFXHU1RjU1XHU1QjU4XHU1NzI4XHU0RjQ2XHU0RTNBXHU3QTdBXHVGRjBDXHU0RTVGXHU4REYzXHU4RkM3XHU1OTBEXHU1MjM2XHU2NENEXHU0RjVDXG4gICAgICAgICAgICAgICAgY29uc3Qgc291cmNlRmlsZXMgPSBhd2FpdCBmcy5yZWFkZGlyKHNvdXJjZVBhdGgpXG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZUZpbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmVyYm9zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGAke2xvZ1ByZWZpeH0gXHU2RTkwXHU3NkVFXHU1RjU1XHU0RTNBXHU3QTdBXHVGRjBDXHU4REYzXHU4RkM3XHU1OTBEXHU1MjM2XHU2NENEXHU0RjVDYClcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHtsb2dQcmVmaXh9IFx1NkU5MFx1NzZFRVx1NUY1NVx1OERFRlx1NUY4NDogJHtzb3VyY2VQYXRofWApXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7bG9nUHJlZml4fSBcdThCRjdcdTU3MjggbmF0aXZlcGx1Z2lucyBcdTc2RUVcdTVGNTVcdTRFMkRcdTY1M0VcdTUxNjVcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcdTY1ODdcdTRFRjZgKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFx1Nzg2RVx1NEZERFx1NzZFRVx1NjgwN1x1NzZFRVx1NUY1NVx1NTNDQVx1NTE3Nlx1NzIzNlx1NzZFRVx1NUY1NVx1NUI1OFx1NTcyOFxuICAgICAgICAgICAgICAgIGF3YWl0IGZzLmVuc3VyZURpcih0YXJnZXRQYXRoKVxuXG4gICAgICAgICAgICAgICAgaWYgKHZlcmJvc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7bG9nUHJlZml4fSBcdTVGMDBcdTU5Q0JcdTU5MERcdTUyMzYgVW5pQXBwIFx1NjcyQ1x1NTczMFx1NTM5Rlx1NzUxRlx1NjNEMlx1NEVGNi4uLmApXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke2xvZ1ByZWZpeH0gXHU2RTkwXHU3NkVFXHU1RjU1OiAke3NvdXJjZVBhdGh9YClcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7bG9nUHJlZml4fSBcdTc2RUVcdTY4MDdcdTc2RUVcdTVGNTU6ICR7dGFyZ2V0UGF0aH1gKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJHtsb2dQcmVmaXh9IFx1Njc4NFx1NUVGQVx1NkEyMVx1NUYwRjogJHtidWlsZE1vZGV9YClcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7bG9nUHJlZml4fSBcdTc2RUVcdTY4MDdcdTVFNzNcdTUzRjA6ICR7cGxhdGZvcm19YClcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7bG9nUHJlZml4fSBcdTUzRDFcdTczQjAgJHtzb3VyY2VGaWxlcy5sZW5ndGh9IFx1NEUyQVx1NTM5Rlx1NzUxRlx1NjNEMlx1NEVGNlx1NjU4N1x1NEVGNi9cdTc2RUVcdTVGNTVgKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFx1NjI2N1x1ODg0Q1x1NjU4N1x1NEVGNlx1NTkwRFx1NTIzNlx1NjRDRFx1NEY1Q1xuICAgICAgICAgICAgICAgIC8vIFx1NUMwNlx1NjU3NFx1NEUyQSBuYXRpdmVwbHVnaW5zIFx1NzZFRVx1NUY1NVx1NTkwRFx1NTIzNlx1NTIzMFx1Njc4NFx1NUVGQVx1OEY5M1x1NTFGQVx1NzZFRVx1NUY1NVxuICAgICAgICAgICAgICAgIGF3YWl0IGZzLmNvcHkoc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwge1xuICAgICAgICAgICAgICAgICAgICBvdmVyd3JpdGU6IHRydWUsIC8vIFx1ODk4Nlx1NzZENlx1NURGMlx1NUI1OFx1NTcyOFx1NzY4NFx1NjU4N1x1NEVGNlx1RkYwQ1x1Nzg2RVx1NEZERFx1NEY3Rlx1NzUyOFx1NjcwMFx1NjVCMFx1NzI0OFx1NjcyQ1xuICAgICAgICAgICAgICAgICAgICBlcnJvck9uRXhpc3Q6IGZhbHNlLCAvLyBcdTU5ODJcdTY3OUNcdTc2RUVcdTY4MDdcdTY1ODdcdTRFRjZcdTVCNThcdTU3MjhcdTRFMERcdTYyQTVcdTk1MTlcbiAgICAgICAgICAgICAgICAgICAgcHJlc2VydmVUaW1lc3RhbXBzOiB0cnVlLCAvLyBcdTRGRERcdTYzMDFcdTY1ODdcdTRFRjZcdTc2ODRcdTY1RjZcdTk1RjRcdTYyMzNcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgaWYgKHZlcmJvc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7bG9nUHJlZml4fSBcdTI3MDUgVW5pQXBwIFx1NjcyQ1x1NTczMFx1NTM5Rlx1NzUxRlx1NjNEMlx1NEVGNlx1NTkwRFx1NTIzNlx1NUI4Q1x1NjIxMGApXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke2xvZ1ByZWZpeH0gXHU1REYyXHU2MjEwXHU1MjlGXHU1OTBEXHU1MjM2ICR7c291cmNlRmlsZXMubGVuZ3RofSBcdTRFMkFcdTY1ODdcdTRFRjYvXHU3NkVFXHU1RjU1XHU1MjMwXHU2Nzg0XHU1RUZBXHU3NkVFXHU1RjU1YClcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7bG9nUHJlZml4fSBcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcdTczQjBcdTU3MjhcdTUzRUZcdTRFRTVcdTU3MjggQXBwIFx1NEUyRFx1NkI2M1x1NUUzOFx1NEY3Rlx1NzUyOGApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgJHtjb25maWcubG9nUHJlZml4fSBcdTI3NEMgXHU1OTBEXHU1MjM2IFVuaUFwcCBcdTY3MkNcdTU3MzBcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcdTU5MzFcdThEMjU6YCwgZXJyb3IpXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgJHtjb25maWcubG9nUHJlZml4fSBcdTk1MTlcdThCRUZcdThCRTZcdTYwQzU6YCwgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYCR7Y29uZmlnLmxvZ1ByZWZpeH0gXHU4QkY3XHU2OEMwXHU2N0U1XHU2RTkwXHU3NkVFXHU1RjU1XHU2NzQzXHU5NjUwXHU1NDhDXHU3OEMxXHU3NkQ4XHU3QTdBXHU5NUY0YClcbiAgICAgICAgICAgICAgICAvLyBcdTRFMERcdTYyOUJcdTUxRkFcdTk1MTlcdThCRUZcdUZGMENcdTkwN0ZcdTUxNERcdTVGNzFcdTU0Q0RcdTY1NzRcdTRFMkFcdTY3ODRcdTVFRkFcdThGQzdcdTdBMEJcdUZGMENcdTRGNDZcdTRGMUFcdThCQjBcdTVGNTVcdThCRTZcdTdFQzZcdTc2ODRcdTk1MTlcdThCRUZcdTRGRTFcdTYwNkZcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9XG59XG5cbi8qKlxuICogXHU1MjFCXHU1RUZBIFVuaUFwcCBcdTY3MkNcdTU3MzBcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcdThENDRcdTZFOTBcdTU5MERcdTUyMzZcdTYzRDJcdTRFRjZcdTc2ODRcdTRGQkZcdTYzNzdcdTUxRkRcdTY1NzBcbiAqXG4gKiBcdThGRDlcdTY2MkZcdTRFMDBcdTRFMkFcdTRGQkZcdTYzNzdcdTc2ODRcdTVERTVcdTUzODJcdTUxRkRcdTY1NzBcdUZGMENcdTc1MjhcdTRFOEVcdTVGRUJcdTkwMUZcdTUyMUJcdTVFRkFcdTYzRDJcdTRFRjZcdTVCOUVcdTRGOEJcbiAqIFx1NzI3OVx1NTIyQlx1OTAwMlx1NzUyOFx1NEU4RVx1NTcyOCB2aXRlLmNvbmZpZy50cyBcdTRFMkRcdThGREJcdTg4NENcdTY3NjFcdTRFRjZcdTYwMjdcdTYzRDJcdTRFRjZcdTkxNERcdTdGNkVcbiAqXG4gKiBcdTRGN0ZcdTc1MjhcdTc5M0FcdTRGOEJcdUZGMUFcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIC8vIFx1NTcyOCB2aXRlLmNvbmZpZy50cyBcdTRFMkRcbiAqIHBsdWdpbnM6IFtcbiAqICAgLy8gXHU0RUM1XHU1NzI4IGFwcCBcdTVFNzNcdTUzRjBcdTRFMTRcdTU0MkZcdTc1MjhcdTY1RjZcdTc1MUZcdTY1NDhcbiAqICAgVU5JX1BMQVRGT1JNID09PSAnYXBwJ1xuICogICAgID8gY3JlYXRlQ29weU5hdGl2ZVJlc291cmNlc1BsdWdpbihcbiAqICAgICAgICAgVklURV9DT1BZX05BVElWRV9SRVNfRU5BQkxFID09PSAndHJ1ZScsXG4gKiAgICAgICAgIHsgdmVyYm9zZTogbW9kZSA9PT0gJ2RldmVsb3BtZW50JyB9XG4gKiAgICAgICApXG4gKiAgICAgOiBudWxsLFxuICogXVxuICogYGBgXG4gKlxuICogQHBhcmFtIGVuYWJsZSBcdTY2MkZcdTU0MjZcdTU0MkZcdTc1MjhcdTYzRDJcdTRFRjZcdUZGMENcdTkwMUFcdTVFMzhcdTkwMUFcdThGQzdcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcdTYzQTdcdTUyMzZcbiAqIEBwYXJhbSBvcHRpb25zIFx1NTE3Nlx1NEVENlx1OTE0RFx1N0Y2RVx1OTAwOVx1OTg3OVx1RkYwQ1x1NEUwRFx1NTMwNVx1NTQyQiBlbmFibGUgXHU1QzVFXHU2MDI3XG4gKiBAcmV0dXJucyBWaXRlIFx1NjNEMlx1NEVGNlx1NUJGOVx1OEM2MVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29weU5hdGl2ZVJlc291cmNlc1BsdWdpbihcbiAgICBlbmFibGU6IGJvb2xlYW4gPSB0cnVlLFxuICAgIG9wdGlvbnM6IE9taXQ8Q29weU5hdGl2ZVJlc291cmNlc09wdGlvbnMsICdlbmFibGUnPiA9IHt9LFxuKTogUGx1Z2luIHtcbiAgICByZXR1cm4gY29weU5hdGl2ZVJlc291cmNlcyh7IGVuYWJsZSwgLi4ub3B0aW9ucyB9KVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvd2FnZS9Eb2N1bWVudHMvQ29tcGFueVByb2plY3RzL01YSzgvbXhrOC12aXJ0dWFsLWNhcmQtdW5pYXBwL3ZpdGUtcGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3dhZ2UvRG9jdW1lbnRzL0NvbXBhbnlQcm9qZWN0cy9NWEs4L214azgtdmlydHVhbC1jYXJkLXVuaWFwcC92aXRlLXBsdWdpbnMvc3luYy1tYW5pZmVzdC1wbHVnaW5zLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy93YWdlL0RvY3VtZW50cy9Db21wYW55UHJvamVjdHMvTVhLOC9teGs4LXZpcnR1YWwtY2FyZC11bmlhcHAvdml0ZS1wbHVnaW5zL3N5bmMtbWFuaWZlc3QtcGx1Z2lucy50c1wiO2ltcG9ydCB0eXBlIHsgUGx1Z2luIH0gZnJvbSAndml0ZSdcbmltcG9ydCBmcyBmcm9tICdub2RlOmZzJ1xuaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHByb2Nlc3MgZnJvbSAnbm9kZTpwcm9jZXNzJ1xuXG5pbnRlcmZhY2UgTWFuaWZlc3RUeXBlIHtcbiAgICAncGx1cyc/OiB7XG4gICAgICAgIGRpc3RyaWJ1dGU/OiB7XG4gICAgICAgICAgICBwbHVnaW5zPzogUmVjb3JkPHN0cmluZywgYW55PlxuICAgICAgICB9XG4gICAgfVxuICAgICdhcHAtcGx1cyc/OiB7XG4gICAgICAgIGRpc3RyaWJ1dGU/OiB7XG4gICAgICAgICAgICBwbHVnaW5zPzogUmVjb3JkPHN0cmluZywgYW55PlxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzeW5jTWFuaWZlc3RQbHVnaW4oKTogUGx1Z2luIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiAnc3luYy1tYW5pZmVzdCcsXG4gICAgICAgIGFwcGx5OiAnYnVpbGQnLFxuICAgICAgICBlbmZvcmNlOiAncG9zdCcsXG4gICAgICAgIHdyaXRlQnVuZGxlOiB7XG4gICAgICAgICAgICBvcmRlcjogJ3Bvc3QnLFxuICAgICAgICAgICAgaGFuZGxlcigpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzcmNNYW5pZmVzdFBhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJy4vc3JjL21hbmlmZXN0Lmpzb24nKVxuICAgICAgICAgICAgICAgIGNvbnN0IGRpc3RBcHBQYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICcuL2Rpc3QvZGV2L2FwcC9tYW5pZmVzdC5qc29uJylcblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFx1OEJGQlx1NTNENlx1NkU5MFx1NjU4N1x1NEVGNlxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzcmNNYW5pZmVzdCA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHNyY01hbmlmZXN0UGF0aCwgJ3V0ZjgnKSkgYXMgTWFuaWZlc3RUeXBlXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gXHU3ODZFXHU0RkREXHU3NkVFXHU2ODA3XHU3NkVFXHU1RjU1XHU1QjU4XHU1NzI4XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc3RBcHBEaXIgPSBwYXRoLmRpcm5hbWUoZGlzdEFwcFBhdGgpXG4gICAgICAgICAgICAgICAgICAgIGlmICghZnMuZXhpc3RzU3luYyhkaXN0QXBwRGlyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnMubWtkaXJTeW5jKGRpc3RBcHBEaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBcdThCRkJcdTUzRDZcdTc2RUVcdTY4MDdcdTY1ODdcdTRFRjZcdUZGMDhcdTU5ODJcdTY3OUNcdTVCNThcdTU3MjhcdUZGMDlcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpc3RNYW5pZmVzdDogTWFuaWZlc3RUeXBlID0ge31cbiAgICAgICAgICAgICAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoZGlzdEFwcFBhdGgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0TWFuaWZlc3QgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhkaXN0QXBwUGF0aCwgJ3V0ZjgnKSlcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFx1NTk4Mlx1Njc5Q1x1NkU5MFx1NjU4N1x1NEVGNlx1NUI1OFx1NTcyOCBwbHVnaW5zXG4gICAgICAgICAgICAgICAgICAgIGlmIChzcmNNYW5pZmVzdFsnYXBwLXBsdXMnXT8uZGlzdHJpYnV0ZT8ucGx1Z2lucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gXHU3ODZFXHU0RkREXHU3NkVFXHU2ODA3XHU2NTg3XHU0RUY2XHU0RTJEXHU2NzA5XHU1RkM1XHU4OTgxXHU3Njg0XHU1QkY5XHU4QzYxXHU3RUQzXHU2Nzg0XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRpc3RNYW5pZmVzdC5wbHVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RNYW5pZmVzdC5wbHVzID0ge31cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGlzdE1hbmlmZXN0LnBsdXMuZGlzdHJpYnV0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXN0TWFuaWZlc3QucGx1cy5kaXN0cmlidXRlID0ge31cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gXHU1OTBEXHU1MjM2IHBsdWdpbnMgXHU1MTg1XHU1QkI5XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0TWFuaWZlc3QucGx1cy5kaXN0cmlidXRlLnBsdWdpbnMgPSBzcmNNYW5pZmVzdFsnYXBwLXBsdXMnXS5kaXN0cmlidXRlLnBsdWdpbnNcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gXHU1MTk5XHU1MTY1XHU2NkY0XHU2NUIwXHU1NDBFXHU3Njg0XHU1MTg1XHU1QkI5XG4gICAgICAgICAgICAgICAgICAgICAgICBmcy53cml0ZUZpbGVTeW5jKGRpc3RBcHBQYXRoLCBKU09OLnN0cmluZ2lmeShkaXN0TWFuaWZlc3QsIG51bGwsIDIpKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1x1MjcwNSBNYW5pZmVzdCBwbHVnaW5zIFx1NTQwQ1x1NkI2NVx1NjIxMFx1NTI5RicpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1x1Mjc0QyBcdTU0MENcdTZCNjUgbWFuaWZlc3QgcGx1Z2lucyBcdTU5MzFcdThEMjU6JywgZXJyb3IpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJYLE9BQU9BLFdBQVU7QUFDNVksT0FBT0MsY0FBYTtBQUNwQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxtQkFBbUI7QUFFMUIsT0FBTyxnQkFBZ0I7QUFFdkIsT0FBTyxpQkFBaUI7QUFFeEIsT0FBTyxjQUFjO0FBR3JCLE9BQU8saUJBQWlCO0FBS3hCLE9BQU8scUJBQXFCO0FBRTVCLE9BQU8sZUFBZTtBQUN0QixPQUFPLFdBQVc7QUFDbEIsU0FBUyxrQkFBa0I7QUFDM0IsT0FBTyxZQUFZO0FBQ25CLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU8saUJBQWlCOzs7QUN6QmlZLFNBQVMsWUFBWTtBQUM5YSxPQUFPLFFBQVE7QUFDZixPQUFPLFVBQVU7QUFDakIsT0FBTyxhQUFhO0FBTXBCLFNBQVMsY0FBYyxNQUFNLE9BQU87QUFDaEMsUUFBTSxXQUFXLFFBQVE7QUFDekIsUUFBTSxFQUFFLGFBQWEsSUFBSSxRQUFRO0FBRWpDLFFBQU0sa0JBQWtCLGlCQUFpQixjQUFjLG1DQUFVLGlCQUFpQixjQUFjLHlDQUFXLGlCQUFpQixZQUFZLG1DQUFVO0FBR2xK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QSxRQUFRO0FBQUEsTUFDSixNQUFNO0FBQUEsTUFDTixLQUFLO0FBQUEsTUFDTCxNQUFNLE9BQU8sU0FBUyxlQUFlLEVBQUU7QUFBQTtBQUFBLE1BRXZDLE9BQU8sS0FBSyxNQUFNLHFCQUFxQixJQUNqQztBQUFBLFFBQ00sQ0FBQyxxQkFBcUIsR0FBRztBQUFBLFVBQ3JCLFFBQVE7QUFBQSxVQUNSLGNBQWM7QUFBQTtBQUFBLFVBRWQsU0FBUyxDQUFBQyxVQUNMQSxNQUFLLFFBQVEsSUFBSSxPQUFPLElBQUkscUJBQXFCLEVBQUUsR0FBRyxFQUFFO0FBQUEsUUFDaEU7QUFBQSxNQUNKLElBQ0Y7QUFBQSxJQUNWO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDTCxNQUFNLHdCQUF3QixTQUFTLENBQUMsV0FBVyxVQUFVLElBQUksQ0FBQztBQUFBLElBQ3RFO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDSCxXQUFXO0FBQUE7QUFBQTtBQUFBLE1BR1gsUUFBUTtBQUFBO0FBQUEsTUFFUixRQUFRLFNBQVMsZ0JBQWdCLFFBQVE7QUFBQSxJQUM3QztBQUFBLEVBQ0osQ0FBQztBQUNMLENBQUM7IiwKICAibmFtZXMiOiBbInBhdGgiLCAicHJvY2VzcyIsICJwYXRoIiwgInByb2Nlc3MiLCAiZnMiLCAicHJvY2VzcyIsICJwYXRoIiwgImZzIiwgImZzIiwgInBhdGgiLCAicHJvY2VzcyIsICJwYXRoIiwgInByb2Nlc3MiLCAiZnMiLCAicHJvY2VzcyIsICJwYXRoIl0KfQo=
