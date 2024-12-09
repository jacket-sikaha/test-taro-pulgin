import { Shortcuts, UnRecursiveTemplate } from "@tarojs/shared/dist/template";

import type { IOptions } from "./index";

export class Template extends UnRecursiveTemplate {
  pluginOptions: IOptions;
  supportXS = true;
  Adapter = {
    if: "ty:if",
    else: "ty:else",
    elseif: "ty:elif",
    for: "ty:for",
    forItem: "ty:for-item",
    forIndex: "ty:for-index",
    key: "ty:key",
    xs: "sjs",
    type: "ty",
  };

  constructor(pluginOptions?: IOptions) {
    super();
    this.pluginOptions = pluginOptions || {};
  }

  buildXsTemplate() {
    return '<sjs module="xs" src="./utils.sjs" />';
  }

  replacePropName(
    name: string,
    value: string,
    componentName: string,
    componentAlias
  ) {
    if (value === "eh") {
      const nameLowerCase = name.toLowerCase();
      if (nameLowerCase === "bindlongtap" && componentName !== "canvas")
        return "bindlongpress";
      return nameLowerCase;
    }
    if (componentName === "share-element") {
      const mapKeyAlias = componentAlias.mapkey;
      if (value === `i.${mapKeyAlias}`) return "key";
    }
    return name;
  }

  buildXSTepFocus(nn: string) {
    if (this.pluginOptions.enablekeyboardAccessory) {
      const textarea = this.componentsAlias.textarea._num;
      const input = this.componentsAlias.input._num;
      const ka = this.componentsAlias["keyboard-accessory"]._num;
      return `function(i, prefix) {
      var s = i.focus !== undefined ? 'focus' : 'blur'
      var r = prefix + i.${nn} + '_' + s
      if ((i.nn === '${textarea}' || i.nn === '${input}') && i.cn[0] && i.cn[0].nn === '${ka}') {
        r = r + '_ka'
      }
      return r
    }`;
    } else {
      return super.buildXSTepFocus(nn);
    }
  }

  modifyTemplateResult = (res: string, nodeName: string, _, children) => {
    if (nodeName === "keyboard-accessory") return "";

    if (
      (nodeName === "textarea" || nodeName === "input") &&
      this.pluginOptions.enablekeyboardAccessory
    ) {
      const list = res.split("</template>");
      const componentAlias = this.componentsAlias[nodeName];
      const nodeNameAlias = componentAlias._num;
      const xs = `xs.a(c, item.${Shortcuts.NodeName}, l)`;

      const target = `
    <keyboard-accessory style="{{i.cn[0].st}}" class="{{i.cn[0].cl}}" bindtap="eh"  id="{{i.cn[0].uid||i.cn[0].sid}}" data-sid="{{i.cn[0].sid}}">
      <block ty:for="{{i.cn[0].cn}}" ty:key="sid">
        <template is="{{${xs}}}" data="{{i:item,c:c+1,l:xs.f(l,item.${Shortcuts.NodeName})}}" />
      </block>
    </keyboard-accessory>
  `;

      const templateFocus = list[1]
        .replace(children, target)
        .replace(`_${nodeNameAlias}_focus`, `_${nodeNameAlias}_focus_ka`);

      const templateBlur = list[2]
        .replace(children, target)
        .replace(`_${nodeNameAlias}_blur`, `_${nodeNameAlias}_blur_ka`);

      list.splice(3, 0, templateFocus, templateBlur);
      return list.join("</template>");
    }

    return res;
  };
}
