import Weapp from "./program";

import type { IPluginContext } from "@tarojs/service";

// 让其它平台插件可以继承此平台
export { Weapp };

export interface IOptions {
  enablekeyboardAccessory?: boolean;
}

export default (ctx: IPluginContext, options: IOptions) => {
  ctx.registerPlatform({
    name: "tttt",
    useConfigName: "mini",
    async fn({ config }) {
      const program = new Weapp(ctx, config, options || {});
      await program.start();
    },
  });

  ctx.onBuildStart(() => {
    console.log("插件入参111：", options);
    console.log("编译开始");
  });

  ctx.modifyWebpackChain(({ chain }: { chain: unknown }) => {
    console.log("这里可以修改webpack配置");
    // 示例：利用webpackChain向html中插入脚本
    if (process.env.TARO_ENV !== "h5") return;
    chain.plugin("htmlWebpackPlugin").tap(([pluginConfig]) => {
      return [
        {
          ...pluginConfig,
          script: pluginConfig.script + 'console.log("向html中插入代码");',
        },
      ];
    });
  });

  ctx.onBuildComplete(() => {
    console.log("Taro 构建完成！");
  });

  ctx.modifyBuildAssets(({ assets }) => {
    console.log("修改编译后的结果123");
    // 示例：修改html产物内容
    const indexHtml = assets["index.html"];
    if (indexHtml && indexHtml._value) {
      indexHtml._value = indexHtml._value.replace(
        /<title>(.*?)<\/title>/,
        "<title>被插件修改过的标题</title>"
      );
    }
  });

  ctx.onBuildFinish(() => {
    console.log("Webpack 编译结束！");
  });
};
