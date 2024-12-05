import Tuya from "./program";

import type { IPluginContext } from "@tarojs/service";

// 让其它平台插件可以继承此平台
export { Tuya };

export interface IOptions {
  enablekeyboardAccessory?: boolean;
}

export default (ctx: IPluginContext, options: IOptions) => {
  ctx.registerPlatform({
    name: "tttt",
    useConfigName: "mini",
    async fn({ config }) {
      const program = new Tuya(ctx, config, options || {});
      await program.start();
    },
  });

  ctx.onBuildStart(() => {
    console.log("插件入参111：", options);
    console.log("编译开始");
  });

  ctx.onBuildComplete(() => {
    console.log("Taro 构建完成！");
  });

  ctx.onBuildFinish(() => {
    console.log("Webpack 编译结束！");
  });
};
