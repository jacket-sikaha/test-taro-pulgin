import {
  Button,
  Checkbox,
  Form,
  Input,
  Picker,
  Progress,
  Radio,
  RadioGroup,
  Slider,
  Switch,
  Text,
  Textarea,
  View,
} from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.less";

export default function Index() {
  return (
    <View className="index">
      <Text
        onClick={() => {
          Taro.showModal({
            title: "提示",
            content: "这是一个提示",
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log("用户点击确定");
              }
            },
          });
        }}
      >
        Hello world!
      </Text>
      <button
        onClick={() => {
          Taro.navigateTo({ url: "/pages/test/index" });
        }}
      >
        test
      </button>
      <Button
        onClick={() => {
          Taro.navigateTo({ url: "/pages/user/index" });
        }}
      >
        user
      </Button>
      <View className="components-page">
        <Progress percent={20} showInfo strokeWidth={2} />
        <Progress percent={40} strokeWidth={2} active />
        <Progress percent={60} strokeWidth={2} active />
        <Progress percent={80} strokeWidth={2} active activeColor="blue" />
      </View>
      <View
        className="page-section"
        onClick={() => {
          Taro.showToast({ title: "点击了" });
        }}
      >
        <Text>默认样式</Text>
        <Checkbox value="选中" checked>
          选中
        </Checkbox>
        <Checkbox style="margin-left: 20rpx" value="未选中">
          未选中
        </Checkbox>
      </View>
      <Form
        onSubmit={(e) => {
          console.log(e.detail);
        }}
        onReset={(e) => {
          console.log(e.detail);
        }}
      >
        <View className="example-body">
          <Switch name="switch" className="form-switch"></Switch>
        </View>
      </Form>
      <View className="example-body">
        <Text>控制最大输入长度的 input</Text>
        <Input type="text" placeholder="最大输入长度为 10" maxlength={10} />
        <Text>数字输入的 input</Text>
        <Input type="number" placeholder="这是一个数字输入框" />
        <Text>密码输入的 input</Text>
        <Input password placeholder="这是一个密码输入框" />
        <Text>带小数点的 input</Text>
        <Input type="digit" placeholder="带小数点的数字键盘" />
        <Text>身份证输入的 input</Text>
        <Input type="idcard" placeholder="身份证输入键盘" />
        <Text>控制占位符颜色的 input</Text>
        <Input
          type="text"
          placeholder="占位符字体是红色的"
          placeholderStyle="color:red"
        />
      </View>
      <View style={{ margin: 30 }}>
        <Picker
          mode="selector"
          range={["美国", "中国", "巴西", "日本"]}
          onChange={(e) => {
            console.log(e.detail.value);
          }}
        >
          <View className="picker">当前选择： </View>
        </Picker>
      </View>
      <View className="page-section">
        <Text>默认样式</Text>
        <RadioGroup>
          <Radio value="选中" checked>
            选中
          </Radio>
          <Radio style="margin-left: 20rpx" value="未选中">
            未选中
          </Radio>
        </RadioGroup>
      </View>
      <Slider step={1} value={100} showValue min={50} max={200} />
      <Text>输入区域高度自适应，不会出现滚动条</Text>
      <Textarea
        style="background:#fff;width:100%;min-height:80px;padding:0 30rpx;"
        autoHeight
      />
    </View>
  );
}
